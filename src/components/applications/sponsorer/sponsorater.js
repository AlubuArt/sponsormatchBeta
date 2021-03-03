import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {getAllSponsoraterFromDatabase, getFilteredSponsoraterFromDatabase} from '../../../services/sponsorater.service';
import SponsoratCard from "./sponsoratCard";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'



const Sponsorater = () => {

  const [currentUser] = useState(localStorage.getItem('userID'))
  const [selectedSponsorater, setSelectedSponsorater] = useState([])
  const [buttonText, setButtonText] = useState('Filtrér')

const getSponsorater = async () => {
  try {
    
    const sponsorater = await getAllSponsoraterFromDatabase(currentUser);
    setSelectedSponsorater(sponsorater);
    
  } catch {}
}


const toggle = async (eventKey) => {
 try{
    const sponsorater = await getFilteredSponsoraterFromDatabase(currentUser, eventKey);
    setSelectedSponsorater(sponsorater); 
    setButtonText(eventKey)
 } catch {}
  
}

useEffect(() => {

    getSponsorater()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <Fragment>
      <Breadcrumb title="Vores Sponsorater" parent="Sponsorer" />
      <div className="container-fluid">
        <div className="active">
        <h3>Sponsorater</h3>
        <div>
          <DropdownButton id="dropdown-basic-button" title={buttonText} onSelect={toggle}>
            <Dropdown.Item eventKey="aktiv" value="Aktive">Aktive</Dropdown.Item>
            <Dropdown.Item eventKey="inaktiv">Ikke aktive</Dropdown.Item>
          </DropdownButton>
        </div>
       
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
        
            
      </div>
    </Fragment>
  );
};

export default Sponsorater;
