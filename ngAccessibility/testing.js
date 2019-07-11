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
    let location = [];
    var data = documentSnapshot.data();
    var id = documentSnapshot.id;
    if (data.backupCode !== undefined
        && data.courseCode !== undefined
        && Array.isArray(data.location)) {
          if (Array.isArray(data.courseCode)
              && data.requestor !== undefined) {
            (data.courseCode).forEach(course => {
              if (data.preparer === undefined
                  && data.location[0].preparer === undefined) {
                    location.push({
                      courseCode: course,
                      lmsURL: data.lmsURL,
                      requestor: data.requestor,
                      preparer: ''
                    });
              } else if (data.preparer === undefined) {
                location.push({
                  courseCode: course,
                  lmsURL: data.lmsURL,
                  requestor: data.requestor,
                  preparer: data.location[0].preparer
                });
              } else {
                location.push({
                  courseCode: course,
                  lmsURL: data.lmsURL,
                  requestor: data.requestor,
                  preparer: data.preparer
                });
              }

            });
          } else if (data.preparer !== undefined
                && data.lmsURL !== undefined){
                  if (data.requester !== undefined) {
                    location.push({
                      courseCode: data.courseCode,
                      lmsURL: data.lmsURL,
                      requestor: data.requestor,
                      preparer: data.preparer
                    });
                  }
                }
    } else {
      if (data.location !== undefined) {
        if (data.location.courseCode === undefined) {
          location.push({
            courseCode: '',
            lmsURL: '',
            requestor: '',
            preparer: ''
          });
        } else if (data.location.courseCode) {
          location.push({
            courseCode: data.location.courseCode,
            lmsURL: data.location.lmsURL,
            requestor: '',
            preparer: ''
          });
        }
      }
    }
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
    let notes = '';
    if (data.notes !== undefined) {
      notes = data.notes;
      if (data.requestNotes !== undefined) {
        notes += data.requestNotes;
      }
    }
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
    if (x.title !== '3.3 C Solutions 1-6') {
      console.log(x);
      this.afs.collection('accessibility').doc(id).set(x);
    }
  });
});
