/* eslint-disable default-case */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { SponsorSearchTitle } from "../../../constant";
import SearchComponent from "./searchComponent";
import SponsorMatchCard from "./sponsorMatchCard";


const SponsorSearch = () => {

  
  const [apiResponse, setApiResponse] = useState("No result");
  const [searchInput, setSearchInput] = useState();
  const [searchType, setSearchType] = useState("CVRnr");

  const addSponsorToList = (input) => {
    //createSponsor(input, 'followUp', currentUser, newSponsorMatches.virksomhed);
    alert(input.sponsorname + " blev tilføjet listen over mulige sponsorer");
  };

  const makeSponsorDeal = (input) => {
    alert("Et nyt sponsortilbud til " + input + " blev oprettet");
  };

  useEffect(() => {
    console.log(apiResponse);
  }, [apiResponse]);

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
                <p>
                  {
                    "Her kan du bruge søgefunktionen til at søge efter virksomheder. Du kan søge på cvrnr, virksomhedens navn, eller på postnummer."
                  }
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
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

            <div className="row">
              <div className="col-md-12">
                <div className="card"></div>

                {apiResponse !== "No result" ? (
                  <div className="card">
                    <div className="card-header">
                      <SponsorMatchCard
                        sponsorname={apiResponse.nyesteNavn.navn}
                        phone={apiResponse.nyesteKontaktoplysninger[0]}
                        email={apiResponse.nyesteKontaktoplysninger[1]}
                        adresse={apiResponse.nyesteBeliggenhedsadresse.vejnavn}
                        postnr={apiResponse.nyesteBeliggenhedsadresse.postnummer}
                        city={apiResponse.nyesteBeliggenhedsadresse.postdistrikt}
                        cvrnr={searchInput}
                        onClickAddToList={() => addSponsorToList(apiResponse)}
                        onClickMakeSponsorDeal={() => makeSponsorDeal(apiResponse)}
                        isAdded={false}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>Intet resultat</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SponsorSearch;
