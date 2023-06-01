import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.css']
})
export class UserMainPageComponent implements AfterViewInit{

  @ViewChild('audioElement', {static: false}) audioElement!: ElementRef;
  @ViewChild('rain', {static: false}) rain!: ElementRef;
  chatHovered: boolean = false;
  newsHovered: boolean = false;
  weatherHovered: boolean = false;
  cardsHovered: boolean = false;

   user :any;

  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {

    let currentUser: string | null = localStorage.getItem('currentUser');
     this.user = JSON.parse(currentUser as string);
    this.cdr.detectChanges();
    console.log(this.user);

    const audio = this.audioElement.nativeElement;
    const rain = this.rain.nativeElement;

    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play();
    });

    rain.addEventListener('ended', () => {
      rain.currentTime = 0;
      rain.play();
    });

    audio.play();

    rain.volume = 0.1;
    rain.play();


  }


  chatMouseEnter(){
    this.chatHovered = true
  }

  newsMouseEnter(){
    this.newsHovered = true
  }

  weatherMouseEnter(){
    this.weatherHovered = true
  }

  cardsMouseEnter(){
    this.cardsHovered = true
  }

  chatMouseLeave(){
    this.chatHovered = false
  }

  newsMouseLeave(){
    this.newsHovered = false
  }

  weatherMouseLeave(){
    this.weatherHovered = false
  }

  cardsMouseLeave(){
    this.cardsHovered = false
  }


}
