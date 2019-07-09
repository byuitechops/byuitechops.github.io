this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    if (this.count <= 1) {
      console.log(documentSnapshot.data().title);
      var data = documentSnapshot.data();
      let location = [];
      let i = 0;
      this.afs.collection('accessibility').doc(documentSnapshot.id).set({
        docEditURL: data.docEditURL,
        docPublishURL: data.docPublishURL,
        length: data.length,
        priority: data.priority,
        notes: data.notes,
        srcURL: data.srcURL,
        status: data.status,
        title: data.title,
        type: data.type,
        verbit: data.verbit,
        verbitID: data.verbitID
      }).then(() => {
        if (data.location !== undefined) {
          if (data.location[0].preparer === undefined) {
            location[i] = {
              courseCode: data.location.courseCode,
              lmsURL: data.location.lmsURL,
              preparer,
              requester
            };
          } else if (data.location === []) {
            location[i] = {
              courseCode,
              lmsURL,
              preparer,
              requester
            };
          } else {
            location[i] = {
              courseCode: data.location[i].courseCode,
              lmsURL: data.location[i].lmsURL,
              preparer: data.location[i].preparer,
              requester: data.location[i].requester
            };
          }
          this.afs.collection('accessibility').doc(documentSnapshot.id).update({
            location
          });
        } else if (data.location === undefined) {
          if (data.courseCode !== undefined) {
            if (data.courseCode.length >= 1) {
              (data.courseCode).forEach(code => {
                location[i] = {
                  courseCode: code,
                  lmsURL: data.lmsURL,
                  preparer: data.preparer,
                  requester: data.requester
                };
                i++;
              });
            }
          } else {
            location[i] = {
              courseCode,
              lmsURL,
              preparer,
              requester
            };
          }
          this.afs.collection('accessibility').doc(documentSnapshot.id).update({
            location
          });
        }
      });
      this.count++;
    }
  });
});

this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(documentSnapshot.data().title);
    var data = documentSnapshot.data();
    if (data.courseCode === undefined) {

    } else {
      let preparer = '';
      let requester = '';
      if (data.preparer !== undefined) {
        preparer = data.preparer;
      }
      if (data.requestor !== undefined) {
        requester = data.requestor;
      }
      this.afs.collection('accessibility').doc(documentSnapshot.id).update({
        location: [{
          courseCode: data.courseCode,
          lmsURL: data.lmsURL,
          preparer,
          requester
        }]
      });
    }
  });
});
this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(documentSnapshot.data().title);
    var data = documentSnapshot.data();
    if (data.guestCreated === undefined) {
      this.afs.collection('accessibility').doc(documentSnapshot.id).update({
        guestCreated: false
      });

    } else {

    }
  });
});

this.afs.collection("accessibility").get().subscribe((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    let array = []
    let courseCode,
        lmsURL,
        requestor,
        preparer;
    console.log(documentSnapshot.data().title);
    var data = documentSnapshot.data();
    if (data.courseCode !== undefined) {
      if (data.location.courseCode !== undefined) {
         courseCode = data.location.courseCode;
         lmsURL = data.location.lmsURL;
        if (data.location.preparer !== undefined) {
          preparer = data.location.preparer;
        } else {
          preparer = '';
        }
        if (data.location.requestor !== undefined) {
          requestor = data.location.requestor;
        } else {
          requestor = '';
        }
      } else {
        if (data.location[0] !== undefined) {
          if (data.location[0].courseCode !== undefined) {
            if (data.location[0].courseCode[0] !== undefined) {
              (data.location[0].courseCode).forEach(course => {
                let y = {
                  courseCode: course,
                  lmsURL: data.location[0].lmsURL,
                  preparer: data.location[0].preparer,
                  requestor: data.location[0].requester
                }
                array.push(y);
              });
            }
          } else {
             courseCode = '';
             lmsURL = '';
             preparer = '';
             requestor = '';
          }
        }
      }
    } else {
      if (data.location[0] !== undefined) {
        if (data.location[0].courseCode === undefined) {
           courseCode = '';
           lmsURL = '';
           preparer = '';
           requestor = '';
        } else {
           courseCode = data.location.courseCode;
          if (data.location.lmsURL !== undefined) {
             lmsURL = data.location.lmsURL;
          } else {
             lmsURL = '';
          }
           preparer = '';
           requestor = '';
        }
      }
    }
    let location = [{
      courseCode,
      lmsURL,
      preparer,
      requestor
    }];
    let docEditURL = data.docEditURL;
    let docPublishURL = data.docPublishURL;
    let guestCreated;
    if (data.guestCreated === undefined) {
      guestCreated = false;
    } else {
      guestCreated = data.guestCreated;
    }
    let length = data.length;
    let priority = data.priority;
    let notes = data.notes;
    let srcURL = data.srcURL;
    let status = data.status;
    let title = data.title;
    let type = data.type;
    let verbit = data.verbit;
    let verbitID = data.verbitID;
    let x = {
      docEditURL,
      docPublishURL,
      guestCreated,
      length,
      location,
      priority,
      notes,
      srcURL,
      status,
      title,
      type,
      verbit,
      verbitID
    };
    console.log(x);
  });
});
