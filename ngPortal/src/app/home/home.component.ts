import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { splitDepsDsl } from '@angular/core/src/view/util';

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
    breakMsg = '';
    today;

    constructor(public db: AngularFirestore, private auth: AuthService) { }

    ngOnInit() {
        this.checkTime();
        this.hideOthers();
        this.clock();
        setTimeout(() => {
            this.autoSlide();
        }, 100);
    }

    clock() {
        setInterval(() => {
            this.today = Date.now();
        }, 1000);
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
                    if (!this.time.break) {
                        this.breakMsg = 'Last break finished at ' + (doc.data().time.breakKey).slice(-5);
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

    /*******************************
     *  SLIDE SHOW
     *  
     *  Everything used with the break button
     ******************************/

    slides = document.getElementsByClassName('slide');
    dots = document.getElementsByClassName('dot');
    size: number;
    current: number = 0;

    hideOthers() {
        for (let i = 1; i < this.slides.length; i++) {
            this.slides[i].classList.add('hide');
        }
    }
    nowThisSlide(this1: number) {
        this.slides = document.getElementsByClassName('slide');
        this.dots = document.getElementsByClassName('dot');
        this.size = this.slides.length;
        console.log(this.size);
        this.slides[this.current].classList.add('hide');
        this.slides[this1].classList.remove('hide');
        this.dots[this.current].classList.remove('active-dot');
        this.dots[this1].classList.add('active-dot');
        this.current = this1;
        console.log(this.current);
    }
    nextSlide() {
        this.nowThisSlide((this.current + 1) % this.size);
    }
    prevSlide() {
        this.nowThisSlide(((this.current + this.size) - 1) % this.size);
    }
    autoSlide() {
        setInterval(() => {
            this.nowThisSlide((this.current + 1) % this.size);
        }, 8000);
    }

    /*******************************
     *  BREAK BUTTON
     *  
     *  Everything used with the break button
     ******************************/

    breakMins: number = 15;
    breakSecs: number = 0;
    zero: string = '0';
    breakTimer: any;

    takeBreak() {
        const setDate = this.editDate(new Date());
        document.getElementById('break-words').classList.toggle('hide');
        document.getElementById('break-btn').classList.toggle('expanded');
        
        if(this.time.break) {
            this.startBreak();
        } else if (!this.time.break) {
            this.endBreak();
        }
        this.time.break = !this.time.break;
        this.time.breakKey = setDate;
    }
    startBreak() {
        this.breakTimer = setInterval(() => {
            if (this.breakMins == 0 && this.breakSecs == 0) {
                this.breakMins = 15;
            } else if (this.breakMins > 0 && this.breakSecs == 0) {
                this.breakMins--;
                this.breakSecs = 59;
            } else {
                this.breakSecs--;
            }
            if (this.breakSecs < 10) {
                this.zero = '0';
            } else {
                this.zero = '';
            }
            this.checkBreak();
        }, 1000);
    }
    endBreak() {
        clearInterval(this.breakTimer);
        document.getElementById('break-btn').classList.remove('warning', 'danger');
    }
    checkBreak() {
        if (this.breakMins == 0 && this.breakSecs == 0) {
            document.getElementById('break-btn').classList.remove('warning');
            document.getElementById('break-btn').classList.add('danger');
        } else if (this.breakMins == 0 && this.breakSecs <= 59) {
            document.getElementById('break-btn').classList.add('warning');
        }
    }
}