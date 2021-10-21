import React from 'react';
import SponsorMatchCard from './sponsorMatchCard';


const SearchResults = ({props}) => {

    
    

    return (
        <div>
            <p>Search Results </p>
            <SponsorMatchCard
                sponsorname={props.sponsorname}
                phone={props.phone}
                email={props.email}
                adresse={props.adresse}
                postnr={props.postnr}
                city={props.city}
                cvrnr={props.cvrnr}
                onClickAddToList={() => props.onClickAddToList}
                onClickMakeSponsorDeal={() => props.onClickMakeSponsorDeal(props)}
                isAdded={false}
            />
        </div>
    )
}

export default SearchResults;