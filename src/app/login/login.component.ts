import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [""],
      password: [""],
    });
  }

  onSubmit() {
    this.userService.employeesList().subscribe(
      (res: any) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.form.value.email &&
            a.password === this.form.value.password
          );
        });
        if (user) {
          localStorage.setItem("id", user.id);
          this.form.reset();
          this.router.navigate(["home"]);
        } else {
          alert("User not found");
        }
      },
      (error) => {
        alert("Something went wrong");
      }
    );
  }
}
