/* eslint-disable default-case */
import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { SponsorSearchTitle } from "../../../constant";
import SearchComponent from "./searchComponent";
import { createSponsor } from "../../../services/contact.service";
import { UserContext } from "../../../auth/context/userContext";
import SearchResults from "./searchResults";

const SponsorSearch = () => {
  const { userID } = useContext(UserContext);
  const [apiResponse, setApiResponse] = useState(null);
  const [searchInput, setSearchInput] = useState();
  const [searchType, setSearchType] = useState("Cvrnr");
  const [isLoading, setIsLoading] = useState(false);

  const addSponsorToList = async () => {
    let input = await createSponsorObject();
    createSponsor(input, "potentielleSponsorer", userID, input.cvrnr);
    alert(input.sponsorname + " blev tilføjet listen over mulige sponsorer");
  };

  const makeSponsorDeal = (input) => {
    alert("Et nyt sponsortilbud til " + input + " blev oprettet");
  };

  function checkForValues(input) {
    if (input == undefined) {
      input = "ikke oplyst";
    }
    return input;
  }

  const createSponsorObject = async () => {
    let sponsorObject = {
      virksomhed: checkForValues(apiResponse.nyesteNavn.navn),
      contactName: checkForValues(apiResponse.nyesteNavn.navn),
      cvrnr: checkForValues(searchInput),
      city: checkForValues(apiResponse.nyesteBeliggenhedsadresse.postdistrikt),
      postnr: checkForValues(apiResponse.nyesteBeliggenhedsadresse.postnummer),
      adresse: checkForValues(apiResponse.nyesteBeliggenhedsadresse.vejnavn),
      phone: checkForValues(apiResponse.nyesteKontaktoplysninger[0]),
      email: checkForValues(apiResponse.nyesteKontaktoplysninger[1]),
      sponsorname: checkForValues(apiResponse.nyesteNavn.navn),
      firstName: "",
      lastName: "",
    };

    return sponsorObject;
  };

  useEffect(() => {
    console.log(apiResponse);
  }, [apiResponse]);

  return (
    <>
      <Breadcrumb title="Søg Sponsorer" parent="Sponsorer" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>{SponsorSearchTitle}</h5>
                <p>
                  Her kan du bruge søgefunktionen til at søge efter
                  virksomheder på deres CVRnr.
                </p>
              </div>
            </div>
            {/* Search section */}
            <SearchComponent
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchType={searchType}
              setSearchType={setSearchType}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            {/*Result section*/}
            {apiResponse === null ? (
              <p></p>
            ) : (
              <SearchResults
                data={apiResponse}
                onClickAddToList={() => addSponsorToList()}
                onClickMakeSponsorDeal={() => makeSponsorDeal(apiResponse)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorSearch;

/* {apiResponse === null ? (
              <div>
                <p>
                  Foretag en søgning efter en virksomhed, ved at søge på et
                  CVRnr.
                </p>
              </div>
            ) : isLoading === true ? (
              <NewLoader />
            ) : apiResponse === "No result" ? (
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <NoSearchResult
                      sponsorname={apiResponse.nyesteNavn.navn}
                      phone={apiResponse.nyesteKontaktoplysninger[0]}
                      email={apiResponse.nyesteKontaktoplysninger[1]}
                      adresse={apiResponse.nyesteBeliggenhedsadresse.vejnavn}
                      postnr={apiResponse.nyesteBeliggenhedsadresse.postnummer}
                      city={apiResponse.nyesteBeliggenhedsadresse.postdistrikt}
                      cvrnr={searchInput}
                      onClickAddToList={() => addSponsorToList()}
                      onClickMakeSponsorDeal={() =>
                        makeSponsorDeal(apiResponse)
                      }
                      isAdded={false}
                    />
                  </div>
                </div>
              </div>
            ) : (
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
                    onClickAddToList={() => addSponsorToList()}
                    onClickMakeSponsorDeal={() => makeSponsorDeal(apiResponse)}
                    isAdded={false}
                  />
                </div>
              </div>
            )}
 */
