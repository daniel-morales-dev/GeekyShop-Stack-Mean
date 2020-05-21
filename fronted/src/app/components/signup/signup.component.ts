import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
  }

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signUp(form: NgForm) {

    this.authService.signUp(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/private-games'])
        },
        err => {
          console.log(err.message);
        }
      );
  }
}

