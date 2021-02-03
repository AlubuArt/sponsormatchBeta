import {firebase_app,} from '../data/config';


const db = firebase_app.firestore();


export const createSponsor= (value, list, userID) => {
    db.collection('sponsorDatabase/' + userID + '/' + list).add({
        
        name: value.sponsorname,
        phone: value.phone,
        virksomhed: value.virksomhed,
        email: value.email,
        cvrnr: value.cvrnr,
        contactName: value.contactName,
        city: value.city,
        postnr: value.postnr,
        adresse: value.adresse,
        branche: value.branche,
        nameToSearch: value.sponsorname.toLowerCase(),
        
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
