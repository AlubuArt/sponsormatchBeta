import React, { Fragment, useState, useEffect } from 'react';
import { User, LogOut } from 'react-feather';
import {firebase_app} from "../../../data/config";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {useAuth0} from '@auth0/auth0-react'
import {EditProfile} from '../../../constant'
import { dbRef } from '../../../data/config';

const UserMenu = ({ history }) => {

    
    const [logo, setLogo] = useState('');
    const [currentUser] =  useState(localStorage.getItem('userID'));
    // auth0 profile
    const {logout} = useAuth0()
    const authenticated = JSON.parse(localStorage.getItem("authenticated"))
    
    //flyttes til service
    useEffect(() => {
        const getCurrentUser = () => {
            
            dbRef.ref('/sponsormatchUsers/' +  currentUser + '/profil/forening/userProfilePicture' ).on('value', snapshot =>  {
            const val =  snapshot.val();
            setLogo(val)
            })
        }   
        getCurrentUser(); 
        
          
    }, [currentUser])

    const Logout_From_Firebase = () => {
        localStorage.removeItem('profileURL')
        localStorage.removeItem('token');
        firebase_app.auth().signOut()
        history.push(`${process.env.PUBLIC_URL}/login`)
    }

    const  Logout_From_Auth0 = () =>  {
        localStorage.removeItem("auth0_profile")
        localStorage.setItem("authenticated",false)
        history.push(`${process.env.PUBLIC_URL}/login`)
        logout()
    }

    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={logo} alt="header-user" />
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    <li><Link to={`${process.env.PUBLIC_URL}/users/userEdit`}><User />{EditProfile}</Link></li>
                    <li><a onClick={authenticated ? Logout_From_Auth0 : Logout_From_Firebase} href="#javascript" ><LogOut /> {"Log ud"}</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default withRouter(UserMenu);