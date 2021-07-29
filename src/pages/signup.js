/* eslint-disable no-fallthrough */
/* eslint-disable default-case */

import React, { Fragment, useState, useContext} from 'react';
import sponsormatchLogo from '../assets/images/sponsormatch-logo_farver_login.png';
import { FirstName, LastName,Login,Password,SignUp, EmailAddress, Forening, errorMessageInvalidEmail, errorMesssageInvalidPassword, errorMessageUndefined } from '../constant';
import {firebase_app} from "../data/config";
import {signupUserInDatabase} from '../services/signup.service';
import { toast, ToastContainer } from 'react-toastify';
import {UserContext} from '../auth/context/userContext';



const Signup = ({ history }) => {
    
    const [password, setPassword] = useState("");
    const {setUser} = useContext(UserContext);
    const [userInput, setUserInput] = useState({
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

    const inputGroupHandler = e => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    const signUp = async () => {
        try{
         const user = await signupUserInDatabase(userInput, password);
         setUser(user);
          
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
            await firebase_app.auth().signInWithEmailAndPassword(userInput.email, password);
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
                                                            <input className="form-control"  type="text" name="fname" value={userInput.fname} placeholder="Dit fornavn"  onChange={inputGroupHandler}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="col-form-label">{LastName}</label>
                                                            <input className="form-control" type="text" name="lname" value={userInput.lname} placeholder="Dit efternavn"  onChange={inputGroupHandler}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">{Forening}</label>
                                                    <input className="form-control" type="text" name="foreningName" value={userInput.foreningName}placeholder="Din forenings navn" onChange={inputGroupHandler}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">{EmailAddress}</label>
                                                    <input className="form-control" type="text" name="email" value={userInput.email} placeholder="eksemple@klub.dk" input="email" onChange={inputGroupHandler}/>
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