import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RolService} from "../../services/rol.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private rolService: RolService) { }

  ngOnInit(): void {
  }

  isActive(route: string): boolean {
    if(this.router.url == '/solicitudes') {
      return true;
    }
    return this.router.url === route;
  }

  getUserType() {
    return this.rolService.getUserType();
  }

}
