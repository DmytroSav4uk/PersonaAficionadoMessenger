import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthRegService} from "../../services/auth/auth-reg.service";
import {User} from "../../interfaces/user";
import {catchError, Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements AfterViewInit, OnInit {
  @ViewChild('audioElement', {static: false}) audioElement!: ElementRef;


  @ViewChild('hoverSound', {static: false}) hoverSound!: ElementRef;
  @ViewChild('clickSound', {static: false}) clickSound!: ElementRef;

  isAuthHovered = false;
  isRegisterHovered = false;

  playHover: boolean = false;

  playClick: boolean = false;

  slideLeft = false;

  fadeIn = false;


  showRegisterForm = false;
  showLoginForm = false;

  loginForm: FormGroup = new FormGroup({});
  registerForm: FormGroup = new FormGroup({});


  email: string = '';
  password: string = '';


  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private authRegService: AuthRegService,
    private router: Router
  ) {
    this
      .loginForm = new FormGroup({});
    this
      .registerForm = new FormGroup({});
  }


  onAuthMouseEnter() {
    this.isAuthHovered = true;

    if (this.hoverSound && this.hoverSound.nativeElement) {
      this.hoverSound.nativeElement.play();
      this.playHover = true;
    }
  }


  LoginClick() {
    if (this.clickSound && this.clickSound.nativeElement) {
      this.clickSound.nativeElement.play();
      this.playClick = true;
    }

    this.showLoginForm = true
    this.showRegisterForm = false

    const jokerElement = this.elRef.nativeElement.querySelector('.joker');
    const pantherElement = this.elRef.nativeElement.querySelector('.panther');
    const chooser = this.elRef.nativeElement.querySelector('.chooser');

    this.renderer.setStyle(jokerElement, 'opacity', '0');
    this.renderer.setStyle(jokerElement, 'transition', 'opacity 0.5s');
    this.renderer.setStyle(pantherElement, 'display', 'block');
    this.renderer.setStyle(chooser, 'flex-direction', 'row');
    this.renderer.setStyle(chooser, 'top', '32px');
    this.renderer.setStyle(chooser, 'right', '190px');
    this.renderer.setStyle(chooser, 'gap', '90px');

    this.cdr.detectChanges();
  }

  RegisterClick() {
    if (this.clickSound && this.clickSound.nativeElement) {
      this.clickSound.nativeElement.play();
      this.playClick = true;
    }

    this.showRegisterForm = true
    this.showLoginForm = false

    const jokerElement = this.elRef.nativeElement.querySelector('.joker');
    const pantherElement = this.elRef.nativeElement.querySelector('.panther');
    const chooser = this.elRef.nativeElement.querySelector('.chooser');

    this.renderer.setStyle(jokerElement, 'opacity', '0');
    this.renderer.setStyle(jokerElement, 'transition', 'opacity 0.5s');
    this.renderer.setStyle(pantherElement, 'display', 'block');
    this.renderer.setStyle(chooser, 'flex-direction', 'row');
    this.renderer.setStyle(chooser, 'top', '32px');
    this.renderer.setStyle(chooser, 'right', '190px');
    this.renderer.setStyle(chooser, 'gap', '90px');


    this.cdr.detectChanges();
  }


  onAuthMouseLeave() {
    this.isAuthHovered = false;

    if (this.hoverSound && this.hoverSound.nativeElement) {
      this.hoverSound.nativeElement.play();
      this.playHover = false;
    }
  }


  onRegisterMouseEnter() {
    this.isRegisterHovered = true;

    if (this.hoverSound && this.hoverSound.nativeElement) {
      this.hoverSound.nativeElement.play();
      this.playHover = true;
    }
  }

  onRegisterMouseLeave() {
    this.isRegisterHovered = false;

    if (this.hoverSound && this.hoverSound.nativeElement) {
      this.hoverSound.nativeElement.play();
      this.playHover = false;
    }
  }


  ngAfterViewInit() {

    this.slideLeft = true;
    this.fadeIn = true;

    const audio = this.audioElement.nativeElement;

    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play();
    });

    audio.play();


    if (this.clickSound && this.clickSound.nativeElement) {
      this.audioElement.nativeElement.addEventListener('ended', () => {
        this.playClick = false;
      });
    }

    if (this.hoverSound && this.hoverSound.nativeElement) {
      this.hoverSound.nativeElement.addEventListener('ended', () => {
        this.playHover = false;
      });
      this.cdr.detectChanges();
    }
  }


  ngOnInit()
    :
    void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitRegisterForm() {
    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.registerForm.reset();

    this.authRegService.register(user)
      .pipe(
        tap((response: any) => {
          console.log('Login successful', response);
          // Handle successful login, such as storing tokens or redirecting to a new page
        }),
        catchError((error: any): Observable<any> => {
          console.error('Login failed', error);
          // Handle login failure, such as displaying an error message
          throw error;
        })
      )
      .subscribe();
  }

  submitLoginForm() {

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loginForm.reset();

    this.authRegService.auth(user)
      .pipe(
        tap((response: any) => {
          console.log('Login successful', response);
          localStorage.setItem("currentUser", JSON.stringify(response))
          this.router.navigateByUrl('/main');
        }),
        catchError((error: any): Observable<any> => {
          console.error('Login failed', error);
          // Handle login failure, such as displaying an error message
          throw error;
        })
      )
      .subscribe();
  }
}
