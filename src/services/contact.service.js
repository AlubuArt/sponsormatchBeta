import {firebase_app,} from '../data/config';
import user from '../assets/images/user/user.png';

const db = firebase_app.firestore();


export const createSponsor= (value, list, userID) => {
    db.collection('sponsorDatabase/' + userID + '/' + list).add({
        
        name: value.name,
        surname: value.surname,
        mobile: value.mobile,
        virksomhed: value.virksomhed,
        email: value.email,
        cvrnr: value.cvrnr,
        nameToSearch: value.name.toLowerCase(),
        
    })
}

export const deletedUser = (userId) => {
    return firebase_app.firestore().collection('contactApp').doc(userId).delete();
}

export const editUser = (value, url, userId) => {
    db.collection('contactApp').doc(userId).set({
        name: value.name,
        surname: value.surname,
        mobile: value.mobile,
        virksomhed: value.virksomhed,
        email: value.email,
        cvrnr: value.cvrnr,
        nameToSearch: value.name.toLowerCase()
    })
}
