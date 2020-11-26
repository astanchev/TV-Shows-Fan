import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUpdateUser } from 'src/app/core/interfaces/update-user';
import { IUserLogin } from 'src/app/core/interfaces/user-login';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  user: IUserLogin;
  userSub: Subscription;
  updateSub: Subscription;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserByID().subscribe((data) => {
      this.user = data;

      this.form = this.fb.group({
        email: [this.user.email, [Validators.required, Validators.email]],
        country: [this.user.country],
        city: [this.user.city],
        about: [this.user.about],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

      this.loading = false;
    });
  }

  update() {
    const user: IUpdateUser = this.form.value;

    this.userService.updateUserData(user)
                          .subscribe(_ => this.router.navigate(['/']));
  }

}
