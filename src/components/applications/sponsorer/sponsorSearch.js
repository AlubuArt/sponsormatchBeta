/* eslint-disable default-case */
import React, { Fragment, useState,  useReducer } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { SponsorSearchTitle } from "../../../constant";
import SponsorMatchCard from "./sponsorMatchCard";
import { createSponsor } from "../../../services/contact.service";
const axios = require('axios');

const SponsorSearch = () => {

  const [currentUser] = useState(localStorage.getItem('userID'))
  const [newSponsorMatches] = useReducer((value, newValue) => ({...value, ...newValue}), {
    
        match1: {
            virksomhed: "Børges Biler",
            contactName:  'Børge Bentsen',
            cvrnr: '33301022',
            city: 'Aalborg',
            postnr: '9000',
            adresse: 'Flydedokken 19 4th',
            phone: '98129290',
            email: 'børges@biler.dk',
            branche: 'Møbler',
            sponsorname: 'Børges Biler',
            
        },
        
       match2: {
            virksomhed: "Karstens Køreskole",
            contactName:  'Karsten Kold',
            cvrnr: '33301022',
            city: 'Aalborg',
            postnr: '9000',
            adresse: 'Flydedokken 19 4th',
            phone: '98129290',
            email: 'karsten@køreskole.dk',
            branche: 'køreskoler',
            sponsorname: 'Karstens Køreskole',

        },

        match3: {
          virksomhed: "Torbens Træhandel",
          contactName:  'Torben Træben',
          cvrnr: '12345678',
          city: 'Aalborg SØ',
          postnr: '9220',
          adresse: 'Lærkevej 14',
          phone: '98101011',
          email: 'torbens@træ.dk',
          branche: 'detail med træ',
          sponsorname: 'Torben',

      }
 
})

  const [apiResponse, setApiResponse] = useState("No result - try again");
  const [input, setInput] = useState();
  const [searchType, setSearchType] = useState();

  const apiCall = async () => {

    let url = "https://cvrapi.herokuapp.com/cvrnr";

    switch (searchType) {
      case "CVRnr":
          url = "https://cvrapi.herokuapp.com/cvrnr"
          break;
      case "Virksomhedsnavn":
          url = "http://localhost:9000/virksomhedsnavn"
          break;
      case "postnummer":
          url = "http://localhost:9000/postnummer"
          break;
    }
  
  
    const response = await axios.get(url, { 
        params: {
        cvr: 33301022,
        } 
      });
      handleResponse(await response);
      console.log(apiResponse)
  }
  

  const handleResponse = (resp) => {

    if ( resp.data.hits.total >= 1) {
      setApiResponse(resp.data.hits.hits[0]._source.Vrvirksomhed.virksomhedMetadata)
    } else {
      setApiResponse("No result - try again")
    }
  }

const handleClick = async () => {
  
  await apiCall();
}


const addSponsorToList = (input) => {
    createSponsor(input, 'followUp', currentUser, newSponsorMatches.virksomhed);
    alert(input.sponsorname + ' blev tilføjet listen over mulige sponsorer')
  }

  const makeSponsorDeal = (input) => {
      alert('Et nyt sponsortilbud til ' + input + ' blev oprettet')
  }

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
                                onClickAddToList={() => addSponsorToList(matches)}
                                onClickMakeSponsorDeal={() => makeSponsorDeal(matches.sponsorname)}
                                isAdded={false} />  
                        </div>
                    </div>
                ))
            }
          </div>
        </div>
      </div>
        <button onClick={handleClick}>Try Me1</button>
     
    </Fragment>
  );
};

export default SponsorSearch;
