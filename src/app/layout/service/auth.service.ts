import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { AuthModel } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterDto } from '../models/register-dto.model';
import { TokenDto } from '../models/token-dto.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

export type UserType = User | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private apiUrl = environment.apiUrl;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `authToken`;
  private authLocalStorageUser = `user`;
  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject =  new BehaviorSubject<UserType>(undefined);

    this.initUser();
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable(); 
  }

  // public methods
  login(username: string, password: string): Observable<TokenDto> {
    this.isLoadingSubject.next(true);
    return this.http.post<TokenDto>(this.apiUrl + "auth/login", { username, password });
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + "user/getUserByUsername/" + username);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + "user/getUserById/" + id);
  }

  setUserFromLocalStorage(user: User) {
    if (user)
      localStorage.setItem(this.authLocalStorageUser, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  initUser() {
    try {
      const user = localStorage.getItem(this.authLocalStorageUser);
      if (user){
        this.currentUserSubject.next(JSON.parse(user) as User);
      } else this.currentUserSubject.next(undefined);
    } catch {
      this.currentUserSubject.next(undefined);
    }
  }

  getToken(): string {
    try {
      const token = localStorage.getItem(this.authLocalStorageToken);
      if (token)
        return (JSON.parse(token) as AuthModel).authToken;
      return ''
    } catch {
      return '';
    }

  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    localStorage.removeItem(this.authLocalStorageUser);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }


  register(registerRequest: RegisterRequest): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(`${this.apiUrl}auth/register`, registerRequest);
  }

  public setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  // private methods
  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  getCurrentUserId(): string | null {
    return this.currentUserValue ? this.currentUserValue.id : null; // Assurez-vous que 'id' est une propriété de l'utilisateur
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}