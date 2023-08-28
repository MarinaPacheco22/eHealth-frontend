import { Component } from '@angular/core';
import {ConfigEnvService} from "./config-env.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eHealth-frontend';
  token: any;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  showNavBar: boolean = false;

  constructor(
    protected configService: ConfigEnvService,
    ) {
  }

  ngOnInit(): void {
  }
}
