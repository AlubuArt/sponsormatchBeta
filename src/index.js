import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {firebase_app,auth0} from './data/config';
import { configureFakeBackend ,authHeader, handleResponse } from "./services/fack.backend";
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from './store';
import App from "./components/app";
import { Auth0Provider } from '@auth0/auth0-react'

// Import custom Components 
import Default from './components/dashboard/defaultCompo/default';

// users
import UserProfile from './components/users/userProfile';
import UserEdit from './components/users/userEdit';

// learning 
import LearningList from './components/learning/learning-list';
import LearningDeatil from './components/learning/learning-deatil';

// pages 
import Login from './pages/login';
import LoginWithBgImg from './pages/loginWithBgImg';
import LoginWithVideo from './pages/loginWithVideo';
import Signup from './pages/signup';
import SignupWithImg from './pages/signupWithImg';
import SignupWithVideo from './pages/signupWithVideo';
import UnlockUser from './pages/unlockUser';
import ForgetPwd from './pages/forgetPwd';
import ResetPwd from './pages/resetPwd';
import Error400 from './pages/errors/error400';
import Error401 from './pages/errors/error401';
import Error403 from './pages/errors/error403';
import Error404 from './pages/errors/error404';
import Error500 from './pages/errors/error500';
import Error503 from './pages/errors/error503';
import Signin from './auth/signin';
import SponsorContacts from './components/applications/sponsorer/sponsorContacts';
import Sponsorater from './components/applications/sponsorer/sponsorater';

// sample page
import Samplepage from './components/sample/samplepage';

//config data
import configDB from './data/customizer/config'

import Callback from './auth/callback'

// setup fake backend
configureFakeBackend();

const Root = () => {
    
    const [currentUser, setCurrentUser] = useState(false);
    const [authenticated,setAuthenticated] = useState(false)
    const jwt_token = localStorage.getItem('token');

    useEffect(() => {


        const abortController = new AbortController();
        const requestOptions = { method: 'GET', headers: authHeader() };
        fetch('/users', requestOptions).then(handleResponse)
        const color = localStorage.getItem('color')
        const layout = configDB.data.color.layout_version
        firebase_app.auth().onAuthStateChanged(setCurrentUser);
        setAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
        document.body.classList.add(layout);
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);

        return function cleanup() {
            abortController.abort();
        }
         
    }, []);

    

    return (
        <div className="App">
            <Auth0Provider domain={auth0.domain} clientId={auth0.clientId} redirectUri={auth0.redirectUri}>
            <Provider store={store}>
                <BrowserRouter basename={`/`}>
                        <Switch>
                            <Route path={`${process.env.PUBLIC_URL}/login`} component={Signin} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/login`} component={Login} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/loginWithBgImg`} component={LoginWithBgImg} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/loginWithVideo`} component={LoginWithVideo} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/signup`} component={Signup} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/signupWithImg`} component={SignupWithImg} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/signupWithVideo`} component={SignupWithVideo} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/unlockUser`} component={UnlockUser} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/forgetPwd`} component={ForgetPwd} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/resetPwd`} component={ResetPwd} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/errors/error400`} component={Error400} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/errors/error401`} component={Error401} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/errors/error403`} component={Error403} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/errors/error404`} component={Error404} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/errors/error500`} component={Error500} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/errors/error503`} component={Error503} />
                            <Route  path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback/>} />
                            
                            {currentUser !== null || authenticated || jwt_token ?
                            
                                <App>
                                    {/* dashboard menu */}
                                    <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                                        return (<Redirect to={`${process.env.PUBLIC_URL}/dashboard/default`} />)
                                    }} />
                                    <Route path={`${process.env.PUBLIC_URL}/dashboard/default`} render={() => <Default us={currentUser}/>} />

                                    {/* Users */}
                                    <Route path={`${process.env.PUBLIC_URL}/users/userProfile`} component={UserProfile} />
                                    <Route path={`${process.env.PUBLIC_URL}/users/userEdit`} component={UserEdit}  />
                                    
                                    {/* Learning App */}
                                    <Route path={`${process.env.PUBLIC_URL}/learning/learning-list`} component={LearningList} />
                                    <Route path={`${process.env.PUBLIC_URL}/learning/learning-detail`} component={LearningDeatil} />

                                    {/* CONTACT APP */}
                                    <Route path={`${process.env.PUBLIC_URL}/sponsorer/vores-sponsorer`} component={SponsorContacts} />
                                    <Route path={`${process.env.PUBLIC_URL}/sponsorer/sponsorater`} component={Sponsorater} />

                                    {/* Sample page */}
                                    <Route path={`${process.env.PUBLIC_URL}/sample/samplepage`} component={Samplepage} />

                                </App>
                             :
                                <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                            } 
                        </Switch>
                </BrowserRouter>
            </Provider>
            </Auth0Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();