import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from './../core/auth.service';
import {
  DomSanitizer
} from '@angular/platform-browser';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {


  ssCanvas2 = 'https://docs.google.com/spreadsheets/d/1jUFL2Dr-_MjAE7axb6rEZy0vSfH6y_8fOHSo1b0oLDo/edit?rm=minimal';
  ssCanvas1 = 'https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal';
  selector = '0';
  teamSelector = false;
  sheet = 'https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal';
  link = 'https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal';
  constructor(private auth: AuthService, private san: DomSanitizer) {}

  ngOnInit() {
    this.checkTeam();
  }

  checkTeam() {
    try {
      if (!(this.auth.user.admin || this.auth.user.lead)) {
        this.teamSelector = false;
      } else {
        this.teamSelector = true;
      }
      if (this.auth.user.team === 'lms') {
        this.sheet = this.ssCanvas1;
        this.link = this.ssCanvas1;
      } else if (this.auth.user.team === 'accessibility') {
        this.sheet = this.ssCanvas2;
        this.link = this.ssCanvas2;
      }
    } catch (err) {
      setTimeout(() => {
        console.log('Error. Retry is 200ms');
        this.checkTeam();
      }, 200);
    }
  }
  sanSheet() {
    return this.san.bypassSecurityTrustResourceUrl(this.sheet);
  }

  sanLink() {
    return this.san.bypassSecurityTrustUrl(this.link);
  }

  changeSheet() {
    console.log(this.selector);
    if (this.selector === '1') {
      this.sheet = this.ssCanvas1;
      this.link = this.ssCanvas1;
    } else if (this.selector === '2') {
      this.sheet = this.ssCanvas2;
      this.link = this.ssCanvas2;
    }
  }
}
