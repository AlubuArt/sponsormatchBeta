/* eslint-disable no-fallthrough */
/* eslint-disable default-case */

import React, { Fragment, useState, useReducer} from 'react';
import sponsormatchLogo from '../assets/images/sponsormatch-logo_farver_login.png';
import { FirstName, LastName,Login,Password,SignUp, EmailAddress, Forening, errorMessageInvalidEmail, errorMesssageInvalidPassword, errorMessageUndefined } from '../constant';
import {firebase_app} from "../data/config";
import {signupUserInDatabase} from '../services/signup.service';
import { toast, ToastContainer } from 'react-toastify';


const Signup = ({ history }) => {
    
    const [password, setPassword] = useState("");
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
    
    const handleButtonClickLoginIn = (e) => {
        e.preventDefault()
        signUp();
        
    }

    const signUp = async () => {
        try{
         await signupUserInDatabase(value, password);
          
        } catch (error) {
            switch(error.code) {
                case "auth/invalid-email":
                    toast.error(errorMessageInvalidEmail); 
                case "auth/weak-password":
                    toast.error(errorMesssageInvalidPassword);
                }
        }
        redirectToProfilePageAfterSucces() 
        
    }
    

    const redirectToProfilePageAfterSucces = async () => {
        try {
            await firebase_app.auth().signInWithEmailAndPassword(value.email, password);
            history.push(`${process.env.PUBLIC_URL}/forside`);
        } catch (error) {
            setTimeout(() => {
                toast.error(errorMessageUndefined);
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
                                                    <input className="form-control" type="text" placeholder="eksemple@klub.dk" input="email" onChange={((e) => setValue({email: e.target.value}))}/>
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