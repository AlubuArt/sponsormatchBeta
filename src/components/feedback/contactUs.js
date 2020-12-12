import React from 'react';
import {Email, Message, SEND_IT, YourName} from '../../constant'
const ContactUs = () => {
    return (
        <div className="col-sm-12 col-lg-6 col-xl-8 xl-50 col-md-12">
            <div className="card height-equal">
              <div className="card-header">
                <h5>{ContactUs}</h5>
              </div>
              <div className="contact-form card-body">
                <form className="theme-form">
                  <div className="form-icon"><i className="icofont icofont-envelope-open"></i></div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName">{YourName}</label>
                    <input className="form-control" id="exampleInputName" type="text" placeholder="John Dio" />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="exampleInputEmail1">{Email}</label>
                    <input className="form-control" id="exampleInputEmail1" type="email" placeholder="Demo@gmail.com" />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="exampleInputEmail1">{Message}</label>
                    <textarea className="form-control textarea" rows="3" cols="50" placeholder="Your Message"></textarea>
                  </div>
                  <div className="text-sm-right">
                    <button className="btn btn-primary-gradien">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
    );
};

export default ContactUs;

