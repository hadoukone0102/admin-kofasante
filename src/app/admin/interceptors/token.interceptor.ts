import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private coreService: CoreService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authService.getToken();

    if(token !== null){
      //Clone the request to modify by insert token
      let clone =request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      //return the request modified 
      return next.handle(clone).pipe(
        catchError((error) => { 
          if(error.status === 401){
            this.authService.logout();//redirect to login if session expired
            return throwError('Session expirée: '+ error);
          }
          this.coreService.goToPageError();//else redirect to page error
          return throwError('Une erreur est survenue lors de l\'interception de la requête: '+ error.status);
        }),
      );
    }
    
    return next.handle(request);
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
}