import {Component, OnInit} from '@angular/core';
import {PacientesService} from "../../services/pacientes.service";
import {Router} from "@angular/router";
import {MedicosService} from "../../services/medicos.service";
import {catchError, switchMap, throwError} from "rxjs";
import {RolService} from "../../services/rol.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showNavBar: boolean = false;
  username: string;

  constructor(private pacientesService: PacientesService,
              private medicosService: MedicosService,
              private router: Router,
              private rolService: RolService) {
  }

  ngOnInit(): void {
  }

  async login() {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (!username.value || !password.value) {
      alert("Campos incompletos.");
      return;
    } else {
      let isAdmin = await this.generarHashPassword(password.value) == '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' && username.value == "admin";
      if (isAdmin) {
        this.rolService.setUserType("admin");
        await this.router.navigate(["/admin"]);
      } else {
        let userFound = false;
        const inputPasswordEncoded = await this.generarHashPassword(password.value);
        this.pacientesService.getPacientesByEmail(username.value).pipe(
          switchMap((response) => {
            userFound = true;
            if (inputPasswordEncoded == response.body.password) {
              this.rolService.setUserType("paciente");
              return this.router.navigate(['/base']);
            } else {
              console.log("Contraseña incorrecta.");
              alert("Contraseña incorrecta.");
              return throwError('Contraseña incorrecta.');
            }
          }),
          catchError((pacienteError) => {
            console.log("Error al buscar paciente:", pacienteError);
            return this.medicosService.getMedicosByEmail(username.value).pipe(
              switchMap((response) => {
                userFound = true;
                if (inputPasswordEncoded == response.body.password) {
                  this.rolService.setUserType("medico");
                  return this.router.navigate(['/base']);
                } else {
                  console.log("Contraseña incorrecta.");
                  alert("Contraseña incorrecta.");
                  return throwError('Contraseña incorrecta.');
                }
              }),
              catchError((medicoError) => {
                if (!userFound) {
                  console.error("Email no encontrado.", medicoError);
                  alert("Email no encontrado");
                  return throwError('Email no encontrado');
                } else {
                  return '';
                }
              })
            );
          })
        ).subscribe();
      }
    }

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
}
