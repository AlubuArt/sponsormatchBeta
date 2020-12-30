import React, { Fragment, useState, useReducer, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import {Email,ContactUs,Location} from '../../constant'
import { firebase_app, dbRef } from '../../data/config';
import { forEach } from 'lodash';




const UserProfile = () => {

    const [currentUser, setCurrentUser] =  useState(localStorage.getItem('userID'));
    const [userInfo, setUserInfo] = useReducer((value, newValue) => ({...value, ...newValue}), {
        foreningName: ' ',
        fname: '',
        lname: '',
        telephonenr: '',
        adresse: '',
        city: '',
        postnr: '',
        email: '',
        clubDescription: '',
        website: '',
        logo: ''
    })
    
    const getUserDataFromDatabase = () => {
        dbRef.ref('/sponsormatchUsers/' + currentUser + '/profil/forening/' ).once('value', snapshot => {
            const value = snapshot.val();
            for (let [key, val] of Object.entries(value)) {
                setUserInfo({[key]: val})
            }
        })
    }

    useEffect(() => {
        getUserDataFromDatabase()
 
    }, [])
    

    
    return (
        <Fragment>
            <Breadcrumb parent="Profil" title="Klub profil" />
            <div className="container-fluid">
                <div className="user-profile">
                    <div className="row">
                        {/* <!-- user profile first-style start--> */}
                        <div className="col-sm-12">
                            <div className="card hovercard text-center">
                                <div className="cardheader"></div>
                                <div className="user-image ">
                                    <div className="avatar ">
                                        <img className="pro" alt="" src={userInfo.logo} data-intro="This is Profile image" />
                                    </div>
                                    <div className="icon-wrapper">
                                        <i className="icofont icofont-pencil-alt-5" data-intro="Change Profile image here" >
                                            <input className="pencil" type="file"/>
                                        </i>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="row detail" data-intro="This is the your details">
                                        <div className="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left">
                                                        <h6><i className="fa fa-envelope mr-2"></i>{Email}</h6><span>{userInfo.email}</span>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                                            <div className="user-designation">
                                                <div className="title"><a target="_blank" href="javascript">{userInfo.foreningName}</a></div>
                                                <div className="desc mt-2">Sponsoransvarlig</div>
                                                <div className="sponsoransvarlig-navn">{userInfo.fname} {userInfo.lname}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left ttl-xs-mt">
                                                        <h6><i className="fa fa-phone"></i>{ContactUs}</h6><span>{userInfo.telephonenr}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left ttl-sm-mb-0">
                                                        <h6><i className="fa fa-location-arrow"></i>{Location}</h6><span>{userInfo.city}, {userInfo.postnr} {userInfo.adresse}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserProfile;