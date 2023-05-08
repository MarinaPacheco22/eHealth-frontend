import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private location: Location,
              private router: Router) { }

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

  fieldsCompleted() {
    const camposRequeridos = document.querySelectorAll<HTMLInputElement>('input[required]');
    let completos = true;
    camposRequeridos.forEach(campo => {
      if (!campo.value) {
        completos = false;
      }
    });
    return completos;
  }

  send() {
    if (this.fieldsCompleted()) {
      alert("REGISTRADO!");
    } else {
      alert("Campos incompletos.");
    }
  }

  back() {
    this.router.navigate(['/main']);
  }

}
