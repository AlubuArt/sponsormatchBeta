import React, { Fragment, useState, useEffect, useReducer } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {  dbRef, db } from '../../../data/config';
import {
  UsersTableTitle,
  UsersTableHeader,
  
  Edit,
  Delete,
  SeSponsorat
} from "../../../constant";
import {getAllSponsoraterFromDatabase, getFilteredSponsoraterFromDatabase} from '../../../services/sponsorater.service';
import SponsoratCard from "./sponsoratCard";



const Sponsorater = () => {

  const [currentUser] = useState(localStorage.getItem('userID'))
  const [sponsors, setSponsors] = useReducer((value, newValue) => ({...value, ...newValue}), {})
  const [selectedSponsorater, setSelectedSponsorater] = useState([])
  const [filter, setFilter] = useState('status')
 

useEffect(() => {

  try {
    getSponsorater()
    
  } catch (error) {
    alert(error)
  }
}, [currentUser])


const getSponsorater = async () => {
  try {
    
    const sponsorater = await getAllSponsoraterFromDatabase(currentUser);
    setSelectedSponsorater(sponsorater);
    
  } catch {}
}

const filterSponsorater = async () => {
 const sponsorater = await getFilteredSponsoraterFromDatabase(currentUser, filter);
 setSelectedSponsorater(sponsorater);
 
    
}

  return (
    <Fragment>
      <Breadcrumb title="Vores Sponsorater" parent="Sponsorer" />
      <div className="container-fluid">
        <div className="active">
        <h3>Aktive sponsorater</h3>
              {  
                Object.values(selectedSponsorater).map((sponsorat, i) => (
                    <div className="card" key={i}>
                      <div className="card-header">
                        
                        <SponsoratCard 
                                sponsorName={sponsorat.sponsorName}
                                amount={sponsorat.amount}
                                endDate={sponsorat.endDate}
                                startDate={sponsorat.startDate}
                                status={sponsorat.status}
                        />
                      </div>
                    </div>
                ))
            }

      
        </div>
        <button onClick={filterSponsorater}>filtrer</button>
            
      </div>
    </Fragment>
  );
};

export default Sponsorater;
