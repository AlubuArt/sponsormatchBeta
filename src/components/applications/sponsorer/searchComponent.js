/* eslint-disable default-case */
import React, { Fragment, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const axios = require("axios");

const SearchComponent = ({
  ...props
}) => {
  const [buttonText, setButtonText] = useState('Cvrnr');

  const apiCall = async () => {
    //construct the URL
    let baseURL = "http://localhost:9000/";
    let searchURL = `${baseURL}${props.searchType}`;

    //send the request to the api
    let response = await axios(searchURL, {
      params: {
        input: props.searchInput,
      },
      
    });
    props.setIsLoading(false)
    console.log(searchURL)
    return response;
  };

  const handleResponse = (res) => {
    if (res.data.hits.total >= 1) {
      props.setApiResponse(
        res.data.hits.hits[0]._source.Vrvirksomhed.virksomhedMetadata
      );
    } else {
      props.setApiResponse("No result");
    }
  };

  const toggleDropdown = (eventKey) => {
    try {
      props.setSearchType(eventKey);
      setButtonText(eventKey);
    } catch {}
  };

  const handleClick = async () => {
    props.setIsLoading(true)
    const response = await apiCall();
    handleResponse(response);
  };



  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <DropdownButton
              className="searchComponent-dropdown"
              id="dropdown-basic-button"
              title={buttonText}
              onSelect={toggleDropdown}
            >
              <Dropdown.Item eventKey="Cvrnr">
                CRVnr
              </Dropdown.Item>
              <Dropdown.Item eventKey="companyName">
              Firmanavn
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input
              placeholder="Indtast søgning"
              onChange={(e) => props.setSearchInput(e.target.value)}
            ></input>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-sm-4">
            <button
              className="btn btn-primary btn-custom"
              href="javascript"
              onClick={handleClick}
            >
              <i className="fa fa-search"></i> Søg
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchComponent;
