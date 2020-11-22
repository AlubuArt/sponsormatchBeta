import React, { Fragment, useState, useEffect, useReducer } from "react";


const SponsorMatchCard = (props) => {



    return (
        <Fragment>
            <div className='container-fluid'>
                    <div className="col-sm-12">
                        <div className="header">
                            <h4>{props.sponsorname}</h4>
                            <br></br>
                        </div>
                            <div className="info-container">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <div className="table-data">
                                        <div className="row data">
                                            <div className="col-sm-6 title">
                                                <h6>Kontakt person:</h6>
                                            </div>
                                            <div className="col-sm-6 data">
                                                <p>{props.contactName}</p>
                                            </div>
                                        </div>
                                        <div className="row data">
                                            <div className="col-sm-6 title">
                                                <h6>Telefon nummer:</h6>
                                            </div>
                                            <div className="col-sm-6 data">
                                                <p>{props.phone}</p>
                                            </div>

                                        </div>
                                        <div className="row data">
                                            <div className="col-sm-6 title">
                                                <h6>Email adresse:</h6>
                                            </div>
                                            <div className="col-sm-6 data">
                                                <p>{props.email}</p>
                                            </div>

                                        </div>
                                        <div className="row data">
                                            <div className="col-sm-6 title">
                                                <h6>Adresse:</h6>
                                            </div>
                                            <div className="col-sm-6 data">
                                                <p>{props.adresse}</p>
                                            </div>
                                        </div>
                                        <div className="row data">
                                            <div className="col-sm-6 title">
                                                <h6>Postnummer og by:</h6>
                                            </div>
                                            <div className="col-sm-6 data">
                                                <p>{props.postnr}, {props.city}</p>
                                            </div>
                                        </div>
                                        <div className="row data">
                                            <div className="col-sm-6 title">
                                                <h6>CVR-nummer:</h6>
                                            </div>
                                            <div className="col-sm-6 data">
                                                <p>{props.cvrnr}</p>
                                            </div>

                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <button>some button</button>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
        </Fragment>
    )

}

export default SponsorMatchCard;