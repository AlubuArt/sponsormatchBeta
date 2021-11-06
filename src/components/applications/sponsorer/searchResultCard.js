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

                    <Col md="3">
                     <div >
                        <p>jc@jcvisueldesign.dk</p>
                        </div>
                    </Col>
                    <Col md="1">
                      <div >
                        <p>33301022</p>
                        </div>  
                    </Col>
                </Row>
              </div>
            
        </Fragment>
    )
  }

  export default SearchResultCard;


 