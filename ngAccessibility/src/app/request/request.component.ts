import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../core/database.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  selectUndefinedOptionValue: any;
  name: string;
  lms: string;
  media: string;
  title: string;
  priority: string;
  priorities = [
    '1 ADA Emergency of Special Request',
    '2 Improvement Project for Live Course',
    '3 New/Re-Development Project',
    '4 Transcript Project'
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
  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.getCourse();
  }

  getCourse() {
    const courses = [];
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const x = [];
            const res = JSON.parse(this.responseText);
            const id = res._id;
            const newxhttp = new XMLHttpRequest();
            newxhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    const newres = JSON.parse(this.responseText);
                    let html = '';
                    newres.forEach((doc) => {
                      const course = doc.__catalogCourseId;
                      html += `<option>${course}</option>`;
                      courses.push(course);
                    });
                    document.getElementById('requestCourse').insertAdjacentHTML('afterend', html);
                    return courses;
                }
            };
            newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
            newxhttp.send();
        }
    };
    xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
    xhttp.send();
  }




  newRequest() {
    let displayName = this.db.user.name;
    if (displayName === ''){
      displayName = "";
    }
    const data = {
      backupCode: this.course,
      copied: false,
      courseCode: [this.course],
      datePrepareFinished: '',
      docEditURL: '',
      docPublishURL: '',
      length: '',
      lmsURL: this.lms,
      parentTranscript: true,
      preparer: '',
      priority: this.priority,
      requestDate: new Date(),
      requestNotes: this.comments + 'Made by ' + displayName,
      requestor: displayName,
      srcURL: this.media,
      status: 'Ready for Prep',
      title: this.title,
      type: this.type,
      verbit: false,
      verbitID: ''
    };
    console.log(data);
    this.db.createTranscript(data);
  }
}

