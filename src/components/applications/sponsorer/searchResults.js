import React from "react";
import SponsorMatchCard from "./sponsorMatchCard";

const SearchResults = (props) => {
  return (
    <div className="row">
      <div className="col-md-12">
        {props.data !== null ? (
          <SponsorMatchCard
            sponsorname={props.data.nyesteNavn.navn}
            phone={props.data.nyesteKontaktoplysninger[0]}
            email={props.data.nyesteKontaktoplysninger[1]}
            adresse={props.data.nyesteBeliggenhedsadresse.vejnavn}
            postnr={props.data.nyesteBeliggenhedsadresse.postnummer}
            city={props.data.nyesteBeliggenhedsadresse.postdistrikt}
            cvrnr="33301022"
            onClickAddToList={() => props.onClickAddToList()}
            onClickMakeSponsorDeal={() =>
              props.onClickMakeSponsorDeal(props.data)
            }
            isAdded={false}
          />
        ) : (
          <SponsorMatchCard
            sponsorname={"Jc Visuel Design"}
            phone={"81612335"}
            email={"jc@jcvisueldesign.dk"}
            adresse={"Flydedokken"}
            postnr={"9000"}
            city={"Aalborg"}
            cvrnr="33301022"
            onClickAddToList={() => console.log("")}
            onClickMakeSponsorDeal={() =>
              console.log("f")
            }
            isAdded={false}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
