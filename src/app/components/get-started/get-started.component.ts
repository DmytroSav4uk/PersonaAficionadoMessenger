import {AfterViewInit, Component, ElementRef,  ViewChild} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css'],

})
export class GetStartedComponent implements AfterViewInit {

  @ViewChild('audioElement', { static: false }) audioElement!: ElementRef;
  @ViewChild('ClickSound', { static: false }) clickSound!: ElementRef;
  isPlaying: boolean = false;

  playClick: boolean = false;

  ngAfterViewInit() {
    if (this.audioElement && this.audioElement.nativeElement) {
      this.audioElement.nativeElement.addEventListener('ended', () => {
        this.isPlaying = false;
      });
    }

    if (this.clickSound && this.clickSound.nativeElement) {
      this.clickSound.nativeElement.addEventListener('ended', () => {
        this.playClick = false;
      });
    }
  }
  isStartHovered = false;


  constructor(private router: Router) { }

  onStartMouseEnter() {
    this.isStartHovered = true;

    if (this.audioElement && this.audioElement.nativeElement) {
      this.audioElement.nativeElement.play();
      this.isPlaying = true;
    }
  }

  onStartMouseLeave() {
    this.isStartHovered = false;

    if (this.audioElement && this.audioElement.nativeElement) {
      this.audioElement.nativeElement.pause();
      this.isPlaying = false;
    }
  }


  PlayClickSound(){
    if (this.clickSound && this.clickSound.nativeElement) {
      this.clickSound.nativeElement.play();
      this.playClick = true;

    }

    setTimeout(()=>{
      this.router.navigateByUrl('/auth');
    },500)


  }
}

