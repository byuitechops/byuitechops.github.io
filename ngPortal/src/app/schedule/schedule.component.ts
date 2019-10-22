import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    schedules = [];
    name1 = '';
    name2 = '';
    link1 = '';
    link2 = '';

    sheet = 'https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal';
    link = 'https://docs.google.com/spreadsheets/d/1g53WojmX1wG7fTGU1Q1Hg93-QJ5GBadcCU7rbeyGWoc/edit?rm=minimal';

    selector = '0';
    teamSelector = false;
    isEditor = false;
    editingSchedules = false;

    
    constructor(public db: AngularFirestore, private auth: AuthService, private san: DomSanitizer) {}

    ngOnInit() {
        this.checkTeam();
        this.getScheduleLinks();
    }

    checkTeam() {
        try {
            if (!(this.auth.user.admin || this.auth.user.lead)) {
                this.teamSelector = false;
            } else {
                this.teamSelector = true;
                this.isEditor = true;
            }
            if (this.auth.user.team === 'Team 1') {
                this.sheet = this.link1;
                this.link = this.link1;
            } else if (this.auth.user.team === 'Team 2') {
                this.sheet = this.link2;
                this.link = this.link2;
            }
        } catch (err) {
            console.log('Error. Retry is 200ms');
            setTimeout(() => {
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
            this.sheet = this.link1;
            this.link = this.link1;
        } else if (this.selector === '2') {
            this.sheet = this.link2;
            this.link = this.link2;
        }
    }

    getScheduleLinks() {
        setTimeout(() => {
            try {
                this.db.collection('team').doc('display').get().subscribe(doc => {
                    this.schedules = doc.data().schedules;
                    this.name1 = doc.data().schedules.team1.name;
                    this.link1 = doc.data().schedules.team1.link;
                    this.name2 = doc.data().schedules.team2.name;
                    this.link2 = doc.data().schedules.team2.link;
                    console.log(this.schedules);
                    console.log(this.name1, this.link1);
                    console.log(this.name2, this.link2);
                });
            } catch (err) {
                setTimeout(() => {
                    console.log('Error retry in: 100ms');
                    this.getScheduleLinks();
                }, 100);
            }
        }, 200);
    }

    editSchedules() {
        this.editingSchedules = true;
    }
    cancelEdit() {
        this.editingSchedules = false;
    }
    updateSchedules() {

    }
}