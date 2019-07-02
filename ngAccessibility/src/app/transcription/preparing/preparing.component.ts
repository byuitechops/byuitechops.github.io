import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preparing',
  templateUrl: './preparing.component.html',
  styleUrls: ['./preparing.component.css']
})
export class PreparingComponent implements OnInit {

  type: string;
  course: string;
  title: string;
  priority: string;
  lms: string;
  docPub: string;
  docEdit: string;
  verbit: string;
  verbitID: string;

  hours = 0;
  mins = 0;
  sec = 0;
  docID: string;
  code = '';

  isEmbeded = true;


  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.docID = params.id;
      const transcript = this.db.getTranscript(params.id);
      transcript.then(doc => {
        this.title = doc.data().title;
        this.course = doc.data().courseCode;
        this.type = doc.data().type;
        this.lms = doc.data().lmsURL;
        this.priority = doc.data().priority;
      });
    });
    this.db.checkAction();
  }

  submit() {
    const x = String(this.calc());
    let data;
    if (this.verbit) {
      data = {
        docEditURL:  this.docEdit,
        docPublishURL:  this.docPub,
        verbit: this.verbit,
        verbitID: this.verbitID,
        length: x
      };
    } else {
      data = {
        docEditURL:  this.docEdit,
        docPublishURL:  this.docPub,
        length: x
      };
    }
    this.activeRoute.params.subscribe(param => {
      this.db.changeTranscriptStep('Ready for Transcription', this.db.user.name, param.id);
    });
    const userData = {
      actionID: '',
      currentAction: ''
    };

    this.db.updateUser(userData);
    this.db.updateTranscript(data, this.docID);
    this.router.navigate(['/'] );
  }

  calc() {
    return Number(this.sec) + (Number(this.mins) * 60) + (Number(this.hours) * 60 * 60);
  }

  cancelPrep() {
    
  }


  // generates the code to the user, according to the media url received
    showCodeEmbedded() {
        this.isEmbeded = true;
        

        const transcript = this.db.getTranscript(this.docID);
        transcript.then(doc => {
            if (doc.data().srcURL.includes('youtube')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('watch?v=') + 8, (doc.data().srcURL.indexOf('watch?v=') + 9) + 11);
                this.code = `<p><iframe width="560" height="315px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else if (doc.data().srcURL.includes('youtu.be')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('.be/') + 4, (doc.data().srcURL.indexOf('.be/') + 4) + 11);
                this.code = `<p><iframe width="560" height="315px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else if (doc.data().srcURL.includes('video.byui.edu')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('/0_') + 1, (doc.data().srcURL.indexOf('/0_') + 1) + 10);
                this.code = `<p><iframe id="kaltura_player_1534785808" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" width="560" height="315" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe><br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else if (doc.data().srcURL.includes('vimeo')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('vimeo.com/') + 10, (doc.data().srcURL.indexOf('vimeo.com/') + 10) + 9);
                this.code = `<p><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="315px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>
                (${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else if (doc.data().srcURL.includes('fod.infobase.com')) {
                const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('loid=') + 5, (doc.data().srcURL.indexOf('loid=') + 5) + 5);
                this.code = `<p><iframe allow='encrypted-media' height='315' frameborder='0' width='560' style='border: 1px solid #ddd;'  src='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' allowfullscreen >&nbsp;</iframe><br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
            } else {
                this.code = `<p><a href='${doc.data().srcURL}' target="_blank">Go to this link and get the embed code to place</a><br>Copy the rest of this and place it in with the embedded in a single p tag<br>(${this.calc()} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
            }
        });
    }
    showCodeLink() {
        this.isEmbeded = false;
        let placeholdS = ''
        let placeholdM = ''
        if (this.docPub !== '' && this.docPub.includes('/pub') && (this.calc()) !== 0) {
        if (this.mins < 10) {
            placeholdM = '0'
        } else {
            placeholdM = '';
        }
        if (this.sec < 10) {
            placeholdS = '0'
        } else {
            placeholdS = '';
        }
        this.code = `<p>(${placeholdM}${this.mins}: ${placeholdS}${this.sec} mins, <a href="${this.docPub}" target="_blank">${this.title} Transcript</a>)</p>`;
        } else {
            alert('Before getting the code, make sure to add a published google doc to the transcript as well as a height a and a length for the transcript, if necessary.');
        }
    }

}
