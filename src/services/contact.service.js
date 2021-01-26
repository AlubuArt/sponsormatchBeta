import {firebase_app,} from '../data/config';
import user from '../assets/images/user/user.png';

const db = firebase_app.firestore();


export const createSponsor= (value, list, userID) => {
    db.collection('sponsorDatabase/' + userID + '/' + list).add({
        
        name: value.name,
        phone: value.phone,
        virksomhed: value.virksomhed,
        email: value.email,
        cvrnr: value.cvrnr,
        contactName: value.contactName,
        city: value.city,
        postnr: value.postnr,
        adresse: value.adresse,
        branche: value.branche,
        nameToSearch: value.name.toLowerCase(),
        
    })
}

export const deletedUser = (userId) => {
    return firebase_app.firestore().collection('contactApp').doc(userId).delete();
}

export const editUser = (value, list, userID) => {
    db.collection('contactApp').doc(userID).set({
        name: value.name,
        phone: value.phone,
        virksomhed: value.virksomhed,
        email: value.email,
        cvrnr: value.cvrnr,
        contactName: value.contactName,
        city: value.city,
        postnr: value.postnr,
        adresse: value.adresse,
        branche: value.branche,
        nameToSearch: value.name.toLowerCase(),
    })
}
