import {firebase_app,} from '../data/config';

const db = firebase_app.firestore();

export const createSponsor = (value, list, userID, contactID) => {
    db.collection('users/' + userID + '/' + list).doc(contactID).set({
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
         
    })
}

export const deleteContactFromDatabase = (userID, list, contactID) => {
    db.collection('users/' + userID + '/' + list).doc(contactID).delete();
}

export const editContactInDatabase = (value, list, userID, contactID) => {
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


export const getContactsFromDatabase = async (userID, collection) => {

    var result = [];
    var ref =  db.collection('users/' + userID + collection );
    await ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            result.push(doc.data());
        })
    })
   
    return result;

}
