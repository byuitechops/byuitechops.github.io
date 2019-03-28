//checks if the user has actually finished a prep before starting another one + handles permission requirements
firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
            //user is logged in
            db.collection('users').where('name', '==', user.displayName).get()
                  .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                              if (!doc.data().lead) {
                                    window.location.assign('/home.html');
                              } else {
                                    fillUserTable();
                                    fillTranscriptTable();
                              }
                        })
                  })
      } else {
            //do nothing
      }
})

function fillUserTable() {
      document.getElementById('master-table-user').innerHTML = '';
      db.collection('users').orderBy("name").get()
            .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                        var currentAction;

                        if (doc.data().currentAction != '') {
                              currentAction = doc.data().currentAction.toUpperCase();
                        } else {
                              currentAction = ' -- ';
                        }

                        document.getElementById('master-table-user').insertAdjacentHTML('beforeend',
                              `<p>${doc.data().name}</p> <p>${doc.data().role}</p> <p>${currentAction}</p> <button onclick="displayUserInfo('${doc.id}')" 
            class="bg-primary btn-hover prepare-btn"> View / Edit </button>`)
                  })
            })
}


function fillTranscriptTable(courseCode) {
      document.getElementById('master-table-transcript').innerHTML = '';
      if (courseCode == undefined) {
            db.collection("accessibility").orderBy('priority').get()
                  .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                              var p = `<p> ${doc.data().priority}</p> <p>${doc.data().courseCode}</p> <p style="padding-right: .5rem; overflow-x:hidden;">${doc.data().title}</p>
                    <p>${doc.data().status}</p>  <button onclick="displayTranscriptInfo('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                    View / Edit</button>`;
                              document.getElementById('master-table-transcript').insertAdjacentHTML('beforeend', p);
                        })
                  })
      } else {
            db.collection("accessibility").orderBy('priority').where('courseCode', '==', courseCode).get()
                  .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                              var p = `<p> ${doc.data().priority}</p> <p>${doc.data().courseCode}</p> <p style="padding-right: .5rem;">${doc.data().title}</p>
                    <p>${doc.data().status}</p>  <button onclick="displayTranscriptInfo('${doc.id}')" class="bg-primary btn-hover prepare-btn">
                    View / Edit</button>`;
                              document.getElementById('master-table-transcript').insertAdjacentHTML('beforeend', p);
                        })
                  })
      }

}

function displayUserInfo(userID) {
      // var totals = await getTotals(userID); // used to manually go over all the transcripts and count the user's actions. no longer used anymore because
      // counts are being made throughout the whole process
      db.collection('users').doc(userID).get()
            .then(function (doc) {
                  document.getElementById('storeUserID').innerText = userID;
                  document.getElementById('info-username').innerText = doc.data().name;
                  document.getElementById('info-role').innerText = doc.data().role;
                  document.getElementById('info-typing').innerText = doc.data().typing
                  document.getElementById('info-transcriptsRequested').innerText = doc.data().requests;
                  document.getElementById('info-transcriptsPrepared').innerText = doc.data().prepares;
                  document.getElementById('info-transcriptions').innerText = doc.data().transcriptions;
                  document.getElementById('info-transcriptsReviewed').innerText = doc.data().reviews;
                  document.getElementById('info-currentAction').innerText = doc.data().currentAction != '' ? doc.data().currentAction.toUpperCase() : '--';
                  document.getElementById('info-totalAction').innerText = doc.data().requests + doc.data().prepares + doc.data().transcriptions + doc.data().reviews;
                  document.getElementById('reset-action').disabled = false;
                  document.getElementById('user-info-box').classList.remove('hide');
            })
}

