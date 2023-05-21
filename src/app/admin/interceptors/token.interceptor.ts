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
      let clone =request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(clone).pipe(
        catchError((error) => { 
          if(error.status === 401){
            this.coreService.goToLogin();
          }
          return throwError('Une erreur est survenue lors de l\'authentification: '+ error);
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