import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import {Email,ContactUs,MarkJecno,Location, TotalFeedback, Uses} from '../../constant'
import { firebase_app, dbRef } from '../../data/config';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';



const UserProfile = () => {
    const [url, setUrl] = useState();
    const [email, setEmail] = useState('');
    const [currentUser, setCurrentUser] =  useState('');
    const [foreningName, setForeningName] = useState()
    const [name, setName] = useState('');
    const [sponsoransvarlig, setSponsoransvarlig] = useState('')
    const [telefon, setTelefon] = useState('')
    const [adresse, setAdresse] = useState('')
    const [by, setBy] = useState('')
    const [postnr, setPostnr] = useState('')
    const [logo, setLogo] = useState('');
    
    
    useEffect(() => {
            setUser();
    }, [])

    const setUser = () => {
        firebase_app.auth().onAuthStateChanged(setCurrentUser);
    }

   function getUserData() {
        
            dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/foreningsnavn' ).once('value', snapshot => {
                const value = snapshot.val();
                setName(value)
            })
            dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/adresse' ).once('value', snapshot => {
                const value = snapshot.val();
                setAdresse(value)
            })
            dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/logo' ).once('value', snapshot => {
                const value = snapshot.val();
                setLogo(value)
            })
            dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/by' ).once('value', snapshot => {
                const val = snapshot.val();
                setBy(val)
            })
            dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/postnr' ).once('value', snapshot => {
                const val = snapshot.val();
                setPostnr(val)
            })
            dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/forening/sponsoransvarlig' ).once('value', snapshot => {
                const value = snapshot.val();
                setSponsoransvarlig(value)
            }) 
            dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/kontaktperson/email' ).once('value', snapshot => {
                const email = snapshot.val();
                setEmail(email)
                }) 
             
            dbRef.ref('/sponsormatchUsers/' + currentUser.uid + '/profil/kontaktperson/telefonnr' ).once('value', snapshot => {
                const value = snapshot.val();
                setTelefon(value)
                }) 
            
            
    }

    getUserData()
    


    const readUrl = (event) => {
        if (event.target.files.length === 0)
            return;
        //Image upload validation
        var mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            setUrl(reader.result)
        }
    }
    
    return (
        <Fragment>
            <Breadcrumb parent="Users" title="Klub profil" />
            <div className="container-fluid">
                <div className="user-profile">
                    <div className="row">
                        {/* <!-- user profile first-style start--> */}
                        <div className="col-sm-12">
                            <div className="card hovercard text-center">
                                <div className="cardheader"></div>
                                <div className="user-image ">
                                    <div className="avatar ">
                                        <img className="pro" alt="" src={logo} data-intro="This is Profile image" />
                                    </div>
                                    <div className="icon-wrapper">
                                        <i className="icofont icofont-pencil-alt-5" data-intro="Change Profile image here" >
                                            <input className="pencil" type="file" onChange={(e) => readUrl(e)} />
                                        </i>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="row detail" data-intro="This is the your details">
                                        <div className="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left">
                                                        <h6><i className="fa fa-envelope mr-2"></i>{Email}</h6><span>{email}</span>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                                            <div className="user-designation">
                                                <div className="title"><a target="_blank" href="javascript">{name}</a></div>
                                                <div className="desc mt-2">Sponsoransvarlig</div>
                                                <div className="sponsoransvarlig-navn">{sponsoransvarlig}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left ttl-xs-mt">
                                                        <h6><i className="fa fa-phone"></i>{ContactUs}</h6><span>{telefon}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="ttl-info text-left ttl-sm-mb-0">
                                                        <h6><i className="fa fa-location-arrow"></i>{Location}</h6><span>{by}, {postnr} {adresse}</span>
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