import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  setUserType(userRol: string) {
    localStorage.setItem('userRol', userRol);
  }

  getUserType() {
    return localStorage.getItem('userRol')
  }

  setUserId(userId: number) {
    localStorage.setItem('userId', userId.toString());
  }

  getUserId() {
    return localStorage.getItem('userId')
  }

  setMedicoAsignadoId(medicoAsignadoId: number) {
    localStorage.setItem('medicoAsignadoId', medicoAsignadoId.toString());
  }

  getMedicoAsignadoId() {
    return localStorage.getItem('medicoAsignadoId')
  }

  setHashPassword(hashPassword: string) {
    localStorage.setItem('hashPassword', hashPassword);
  }

  getHashPassword() {
    return localStorage.getItem('hashPassword');
  }
}
