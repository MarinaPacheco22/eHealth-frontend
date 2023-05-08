import rs from 'jsrsasign';

export class Token {

  static get(){
    return localStorage.getItem('token');
  }

  // @ts-ignore
  static set({newTokenStr}){
    localStorage.setItem('token',newTokenStr);
  }

  static delete(){
    localStorage.removeItem('token');
  }
  static isExpired(){
    if(Token.get() !== null) {
      if(Token.get()!== "undefined"){
        // @ts-ignore
        let tokenData = rs.b64utos(Token.get().split('.')[1]);
        tokenData = JSON.parse(tokenData);
        // @ts-ignore
        return new Date(tokenData.exp * 1000) < new Date();

      }
      return true;
    }
    return true;
  }
}
