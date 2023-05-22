import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-historial-clinico-popup',
  templateUrl: './historial-clinico-popup.component.html',
  styleUrls: ['./historial-clinico-popup.component.css']
})
export class HistorialClinicoPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HistorialClinicoPopupComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
