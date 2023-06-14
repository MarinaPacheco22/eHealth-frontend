import {Component, OnInit} from '@angular/core';
import {PacientesService} from "../../services/pacientes.service";
import {Router} from "@angular/router";
import {MedicosService} from "../../services/medicos.service";
import {catchError, of, throwError} from "rxjs";
import {RolService} from "../../services/rol.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private pacientesService: PacientesService,
              private medicosService: MedicosService,
              private router: Router,
              private rolService: RolService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.mostrarGenericPopup("Campos incompletos.")
      return of(null);
    } else {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      let isAdmin = await this.generarHashPassword(password) == '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' && username == "admin";
      if (isAdmin) {
        this.rolService.setUserType("admin");
        this.dialogRef.close();
        return await this.router.navigate(["/admin"]);
      } else {
        let userFound = false;
        const inputPasswordEncoded = await this.generarHashPassword(password);
        this.pacientesService.getPacienteByEmail(username).pipe(
          catchError((pacienteError) => {
            console.log("Error al buscar paciente:", pacienteError);
            this.medicosService.getMedicosByEmail(username).pipe(
              catchError((medicoError) => {
                if (!userFound) {
                  console.error("Email no encontrado.", medicoError);
                  this.mostrarGenericPopup("Email no encontrado");
                  return throwError('Email no encontrado');
                }
                return of(null);
              })
            )
              .subscribe((response) => {
                userFound = true;
                if (inputPasswordEncoded == response.body.password) {
                  this.rolService.setUserType("medico");
                  this.rolService.setUserId(response.body.id);
                  this.rolService.setHashPassword(response.body.password);
                  this.dialogRef.close();
                  return this.router.navigate(['/base']);
                } else {
                  console.log("Contraseña incorrecta.");
                  this.mostrarGenericPopup("Contraseña incorrecta.");
                  return throwError('Contraseña incorrecta.');
                }
              });
            return of(null);
          })
        )
          .subscribe((response) => {
            userFound = true;
            if (inputPasswordEncoded == response.body.password) {
              this.rolService.setUserType("paciente");
              this.rolService.setUserId(response.body.id);
              this.rolService.setMedicoAsignadoId(response.body.medicoAsignado);
              this.rolService.setHashPassword(response.body.password);
              this.dialogRef.close();
              return this.router.navigate(['/base']);
            } else {
              console.log("Contraseña incorrecta.");
              this.mostrarGenericPopup("Contraseña incorrecta.");
              return throwError('Contraseña incorrecta.');
            }
          });
      }
    }
    return of(null);

  }

  back() {
    this.router.navigate(['/main']);
  }

  async generarHashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  mostrarGenericPopup(mensaje: string): void {
    this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }
}
