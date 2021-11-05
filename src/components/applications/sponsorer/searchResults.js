import React from "react";
import SponsorMatchCard from "./sponsorMatchCard";

const SearchResults = ( props ) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <SponsorMatchCard
            sponsorname={props.data.nyesteNavn.navn}
            phone={props.data.nyesteKontaktoplysninger[0]}
            email={props.data.nyesteKontaktoplysninger[1]}
            adresse={props.data.nyesteBeliggenhedsadresse.vejnavn}
            postnr={props.data.nyesteBeliggenhedsadresse.postnummer}
            city={props.data.nyesteBeliggenhedsadresse.postdistrikt}
            cvrnr="33301022"
            onClickAddToList={() => props.onClickAddToList()}
            onClickMakeSponsorDeal={() => props.onClickMakeSponsorDeal(props.data)}
            isAdded={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
