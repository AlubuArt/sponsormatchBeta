import {firebase_app, dbRef} from '../data/config';
import firebase from 'firebase/app'

import 'firebase/storage';

const storage = firebase_app.storage();
const storageRef = storage.ref();


export const getUserFromDatabase = async (currentUser) => {
    var data;
    await dbRef.ref('/sponsormatchUsers/' + currentUser + '/profil/forening/' ).once('value', snapshot => {
        const value = snapshot.val();
        data = value;
    })
    return data;
}

export const updateUserDataInDatabase = async (currentUser, dataToupdate) => {
    
    await dbRef.ref('/sponsormatchUsers/' + currentUser + '/profil/forening/').update(dataToupdate, function(error)  {
        if(error) {
            console.log("update failed")
        } else {
            console.log("Profil blev opdateret")
        }
    })
}

export const uploadUserProfilePicture = async (currentUser, fileToUpload) => {
    
   // Upload file to the foolder 'profileImages/'
    var uploadTask = storageRef.child('profileImages/' + fileToUpload.name).put(fileToUpload);

    
    uploadTask.on('state_changed',(snapshot) => {
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
     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL); 
        addProfilePictureToUserProfile(currentUser, downloadURL);
              
      })   
      
    }
  );
  
}

const addProfilePictureToUserProfile = async (currentUser, URLToFile) => {
    
    await dbRef.ref('/sponsormatchUsers/' + currentUser + '/profil/forening/').update({userProfilePicture: URLToFile}, function(error)  {
        if(error) {
            console.log("update failed")
        } else {
            console.log("Profil blev opdateret")
        }
    })

}

export const uploadClubLogo = async (currentUser, fileToUpload) => {
    
  // Upload file to the foolder 'profileImages/'
   var uploadTask = storageRef.child('clubLogoes/' + fileToUpload.name).put(fileToUpload);

   
   uploadTask.on('state_changed',(snapshot) => {
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
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
       console.log('File available at', downloadURL); 
       addClubLogoToUserProfile(currentUser, downloadURL);
             
     })   
     
   }
 );
 
}

const addClubLogoToUserProfile = async (currentUser, URLToFile) => {
  await dbRef.ref('/sponsormatchUsers/' + currentUser + '/profil/forening/').update({logo: URLToFile}, function(error)  {
    if(error) {
        console.log("update failed")
    } else {
        console.log("Logo blev opdateret")
    }
})

}

