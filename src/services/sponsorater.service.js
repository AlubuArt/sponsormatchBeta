import {db} from '../data/config';


import 'firebase/storage';


export const getSponsoraterFromDatabase = (currentUser) => {

    var userRef = db.collection('users/' + currentUser + '/sponsorater' );

    userRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var amount = doc.data();
            console.log(amount.amount);
        })
    })
    

}