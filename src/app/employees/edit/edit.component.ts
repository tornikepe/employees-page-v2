import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/users.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { switchMap } from "rxjs";
import { RegistrationValidators } from "../../signup/validators/registration.validators";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  userId: string = "";
  editForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9-]+$/),
      ]),
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
      number: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(\([0-9]{3}\) |[0-9]{3}\s|(?:-))[0-9]{2}\s|(?:-)[0-9]{2}\s|(?:-)[0-9]{2}/
        ),
      ]),
    });

    this.route.params
      .pipe(
        switchMap((route: any) => {
          this.userId = route.id;
          console.log(route.id);
          return this.userService.getUser(route.id);
        })
      )
      .subscribe(
        (data: any) => {
          this.editForm.patchValue(data);
        },
        (err) => console.log("error")
      );
  }
  updateUser() {
    const obj = {
      name: this.editForm.value.name,
      email: this.editForm.value.email,
      password: this.editForm.value.passGroup.password,
      number: this.editForm.value.number,
    };
    this.userService
      .updateUser(this.userId, obj)
      .subscribe((data) => console.log("user updated"));
    this.router.navigate(["employees"]);
    this.editForm.reset();
  }
}
