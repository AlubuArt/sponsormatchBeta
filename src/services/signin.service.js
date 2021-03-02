import {firebase_app, Jwt_token} from '../data/config';
import 'firebase/storage';

const db = firebase_app.firestore();
const coll = db.collection('users/');


export const loginUser = async (email, pass) => {
    
        const currentUser = await firebase_app.auth().signInWithEmailAndPassword(email, pass);
            const uid =  currentUser.user.uid;
            localStorage.setItem('userID', uid)
            localStorage.setItem('token', Jwt_token);

}



