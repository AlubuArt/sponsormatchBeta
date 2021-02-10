import {firebase_app,} from '../data/config';

const db = firebase_app.firestore();

export const createSponsor= (value, list, userID) => {
    db.collection('sponsorDatabase/' + userID + '/' + list).add({
        firstName: value.fname,
        lastName: value.lname,
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
    db.collection('sponsorDatabase/' + userID + '/' + list).doc(contactID).delete();
}

export const editUser = (value, list, userID) => {
    db.collection('sponsorDatabase/' + userID + '/' + list).set({
        firstName: value.fname,
        lastName: value.lname,
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