function displayTranscriptInfo(transcriptID) {
      db.collection('accessibility').doc(transcriptID).get()
            .then(function (doc) {
                  console.log(doc.data());
                  document.getElementById('storeTranscriptID').innerText = doc.id;
                  document.getElementById('transcript-title').innerText = 'Transcript Title: ' + doc.data().title;
                  document.getElementById('transcript-status').innerText = 'Stage: ' + doc.data().status;
                  document.getElementById('transcript-code').innerText = 'Course Code: ' + doc.data().courseCode;
                  document.getElementById('transcript-priority').innerText = 'Priority: ' + doc.data().priority;
                  document.getElementById('transcript-type').innerText = 'Type: ' + doc.data().type;
                  if (doc.data().length != undefined) {
                        document.getElementById('transcript-length').innerText = 'Length: ' + doc.data().length;
                  } else {
                        document.getElementById('transcript-length').innerText = 'Length: -- ';
                  }

                  if (doc.data().height != undefined) {
                        document.getElementById('transcript-height').innerText = 'Height: ' + doc.data().height;
                  } else {
                        document.getElementById('transcript-height').innerText = 'Height: -- '
                  }

                  if (doc.data().docEditURL != undefined) {
                        document.getElementById('transcript-googleEditLink').setAttribute('href', doc.data().docEditURL);
                  }

                  if (doc.data().docPublishURL != undefined) {
                        document.getElementById('transcript-googlePubLink').setAttribute('href', doc.data().docPublishURL);
                  }

                  if(doc.data().copied) { 
                        document.getElementById('btn-delete-transcript').classList.remove('hide');
                  }

                  document.getElementById('transcript-canvasLink').setAttribute('href', doc.data().lmsURL);
                  document.getElementById('transcript-mediaLink').setAttribute('href', doc.data().srcURL);

                  if (doc.data().verbit != undefined) {
                        document.getElementById('transcript-verbit').innerText = 'Verbit Used: ' + doc.data().verbit;
                  } else {
                        document.getElementById('transcript-verbit').innerText = 'Verbit Used: Not yet set'
                  }

                  document.getElementById('transcript-verbitID').innerText = 'Verbit ID: ' + doc.data().verbitID;
                  document.getElementById('transcript-copied').innerText = 'Copied as duplicate: ' + doc.data().copied;
                  document.getElementById('transcript-copiedFrom').innerText = 'Copied from: -- ';
                  //right half of the transcript info box starts here
                  if (doc.data().requestor != undefined && doc.data().requestDate != undefined) {
                        document.getElementById('transcript-requestor').innerText = 'Requested by: ' + doc.data().requestor;
                        document.getElementById('transcript-requestDate').innerText = 'Requested on: ' + doc.data().requestDate.toDate().toString().slice(4, 15);
                  } else {
                        document.getElementById('transcript-requestor').innerText = 'Requested by: -- ';
                        document.getElementById('transcript-requestDate').innerText = 'Requested on: --'
                  }

                  if (doc.data().preparer != undefined && doc.data().datePrepareFinished != undefined) {
                        document.getElementById('transcript-preparer').innerText = 'Prepared by: ' + doc.data().preparer;
                        document.getElementById('transcript-prepareDate').innerText = 'Prepared Completed on:  ' + doc.data().datePrepareFinished.toDate().toString().slice(4, 15);
                  } else {
                        document.getElementById('transcript-preparer').innerText = 'Prepared by: --';
                        document.getElementById('transcript-prepareDate').innerText = 'Prepared Completed on: --';
                  }

                  if (doc.data().transcriber != undefined && doc.data().dateTranscriptionFinished != undefined) {
                        document.getElementById('transcript-transcriber').innerText = 'Transcribed by: ' + doc.data().transcriber;
                        document.getElementById('transcript-transcriptionDate').innerText = 'Transcription Completed on: ' + doc.data().dateTranscriptionFinished.toDate().toString().slice(4, 15);
                  } else {
                        document.getElementById('transcript-transcriber').innerText = 'Transcribed by: --';
                        document.getElementById('transcript-transcriptionDate').innerText = 'Transcription Completed on: --';
                  }

                  if (doc.data().reviewer != undefined && doc.data().dateReviewFinished != undefined) {
                        document.getElementById('transcript-reviewer').innerText = 'Reviewed by: ' + doc.data().reviewer;
                        document.getElementById('transcript-reviewDate').innerText = 'Review Completed on: ' + doc.data().dateReviewFinished.toDate().toString().slice(4, 15);
                  } else {
                        document.getElementById('transcript-reviewer').innerText = 'Reviewed by: --';
                        document.getElementById('transcript-reviewDate').innerText = 'Review Completed on: --';
                  }

                  if (doc.data().requestNotes != undefined) {
                        document.getElementById('transcript-requestNotes').innerText = 'Request Notes: ' + doc.data().requestNotes;
                  } else {
                        document.getElementById('transcript-requestNotes').innerText = 'Request Notes: -- '
                  }

                  if (doc.data().returnToPrepNote != undefined) {
                        document.getElementById('transcript-returnNotes').innerText = 'Return to Prep Notes: ' + doc.data().returnToPrepNote;
                  } else {
                        document.getElementById('transcript-returnNotes').innerText = 'Return to Prep Notes: --';
                  }

                  document.getElementById('transcript-info-box').classList.remove('hide');
                  document.getElementById('transcript-info-box').querySelectorAll('undefined');
            })
}

function resetAction() {
      console.log('run');
}


