import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {PacientesService} from "../../services/pacientes.service";
import {MedicosService} from 'src/app/services/medicos.service';
import {RolService} from "../../services/rol.service";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showNavBar: boolean = false;
  especialidades: string[] = [
    'Alergología',
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Gastroenterología',
    'Hematología',
    'Infectología',
    'Medicina familiar',
    'Neumología',
    'Neurología',
    'Oftalmología',
    'Oncología',
    'Ortopedia',
    'Otorrinolaringología',
    'Pediatría',
    'Psicología',
    'Psiquiatría',
    'Radiología',
    'Reumatología',
    'Urología'
  ];

  registerForm: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private pacientesService: PacientesService,
    private medicosService: MedicosService,
    private rolService: RolService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      tipoUsuario: new FormControl('default', [
        Validators.required,
        Validators.pattern('^(?!default$).*')
      ]),
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellidos: new FormControl('', [
        Validators.required
      ]),
      dni: new FormControl('', [
        Validators.required
      ]),
      fechaNacimiento: new FormControl('', [
        Validators.required
      ]),
      genero: new FormControl('', [
        Validators.required
      ]),
      telefono: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      numSeguridadSocial: new FormControl('', [
        Validators.required
      ]),
      altura: new FormControl(''),
      peso: new FormControl(''),
      alergias: new FormControl(''),
      enfermedades: new FormControl(''),
      intervenciones: new FormControl(''),
      numColegiado: new FormControl('', [
        Validators.required
      ]),
      especialidad: new FormControl('default-especialidad', [
        Validators.required,
        Validators.pattern('^(?!default-especialidad$).*')
      ]),
    });
  }

  async send() {
    if (!this.areAllFieldsFilled()) {
      this.mostrarGenericPopup("Campos incompletos");
      return;
    }

    if (this.registerForm.get('password').getError('minlength') && this.areAllFieldsFilled()) {
      this.mostrarGenericPopup("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (this.registerForm.get('email').getError('email') && this.areAllFieldsFilled()) {
      this.mostrarGenericPopup("Email inválido.");
      return;
    }

    const camposComunes = await this.obtenerCamposComunes();

    const tipoUsuario = this.registerForm.get('tipoUsuario').value;

    if (tipoUsuario === 'paciente') {
      const camposPaciente = this.obtenerCamposPaciente();

      const newPaciente: any = {
        id: null,
        ...camposComunes,
        ...camposPaciente
      };

      this.pacientesService.createPaciente(newPaciente).subscribe(
        (response) => {
          console.log("Paciente creado con éxito.");
          this.rolService.setUserType("paciente");
          this.rolService.setUserId(response.body.id);
          this.rolService.setHashPassword(newPaciente.contrasena);
          this.router.navigate(['/base']);
        },
        (error) => {
          if(error.status == 409) {
            this.mostrarGenericPopup("Este email ya ha sido registrado.");
          } else {
            this.mostrarGenericPopup("Error inesperado.");
            console.error('Error al crear el paciente:', error);
          }
        }
      );

    } else {
      const numColegiado = this.registerForm.get('numColegiado').value;
      const especialidad = this.registerForm.get('especialidad').value;

      const newMedico: any = {
        ...camposComunes,
        especialidad: especialidad,
        numeroDeColegiado: numColegiado,
      };

      this.medicosService.createMedico(newMedico).subscribe(
        () => {
          console.log("Medico creado con éxito.");
          this.rolService.setUserType("medico");
          this.rolService.setHashPassword(newMedico.contrasena);
          this.mostrarGenericPopup("Se ha registrado correctamente. Le avisaremos a su correo electrónico cuando el administrador compruebe la información introducida y su cuenta sea activada.")
          this.router.navigate(['/main']);
        },
        (error) => {
          if(error.status == 409) {
            this.mostrarGenericPopup("Este email ya ha sido registrado.");
          } else {
            this.mostrarGenericPopup("Error inesperado.");
            console.error('Error al crear el médico:', error);
          }
        }
      );
    }
  }

  async generarHashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  back() {
    this.router.navigate(['/main']);
  }

  async obtenerCamposComunes(): Promise<{}> {
    const nombre = this.registerForm.get('nombre').value;
    const apellidos = this.registerForm.get('apellidos').value;
    const dni = this.registerForm.get('dni').value;
    const fechaNacimiento = this.registerForm.get('fechaNacimiento').value;
    let sexo;
    if (this.registerForm.get('sexo-hombre') == null) {
      sexo = 'MUJER';
    } else {
      sexo = 'HOMBRE';
    }
    const telefono = this.registerForm.get('telefono').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;

    const date = new Date(fechaNacimiento);
    const ano = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dia = date.getDate();

    const fechaFormateada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;


    const hashPassword = await this.generarHashPassword(password);
    return {
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      fechaNacimiento: fechaFormateada,
      telefono: parseInt(telefono),
      password: hashPassword,
      email: email,
      sexo: sexo
    };
  }

  obtenerCamposPaciente() {
    const numSeguridadSocial = this.registerForm.get('numSeguridadSocial').value;
    const altura = this.registerForm.get('altura').value;
    const peso = this.registerForm.get('peso').value;
    const alergias = this.registerForm.get('alergias').value;
    const enfermedades = this.registerForm.get('enfermedades').value;
    const intervenciones = this.registerForm.get('intervenciones').value;

    return {
      altura: parseInt(altura),
      peso: parseInt(peso),
      numSegSocial: numSeguridadSocial,
      enfermedadesDiagnosticadas: enfermedades !== '' ? enfermedades.split(",") : [],
      alergias: alergias !== '' ? alergias.split(",") : [],
      intervenciones: intervenciones !== '' ? intervenciones.split(",") : []
    };
  }

  mostrarGenericPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: { message: mensaje }
    });
  }

  areAllFieldsFilled(): boolean {
    const visibleFields = ['nombre', 'apellidos', 'dni', 'fechaNacimiento', 'telefono', 'email'];
    const formFields = this.registerForm.controls;

    for (const field of visibleFields) {
      const control = formFields[field];
      if (control && (!control.value || control.value === '')) {
        debugger;
        return false;
      }
    }

    return true;
  }


}
