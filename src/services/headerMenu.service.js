import {firebase_app,} from '../data/config';

const db = firebase_app.firestore();


export const getProfilePictureFromDatabase = async (currentUser) => {

    var profilePictureURL; 
    var userRef =  db.collection('users/').doc(currentUser);

    await userRef.get().then((doc) => {
        if(doc.exists) {
            profilePictureURL = doc.data().userProfilePicture; 
        }
    })
    console.log(profilePictureURL)
    return profilePictureURL;
}  