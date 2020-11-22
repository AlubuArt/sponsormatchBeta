import React, { Fragment, useState, useEffect, useReducer } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { firebase_app, dbRef } from '../../../data/config';
import {
SponsorSearchTitle
  
} from "../../../constant";
import SponsorMatchCard from "./sponsorMatchCard";

const SponsorSearch = () => {

  const [currentUser, setCurrentUser] = useState('')
  const [newSponsorMatches, setNewSponsorMatches] = useReducer((value, newValue) => ({...value, ...newValue}), {
    
        match1: {
            sponsorname: "Børges Biler",
            contactName:  'Børge Bentsen',
            cvrnr: '33301022',
            city: 'Aalborg',
            postnr: '9000',
            adresse: 'Flydedokken 19 4th',
            phone: '98129290',
            email: 'børges@biler.dk',
            branche: 'Møbler'
        },
        
       match2: {
            sponsorname: "Mogens Møbler",
            contactName: 'Mogens Mortensen',
            city: 'Aalborg',
            postnr: '9000',
            adresse: 'Ahornvej 29',
            phone: '81612335',
            email: 'mogens@møbler',
            branche: 'Autohus'

        }
 
})



  
  return (
    <Fragment>
      <Breadcrumb title="Søg Sponsorer" parent="Sponsorer" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
            <div className="card-header">
                    <h5>{SponsorSearchTitle}</h5>
                    <br></br>
                  <p>{"Ud fra parametre som din forenings placering, type, nuværende sammensætning af sponsorer, m.m, udvælger vi hver uge 3 nye forslag til potentielle nye sponsorer til din forening. Nedenfor kan du se dine 3 ugentlige forslag."}</p>
                  </div> 
            </div>
            {
                Object.values(newSponsorMatches).map((matches, i ) => (
                    <div className="card" key={i}>
                        <div className="card-header">
                <SponsorMatchCard 
                                contactName={matches.contactName}
                                sponsorname={matches.sponsorname}
                                phone={matches.phone}
                                email={matches.email}
                                adresse={matches.adresse}
                                postnr={matches.postnr}
                                city={matches.city}
                                cvrnr={matches.cvrnr}
                                />  
                            
                        </div>
                        
                    </div>
                ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SponsorSearch;
