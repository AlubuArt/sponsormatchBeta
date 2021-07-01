/* eslint-disable default-case */
import React, { Fragment, useState,  useReducer } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { SponsorSearchTitle } from "../../../constant";
import SponsorMatchCard from "./sponsorMatchCard";
import { createSponsor } from "../../../services/contact.service";
const axios = require('axios');

const SponsorSearch = () => {

  const [currentUser] = useState(localStorage.getItem('userID'))
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
                  <p>{"Her kan du bruge søgefunktionen til at søge efter virksomheder. Du kan søge på cvrnr, virksomhedens navn, eller på postnummer."}</p>
                  </div> 
            </div>
            
          </div>
        </div>
      </div>
        <button onClick={handleClick}>Try Me1</button>
     
    </Fragment>
  );
};

export default SponsorSearch;
