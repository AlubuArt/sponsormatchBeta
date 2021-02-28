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


export const getFilteredSponsoraterFromDatabase = async (currentUser, filter ) => {

    var result = [];
    var userRef = db.collection('users/' + currentUser + '/sponsorater' ).where('status', '==', filter)


    await userRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        })
    })
    return result;
}

export const getFilteredSponsoraterFromDatabas =  async (currentUser, filter ) => {

    var result = [];
    var userRef = db.collection('users/' + currentUser + '/sponsorater' ).where('status', '==', filter)
    

    await userRef.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        })
    })
    console.log(result)
    return result;
}


