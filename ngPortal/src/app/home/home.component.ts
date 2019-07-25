import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    time = {
        accumlatedTime: '',
        break: false,
        breakAllowed: false,
        breakKey: '',
        check: false,
        checkKey: '',
    };
    breakBtn = 'Start Break';
    checkMsg = '';
    constructor(public db: AngularFirestore, private auth: AuthService) { }

    ngOnInit() {
        this.checkTime();
    }

    checkTime() {
        setTimeout(() => {
        try {
            this.db.collection('users').doc(this.auth.id).get().subscribe(doc => {
            this.time = doc.data().time;
            if (this.time.check) {
                this.checkMsg = 'Clock in time was ' + (doc.data().time.checkKey).slice(-5);
            } else if (!this.time.check) {
                this.checkMsg = 'Clock out time was ' + (doc.data().time.checkKey).slice(-5);
            }
            });
        } catch (err) {
            setTimeout(() => {
            console.log('Error retry in: 100ms' );
            this.checkTime();
            }, 100);
        }
        }, 200);
    }

    clockInOut() {
        const setDate = this.editDate(new Date());
        if (!this.time.check) {
        this.db.collection('users').doc(this.auth.id).update({
            'time.checkKey': setDate,
            'time.check': true,
            'time.breakAllowed': false
        });
        this.db.collection('users').doc(this.auth.id).collection('hoursWorked').doc(setDate).set({
            start: setDate.slice(-5)
        });
        window.open('https://www.myworkday.com/byuhi/d/home.htmld', '_blank');
        window.open('https://chat.google.com/room/AAAAGWGIzV4', '_blank');
        } else if (this.time.check) {
        this.db.collection('users').doc(this.auth.id).update({
            'time.checkKey': setDate,
            'time.check': false,
            'time.breakAllowed': false
        });
        this.db.collection('users').doc(this.auth.id).collection('hoursWorked').doc(setDate).set({
            end: setDate.slice(-5)
        });
        window.open('https://www.myworkday.com/byuhi/d/home.htmld', '_blank');
        }
        setTimeout(() => {
        this.checkTime();
        }, 100);
    }


    editDate(date) {
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const year = date.getFullYear();
        const hour = ('0' + date.getHours()).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        const setDate = `${year}-${month}-${day} ${hour}:${minute}`;
        return setDate;
    }
    prettyTime(time) {
        let hour = time.split(':')[0];
        let min = time.split(':')[1];
        let mer = 'am';
        if (time.split(':')[0] > 12) {
        hour = time.split(':')[0] - 12;
        mer = 'pm';
        }
        return hour + ':' + min + ' ' + mer;
    }

    takeBreak() {
            
    }

}
