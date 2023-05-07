import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showInitialButtons: boolean = true;
  showRegisterForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    this.showInitialButtons = false;
    this.showRegisterForm = true;
  }

  login() {

  }
}
