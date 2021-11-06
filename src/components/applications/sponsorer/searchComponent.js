import React, { Fragment, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const axios = require("axios");

const SearchComponent = ({ ...props }) => {
  const [buttonText, setButtonText] = useState("Cvrnr");

  const apiCall = async () => {
    //construct the URL
    let baseURL = "http://localhost:9000/";
    let fullURL = `${baseURL}${props.searchType}`;

    //send the request to the api
    let response = await axios(fullURL, {
      params: {
        input: props.searchInput,
      },
    });
    props.setIsLoading(false);
    return response;
  };

  const handleResponse = (res) => {
    if (res.data.hits.total >= 1) {
      let companyData =
        res.data.hits.hits[0]._source.Vrvirksomhed.virksomhedMetadata;
      return companyData;
    } else {
      return "No result";
    }
  };

  const toggleDropdown = (eventKey) => {
    try {
      props.setSearchType(eventKey);
      setButtonText(eventKey);
    } catch {}
  };

  const handleClick = async () => {
    props.setIsLoading(true);
    const response = await apiCall();
    props.setApiResponse(handleResponse(response));
  };

  return (
    <Fragment>
      
        <div className="row">
          <div className="col-md-1">
            <DropdownButton
              
              id="dropdown-basic-button"
              title={buttonText}
              onSelect={toggleDropdown}
            >
              <Dropdown.Item eventKey="Cvrnr">Cvrnr.</Dropdown.Item>
              <Dropdown.Item eventKey="Firmanavn">Firmanavn</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-4">
            <input

              style={{ width: "100%", height: "32px"}}
              placeholder="Søg..."
              onChange={(e) => props.setSearchInput(e.target.value)}
            ></input>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary btn-custom"
              href="javascript"
              onClick={handleClick}
            >
              <i className="fa fa-search"></i> Søg
            </button>
          </div>
        </div>
      
    </Fragment>
  );
};

export default SearchComponent;
