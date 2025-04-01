import jwt from 'jwt-decode';
import {AccessToken, Credentials, User, UserSessionToken} from './user.resource'

class AuthService {
    baseUrl: string = 'http://localhost:8080/v1/users';
    static AUTH_PATHM: string = "_auth";

    async authenticate(credentials: Credentials) : Promise<AccessToken> {
        const response = await fetch(this.baseUrl+ "/auth", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.status == 401) {
            throw new Error("User or password are incorrect!");
        }

        return await response.json();
    }


    async save(user: User) : Promise<void> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log("Response Auth.save: ", response)

        if(response.status == 409) {
            throw new Error("user already exists!")
        }
    }

    initSession(token: AccessToken){
 
        console.log("funcao init foi chamada")

        if(token.accessToken){
            console.log("Token recebido:", token.accessToken);
            const decodedToken: any = jwt(token.accessToken);

            console.log("DECODED TOKEN:", decodedToken);
          
            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                name: decodedToken.name,
                expiration: decodedToken.exp
            }

            this.setUserSession(userSessionToken);
        }
    }

    setUserSession(userSessionToken: UserSessionToken){
        try{
            localStorage.setItem(AuthService.AUTH_PATHM, JSON.stringify(userSessionToken));
        }catch(error){}
    }


    getUserSession(): UserSessionToken | null {
        const authString = localStorage.getItem(AuthService.AUTH_PATHM);
        if(!authString) {
            return null
        }

        const token: UserSessionToken = JSON.parse(authString);
        return token;
    }

    isSessionValid() : boolean {
        const userSession: UserSessionToken | null = this.getUserSession();
        if(!userSession){
            return false;
        }

        const expiration: number | undefined = userSession.expiration;
        if(expiration){
            const expirationDateInMillis = expiration * 1000;
            return new Date() < new Date(expirationDateInMillis);
        }

        return false;
    }

  
}

export const useAuth = () => new AuthService();

