import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css'],

})
export class GetStartedComponent implements OnInit{
  isStartHovered = false;


  constructor() { }

  onStartMouseEnter() {
    this.isStartHovered = true;
  }

  onStartMouseLeave() {
    this.isStartHovered = false;
  }

  ngOnInit() {
  }


}

