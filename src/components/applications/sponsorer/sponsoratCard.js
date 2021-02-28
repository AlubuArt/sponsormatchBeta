import React, { Fragment } from "react";
import {
    GemSponsor, 
    OpretSponsorTilbud 
  } from "../../../constant";

  const SponsoratCard = (props) => {


    return (
        <Fragment>
            <div>
                <h2>{props.sponsorName}</h2>
                <h3>{props.status}</h3>
            </div>
        </Fragment>
    )
  }

  export default SponsoratCard;