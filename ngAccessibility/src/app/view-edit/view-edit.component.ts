import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-view-edit',
    templateUrl: './view-edit.component.html',
    styleUrls: ['./view-edit.component.css']
})

export class ViewEditComponent implements OnInit {
    
    @ViewChild('content') content: any;
    
    viewOpen: boolean;
    editing: boolean = true;
    copied: boolean;
    courseCode;
    datePrepareFinished;
    docEditURL: string;
    docPublishURL: string;
    length: number;
    lmsURL: string;
    parentTranscript: boolean;
    preparer: string;
    priority: number;
    requestDate: string;
    requestNotes: string;
    requestor: string;
    srcURL: string;
    status: string;
    title: string;
    type: string;
    verbit: boolean;
    verbitID: string;

    constructor() { }

    ngOnInit() {
}


async openModal(data) {
    const modal       = document.getElementById("view-modal");
    const navbar      = document.getElementById("main-nav");
    const content     = document.getElementsByTagName("main");

    modal.classList.remove('hide');
    navbar.classList.add('blur');
    for (let i = 0; i < content.length; i++) {
        content[i].classList.add('blur');
    }

    const ID            = document.getElementById("edit-info-id");
    const verbitIDbox   = document.getElementById("verbit-id-box");
    
    const editTitle     = document.getElementById("edit-info-title");
    const editStage     = document.getElementById("edit-info-stage");
    const editCourses   = document.getElementById("edit-info-courses");
    const editPriority  = document.getElementById("edit-info-priority");
    const editType      = document.getElementById("edit-info-type");
    const editLength    = document.getElementById("edit-info-length");
    const editDocedit   = document.getElementById("edit-info-docedit");
    const editDocpub    = document.getElementById("edit-info-docpub");
    const editLms       = document.getElementById("edit-info-lms");
    const editMedia     = document.getElementById("edit-info-media");
    const editIsverbit  = document.getElementById("edit-info-isverbit");
    const editVerbitID  = document.getElementById("edit-info-verbitid");
    
    const viewTitle     = document.getElementById("view-info-title");
    const viewStage     = document.getElementById("view-info-stage");
    const viewCourses   = document.getElementById("view-info-courses");
    const viewPriority  = document.getElementById("view-info-priority");
    const viewType      = document.getElementById("view-info-type");
    const viewLength    = document.getElementById("view-info-length");
    const viewDocedit   = document.getElementById("view-info-docedit");
    const viewDocpub    = document.getElementById("view-info-docpub");
    const viewLms       = document.getElementById("view-info-lms");
    const viewMedia     = document.getElementById("view-info-media");
    const viewIsverbit  = document.getElementById("view-info-isverbit");
    const viewVerbitID  = document.getElementById("view-info-verbitid");


    if (this.editing) {
        if (data.title)         { editTitle.innerHTML     = data.title; }
        if (data.status)        { editStage.innerHTML     = data.status; }
        if (data.courseCode)    { editCourses.innerHTML   = data.courseCode; }
        if (data.priority)      { editPriority.innerHTML  = data.priority; }
        if (data.type)          { editType.innerHTML      = data.type; }
        if (data.length)        { editLength.innerHTML    = data.length; }
        if (data.docEditURL)    { editDocedit.innerHTML   = data.docEditURL; }
        if (data.docPublishURL) { editDocpub.innerHTML    = data.docPublishURL; }
        if (data.lmsURL)        { editLms.innerHTML       = data.lmsURL; }
        if (data.srcURL)        { editMedia.innerHTML     = data.srcURL; }
        if (data.verbit)        { editIsverbit.innerHTML  = data.verbit; }
        if (data.verbitID)      { editVerbitID.innerHTML  = data.verbitID; }
    } else {
        if (data.title)         { viewTitle.innerHTML     = data.title; }
        if (data.status)        { viewStage.innerHTML     = data.status; }
        if (data.courseCode)    { viewCourses.innerHTML   = data.courseCode; }
        if (data.priority)      { viewPriority.innerHTML  = data.priority; }
        if (data.type)          { viewType.innerHTML      = data.type; }
        if (data.length)        { viewLength.innerHTML    = data.length; }
        if (data.docEditURL)    { viewDocedit.innerHTML   = data.docEditURL; }
        if (data.docPublishURL) { viewDocpub.innerHTML    = data.docPublishURL; }
        if (data.lmsURL)        { viewLms.innerHTML       = data.lmsURL; }
        if (data.srcURL)        { viewMedia.innerHTML     = data.srcURL; }
        if (data.verbit)        { viewIsverbit.innerHTML  = data.verbit; }
        if (data.verbitID)      { viewVerbitID.innerHTML  = data.verbitID; }
    }

}

closeModal() {
    const modal    = document.getElementById("view-modal");
    const navbar   = document.getElementById("main-nav");
    const content  = document.getElementsByTagName("main");

    modal.classList.add('hide');
    navbar.classList.remove('blur');
    for (let i = 0; i < content.length; i++) {
        content[i].classList.remove('blur');
    }
}

ClickedOut(event) {
    if (event.target.className === "modal") {
        this.closeModal();
    }
}

}