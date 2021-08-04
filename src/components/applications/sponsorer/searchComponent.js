/* eslint-disable default-case */
import React, { Fragment, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Button } from "react-bootstrap";
const axios = require("axios");

const SearchComponent = ({
  apiResponse,
  setApiResponse,
  searchInput,
  setSearchInput,
  searchType,
  setSearchType,
}) => {
  const [buttonText, setButtonText] = useState("CVRnr");

  const apiCall = async () => {
    let url = "https://cvrapi.herokuapp.com/cvrnr";

    switch (searchType) {
      case "CVRnr":
        url = "https://cvrapi.herokuapp.com/cvrnr";
        break;
      case "Virksomhedsnavn":
        url = "http://localhost:9000/virksomhedsnavn";
        break;
      case "postnummer":
        url = "http://localhost:9000/postnummer";
        break;
    }

    let response = await axios.get(url, {
      params: {
        cvr: searchInput,
      },
    });

    return response;
  };

  const handleResponse = (res) => {
    if (res.data.hits.total >= 1) {
      setApiResponse(
        res.data.hits.hits[0]._source.Vrvirksomhed.virksomhedMetadata
      );
    } else {
      setApiResponse("No result");
    }
  };

  const toggleDropdown = (eventKey) => {
    try {
      setSearchType(eventKey);
      setButtonText(eventKey);
    } catch {}
  };

  const handleClick = async () => {
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
              <Dropdown.Item eventKey="CVRnr" value="CVRnr">
                CRVnr
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input
              placeholder="Indtast søgning"
              onChange={(e) => setSearchInput(e.target.value)}
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
