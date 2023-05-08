import Keycloak from "keycloak-js";
import {Token} from "./repositories/Token";
import {RefreshToken} from "./repositories/RefreshToken";


let initOptionsObj = null;
let keycloak=null;

// @ts-ignore
const getKeycloakObjectInitialized=({ urlStr, realmStr, clientIdStr})=>{
    const initOptionsObj = {
        url: urlStr,
        realm: realmStr,
        clientId: clientIdStr,
        onLoad: 'login-required'
    }
    keycloak = Keycloak(initOptionsObj);
    return keycloak;
}

export class KeycloakService {

    // @ts-ignore
  static async login({ urlStr, realmStr, clientIdStr}) {

        let keycloak= getKeycloakObjectInitialized({ urlStr, realmStr, clientIdStr});

    return keycloak.init({
            flow: 'standard', // default
            checkLoginIframe: false, // default
            onLoad: 'login-required', // default
      // @ts-ignore
        }).then((auth) => {
            if (!auth) {
                keycloak.login();
            } else {
                Token.set({newTokenStr:keycloak.token});
                RefreshToken.set({newTokenStr:keycloak.refreshToken});
                console.log("User Authenticated");
                return {token:Token.get()}
            }
        }).catch(() => {
            console.error("Login Failed");
            return {token:false}
        });
    }

    // @ts-ignore
  static async logout({ urlStr, realmStr, clientIdStr}){

        let keycloak= getKeycloakObjectInitialized({ urlStr, realmStr, clientIdStr});


    return keycloak.init({

                onLoad: 'login-required',
      // @ts-ignore
                token: Token.get(),
      // @ts-ignore
                refreshToken: RefreshToken.get() }).then((auth) => {
                keycloak.logout();
                Token.delete();
                RefreshToken.delete();
                initOptionsObj=null;
                return true;
            }).catch(() => {
                console.error("Logout Failed");
                return false;
            });
    }

    static getToken(){
        return Token;
    }

    static getRefreshToken(){
        return RefreshToken;
    }

    static sayHi(){
        return "sayHi";
    }
}
