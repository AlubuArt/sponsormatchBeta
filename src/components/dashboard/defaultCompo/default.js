import React ,{useEffect , Fragment, useState} from 'react';
import Breadcrumb from '../../common/breadcrumb';
import {  MessageCircle } from 'react-feather';
import {News} from '../../../constant';
import {getUserFromDatabase} from '../../../services/editUser.service';



const Default = () => {

    const [currentUser] =  useState(localStorage.getItem('userID'));
    const [userData, setUserData] = useState('');

    const getUser = async () => {
        const userData = await getUserFromDatabase(currentUser);
        setUserData(userData.fname)
            
    }

    useEffect( () => {

       getUser() 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    
    return (
        <Fragment>
            <Breadcrumb title = "Forside" />
            <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 xl-100">
                        <div className="card">
                            <div className="card-header bg-warning" >
                                    <h5 className="text-white">Velkommen til din SponsorMatch platform {userData}</h5>
                                    
                            </div>
                            <div className="card-body" >
                                <p>
                                    Gå på opdagelse i platformens mange muligheder for at komme igang med værdiskabende sponsorater. Vi mener at det aldrig har været nemmere at arbejde effektivt med sponsorater. 
                                </p>
                                <p>
                                    På SponsorMatch platformen kan du:
                                </p>
                                <ul>
                                    <li>Få forslag til nye mulige sponsorer, som passer til din forening</li>
                                    <br></br>
                                    <li>Få overblik over nuværende og tidligere sponsorater og sponsorer</li><br></br>
                                    <li>Søge efter nye sponsorer og automatisk oprette flot sponsoroplæg og sponsorater</li><br></br>
                                    <li>Deltage i en række kurser målrettet til at gøre dit sponsorarbejde sjovere, nemmere og mere effektivt</li><br></br>
                                </ul>

                            </div>
                        </div>
                            
                        </div>
                        {/* news column start */}
                        <div className="col-xl-4 xl-100">
                            <div className="card">
                                <div className="card-header">
                                    <h5>{News}</h5>
                                </div>
                                <div className="card-body activity-scroll">
                                    <div className="activity">
                                        <div className="media">
                                            <div className="gradient-round m-r-30 gradient-line-1">
                                            <MessageCircle />
                                            </div>
                                            <div className="media-body">
                                                <h6>Nye SponsorMatch<span className="pull-right f-14">{"Senest"}</span></h6>
                                                <p>{"Du har fået nye SponsorMatch! Se dem under Søg Sponsorer i menuen. "}</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="gradient-round m-r-30 gradient-line-1">
                                                <MessageCircle />
                                            </div>
                                            <div className="media-body">
                                                <h6>Ny besked <span className="pull-right f-14">{"14m Ago"}</span></h6>
                                                <p>{"Du ahr modtaget en ny besked fra én af dine sponsorer."}</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="gradient-round m-r-30 small-line">
                                            <MessageCircle />
                                            </div>
                                            <div className="media-body">
                                                <h6>Ny opdatering 1.0.5 <span className="pull-right f-14">{"1 day Ago"}</span></h6>
                                                <p className="activity-xl">{"SponsorMatch platformen er blevet opdateret til en ny version."}</p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="gradient-round m-r-30 gradient-line-1">
                                            <MessageCircle />
                                            </div>
                                            <div className="media-body">
                                                <h6>Nyt sponsor kursus tilføjet <span className="pull-right f-14">{"3 days Ago"}</span></h6>
                                                <p>{"Der er blevet tilføjet et nyt sponsor kursus til din samling. Se det under Kurser."}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </Fragment>
    );
};

export default Default;