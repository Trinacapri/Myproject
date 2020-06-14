import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email: String,

    password: String,
  };
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {}
  loginUser() {
    this._auth
      .loginUser(this.loginUserData) //calling registeruser service passing registeruser data
      .subscribe(
        (res) => {
          console.log(res); //getting the response that is the registered user data
          localStorage.setItem("token", res.token);
          this._router.navigate(["/home"]);
        },
        (err) => console.log(err)
      );
  }
}
