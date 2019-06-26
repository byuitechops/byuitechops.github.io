import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../core/database.service';

@Component({
    selector: 'app-view-edit',
    templateUrl: './view-edit.component.html',
    styleUrls: ['./view-edit.component.css']
})

export class ViewEditComponent implements OnInit {

    @ViewChild('content') content: any;
    viewOpen = false;
    editing = true;
    copied = true;
    courseCode = ['ACCTG100'];
    datePrepareFinished = 'Today';
    docEditURL = '.com';
    docPublishURL = '.pub';
    length = '108 seconds';
    lmsURL = '.com';
    parentTranscript = true;
    preparer = 'Me';
    priority = '1';
    requestDate = 'Today';
    requestNotes = 'None';
    requestor = 'Me';
    srcURL = '.com';
    step = 'Finished';
    title = 'Me';
    type = 'Video';
    verbit = false;
    verbitID = '';
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
    options = [
        'True',
        'False'
    ];
    constructor() { }

    ngOnInit() {

    }


    async openModal() {
        const modal       = document.getElementById('view-modal');
        const navbar      = document.getElementById('main-nav');
        const content     = document.getElementsByTagName('main');
        modal.classList.remove('hide');
        navbar.classList.add('blur');
        for (let i = 0; i < content.length; i++) {
            content[i].classList.add('blur');
        }
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
    }
    clickedOut(event) {
        if (event.target.className === 'modal') {
            this.closeModal();
        }
    }

    displayPrevDup() {
        
    }
    displayNextDup() {

    }
}



// const ID            = document.getElementById('edit-info-id');
// const verbitIDbox   = document.getElementById('verbit-id-box');

// const editTitle     = document.getElementById('edit-info-title');
// const editStage     = document.getElementById('edit-info-stage');
// const editCourses   = document.getElementById('edit-info-courses');
// const editPriority  = document.getElementById('edit-info-priority');
// const editType      = document.getElementById('edit-info-type');
// const editLength    = document.getElementById('edit-info-length');
// const editDocedit   = document.getElementById('edit-info-docedit');
// const editDocpub    = document.getElementById('edit-info-docpub');
// const editLms       = document.getElementById('edit-info-lms');
// const editMedia     = document.getElementById('edit-info-media');
// const editIsverbit  = document.getElementById('edit-info-isverbit');
// const editVerbitID  = document.getElementById('edit-info-verbitid');

// const viewTitle     = document.getElementById('view-info-title');
// const viewStage     = document.getElementById('view-info-stage');
// const viewCourses   = document.getElementById('view-info-courses');
// const viewPriority  = document.getElementById('view-info-priority');
// const viewType      = document.getElementById('view-info-type');
// const viewLength    = document.getElementById('view-info-length');
// const viewDocedit   = document.getElementById('view-info-docedit');
// const viewDocpub    = document.getElementById('view-info-docpub');
// const viewLms       = document.getElementById('view-info-lms');
// const viewMedia     = document.getElementById('view-info-media');
// const viewIsverbit  = document.getElementById('view-info-isverbit');
// const viewVerbitID  = document.getElementById('view-info-verbitid');

// if (this.editing) {
//   if (data.title)         { editTitle.innerHTML     = data.title; }
//   if (data.status)        { editStage.innerHTML     = data.status; }
//   if (data.courseCode)    { editCourses.innerHTML   = data.courseCode; }
//   if (data.priority)      { editPriority.innerHTML  = data.priority; }
//   if (data.type)          { editType.innerHTML      = data.type; }
//   if (data.length)        { editLength.innerHTML    = data.length; }
//   if (data.docEditURL)    { editDocedit.innerHTML   = data.docEditURL; }
//   if (data.docPublishURL) { editDocpub.innerHTML    = data.docPublishURL; }
//   if (data.lmsURL)        { editLms.innerHTML       = data.lmsURL; }
//   if (data.srcURL)        { editMedia.innerHTML     = data.srcURL; }
//   if (data.verbit)        { editIsverbit.innerHTML  = data.verbit; }
//   if (data.verbitID)      { editVerbitID.innerHTML  = data.verbitID; }
// } else {
//   if (data.title)         { viewTitle.innerHTML     = data.title; }
//   if (data.status)        { viewStage.innerHTML     = data.status; }
//   if (data.courseCode)    { viewCourses.innerHTML   = data.courseCode; }
//   if (data.priority)      { viewPriority.innerHTML  = data.priority; }
//   if (data.type)          { viewType.innerHTML      = data.type; }
//   if (data.length)        { viewLength.innerHTML    = data.length; }
//   if (data.docEditURL)    { viewDocedit.innerHTML   = data.docEditURL; }
//   if (data.docPublishURL) { viewDocpub.innerHTML    = data.docPublishURL; }
//   if (data.lmsURL)        { viewLms.innerHTML       = data.lmsURL; }
//   if (data.srcURL)        { viewMedia.innerHTML     = data.srcURL; }
//   if (data.verbit)        { viewIsverbit.innerHTML  = data.verbit; }
//   if (data.verbitID)      { viewVerbitID.innerHTML  = data.verbitID; }
// }
// this.view.data = await data;
// this.view.copied = this.view.data.copied;
// this.view.courseCode = this.view.data.courseCode;
// this.view.datePrepareFinished = this.view.data.datePrepareFinished;
// this.view.docEditURL = this.view.data.docEditURL;
// this.view.docPublishURL = this.view.data.docPublishURL;
// this.view.length = this.view.data.length;
// this.view.lmsURL = this.view.data.lmsURL;
// this.view.parentTranscript = this.view.data.parentTranscript;
// this.view.preparer = this.view.data.preparer;
// this.view.priority = this.view.data.priority;
// this.view.requestDate = this.view.data.requestDate;
// this.view.requestNotes = this.view.data.requestNotes;
// this.view.requestor = this.view.data.requestor;
// this.view.srcURL = this.view.data.srcURL;
// this.view.step = String(this.view.data.status);
// this.view.title = this.view.data.title;
// this.view.type = this.view.data.type;
// this.view.verbit = this.view.data.verbit;
// this.view.verbitID = this.view.data.verbitID;
