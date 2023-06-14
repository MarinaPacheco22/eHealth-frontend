import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'dialog-center'
    });
  }
}
