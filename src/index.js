import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { configureFakeBackend} from "./services/fack.backend";
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux **
import App from "./components/app";
// Import custom Components 
import Default from './components/dashboard/defaultCompo/default';

// users
import UserProfile from './components/users/userProfile';


// learning 
import LearningList from './components/learning/kursus-samling';
import LearningDeatil from './components/learning/kursus-detaljer';

// pages 
import Signup from './pages/signup';
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

//sponsor page
import SponsorContacts from './components/applications/sponsorer/sponsorContacts';
import Sponsorater from './components/applications/sponsorer/sponsorater';
import SponsorSearch from './components/applications/sponsorer/sponsorSearch';

//opret sponsorat page
import OpretSponsorat from './components/applications/opretSponsorat/opretSponsorat';
// sample page
import Samplepage from './components/feedback/feedbackpage';

//config data
import Callback from './auth/callback'
import SponsorMatches from './components/applications/sponsorer/sponsorMatches';

//context provider
import { UserProvider, UserContext } from './auth/context/userContext';

// setup fake backend
configureFakeBackend();

const Root = () => {
    
   
    const {userID, setUser} = useContext(UserContext)
   
    useEffect(() => {
        setUser(localStorage.getItem('userID'))
    }, [setUser])

    useEffect(() => {

        const abortController = new AbortController();
        const color = localStorage.getItem('color');
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);
        
        return function cleanup() {
            abortController.abort();
        }
         
    }, []);

    

    return (
        <div className="App">
            
            
                <BrowserRouter basename={`/`}>
                        <Switch>
                            <Route path={`${process.env.PUBLIC_URL}/login`} component={Signin} />
                            <Route path={`${process.env.PUBLIC_URL}/pages/signup`} component={Signup} />
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
                            
                            {userID !== null ?
                            
                                <App>
                                    {/* dashboard menu */}
                                    <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                                        return (<Redirect to={`${process.env.PUBLIC_URL}/forside`} />)
                                    }} />
                                    
                                    {/* passing the user as a prop to the component or getting the user from local storage? */ }
                                    <Route path={`${process.env.PUBLIC_URL}/forside`} render={() => <Default us={userID}/>} />

                                    {/* Users */}
                                    <Route path={`${process.env.PUBLIC_URL}/profil`} component={UserProfile} />
                                    
                                    
                                    {/* Learning App */}
                                    <Route path={`${process.env.PUBLIC_URL}/kursus-samling`} component={LearningList} />
                                    <Route path={`${process.env.PUBLIC_URL}/kursus-detaljer`} component={LearningDeatil} />

                                    {/* Sponsor pages */}
                                    <Route path={`${process.env.PUBLIC_URL}/vores-sponsorer`} component={SponsorContacts} />
                                    <Route path={`${process.env.PUBLIC_URL}/sponsorater`} component={Sponsorater} />
                                    <Route path={`${process.env.PUBLIC_URL}/soeg-sponsor`} component={SponsorSearch} />
                                    <Route path={`${process.env.PUBLIC_URL}/opret-sponsorat`} component={OpretSponsorat} />
                                    <Route path={`${process.env.PUBLIC_URL}/sponsor-matches`} component={SponsorMatches} />

                                    {/* Sample page */}
                                    <Route path={`${process.env.PUBLIC_URL}/feedback/feedbackpage`} component={Samplepage} />

                                </App>
                             :
                                <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                            } 
                        </Switch>
                </BrowserRouter>
        </div>
    );
}

ReactDOM.render(
    <UserProvider>
        <Root />
    </UserProvider>
    , 
    
    document.getElementById('root')
);

serviceWorker.unregister();