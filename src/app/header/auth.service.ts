import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _http: HttpClient){}

    signUpUser(firstName: string, lastName: string, email: string, password: string) {
        this._http.post("http://127.0.0.1:8000/api/v1/rest-auth/registration",
        {
            "email":  email,
            "first_name": firstName,
            "last_name": lastName,
            "password1": password,
            "password2": password
        })
        .subscribe(
            data  => {
            console.log("POST Request is successful ", data);
            },
            error  => {
                console.log("Error", error);
        });
    }

}
