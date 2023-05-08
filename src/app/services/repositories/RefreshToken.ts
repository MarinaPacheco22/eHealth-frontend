export class RefreshToken {
  static get(){
    return localStorage.getItem('refreshToken');
  }

  // @ts-ignore
  static set({newTokenStr}){
    localStorage.setItem('refreshToken', newTokenStr);
  }

  static delete(){
    localStorage.removeItem('refreshToken');
  }
}
