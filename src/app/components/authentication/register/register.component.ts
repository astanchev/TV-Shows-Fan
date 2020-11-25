import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { passwordMatch } from '../../../core/validators/password-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: [null, [Validators.required, Validators.minLength(6)]],
        rePassword: [null, [Validators.required]]
      }, { validators: [passwordMatch] })
    });
  }

  register() {
    const { username, email, passwords } = this.form.value;
    const { password } = passwords;

    this.userService.register(username, email, password);
  }

}
