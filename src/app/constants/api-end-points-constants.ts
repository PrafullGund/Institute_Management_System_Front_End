import {environment} from "../environment/environment";

export class API_END_POINTS{
    public static signIn={
        postSignIn:`${environment.serverBaseUrl}signIn`
    }

    public static user={
        postUserRegistration:`${environment.serverBaseUrl}registration`,
        getAllUserRegistration:`${environment.serverBaseUrl}register`,
        getByIdUserRegistration:`${environment.serverBaseUrl}register`,
        updateUserRegistration:`${environment.serverBaseUrl}register`,
        deleteUserRegistration:`${environment.serverBaseUrl}register`
    }
}