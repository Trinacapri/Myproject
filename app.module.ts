import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CategoryComponent } from "./category/category.component";
import { ProductsComponent } from "./products/products.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { AuthService } from "./auth.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./auth.guard";
import { UserloginComponent } from "./userlogin/userlogin.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    DashboardComponent,
    CategoryComponent,
    ProductsComponent,
    HeaderComponent,
    DropdownDirective,
    UserloginComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}