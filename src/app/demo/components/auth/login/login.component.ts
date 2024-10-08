import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/layout/service/auth.service';
import { TokenDto } from 'src/app/layout/models/token-dto.model';
import { User } from 'src/app/layout/models/user';
import { AuthModel } from 'src/app/layout/models/auth.model';
import { ToastService } from 'src/app/layout/service/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit, OnDestroy {
    valCheck: string[] = ['remember'];
    username: string = "";
    password: string = "";
    hasError!: boolean;
    returnUrl!: string;
    isLoading$: Observable<boolean>;

    private unsubscribe: Subscription[] = [];

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        public layoutService: LayoutService,
        private toastService: ToastService
    ) {
        this.isLoading$ = this.authService.isLoading$;
        if (authService.currentUser$)
            authService.logout();
    }

    ngOnInit(): void {
        this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    submit() {
        this.hasError = false;
        const loginSubscr = this.authService
            .login(this.username, this.password)
            .subscribe({
                next: (token: TokenDto | undefined) => {
                    if (token) {
                        this.authService.setAuthFromLocalStorage(new AuthModel(token.token));
                        this.authService.getUserByUsername(this.username).subscribe(
                            (user: User) => {
                                this.authService.setUserFromLocalStorage(user);
                                this.router.navigateByUrl('');
                            }
                        );
                    } else {
                        this.hasError = true;
                        this.toastService.showError('Invalid credentials. Please try again.');
                    }
                },
                error: (err) => {
                    console.log(err);
                    this.hasError = true;
                    this.toastService.showError('Login failed. Please check your credentials.');
                },
                complete: () => this.authService.isLoadingSubject.next(false)
            });
        this.unsubscribe.push(loginSubscr);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
