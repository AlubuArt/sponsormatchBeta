/* eslint-disable no-fallthrough */
/* eslint-disable default-case */

import React, { Fragment, useState, useReducer, useEffect } from 'react';
import sponsormatchLogo from '../assets/images/sponsormatch-logo_farver_login.png';
import { FirstName, LastName,Login,Password,SignUp, EmailAddress, Forening } from '../constant';
import {firebase_app, dbRef} from "../data/config";
import { toast, ToastContainer } from 'react-toastify';

const Signup = ({ history }) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState('')
    const [value, setValue] = useReducer((value, newValue) => ({...value, ...newValue}), {
        foreningName: ' ',
        fname: '',
        lname: '',
        telephonenr: '',
        adresse: '',
        city: '',
        postnr: '',
        email: '',
        clubDescription: '',
        logo: ''
    })
    firebase_app.auth().onAuthStateChanged(setCurrentUser);

    const handleButtonClickLoginIn = async (e) => {
        e.preventDefault()
        signUpAndMakeDatabase()
        redirectToProfilePageAfterSucces()
    }
    
    const signUpAndMakeDatabase = async () => {
        try {
            const userObject = await firebase_app.auth().createUserWithEmailAndPassword(value.email, password)
            const user = userObject.user
            const userID = user.uid
            const setUidInDatabase = {[ `/sponsormatchUsers/${userID}/profil/forening`]: value}     
            await dbRef.ref().update(setUidInDatabase);
        } catch (error) {
            switch(error.code) {
                case "auth/invalid-email":
                    toast.error("Emailen du har indtastet er ugyldig. Forsøg venligst med en anden email."); 
                case "auth/weak-password":
                    toast.error("Kodeordet du har valgt er for svagt. Vælg et kodeord med mindst 6 tegn og mindst 1 tal.");
                }
            }
    }

    const redirectToProfilePageAfterSucces = async () => {
        try {
            await firebase_app.auth().signInWithEmailAndPassword(email, password);
            history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
        } catch (error) {
            setTimeout(() => {
                toast.error("Noget gik galt. Vi kunne ikke logge dig ind.");
            }, 200);
        }
    }


    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="container-fluid">
                    {/* <!-- sign up page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-sm-12 p-0">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="text-center"><img src={sponsormatchLogo} alt="" /></div>
                                        <div className="card mt-4 p-4">
                                            <h4 className="text-center">{"OPRET NY BRUGER"}</h4>
                                            <h6 className="text-center">{"Din email bruges til login"}</h6>
                                            <form className="theme-form">
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="col-form-label">{FirstName}</label>
                                                            <input className="form-control" type="text" placeholder="Dit fornavn"  onChange={((e) => setValue({fname: e.target.value}))}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="col-form-label">{LastName}</label>
                                                            <input className="form-control" type="text" placeholder="Dit efternavn"  onChange={((e) => setValue({lname: e.target.value}))}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">{Forening}</label>
                                                    <input className="form-control" type="text" placeholder="Din forenings navn" onChange={((e) => setValue({foreningName: e.target.value}))}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">{EmailAddress}</label>
                                                    <input className="form-control" type="text" placeholder="eksemple@klub.dk" onChange={((e) => setValue({email: e.target.value}))}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">{Password}</label>
                                                    <input className="form-control" type="password" placeholder="**********" onChange={((e) => setPassword(e.target.value))}/>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-sm-4">
                                                        <button className="btn btn-primary" type="submit" onClick={handleButtonClickLoginIn}>{SignUp}</button>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="text-left mt-2 m-l-20">{"Har du allerede en konto?"}  <a className="btn-link text-capitalize" href="/endless/dashboard/default">{Login}</a></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- sign up page ends--> */}
                    <ToastContainer />
                </div>
            </div>
        </Fragment>
    );
};

export default Signup;