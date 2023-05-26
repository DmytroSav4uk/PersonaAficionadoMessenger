import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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


  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = new FormGroup({});
    this.registerForm = new FormGroup({});
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


  ngOnInit(): void {
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
    if (this.registerForm.valid) {
      console.log('Register Form:', this.registerForm.value);
      this.registerForm.reset();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      console.log('Login Form:', this.loginForm.value);
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
