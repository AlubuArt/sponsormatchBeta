import {firebase_app, auth0} from '../data/config'

let user = '';

export const setFirebaseUser = (currentUser) => {
    user = {id: currentUser.user.uid};
    console.log(user.id)

}

export const getSponsorsFromDatabase = (currentUser) => {

    console.log(user.id)
}