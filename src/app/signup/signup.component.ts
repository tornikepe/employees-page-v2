import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../services/users.service";
import { Router } from "@angular/router";
import { Validators } from "@angular/forms";
import { RegistrationValidators } from "./validators/registration.validators";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      passGroup: new FormGroup(
        {
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^[A-Za-z0-9]*$/),
          ]),
          confirmPassword: new FormControl(null, Validators.required),
        },
        { validators: RegistrationValidators.confirmPass }
      ),
      number: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const obj = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.passGroup.password,
      number: this.form.value.number,
    };
    this.userService.addUser(obj).subscribe(
      (res) => {
        this.form.reset();
        this.router.navigate(["login"]);
      },
      (err) => {
        alert("Something went wrong");
      }
    );
  }
}
