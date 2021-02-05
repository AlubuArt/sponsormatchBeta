import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';

import ContactUs from './contactUs'
const Feedbackpage = () => {
    return (
        <Fragment>
            <Breadcrumb title="Feedback"  />
              <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 col-xl-8 xl-50 col-md-12">
                      <div className="card">
                        <div className="card-header">
                          <h5>Ris, ros og gode idéer</h5><span>{"Vores passion er at udvikle en platform som dækker de behov vores brugere har. Derfor udvikler vi platformen i tæt samarbejde med vores brugere og deres viden. Så har du gode forslag til funktioner du mangler, eller har du opdaget en fejl eller andet ved platformen som du har lyst til at dele med os? Så tøv endelig ikke med at kontakte os gennem nedenstånde formular eller direkte over mail. Sammen sikre vi Danmarks foreningsliv! "}</span>
                        </div>
                        <div className="card-body">
                          <p>{"Beskriv gerne i detaljer hvad du har oplevet, eller hvilken funktion du har brug for bliver udviklet. Medsend gerne et skærmbillede af en fejlmeddelse. Vi sætter stor pris på din feedback!"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ContactUs />
              </div>
          
        </Fragment>
    );
};

export default Feedbackpage;