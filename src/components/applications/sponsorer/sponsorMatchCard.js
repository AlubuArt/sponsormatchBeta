import React, { Fragment } from "react";
import { GemSponsor, OpretSponsorTilbud } from "../../../constant";
import { Row, Col, Button } from "react-bootstrap";
import SearchResultCard from './searchResultCard';

const SponsorMatchCard = (props) => {
  return (
    <Fragment>
      
      <Row className="card-sponsorat-header">
              <Col md="2">
                <div>
                  <p>Firmanavn</p>
                </div>
              </Col>
              <Col md="1">
                <div>
                  <p>Tlf.</p>
                </div>
              </Col>
              <Col md="3">
                <p>Email</p>
              </Col>
              <Col sm="1">
                <p>Cvrnr</p>
              </Col>
              <Col sm="3"></Col>
            </Row>
            <SearchResultCard
                data={props}
            />
        
    </Fragment>
  );
};

export default SponsorMatchCard;
