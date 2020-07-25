//sending the token from the browser to the server
import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(req, next) {
    let authservice = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      //making a clone of a request
      setHeaders: {
        Authorization: `${authservice.getToken()}`,//getting the token from gettoken function
      },
    });
    return next.handle(tokenizedReq);
  }
}
