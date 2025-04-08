import {environment} from "../environment/environment";

export class API_END_POINTS{
    public static signIn={
        postSignIn:`${environment.serverBaseUrl}signIn`
    }
}