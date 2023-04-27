import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(contact: string, password: string, remember: boolean): Observable<boolean>{
    const isLoggedIn = (contact== 'pikachu' && password == 'pikachu')

    return of(isLoggedIn)
  }

  logout(){
    
  }

  sendSMS(contact: string){
    
  }
}
