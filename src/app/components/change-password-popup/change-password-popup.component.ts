import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GenericPopupComponent} from "../generic-popup/generic-popup.component";
import {ConfirmationPopupComponent} from "../confirmation-popup/confirmation-popup.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RolService} from "../../services/rol.service";
import {PacientesService} from "../../services/pacientes.service";
import {MedicosService} from "../../services/medicos.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.css']
})
export class ChangePasswordPopupComponent implements OnInit {
  changePasswordForm: any;
  userRol: string;

  constructor(public dialogRef: MatDialogRef<ChangePasswordPopupComponent>,
              private dialog: MatDialog,
              private rolService: RolService,
              private pacientesService: PacientesService,
              private medicosService: MedicosService) {
  }

  ngOnInit(): void {
    this.userRol = this.rolService.getUserType();
    this.changePasswordForm = new FormGroup({
      actual: new FormControl('', [
        Validators.required
      ]),
      nueva: new FormControl('', [
        Validators.required
      ]),
      repetida: new FormControl('', [
        Validators.required
      ])
    });
  }

  async changePassword() {
    if (!this.areAllFieldsFilled()) {
      this.mostrarGenericPopup("Campos incompletos");
      return;
    }

    const actual = this.changePasswordForm.value.actual;
    let userFound = false;
    const actualHashed = await this.generarHashPassword(actual);

    if (actualHashed != this.rolService.getHashPassword()) {
      this.mostrarGenericPopup("Contraseña actual incorrecta.")
      return;
    }

    userFound = true;

    if (this.changePasswordForm.get('nueva').getError('minlength') && this.areAllFieldsFilled()) {
      this.mostrarGenericPopup("La contraseña nueva debe tener al menos 8 caracteres.");
      return;
    }

    if (this.changePasswordForm.value.nueva != this.changePasswordForm.value.repetida) {
      this.mostrarGenericPopup("Las contraseñas no coinciden.");
      return;
    }
    const nueva = await this.generarHashPassword(this.changePasswordForm.value.nueva);

    if (this.userRol == 'paciente') {
      this.pacientesService.changePassword(Number(this.rolService.getUserId()), nueva)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.rolService.setHashPassword(nueva);
          this.dialogRef.close();
          this.mostrarGenericPopup("Contraseña actualizada con éxito.")

        });
    }
    else {
      this.medicosService.changePassword(Number(this.rolService.getUserId()), nueva)
        .pipe(
          catchError((error) => {
            alert(error.error);
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.rolService.setHashPassword(nueva);
          this.dialogRef.close();
          this.mostrarGenericPopup("Contraseña actualizada con éxito.")
        });
    }


  }

  mostrarGenericPopup(mensaje: string): void {
    const dialogRef = this.dialog.open(GenericPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

  mostrarConfirmationPopup(mensaje: string) {
    return this.dialog.open(ConfirmationPopupComponent, {
      width: '300px',
      data: {message: mensaje}
    });
  }

  async generarHashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  areAllFieldsFilled(): boolean {
    const visibleFields = ['actual', 'nueva', 'repetida'];
    const formFields = this.changePasswordForm.controls;

    for (const field of visibleFields) {
      const control = formFields[field];
      if (control && (!control.value || control.value === '')) {
        return false;
      }
    }

    return true;
  }
}
