import React, { Fragment } from "react";
import {Row, Col, Button} from 'react-bootstrap';



  const SponsoratCard = (props) => {


    return (
        <Fragment>
            < div className="container-fluid">
              <div className="col-sm-12">
                <Row className="card-sponsorat">
                    <Col md="2" >
                      <div >
                    <p>{props.sponsorName}</p>
                    </div>
                    </Col>
                    <Col md="1">
                      <div>
                      <p>{props.amount}</p>
                      </div>
                    </Col>

                    <Col md="1">
                     <div >
                        <p>{props.status}</p>
                        </div>
                    </Col>
                    <Col md="1">
                      <div >
                        <p>{props.startDate}</p>
                        </div>  
                    </Col>
                    <Col sm="1">
                      <div>
                        <p>{props.endDate}</p>
                      </div>
                    </Col>

                    <Col sm="6" className="sponsorat-buttons" >
                      <Button className="sponsorat-button btn-danger " onClick={props.delete}>Slet</Button>
                      <Button className="sponsorat-button btn-sponsormatchGreen" onClick={props.edit}>Redigér</Button>
                      <Button className="sponsorat-button btn-sponsormatchGreen" onClick={props.open}>Se sponsorat</Button>
                    </Col>

                </Row>
              </div>
            </div>
        </Fragment>
    )
  }

  export default SponsoratCard;


 