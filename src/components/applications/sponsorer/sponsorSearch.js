/* eslint-disable default-case */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { SponsorSearchTitle } from "../../../constant";
import SearchComponent from "./searchComponent";
const axios = require('axios');

const SponsorSearch = () => {

  
  const [apiResponse, setApiResponse] = useState("No result");
  const [searchInput, setSearchInput] = useState();
  const [searchType, setSearchType] = useState("CVRnr");

  /* useEffect( () => {
    console.log(apiResponse);
  }, [apiResponse]); */


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
                <SearchComponent
                  apiResponse={apiResponse}
                  setApiResponse={setApiResponse}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  searchType={searchType}
                  setSearchType={setSearchType}
                />
            </div>
            
          </div>
        </div>
         
        
      </div>
      
     
       
    
    </Fragment>
  );
};

export default SponsorSearch;
