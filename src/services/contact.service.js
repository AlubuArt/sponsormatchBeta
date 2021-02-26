import {firebase_app,} from '../data/config';

const db = firebase_app.firestore();

export const createSponsor= (value, list, userID) => {
    db.collection('users/' + userID + '/' + list).add({
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        virksomhed: value.virksomhed,
        email: value.email,
        cvrnr: value.cvrnr,
        contactName: value.contactName,
        city: value.city,
        postnr: value.postnr,
        adresse: value.adresse,
        branche: value.branche,
         
    })
}

export const deletedUser = (userID, list, contactID) => {
    db.collection('users/' + userID + '/' + list).doc(contactID).delete();
}

export const editUser = (value, list, userID, contactID) => {
    db.collection('users/' + userID + '/' + list).doc(contactID).set({
        adresse: value.adresse,
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        virksomhed: value.virksomhed,
        email: value.email,
        cvrnr: value.cvrnr,
        contactName: value.contactName,
        city: value.city,
        postnr: value.postnr,
        
        branche: value.branche,
        
    })
}
