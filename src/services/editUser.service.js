import {firebase_app, dbRef} from '../data/config';
import firebase from 'firebase/app'

import 'firebase/storage';

const storage = firebase_app.storage();
const storageRef = storage.ref();
const db = firebase_app.firestore();
const coll = db.collection('users/');

export const getUserFromDatabase = async (currentUser) => {
  var data;
  var ref = coll.doc(currentUser);
  await ref.get().then((doc) => {
    data = doc.data();
  })
  
  return data;
}

export const updateUserDataInDatabase = async (currentUser, dataToUpdate) => {
  var ref = coll.doc(currentUser);
  await ref.set({
        foreningName: dataToUpdate.foreningName,
        fname: dataToUpdate.fname,
        lname: dataToUpdate.lname,
        telephonenr: dataToUpdate.telephonenr,
        adresse: dataToUpdate.adresse,
        city: dataToUpdate.city,
        postnr: dataToUpdate.postnr,
        email: dataToUpdate.email,
        clubDescription: dataToUpdate.clubDescription,
        website: dataToUpdate.website,
        logo: dataToUpdate.logo,
        userProfilePicture: dataToUpdate.userProfilePicture
  }, {merge: true})

}


export const uploadFileToStorage = async (currentUser, fileToUpload, key) => {
    
  // Upload file to the foolder 'profileImages/'
   var uploadTask = storageRef.child('clubLogoes/' + fileToUpload.name).put(fileToUpload);

   uploadTask.on('state_changed', async (snapshot) => {
     // Observe state change events such as progress, pause, and resume
     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
     // eslint-disable-next-line default-case
     switch (snapshot.state) {
       case firebase.storage.TaskState.PAUSED: // or 'paused'
         console.log('Upload is paused');
         break;
       case firebase.storage.TaskState.RUNNING: // or 'running'
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     // Handle unsuccessful uploads
   }, 
  () => {
     // Handle successful uploads on complete
     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((URLToFile) => {
       console.log('File available at', URLToFile); 
      addFileToUserProfile(currentUser, key, URLToFile );
     })   
   }
 );
 return;
}

const addFileToUserProfile = (currentUser, key, URLToFile) => {
  var ref = coll.doc(currentUser);
  ref.set({
    [key]: URLToFile

  }, {merge: true} );
}

