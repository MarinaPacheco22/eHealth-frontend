import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrarFormulario() {
    const select = document.getElementById("tipo-usuario") as HTMLSelectElement;
    const valorSeleccionado = select.value;

    const datosPersonales = document.getElementById("datos-personales");

    if (valorSeleccionado === "medico") {
      // divMedico.style.display = "block";
      // divPaciente.style.display = "none";
    } else {
      // divPaciente.style.display = "block";
      // divMedico.style.display = "none";
      datosPersonales.style.display = "block";
    }
  }

}
