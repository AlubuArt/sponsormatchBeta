import React, { useState, useEffect } from 'react';
import sponsormatchLogo from '../assets/images/sponsormatch-logo_farver_login.png';
import man from '../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router";
import { Login,LOGIN,YourName,Password,RememberMe, loginError} from '../constant';
import {loginUser} from '../services/signin.service';

const Signin = ({ history }) => {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [value, setValue] = useState(localStorage.getItem('profileURL' || man));

    const handleLoginAuth = async () => {
        try{
            await loginUser(email, password);
            setValue(man);
            history.push(`${process.env.PUBLIC_URL}/forside`);

        } catch (error) {
            setTimeout(() => {
                toast.error(loginError);
            }, 200);
        }
    }

    const handleKeyPress = (e) => {
        
        if(e.charCode === 13 || e.keyCode === 13) {
            handleLoginAuth();
        }  
    }

    useEffect(() => {

        if (value !== null)
            localStorage.setItem('profileURL', value);
        else
            localStorage.setItem('profileURL', man);

        
    }, [value]);

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
                                                            onKeyPress={handleKeyPress}
                                                            
                                                        />
                                                       
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">{Password}</label>
                                                        <input className="form-control" type="password" name="password"
                                                            value={password}
                                                            onChange={e => setPassword(e.target.value)} 
                                                            onKeyPress={handleKeyPress}/>
                                                        
                                                    </div>
                                                    <div className="checkbox p-0">
                                                        <input id="checkbox1" type="checkbox" />
                                                        <label htmlFor="checkbox1">{RememberMe}</label>
                                                    </div>
                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button 
                                                            id="login-button" 
                                                            className="btn btn-primary btn-block" 
                                                            type="button" 
                                                            onClick={() => handleLoginAuth()}
                                                            onKeyPress={handleKeyPress} >{Login}</button>
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
                
                </div>
            </div>
        </div>
    );
};

export default withRouter(Signin);