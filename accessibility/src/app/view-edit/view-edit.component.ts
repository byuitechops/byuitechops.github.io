import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEditService } from '../core/view-edit.service';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-view-edit',
    templateUrl: './view-edit.component.html',
    styleUrls: ['./view-edit.component.css']
})

export class ViewEditComponent implements OnInit {

    @ViewChild('content') content: any;
    priorities = [
        '1',
        '2',
        '3',
        '4'
    ];
    types = [
        'Video',
        'Audio',
        'Alt Text',
        'Slide'
    ];
    stages = [
        'Ready for Prep',
        'In Prep',
        'Ready for Transcription',
        'In Transcription',
        'Ready for Review',
        'In Review',
        'Review Completed',
        'Finished'
    ];
    constructor(public storage: ViewEditService, private auth: AuthService) { }

    ngOnInit() {

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
              inject += `<option [ngValue]="${course}">${course}</option>`;
              courses.push(course);
              });
              let content = document.getElementsByClassName('requestCourse');
              for (let i = 0; i < content.length; i++) {
                content[i].insertAdjacentHTML('afterend', inject);
              }
              return courses;
          }
          };
          newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
          newxhttp.send();
      }
      };
      try {
        xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
        xhttp.send();
        const html = `<option [ngValue]="ENG106">ENG106</option>
                        <option [ngValue]="ENG106L">ENG106L</option>
                        <option [ngValue]="GSPC120L">GSPC120L</option>
                        <option [ngValue]="MATH100G">MATH100G</option>
                        <option [ngValue]="MATH100L">MATH100L</option>
                        <option [ngValue]="PC101">PC101</option>
                        <option [ngValue]="PC101L">PC101L</option>
                        <option [ngValue]="PC102">PC102</option>
                        <option [ngValue]="PC102L">PC102L</option>
                        <option [ngValue]="PC103">PC103</option>
                        <option [ngValue]="RELPC121">RELPC121</option>
                        <option [ngValue]="RELPC122">RELPC122</option>
                        <option [ngValue]="FDREL250">FDREL250</option>`;
        let content = document.getElementsByClassName('requestCourse');
        for (let i = 0; i < content.length; i++) {
          content[i].insertAdjacentHTML('afterend', html);
        }
      } catch (error) {
        console.log(error);
      }
    }


    async openModal(id) {
      const modal       = document.getElementById('view-modal');
      const navbar      = document.getElementById('main-nav');
      const content     = document.getElementsByTagName('main');
      modal.classList.remove('hide');
      navbar.classList.add('blur');
      for (let i = 0; i < content.length; i++) {
          content[i].classList.add('blur');
      }
      this.storage.storageEdit(id);
    }

    closeModal() {
      const modal    = document.getElementById('view-modal');
      const navbar   = document.getElementById('main-nav');
      const content  = document.getElementsByTagName('main');
      modal.classList.add('hide');
      navbar.classList.remove('blur');
      for (let i = 0; i < content.length; i++) {
          content[i].classList.remove('blur');
      }
      this.storage.editing = false;
    }
    clickedOut(event) {
      if (event.target.className === 'modal') {
          this.closeModal();
      }
    }

    confirmEdit() {
      this.storage.confirmEdit();
      this.storage.editing = false;
    }
    edit() {
      setTimeout(() => {
        this.getCourse();
        setTimeout(() => {
          this.storage.locations = this.storage.locations;
        }, 100);
      }, 500);
      this.storage.editing = !this.storage.editing;
    }
    delete() {
      if (this.storage.delete()) {
        this.closeModal();
      }
    }

    calc() {
        return Number(this.sec) + (Number(this.mins) * 60) + (Number(this.hours) * 3600);
    }

    hours = 0;
    mins = 0;
    sec = 0;
    docID: string;
    vidCode = '';
    noVidCode = '';
    // generates the code to the user, according to the media url received
    showCodeEmbedded() {
        const docEdit = this.storage.docEditURL;
        const docPub = this.storage.docPublishURL;
        if (docEdit !== undefined &&
            docPub !== undefined) {
            const transcript = this.db.getTranscript(this.docID);
            transcript.then(doc => {
                if (doc.data().srcURL.includes('youtube')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('watch?v=') + 8, (doc.data().srcURL.indexOf('watch?v=') + 9) + 11);
                    this.vidCode = `<p><iframe width="560" height="315px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${this.calc()} mins, <a href="${docPub}" target="_blank">${this.storage.title} Transcript</a>)</p>`;
                } else if (doc.data().srcURL.includes('youtu.be')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('.be/') + 4, (doc.data().srcURL.indexOf('.be/') + 4) + 11);
                    this.vidCode = `<p><iframe width="560" height="315px" src="https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>(${this.calc()} mins, <a href="${docPub}" target="_blank">${this.storage.title} Transcript</a>)</p>`;
                } else if (doc.data().srcURL.includes('video.byui.edu')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('/0_') + 1, (doc.data().srcURL.indexOf('/0_') + 1) + 10);
                    this.vidCode = `<p><iframe id="kaltura_player_1534785808" src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/33020032/partner_id/1157612?iframeembed=true&playerId=kaltura_player_1534785808&entry_id=${id}&flashvars[streamerType]=auto" width="560" height="315" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0"></iframe><br>(${this.calc()} mins, <a href="${docPub}" target="_blank">${this.storage.title} Transcript</a>)</p>`;
                } else if (doc.data().srcURL.includes('vimeo')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('vimeo.com/') + 10, (doc.data().srcURL.indexOf('vimeo.com/') + 10) + 9);
                    this.vidCode = `<p><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" width="560" height="315px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>
                    (${this.calc()} mins, <a href="${docPub}" target="_blank">${this.storage.title} Transcript</a>)</p>`;
                } else if (doc.data().srcURL.includes('fod.infobase.com')) {
                    const id = doc.data().srcURL.slice(doc.data().srcURL.indexOf('loid=') + 5, (doc.data().srcURL.indexOf('loid=') + 5) + 5);
                    this.vidCode = `<p><iframe allow='encrypted-media' height='315' frameborder='0' width='560' style='border: 1px solid #ddd;'  src='https://byui.idm.oclc.org/login?url=https://fod-infobase-com.byui.idm.oclc.org/OnDemandEmbed.aspx?token=42704&wID=104034&loid=${id}&plt=FOD&w=560&h=360' allowfullscreen >&nbsp;</iframe><br>(${this.calc()} mins, <a href="${docPub}" target="_blank">${this.storage.title} Transcript</a>)</p>`;
                } else {
                    this.vidCode = `<p><a href='${doc.data().srcURL}' target="_blank">Go to this link and get the embed code to place</a><br>Copy the rest of this and place it in with the embedded in a single p tag<br>(${this.calc()} mins, <a href="${docPub}" target="_blank">${this.storage.title} Transcript</a>)</p>`;
                }
            });
        }
    }
    showCodeLink() {
        const docEdit = this.storage.docEditURL;
        const docPub = this.storage.docPublishURL;
        if (docEdit !== undefined &&
            docPub !== undefined) {
            let placeholdS = '';
            let placeholdM = '';
            let colon = '';
            if (docPub !== '' && docPub.includes('/pub')
                && (this.calc()) !== 0 || !(this.storage.type === 'Video' || this.storage.type === 'Audio')) {
            if (this.mins < 10 && (this.storage.type === 'Video' || this.storage.type === 'Audio')) {
                placeholdM = '0';
                colon = ': ';
            } else if (this.storage.type === 'Video' || this.storage.type === 'Audio') {
                placeholdM = '';
                colon = ': ';
            }
            if (this.sec < 10 && (this.storage.type === 'Video' || this.storage.type === 'Audio')) {
                placeholdS = '0';
                colon = ': ';
            } else if (this.storage.type === 'Video' || this.storage.type === 'Audio') {
                placeholdS = '';
                colon = ': ';
            }
            this.noVidCode = `<p>(${placeholdM}${this.mins}${colon}${placeholdS}${this.sec} mins,
                        <a href="${docPub}" target="_blank">${this.storage.title} Transcript</a>)</p>`;
            }
        }
    }

    openEmbed() {
        const modal = document.getElementById('embed-modal');
        const view  = document.getElementById('view-modal');
        modal.classList.remove('hide');
        view.classList.add('blur');
        this.showCodeEmbedded();
        this.showCodeLink();
    }
    closeEmbed() {
        const modal = document.getElementById('embed-modal');
        const view  = document.getElementById('view-modal');
        modal.classList.add('hide');
        view.classList.remove('blur');
    }
    clickedOut2(event) {
        if (event.target.className === 'modal') {
            this.closeEmbed();
        }
    }
}

