import { Component, OnInit, } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { AuthService } from '../core/auth.service';
import { SearchService } from '../core/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
    constructor(private db: DatabaseService,
                public auth: AuthService,
                private search: SearchService,
                private activeRoute: ActivatedRoute,
                private router: Router) {}

    id: string;
    selectUndefinedOptionValue: any;
    name: string;
    lms: string;
    media: string;
    title: string;
    priority: string;
    priorities = [{
        name: '1 ADA Emergency of Special Request',
        value: '1'
        },
        {
        name: '2 Improvement Project for Live Course',
        value: '2'
        },
        {
        name: '3 New/Re-Development Project',
        value: '3'
        },
        {
        name: '4 Transcript Project',
        value: '4'
        }
    ];
    type: string;
    types = [
        'Video',
        'Audio',
        'Alt Text',
        'Slide'
    ];
    course: string;
    comments: string;
    override = false;

    dups = [{
        type: 'Video',
        courseCode: ['ACCTG100'],
        title: 'Testing',
        srcURL: '1234567890.com',
        priority: 1,
        docEditURL: 'youthinkthisisgoogle.google.com.pub',
        objectID: 'HAHAH',
        id: '1231233'
    }, {
        type: 'Video',
        courseCode: ['ACCTG101', 'ACCTG102'],
        title: 'Testing 2',
        srcURL: 'yellow.com',
        priority: 2,
        docEditURL: 'youthinkthisisgoogle.google.com.pub',
        objectID: 'HAHAH',
        id: '1231233'
    }, {
        type: 'Video',
        courseCode: ['ACCTG101', 'ACCTG102', 'ACCTG103'],
        title: 'Testing 3',
        srcURL: 'youtube.com',
        priority: 3,
        docEditURL: 'youthinkthisisgoogle.google.com.pub',
        objectID: 'HAHAH',
        id: '1231233'
    }];
    dupPage = 0;
    location: any;

    multi = false;
    hider = false;

    toBeUsedType: string;
    toBeUsedCourse: string;
    toBeUsedTitle: string;
    toBeUsedPriority: string;
    toBeUsedMedia: string;
    toBeUsedID: string;

    vidCode: string;
    noVidCode: string;

    ngOnInit() {
        this.checker();
    }

    checker() {
        let success = false;
        try {
        this.getCourse();
        if (!this.auth.user.isAnonymous) {
            this.hider = true;
            success = true;
        } else if (this.auth.user.isAnonymous) {
            success = true;
        }
        } catch (e) {
        this.hider = false;
        setTimeout(() => {
            this.checker();
        }, 300);
        } finally {
        if (success) {
            this.db.checkAction();
        }
        }
    }

    getCourse() {
        const courses = [];
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const res = JSON.parse(this.responseText);
            const id = res._id;
            const newxhttp = new XMLHttpRequest();
            newxhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const newres = JSON.parse(this.responseText);
                let inject = '';
                newres.forEach((doc) => {
                const course = doc.__catalogCourseId;
                inject += `<option [value]="${course}">${course}</option>`;
                courses.push(course);
                });
                document.getElementById('requestCourse').insertAdjacentHTML('afterend', inject);
                return courses;
            }
            };
            newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
            newxhttp.send();
        }
        };
        xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
        xhttp.send();
        const html = `<option [value]="ENG106">ENG106</option>
                        <option [value]="ENG106L">ENG106L</option>
                        <option [value]="GSPC120L">GSPC120L</option>
                        <option [value]="MATH100G">MATH100G</option>
                        <option [value]="MATH100L">MATH100L</option>
                        <option [value]="PC101">PC101</option>
                        <option [value]="PC101L">PC101L</option>
                        <option [value]="PC102">PC102</option>
                        <option [value]="PC102L">PC102L</option>
                        <option [value]="PC103">PC103</option>
                        <option [value]="RELPC121">RELPC121</option>
                        <option [value]="RELPC122">RELPC122</option>
                        <option [value]="FDREL250">FDREL250</option>`;
        document.getElementById('requestCourse').insertAdjacentHTML('afterend', html);
    }
    async newRequest() {
        let data;
        if (this.course === undefined &&
        this.type === undefined &&
        (this.lms === '' || this.lms === undefined) &&
        (this.media === '' || this.media === undefined) &&
        (this.title === '' || this.title === undefined) &&
        this.priority === undefined &&
        (this.name === undefined || this.name === '' || !this.auth.user.isAnonymous)) {
        alert('Please fill in all fields');
        } else {
        if (this.auth.user.isAnonymous) {
            if (this.comments === undefined || this.comments === '') {
            this.comments = '';
            } else {
            this.comments = this.comments + ' Made by ' + this.name;
            }
            data = {
            docEditURL: '',
            docPublishURL: '',
            guestCreated: true,
            length: '',
            location: [{
                courseCode: this.course,
                lmsURL: this.lms,
                requestor: this.name,
                preparer: '',
            }],
            priority: this.priority,
            notes: this.comments,
            srcURL: this.media,
            status: 'Ready for Prep',
            title: this.title,
            type: this.type,
            verbit: false,
            verbitID: ''
            };
        } else {
            this.name = this.db.user.name;
            if (this.comments === undefined || this.comments === '') {
            this.comments = '';
            } else {
            this.comments = this.comments + ' Made by ' + this.name;
            }
            data = {
            docEditURL: '',
            docPublishURL: '',
            guestCreated: false,
            length: '',
            location: [{
                courseCode: this.course,
                lmsURL: this.lms,
                requestor: this.name,
                preparer: '',
            }],
            priority: this.priority,
            notes: this.comments,
            srcURL: this.media,
            status: 'Ready for Prep',
            title: this.title,
            type: this.type,
            verbit: false,
            verbitID: ''
            };
        }
        try {
            this.location = data.location;
            console.log(data);
            this.dups = await this.search.dupCheck(data);
        } catch (e) {
            console.log(e);
        } finally {
            setTimeout(() => {
            if (this.override) {
                this.db.createTranscript(data);
                this.showFollow();
                this.override = false;
                this.submitMsg();
            }
            if (this.search.areThere) {
                console.log(this.dups);
                this.openDup();
                setTimeout(() => {
                this.search.areThere = false;
                }, 200);
            } else {
                this.id = this.db.createTranscript(data);
                this.showFollow();
                this.submitMsg();
            }
            }, 400);
        }
        }
    }

    useDuplicate() {
        this.location = {
        courseCode: this.course,
        lmsURL: this.lms,
        requestor: this.name,
        preparer: this.name,
        };
        this.db.addLocation(this.toBeUsedID, this.location);
        this.closeDup();
        const transcript = this.db.getTranscript(this.toBeUsedID);
        transcript.then(doc => {
            if (doc.data().status !== 'In Prep' && doc.data().status !== 'Ready for Prep') {
                this.showCodePopup();
            }
        });
        this.submitMsg();
    }

    createNew() {
        this.closeDup();
        this.override = true;
        setTimeout(() => {
        this.newRequest();
        }, 200);
    }
    openDup() {
        const dup = document.getElementById('dup-modal');
        const navbar = document.getElementById('main-nav');
        const content = document.getElementsByTagName('main');

        dup.classList.remove('hide');
        navbar.classList.add('blur');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < content.length; i++) {
        content[i].classList.add('blur');
        }
    }

    closeDup() {
        const dup = document.getElementById('dup-modal');
        const navbar = document.getElementById('main-nav');
        const content = document.getElementsByTagName('main');

        dup.classList.add('hide');
        navbar.classList.remove('blur');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < content.length; i++) {
        content[i].classList.remove('blur');
        }

        document.getElementById('dupToBeUsedBox').classList.add('hide');
    }

    dupToBeUsed(usedDup, id) {
        document.getElementById('dupToBeUsedBox').classList.remove('hide');
        this.toBeUsedID = id;
        this.toBeUsedType = usedDup.type;
        this.toBeUsedCourse = usedDup.courseCode;
        this.toBeUsedTitle = usedDup.title;
        this.toBeUsedPriority = usedDup.priority;
        this.toBeUsedMedia = usedDup.media;
    }

    submitMsg() {
        document.getElementById('sub-msg').innerHTML = 'Your Request has been Submitted!';
        document.getElementById('transcript-box-info').classList.add('submitted');
        setTimeout(() => {
        document.getElementById('sub-msg').innerHTML = '';
        document.getElementById('transcript-box-info').classList.remove('submitted');
        }, 1500);
        this.media = undefined;
        this.title = undefined;
        this.comments = this.selectUndefinedOptionValue;
        this.priority = this.selectUndefinedOptionValue;
        this.type = null;
        if (this.multi) {


        } else {
        this.course = null;
        this.lms = undefined;
        }
    }

    showFollow() {
        if (!this.auth.user.isAnonymous) {
        const modal = document.getElementById('follow-modal');
        const navbar = document.getElementById('main-nav');
        const content = document.getElementsByTagName('main');

        modal.classList.remove('hide');
        navbar.classList.add('blur');
        for (let i = 0; i < content.length; i++) {
            content[i].classList.add('blur');
        }
        }
    }
    closeFollow() {
        const modal = document.getElementById('follow-modal');
        const navbar = document.getElementById('main-nav');
        const content = document.getElementsByTagName('main');

        modal.classList.add('hide');
        navbar.classList.remove('blur');
        for (let i = 0; i < content.length; i++) {
        content[i].classList.remove('blur');
        }

    }
    followTranscript() {
        try {
        this.db.changeTranscriptStep('In Prep', this.db.user.name, this.id);
        this.db.updateUser({
            actionID: this.id,
            currentAction: 'preparing'
        });
        } catch (error) {
        console.log(error);
        } finally {
        this.closeFollow();
        setTimeout(() => {
            this.router.navigate(['/pre', this.id] );
        }, 1000);
        }
    }

    calcMins(seconds: string) {
        if (seconds !== undefined) {
            let secs = Number(seconds);
            let hours = secs % 3600;
            secs =- hours * 3600;
            let mins = secs % 60;
            secs =- mins * 60;
            let time = hours + ' : ' + mins + ':' + secs;
            return time;
        } else {
            return '';
        }
    }
    showCodeEmbedded() {
        const transcript = this.db.getTranscript(this.toBeUsedID);
        transcript.then(doc => {
            const time = this.calcMins(doc.data().length);
            if (doc.data().srcURL.includes('youtube')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('watch?v=') + 8, (doc.data().srcURL.indexOf('watch?v=') + 9) + 11);
                this.vidCode = `<p><iframe width="560" height="315px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${time} mins, <a href="${doc.data().docPublishURL}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else if (doc.data().srcURL.includes('youtu.be')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('.be/') + 4, (doc.data().srcURL.indexOf('.be/') + 4) + 11);
                this.vidCode = `<p><iframe width="560" height="315px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${time} mins, <a href="${doc.data().docPublishURL}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else if (doc.data().srcURL.includes('video.byui.edu')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('/0_') + 1, (doc.data().srcURL.indexOf('/0_') + 1) + 10);
                this.vidCode = `<p><iframe id="kaltura_player_1534785808" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" width="560" height="315" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe><br>(${time} mins, <a href="${doc.data().docPublishURL}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else if (doc.data().srcURL.includes('vimeo')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('vimeo.com/') + 10, (doc.data().srcURL.indexOf('vimeo.com/') + 10) + 9);
                this.vidCode = `<p><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="315px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>
                (${time} mins, <a href="${doc.data().docPublishURL}" target="_blank">${doc.data().title} Transcript</a>)</p>`;
            } else if (doc.data().srcURL.includes('fod.infobase.com')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('loid=') + 5, (doc.data().srcURL.indexOf('loid=') + 5) + 5);
                this.vidCode = `<p><iframe allow='encrypted-media' height='315' frameborder='0' width='560' style='border: 1px solid #ddd;'  src='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' allowfullscreen >&nbsp;</iframe><br>(${time} mins, <a href="${doc.data().docPublishURL}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else {
                this.vidCode = `<p><a href='${doc.data().srcURL}' target="_blank">Go to this link and get the embed code to place</a><br>Copy the rest of this and place it in with the embedded in a single p tag<br>(${time} mins, <a href="${doc.data().docPublishURL}" target="_blank">${this.title} Transcript</a>)</p>`;
            }
        });
    }
    showCodeLink() {
        const transcript = this.db.getTranscript(this.toBeUsedID);
        transcript.then(doc => {
            const time = this.calcMins(doc.data().length)
            this.noVidCode = `<p>(${time} mins,
                        <a href="${doc.data().docPublishURL}" target="_blank">${doc.data().title} Transcript</a>)</p>`;
        });
    }

    showCodePopup() {
        const modal = document.getElementById('embed-modal');
        const navbar = document.getElementById('main-nav');
        const content = document.getElementsByTagName('main');

        modal.classList.remove('hide');
        navbar.classList.add('blur');
        for (let i = 0; i < content.length; i++) {
            content[i].classList.add('blur');
        }

        this.showCodeEmbedded();
        this.showCodeLink();

    }
    closeCodePopup() {
        const modal = document.getElementById('embed-modal');
        const navbar = document.getElementById('main-nav');
        const content = document.getElementsByTagName('main');

        modal.classList.add('hide');
        navbar.classList.remove('blur');
        for (let i = 0; i < content.length; i++) {
            content[i].classList.remove('blur');
        }

    }

}