//calculates the total amount of transcripts of each user
function getTotals(userID) {
      return new Promise((resolve, reject) => {
            var name = [];
            var objectTotal = {
                  requests: 0,
                  prepares: 0,
                  transcriptions: 0,
                  reviews: 0
            };
            db.collection('users').doc(userID).get()
                  .then(function (doc) {
                        name.push(doc.data().name);
                        db.collection('accessibility').where('requestor', '==', name[0]).get()
                              .then(function (querySnapshot) {
                                    objectTotal.requests = querySnapshot.size;
                              }).then(() => {
                                    db.collection('accessibility').where('preparer', '==', name[0]).get()
                                          .then(function (querySnapshot) {
                                                objectTotal.prepares = querySnapshot.size;
                                          }).then(() => {
                                                db.collection('accessibility').where('transcriber', '==', name[0]).get()
                                                      .then(function (querySnapshot) {
                                                            objectTotal.transcriptions = querySnapshot.size;
                                                      }).then(() => {
                                                            db.collection('accessibility').where('reviewer', '==', name[0]).get()
                                                                  .then(function (querySnapshot) {
                                                                        objectTotal.reviews = querySnapshot.size;
                                                                        resolve(objectTotal);
                                                                  })
                                                      })
                                          })
                              })


                  }, err => {
                        console.log('There was an error =>', err);
                  })
      }) //ends the promise;
}

function toggleTab(i) {
      if (i == 1) {
            document.getElementById('tab-users').classList.add('option-selected');
            document.getElementById('tab-transcripts').classList.remove('option-selected');
            document.getElementById('users-table').classList.remove('hide');
            document.getElementById('transcripts-table').classList.add('hide');
            document.getElementById('requestCourse').classList.add('hide');
            document.getElementById('transcript-info-box').classList.add('hide');
      } else { //switches to the transcript tab
            document.getElementById('tab-users').classList.remove('option-selected');
            document.getElementById('tab-transcripts').classList.add('option-selected');
            document.getElementById('users-table').classList.add('hide');
            document.getElementById('transcripts-table').classList.remove('hide');
            document.getElementById('user-info-box').classList.add('hide');
            document.getElementById('requestCourse').classList.remove('hide');
      }
}


getCourses();

function getCourses() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status === 200) {
                  var res = JSON.parse(this.responseText);
                  var id = res._id;
                  var newxhttp = new XMLHttpRequest();
                  newxhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status === 200) {
                              var newres = JSON.parse(this.responseText);
                              for (var i = 0; i < newres.length; i++) {
                                    var course = newres[i]['__catalogCourseId'];
                                    document.getElementById('requestCourse').insertAdjacentHTML('beforeend', '<option value=\'' + course + '\'>' + course + '</option>');
                              }
                        }
                  };
                  newxhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/courses/' + id, true);
                  newxhttp.send();
            }
      };
      xhttp.open('GET', 'https://byui.kuali.co/api/v1/catalog/public/catalogs/current', true);
      xhttp.send();
}

function editItem(item) {
      console.log(item);
      editModal.style.display = "block";
      if (item == 'typing') {
            var id = document.getElementById('storeUserID').innerText;
            document.getElementById('newValue').placeholder = 'New Typing Speed';
            document.getElementById('editComplete').setAttribute('onclick', `editComplete('${id}', '${item}')`);
      } else {
            var id = document.getElementById('storeTranscriptID').innerText;
            document.getElementById('newValue').placeholder = "New " + item;
            document.getElementById('editComplete').setAttribute('onclick', `editComplete('${id}', '${item}')`);
      }
}

function editComplete(id, item) {
      console.log(id);
      console.log(item);
      var newValue = document.getElementById('newValue').value;
      var json = JSON.parse(`{"${item}": "${newValue}"}`);
      if (item == 'typing') {
            db.collection('users').doc(id).update(json)
                  .then(() => {
                        console.log('document updated')
                        editModal.style.display = "none";
                        document.getElementById('user-info-box').classList.add('hide');
                  })
      } else {
            var json;
            if (Number.isInteger(Number(newValue))) {
                  json = JSON.parse(`{"${item}" : ${newValue}}`);
                  console.log('int called;')
            }
            else {
                  json = JSON.parse(`{"${item}" : "${newValue}"}`)
                  console.log('string called;')
            }
            db.collection('accessibility').doc(id).update(json)
                  .then(solved => {
                        console.log('Document Changed Successfuly')
                        displayTranscriptInfo(id);
                        editModal.style.display = "none";
                        document.getElementById('newValue').value = '';
                  })
      }

}

document.getElementById('btn-delete-transcript').addEventListener('click', () => {
      var id = document.getElementById('storeTranscriptID').innerText;
      db.collection('accessibility').doc(id).delete()
      .then(()=> { 
            console.log('transcript deleted');
            document.getElementById('transcript-info-box').classList.add('hide');
            fillTranscriptTable();
      })
})

var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
      editModal.style.display = "none";
}

function buildUserObject(id) {
      return new Promise((resolve, reject) => { 
            db.collection('users').doc(id).get()
            .then(function(doc) { 
                  resolve(doc.data());
            })
      }) 
     
}

async function readNewObject(id) { 
      var newObject = await buildUserObject(id);
      console.log(newObject);
}

