import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeleteComponent } from "./employees/delete/delete.component";
import { EditComponent } from "./employees/edit/edit.component";
import { ViewComponent } from "./employees/view/view.component";
import { EmployeesListComponent } from "./employees/employees-list/employees-list.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginGuard } from "./login.guard";
import { UsersGuard } from "./users.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "home", component: HomeComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent, canActivate: [UsersGuard] },
  { path: "signup", component: SignupComponent },
  {
    path: "employees",
    canActivate: [LoginGuard],
    children: [
      { path: "", component: EmployeesListComponent },
      { path: "delete/:id", component: DeleteComponent },
      { path: "edit/:id", component: EditComponent },
      { path: "view/:id", component: ViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
