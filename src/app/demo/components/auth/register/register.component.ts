import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/layout/service/auth.service';
import { RegisterRequest } from 'src/app/layout/models/register-request.model';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  username: string = "";
  password: string = "";
  cPassword: string = "";
  registrationForm: FormGroup;
  hasError: boolean = false;
  isLoading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize form fields with validation
  initForm() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      cPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  // Method to handle form submission
  register(): void {
    if (this.registrationForm.invalid) {
      this.hasError = true;
      return;
    }

    const registerRequest: RegisterRequest = {
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      email: this.registrationForm.value.email
    };

    this.isLoading = true;
    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.isLoading = false;
        this.router.navigate(['Auth/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }
}

