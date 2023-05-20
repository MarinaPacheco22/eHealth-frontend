import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private userRol: string;

  setUserType(userRol: string) {
    this.userRol = userRol;
  }

  getUserType() {
    return this.userRol;
  }
}
