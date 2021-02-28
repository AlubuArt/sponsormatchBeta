import {db} from '../data/config';
import 'firebase/storage';


export const getAllSponsoraterFromDatabase = async (currentUser) => {

    var result = [];
    var userRef = db.collection('users/' + currentUser + '/sponsorater' );

    await userRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        })
    })
    return result;
}


export const getFilteredSponsoraterFromDatabase = async (currentUser, filter) => {

    var result = [];
    var userRef = db.collection('users/' + currentUser + '/sponsorater' ).where(filter, '==', 'aktiv');

    await userRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        })
    })
    return result;
}


