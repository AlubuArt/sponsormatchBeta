import React, { Fragment, useState, useEffect, useContext } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {
  getAllSponsoraterFromDatabase,
  getFilteredSponsoraterFromDatabase,
} from "../../../services/sponsorater.service";
import SponsoratCard from "./sponsoratCard";
import { Row, Col, Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../../../auth/context/userContext";

const Sponsorater = () => {
  const { userID } = useContext(UserContext);
  const [selectedSponsorater, setSelectedSponsorater] = useState([]);
  const [buttonText, setButtonText] = useState("Filtrér");

  const toggle = async (eventKey) => {
    try {
      const sponsorater = await getFilteredSponsoraterFromDatabase(
        userID,
        eventKey
      );
      setSelectedSponsorater(sponsorater);
      setButtonText(eventKey);
    } catch {}
  };

  const openSponsorat = () => {
    console.log("open");
  };

  const editSponsorat = () => {
    console.log("edit");
  };

  const deleteSponsorat = () => {
    console.log("deleted");
  };

  useEffect(() => {
    
    const getSponsorater = async () => {
      try {
        const sponsorater = await getAllSponsoraterFromDatabase(userID);
        setSelectedSponsorater(sponsorater);
      } catch {
        console.log("couldnt get sponsors from the database")
      }
    };
    getSponsorater();
    
  }, [userID]);

  return (
    <Fragment>
      <Breadcrumb title="Vores Sponsorater" parent="Sponsorer" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h3>Sponsorater</h3>
                <p>
                  Her kan du se en oversigt over dine sponsorater. Du kan
                  filtrer i sponsoraterne og se hvilke de er aktive og ikke
                  aktive. Det er også muligt at se sponsoratet som er sendt til
                  sponsoren, redigere det og slette det.
                </p>
              </div>
            </div>

            <DropdownButton
              className="sponsorat-dropdown"
              id="dropdown-basic-button"
              title={buttonText}
              onSelect={toggle}
            >
              <Dropdown.Item eventKey="aktiv" value="Aktive">
                Aktive
              </Dropdown.Item>
              <Dropdown.Item eventKey="inaktiv">Ikke aktive</Dropdown.Item>
            </DropdownButton>

            <Row className="card-sponsorat-header">
              <Col md="2">
                <div>
                  <p>Sponsor</p>
                </div>
              </Col>
              <Col md="1">
                <div>
                  <p>Beløb</p>
                </div>
              </Col>
              <Col md="1">
                <p>Status</p>
              </Col>
              <Col sm="1">
                <p>Startdato</p>
              </Col>
              <Col sm="1">
                <p>Slutdato</p>
              </Col>
              <Col sm="6"></Col>
            </Row>

            {Object.values(selectedSponsorater).map((sponsorat, i) => (
              <div className="card-sponsorat" key={i}>
                <SponsoratCard
                  sponsorName={sponsorat.sponsorName}
                  amount={sponsorat.amount}
                  endDate={sponsorat.endDate}
                  startDate={sponsorat.startDate}
                  status={sponsorat.status}
                  open={() => openSponsorat()}
                  edit={() => editSponsorat()}
                  delete={() => deleteSponsorat()}
                />
              </div>
            ))}

            <div></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sponsorater;
