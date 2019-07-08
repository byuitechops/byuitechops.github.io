import { Component, OnInit, } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { AuthService } from '../core/auth.service';
import { SearchService } from '../core/search.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  constructor(private db: DatabaseService, public auth: AuthService, private search: SearchService) {}
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
    media: '',
    id: '1231233'
  }, {
    type: 'Video',
    courseCode: ['ACCTG101', 'ACCTG102'],
    title: 'Testing 2',
    srcURL: 'yellow.com',
    priority: 2,
    docEditURL: 'youthinkthisisgoogle.google.com.pub',
    objectID: 'HAHAH',
    media: '',
    id: '1231233'
  }, {
    type: 'Video',
    courseCode: ['ACCTG101', 'ACCTG102', 'ACCTG103'],
    title: 'Testing 3',
    srcURL: 'youtube.com',
    priority: 3,
    docEditURL: 'youthinkthisisgoogle.google.com.pub',
    objectID: 'HAHAH',
    media: '',
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
    if (this.course === undefined &&
      this.type === undefined &&
      (this.lms === '' || this.lms === undefined) &&
      (this.media === '' || this.media === undefined) &&
      (this.title === '' || this.title === undefined) &&
      this.priority === undefined) {
      alert('Please fill in all fields');
    } else {
      if (this.auth.user.isAnonymous) {

      } else {
        this.name = this.db.user.name;
      }

      if (this.comments === undefined || this.comments === '') {
        this.comments = '';
      } else {
        this.comments = this.comments + ' Made by ' + this.name;
      }
      const data = {
        datePrepareFinished: '',
        docEditURL: '',
        docPublishURL: '',
        length: '',
        location: [{
          courseCode: this.course,
          lmsURL: this.lms,
          requestor: this.name,
          preparer: '',
        }],
        priority: this.priority,
        requestDate: new Date(),
        notes: this.comments,
        srcURL: this.media,
        status: 'Ready for Prep',
        title: this.title,
        type: this.type,
        verbit: false,
        verbitID: ''
      };
      try {
        this.location = data.location;
        console.log(data);
        this.dups = await this.search.dupCheck(data);
      } catch (e) {
        console.log(e);
      } finally {
        if (this.override) {
          this.db.createTranscript(data);
          this.override = false;
          window.location.reload();
          this.submitMsg();
        } else if (this.dups.length > 0 && this.search.areThere) {
          console.log(this.dups);
          this.openDup();
        } else {
          this.db.createTranscript(data);
          this.submitMsg();
        }
      }
    }
  }

  useDuplicate(id) {
    this.location = {
      courseCode: this.course,
      lmsURL: this.lms,
      requestor: this.name,
      preparer: '',
    };
    this.db.addLocation(this.toBeUsedID, this.location);
    this.closeDup();
    this.submitMsg();
  }

  createNew() {
    this.override = true;
    this.newRequest();
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
      console.log("TESTING");

    } else {
      this.course = null;
      this.lms = undefined;
    }
  }

}
