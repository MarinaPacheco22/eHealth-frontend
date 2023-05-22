import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {Paciente} from "../../model/paciente.model";
import {Medico} from "../../model/medico.model";
import {PacientesService} from "../../services/pacientes.service";
import {MedicosService} from 'src/app/services/medicos.service';
import {RolService} from "../../services/rol.service";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {MatDialog} from "@angular/material/dialog";

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
  }

  mostrarFormulario() {
    const select = document.getElementById("tipo-usuario") as HTMLSelectElement;
    const defaultOption = select.querySelector("option[value='default']");
    if (defaultOption) {
      defaultOption.remove();
    }
    const valorSeleccionado = select.value;

    const datosPersonalesPaciente = document.getElementById("datos-personales-paciente");
    const datosPersonalesMedico = document.getElementById("datos-personales-medico");
    const buttons = document.getElementById("send-button");

    if (valorSeleccionado === "medico") {
      datosPersonalesPaciente.style.display = "none";
      datosPersonalesMedico.style.display = "block";
      buttons.style.display = "block";
    } else {
      datosPersonalesPaciente.style.display = "block";
      datosPersonalesMedico.style.display = "none";
      buttons.style.display = "block";
    }
  }

  async send() {
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (passwordInput.value && passwordInput.value.length < 8) {
      this.mostrarPopup("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const tipoUsuarioInput = document.getElementById("tipo-usuario") as HTMLInputElement;
    const nombreInput = document.getElementById("nombre") as HTMLInputElement;
    const apellidosInput = document.getElementById("apellidos") as HTMLInputElement;
    const dniInput = document.getElementById("dni") as HTMLInputElement;
    const fechaNacimientoInput = document.getElementById("fecha-nacimiento") as HTMLInputElement;
    const generoHombreInput = document.getElementById("genero-hombre") as HTMLInputElement;
    const generoMujerInput = document.getElementById("genero-mujer") as HTMLInputElement;
    const telefonoInput = document.getElementById("telefono") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const numSSInput = document.getElementById("num-seguridad-social") as HTMLInputElement;
    const numColegiadoInput = document.getElementById("num-colegiado") as HTMLInputElement;
    const especialidadSelect = document.getElementById("especialidad") as HTMLSelectElement;
    const especialidadDefaultOption = especialidadSelect.querySelector("option[value='default-especialidad']");
    if (especialidadDefaultOption) {
      especialidadDefaultOption.remove();
    }

    if (
      (tipoUsuarioInput.value !== 'paciente' && tipoUsuarioInput.value !== 'medico') ||
      !nombreInput.value ||
      !apellidosInput.value ||
      !dniInput.value ||
      !fechaNacimientoInput.value ||
      !(generoHombreInput.checked || generoMujerInput.checked) ||
      !telefonoInput.value ||
      !emailInput.value
    ) {
      this.mostrarPopup("Campos incompletos.");
      return;
    } else if (tipoUsuarioInput.value === 'medico' && (!numColegiadoInput.value || !especialidadSelect.value)) {
      this.mostrarPopup("Campos incompletos.");
      return;
    } else if (tipoUsuarioInput.value === 'paciente' && !numSSInput.value) {
      this.mostrarPopup("Campos incompletos.");
      return;
    }

    const camposComunes = await this.obtenerCamposComunes();

    if (tipoUsuarioInput.value === 'paciente') {
      const camposPaciente = this.obtenerCamposPaciente();

      const newPaciente: Paciente = {
        id: null,
        ...camposComunes,
        ...camposPaciente
      };

      this.pacientesService.createPaciente(newPaciente).subscribe(
        () => {
          console.log("Paciente creado con éxito.");
          this.rolService.setUserType("paciente");
          this.router.navigate(['/base']);
        },
        (error) => {
          if(error.status == 409) {
            this.mostrarPopup("Este email ya ha sido registrado.");
          } else {
            this.mostrarPopup("Error inesperado.");
            console.error('Error al crear el paciente:', error);
          }
        }
      );

    } else {
      const numColegiado = numColegiadoInput.value;
      const especialidad = especialidadSelect.value;

      const newMedico: Medico = {
        ...camposComunes,
        especialidad: especialidad,
        numeroDeColegiado: numColegiado,
      };

      this.medicosService.createMedico(newMedico).subscribe(
        () => {
          console.log("Medico creado con éxito.");
          this.rolService.setUserType("medico");
          this.mostrarPopup("Se ha registrado correctamente. Le avisaremos a su correo electrónico cuando el administrador compruebe la información introducida y su cuenta sea activada.")
          this.router.navigate(['/main']);
        },
        (error) => {
          if(error.status == 409) {
            this.mostrarPopup("Este email ya ha sido registrado.");
          } else {
            this.mostrarPopup("Error inesperado.");
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
    const nombreInput = document.getElementById("nombre") as HTMLInputElement;
    const apellidosInput = document.getElementById("apellidos") as HTMLInputElement;
    const dniInput = document.getElementById("dni") as HTMLInputElement;
    const fechaNacimientoInput = document.getElementById("fecha-nacimiento") as HTMLInputElement;
    const telefonoInput = document.getElementById("telefono") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;

    const fechaNacimiento = new Date(fechaNacimientoInput.value);
    const ano = fechaNacimiento.getFullYear();
    const mes = fechaNacimiento.getMonth() + 1;
    const dia = fechaNacimiento.getDate();

    const fechaFormateada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;


    const password = await this.generarHashPassword(passwordInput.value);
    return {
      nombre: nombreInput.value,
      apellidos: apellidosInput.value,
      dni: dniInput.value,
      fechaNacimiento: fechaFormateada,
      telefono: parseInt(telefonoInput.value),
      password: password,
      email: emailInput.value
    };
  }

  obtenerCamposPaciente() {
    const alturaInput = document.getElementById("altura") as HTMLInputElement;
    const pesoInput = document.getElementById("peso") as HTMLInputElement;
    const numSegSocialInput = document.getElementById("num-seguridad-social") as HTMLInputElement;
    const enfermedadesInput = document.getElementById("enfermedades") as HTMLInputElement;
    const alergiasInput = document.getElementById("alergias") as HTMLInputElement;
    const intervencionesInput = document.getElementById("intervenciones") as HTMLInputElement;

    return {
      altura: parseInt(alturaInput.value),
      peso: parseInt(pesoInput.value),
      numSegSocial: numSegSocialInput.value,
      enfermedadesDiagnosticadas: enfermedadesInput.value !== '' ? enfermedadesInput.value.split(",") : [],
      alergias: alergiasInput.value !== '' ? alergiasInput.value.split(",") : [],
      intervenciones: intervencionesInput.value !== '' ? intervencionesInput.value.split(",") : []
    };
  }

  mostrarPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: { message: mensaje }
    });
  }

}
