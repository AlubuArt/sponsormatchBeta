/* eslint-disable default-case */
import React, { Fragment, useState, useEffect } from "react";
const axios = require('axios');

const SearchComponent = ({apiResponse, setApiResponse, searchInput, setSearchInput, searchType, setSearchType}) => {

  
  
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


    let response = await axios.get(url, { 
        params: {
        cvr: searchInput,
        } 
    });

    return response;
  }

  
  

  const handleResponse = (res) => {

    if ( res.data.hits.total >= 1) {
      setApiResponse(res.data.hits.hits[0]._source.Vrvirksomhed.virksomhedMetadata)
    } else {
      setApiResponse("No result - try again")
    }
  }

  const handleClick = async () => {
    const response = await apiCall();
    handleResponse(response)
  }


  useEffect( () => {
    console.log(apiResponse);
  }, [apiResponse]);


  return (
    <Fragment>
      <div className="container-fluid">
        
        <div className="row">
          <div className="col-md-2">
            <div className="card">
               
              <select onChange={(e) => setSearchType(e.target.value)} name="search query" >
                <option value="CVRnr">CVRnr.</option>
                <option value="Virksomhedsnavn">Virksomhedsnavn</option>
                <option value="postnummer">Postnummer</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <input placeholder="Indtast søgning" onChange={(e) => setSearchInput(e.target.value)}></input>
                </div>
              </div>
           </div>
          </div>
        </div>  
        <button onClick={handleClick}>Søg</button>
      </div>
      
     
    </Fragment>
  );
};

export default SearchComponent;
