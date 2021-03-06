import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/core/search.service';

@Component({
    selector: 'app-preparing',
    templateUrl: './preparing.component.html',
    styleUrls: ['./preparing.component.css']
})
export class PreparingComponent implements OnInit {
    static showCodeLink: any;
    static showCodeEmbedded: any;

    found = false;
    type: string;
    course: string;
    title: string;
    priority: string;
    lms: string;
    docPub: string;
    docEdit: string;
    verbit: string;
    verbitID: string;
    notes: string;

    hours = 0;
    mins = 0;
    sec = 0;
    docID: string;
    vidCode = '';
    noVidCode = '';

    isEmbeded = true;


    constructor(private search: SearchService, private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        try {
        this.activeRoute.params.subscribe(params => {
            this.docID = params.id;
            const transcript = this.db.getTranscript(params.id);
            transcript.then(doc => {
            this.title = doc.data().title;
            this.course = doc.data().location[0].courseCode;
            this.type = doc.data().type;
            this.lms = doc.data().location[0].lmsURL;
            this.priority = doc.data().priority;
            this.notes = doc.data().notes;
            });
        });
        } catch (e) {
            console.log(e);
        } finally {
            this.db.checkAction();
        }
    }

    submit() {
        if (this.docEdit !== undefined &&
            this.docPub !== undefined) {
        if (this.docPub.includes('pub')) {
            const x = String(this.calc());
            let data;
            if (this.verbit) {
                data = {
                    docEditURL:  this.docEdit,
                    docPublishURL:  this.docPub,
                    verbit: this.verbit,
                    verbitID: this.verbitID,
                    length: x,
                    notes: this.notes
                };
            } else {
                data = {
                    docEditURL:  this.docEdit,
                    docPublishURL:  this.docPub,
                    length: x
                };
            }
            const userData = {
                actionID: '',
                currentAction: ''
            };
            try {
                this.activeRoute.params.subscribe(param => {
                    this.db.changeTranscriptStep('Ready for Transcription', this.db.user.name, param.id);
                });
                this.db.updateUser(userData);
                this.db.updateTranscript(data, this.docID);
            } catch (error) {
                console.log(error);
            } finally {
            setTimeout(() => {
                this.router.navigate(['/prepare'] );
            }, 300);
            }
        } else {
            alert('Please fill in the Published link with the proper link');
        }
        } else {
            alert('Please fill in the Google doc links');
        }
    }

    calc() {
        return Number(this.sec) + (Number(this.mins) * 60) + (Number(this.hours) * 60 * 60);
    }

    cancelPrep() {
        const userData = {
        actionID: '',
        currentAction: ''
        };
        try {
        this.activeRoute.params.subscribe(param => {
            this.db.changeTranscriptStep('Ready for Prep', this.db.user.name, param.id);
        });
        this.db.updateUser(userData);
        } catch (error) {
        console.log(error);
        } finally {
        this.router.navigate(['/prepare'] );
        }
    }


    // generates the code to the user, according to the media url received
    showCodeEmbedded() {
        if (this.docEdit !== undefined && this.docPub !== undefined) {
            const transcript = this.db.getTranscript(this.docID);
            transcript.then(doc => {
                if (doc.data().srcURL.includes('youtube')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('watch?v=') + 8, (doc.data().srcURL.indexOf('watch?v=') + 9) + 11);
                    this.vidCode = `<p><iframe width="560" height="315px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
                } else if (doc.data().srcURL.includes('youtu.be')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('.be/') + 4, (doc.data().srcURL.indexOf('.be/') + 4) + 11);
                    this.vidCode = `<p><iframe width="560" height="315px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
                } else if (doc.data().srcURL.includes('video.byui.edu')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('/0_') + 1, (doc.data().srcURL.indexOf('/0_') + 1) + 10);
                    this.vidCode = `<p><iframe id="kaltura_player_1534785808" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" width="560" height="315" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe><br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
                } else if (doc.data().srcURL.includes('vimeo')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('vimeo.com/') + 10, (doc.data().srcURL.indexOf('vimeo.com/') + 10) + 9);
                    this.vidCode = `<p><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="315px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>
                    (${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
                } else if (doc.data().srcURL.includes('fod.infobase.com')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('loid=') + 5, (doc.data().srcURL.indexOf('loid=') + 5) + 5);
                    this.vidCode = `<p><iframe allow='encrypted-media' height='315' frameborder='0' width='560' style='border: 1px solid #ddd;'  src='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' allowfullscreen >&nbsp;</iframe><br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
                } else {
                    this.vidCode = `<p><a href='${doc.data().srcURL}' target="_blank">Go to this link and get the embed code to place</a><br>Copy the rest of this and place it in with the embedded in a single p tag<br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
                }
            });
        } else {
          alert('Please fill in the Google doc links');
        }
    }
    showCodeLink() {
        if (this.docEdit !== undefined && this.docPub !== undefined) {
            let placeholdS = '';
            let placeholdM = '';
            let colon = '';
            if (this.docPub !== '' && this.docPub.includes('/pub')
                && (this.calc()) !== 0 || !(this.type === 'Video' || this.type === 'Audio')) {
            if (this.mins < 10 && (this.type === 'Video' || this.type === 'Audio')) {
                placeholdM = '0';
                colon = ': ';
            } else if (this.type === 'Video' || this.type === 'Audio') {
                placeholdM = '';
                colon = ': ';
            }
            if (this.sec < 10 && (this.type === 'Video' || this.type === 'Audio')) {
                placeholdS = '0';
                colon = ': ';
            } else if (this.type === 'Video' || this.type === 'Audio') {
                placeholdS = '';
                colon = ': ';
            }
            this.noVidCode = `<p>(${placeholdM}${this.mins}${colon}${placeholdS}${this.sec} mins,
                                <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else {
                alert('Before getting the code, make sure to add a published Google doc to the transcript as well as a height a and a length for the transcript, if necessary.');
            }
        } else {
            alert('Please fill in the Google doc links');
        }
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
