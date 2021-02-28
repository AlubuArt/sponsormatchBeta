import {db} from '../data/config';
import 'firebase/storage';


export const getSponsoraterFromDatabase = async (currentUser) => {

    var  sponsoratData = [];
    var userRef = db.collection('users/' + currentUser + '/sponsorater' );

    await userRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            sponsoratData.push(doc.data());
        })
    })
    return sponsoratData;
}