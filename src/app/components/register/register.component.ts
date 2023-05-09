import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { }

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

  send() {
    const password = document.getElementById("password") as HTMLInputElement;
    if (password.value && password.value.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const tipo_usuario = document.getElementById("tipo-usuario") as HTMLInputElement;
    const nombre = document.getElementById("nombre") as HTMLInputElement;
    const apellidos = document.getElementById("apellidos") as HTMLInputElement;
    const dni = document.getElementById("dni") as HTMLInputElement;
    const fecha_nacimiento = document.getElementById("password") as HTMLInputElement;
    const genero_hombre = document.getElementById("genero-hombre") as HTMLInputElement;
    const genero_mujer = document.getElementById("genero-mujer") as HTMLInputElement;
    const telefono = document.getElementById("telefono") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const num_ss = document.getElementById("num-seguridad-social") as HTMLInputElement;
    const num_colegiado = document.getElementById("num-colegiado") as HTMLInputElement;
    const especialidad = document.getElementById("especialidad") as HTMLInputElement;

    if ((tipo_usuario.value != 'paciente' && tipo_usuario.value != 'medico') || !nombre.value || !apellidos.value || !dni.value || !fecha_nacimiento.value || !(genero_hombre.value || genero_mujer.value) || !telefono.value || !email.value) {
      alert("Campos incompletos.");
      return;
    } else if (tipo_usuario.value == 'medico' && (!num_colegiado.value || !especialidad.value)) {
      alert("Campos incompletos.");
      return;
    } else if (tipo_usuario.value == 'paciente' && !num_ss.value) {
      alert("Campos incompletos.");
      return;
    }

    this.router.navigate(['/base'])
  }

  back() {
    this.router.navigate(['/main']);
  }

}
