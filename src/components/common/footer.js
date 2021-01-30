import React from "react";

const Footer = props => {
    return (
    <footer className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 footer-copyright">
                    <p className="mb-0">{"Copyright 2021 © SponsorMatch."}</p>
                </div>
                <div className="col-md-6">
                    <p className="pull-right mb-0">{"Udviklet særligt til det danske foreningsliv"}
                        
                        <i className="fas fa-hand-holding-heart" ></i>
                    </p>
                </div>
            </div>
        </div>
</footer>
)};

export default Footer;