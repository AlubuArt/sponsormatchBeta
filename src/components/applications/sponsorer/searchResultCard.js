import React, { Fragment } from "react";
import {Row, Col, Button} from 'react-bootstrap';



  const SearchResultCard = (props) => {


    return (
        <Fragment>
            
              <div className="col-sm-12">
                <Row className="card-sponsorat">
                    <Col md="2" >
                      <div >
                    <p>JC Visuel Design</p>
                    </div>
                    </Col>
                    <Col md="1">
                      <div>
                      <p>81612335</p>
                      </div>
                    </Col>

                    <Col md="2">
                     <div >
                        <p>jc@jcvisueldesign.dk</p>
                        </div>
                    </Col>
                    <Col md="1">
                      <div >
                        <p>33301022</p>
                        </div>  
                    </Col>
                    

                    <Col sm="5" className="sponsorat-buttons" >
                      <Button className="sponsorat-button btn-danger " onClick={props.delete}>Slet</Button>
                      <Button className="sponsorat-button btn-sponsormatchGreen" onClick={props.edit}>Redigér</Button>
                      <Button className="sponsorat-button btn-sponsormatchGreen" onClick={props.open}>Se sponsorat</Button>
                    </Col>

                </Row>
              </div>
            
        </Fragment>
    )
  }

  export default SearchResultCard;


 