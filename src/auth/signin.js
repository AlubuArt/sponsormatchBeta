import React, { useState, useEffect } from 'react';
import sponsormatchLogo from '../assets/images/sponsormatch-logo_farver_login.png';
import man from '../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router";
import  {firebase_app, googleProvider, facebookProvider, twitterProvider, githubProvider,Jwt_token } from "../data/config";
import { handleResponse } from "../services/fack.backend";
import { useAuth0 } from '@auth0/auth0-react'
import { Login,LOGIN,YourName,Password,RememberMe,LoginWithAuth0,LoginWithJWT } from '../constant';

const Signin = ({ history }) => {

    const {loginWithRedirect} = useAuth0()
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("test123");

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );

    useEffect(() => {
        if (value !== null)
            localStorage.setItem('profileURL', value);
        else
            localStorage.setItem('profileURL', man);
    }, [value]);
 
    const loginAuth = async () => {
        try {
            await firebase_app.auth().signInWithEmailAndPassword(email, password);
            setValue(man);
            localStorage.setItem('token', Jwt_token);
            history.push(`${process.env.PUBLIC_URL}/dashboard/default`);

        } catch (error) {
            setTimeout(() => {
                toast.error("Oppss.. The password is invalid or the user does not have a password.");
            }, 200);
        }
    }

    const googleAuth = async () => {
        try {
            firebase_app.auth().signInWithPopup(googleProvider).then(function (result) {
                setValue(result.user.photoURL);
                localStorage.setItem('token', Jwt_token);
                setTimeout(() => {
                    history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
                }, 200);
            });
        } catch (error) {
            setTimeout(() => {
                toast.error("Oppss.. The password is invalid or the user does not have a password.");
            }, 200);
        }
    };

    const facebookAuth = async () => {
        try {
            firebase_app.auth().signInWithPopup(facebookProvider).then(function (result) {
                setValue(result.user.photoURL);
                localStorage.setItem('token', Jwt_token);
                setTimeout(() => {
                    history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
                }, 200);
            });
        } catch (error) {
            setTimeout(() => {
                toast.error("Oppss.. The password is invalid or the user does not have a password.");
            }, 200);
        }
    }
    const twitterAuth = async () => {
        try {
            firebase_app.auth().signInWithPopup(twitterProvider).then(function (result) {
                setValue(result.user.photoURL);
                localStorage.setItem('token', Jwt_token);
                setTimeout(() => {
                    history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
                }, 200);
            });
        } catch (error) {
            setTimeout(() => {
                toast.error("Oppss.. The password is invalid or the user does not have a password.");
            }, 200);
        }
    }
    const githubAuth = async () => {
        try {
            firebase_app.auth().signInWithPopup(githubProvider).then(function (result) {
                setValue(result.user.photoURL);
                localStorage.setItem('token', Jwt_token);
                setTimeout(() => {
                    history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
                }, 200);
            });
        } catch (error) {
            setTimeout(() => {
                toast.error("Oppss.. The password is invalid or the user does not have a password.");
            }, 200);
        }
    }

    const loginWithJwt = (email,password) => {

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: ({ email, password })
        };
        
        return fetch('/users/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          setValue(man);
          localStorage.setItem('token', user);
          window.location.href = `${process.env.PUBLIC_URL}/dashboard/default`
          return user;
        });
      }

    return (
        <div>
            <div className="page-wrapper">
                <div className="container-fluid p-0">
                    {/* <!-- login page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="text-center">
                                            <img src={sponsormatchLogo} alt="" /></div>
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h4>{LOGIN}</h4>
                                                    <h6>{"Indtast brugernavn og password"} </h6>
                                                </div>
                                                <form className="theme-form" >
                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0">{YourName}</label>
                                                        <input className="form-control" type="email" name="email"
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                            placeholder="Email address"
                                                        />
                                                       
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">{Password}</label>
                                                        <input className="form-control" type="password" name="password"
                                                            value={password}
                                                            onChange={e => setPassword(e.target.value)} />
                                                        
                                                    </div>
                                                    <div className="checkbox p-0">
                                                        <input id="checkbox1" type="checkbox" />
                                                        <label htmlFor="checkbox1">{RememberMe}</label>
                                                    </div>
                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button className="btn btn-primary btn-block" type="button" onClick={() => loginAuth()} >{Login}</button>
                                                    </div>
                                                    <div className="form-group form-row mt-3 mb-0 button-auth">
                                                        <div className="col-md-6">
                                                            <button className="btn btn-secondary btn-block" type="button" onClick={() => loginWithJwt(email,password)} >{LoginWithJWT}</button>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <button className="btn btn-success btn-block" type="button" onClick={loginWithRedirect} >{LoginWithAuth0}</button>
                                                        </div>
                                                    </div>   
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                    {/* <!-- login page end--> */}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Signin);