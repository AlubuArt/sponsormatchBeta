import {firebase_app,} from '../data/config';

const db = firebase_app.firestore();


export const getForeningNameFromDatabase = async (currentUser) => {

    var name; 
    var userRef =  db.collection('users/').doc(currentUser);

    await userRef.get().then((doc) => {
        if(doc.exists) {
            name = doc.data().foreningName; 
        }
    })
    
    return name;
}  

export const getForeningLogoFromDatabase = async (currentUser) => {

    var logo; 
    var userRef =  db.collection('users/').doc(currentUser);

    await userRef.get().then((doc) => {
        if(doc.exists) {
            logo = doc.data().logo; 
        }
    })
    
    return logo;
} 

