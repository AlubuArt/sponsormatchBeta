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
import {getSponsoraterFromDatabase} from '../../../services/sponsorater.service';
import SponsoratCard from "./sponsoratCard";
import { identity } from "lodash";


const Sponsorater = () => {

  const [currentUser] = useState(localStorage.getItem('userID'))
  const [sponsors, setSponsors] = useReducer((value, newValue) => ({...value, ...newValue}), {})
  const [activeSponsorater, setActiveSponsorater] = useReducer((value, newValue) => ({...value, ...newValue}), {})
  const [inactiveSponsorater, setInactiveSponsorater] = useReducer((value, newValue) => ({...value, ...newValue}), {})

useEffect(() => {

  try {
    getSponsorater()
    
  } catch (error) {
    alert(error)
  }
}, [currentUser])


const getSponsorater = async () => {
  try {
    const activeSponsoratList =[];
    const inactiveSponsoratList =[];
    const sponsorater = await getSponsoraterFromDatabase(currentUser);
    sponsorater.forEach((sponsorat) => {
      if(sponsorat.status === 'aktiv') {
        activeSponsoratList.push(sponsorat);
      }
      else {
        inactiveSponsoratList.push(sponsorat)
      }
      setActiveSponsorater(activeSponsoratList)
      setInactiveSponsorater(inactiveSponsoratList)
      
    })
  } catch {

  }
}

  return (
    <Fragment>
      <Breadcrumb title="Vores Sponsorater" parent="Sponsorer" />
      <div className="container-fluid">
        <div className="active">
        <h3>Aktive sponsorater</h3>
              {  
                Object.values(activeSponsorater).map((sponsorat, i) => (
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

      <h3>Ikke aktive sponsorater</h3>
              {
                
                Object.values(inactiveSponsorater).map((sponsorat, i) => (
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
        
            
      </div>
    </Fragment>
  );
};

export default Sponsorater;
