import {Component, OnInit} from '@angular/core';
import {RolService} from "../../services/rol.service";
import {catchError, throwError} from "rxjs";
import {MedicosService} from "../../services/medicos.service";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public medicos: any;
  showNavBar: boolean = true;

  constructor(
    private medicosService: MedicosService,
    private rolService: RolService
  ) {
  }

  getMedicos() {
    this.medicos = [];
    this.medicosService.getAllMedicos()
      .pipe(
        catchError((error) => {
          alert(error.error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log(response.body);
        this.medicos = response.body;
      });
  }

  ngOnInit(): void {
    this.getMedicos();
  }

}
