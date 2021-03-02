import React, { useState, useEffect } from 'react';
import sponsormatchLogo from '../assets/images/sponsormatch-logo_farver_login.png';
import man from '../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router";
import  {firebase_app, Jwt_token } from "../data/config";
import { Login,LOGIN,YourName,Password,RememberMe} from '../constant';

const Signin = ({ history }) => {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );

    useEffect(() => {

        if (value !== null)
            localStorage.setItem('profileURL', value);
        else
            localStorage.setItem('profileURL', man);

        
    }, [value]);

    

    const handleKeyPress = (e) => {
        
   if(e.charCode === 13 || e.keyCode === 13)
            loginAuth();
        
    }
 
    const loginAuth = async () => {
        try {
            const currentUser = await firebase_app.auth().signInWithEmailAndPassword(email, password);
            const uid = await currentUser.user.uid;
            setValue(man);
            localStorage.setItem('userID', uid)
            localStorage.setItem('token', Jwt_token);
            history.push(`${process.env.PUBLIC_URL}/forside`);

        } catch (error) {
            setTimeout(() => {
                toast.error("Hov! Det ser ud til at koden ikke er korrekt, eller at brugeren ikke har et kodeord.");
            }, 200);
        }
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
                                                            onClick={() => loginAuth()}
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
                    {/* <!-- login page end--> */}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Signin);