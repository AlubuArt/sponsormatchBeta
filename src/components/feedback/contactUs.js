import React from 'react';
import {Email, Message, YourName} from '../../constant'

const ContactUs = () => {


  const sendFeedback = () => {
    alert('Tak for din feedback!')
  }
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
                    <input className="form-control" id="exampleInputName" type="text" placeholder="Dit navn" />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="exampleInputEmail1">{Email}</label>
                    <input className="form-control" id="exampleInputEmail1" type="email" placeholder="Din email" />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="exampleInputEmail1">{Message}</label>
                    <textarea className="form-control textarea" rows="3" cols="50" placeholder="Din besked"></textarea>
                  </div>
                  <div className="text-sm-right">
                    <button className="btn btn-primary-gradien" onClick={sendFeedback}>Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
    );
};

export default ContactUs;

