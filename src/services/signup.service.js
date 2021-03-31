import {firebase_app, Jwt_token} from '../data/config';
import 'firebase/storage';

const db = firebase_app.firestore();
const coll = db.collection('users/');


export const signupUserInDatabase = async (value, pass) => {
    
        const userObject = await firebase_app.auth().createUserWithEmailAndPassword(value.email, pass);
        const user = userObject.user;
        const userID = user.uid;   
        await coll.doc(userID).set({
                userID: userID, 
                fname: value.fname, 
                lname: value.lname, 
                foreningName: value.foreningName,  
                email: value.email})
        
        localStorage.setItem('userID', userID)
        //localStorage.setItem('token', Jwt_token);

}



