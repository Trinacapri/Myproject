import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductsComponent } from "./products/products.component";
import { CategoryComponent } from "./category/category.component";
import { UserloginComponent } from "./userlogin/userlogin.component";
import { HeaderComponent } from "./header/header.component";
import { AuthGuard } from "./auth.guard";
const appRoutes: Routes = [
  { path: " ", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "home", component: HomepageComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent },
  { path: "products", component: ProductsComponent },
  { path: "category", component: CategoryComponent },
  { path: "header", component: HeaderComponent },
  { path: "userlogin", component: UserloginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
