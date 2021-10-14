import React, { Fragment,   useState} from "react";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import CreatePDF from "./createPDF";
import Breadcrumb from "../../common/breadcrumb";


const OpretSponsorat = () => {


    const [sponsoratOverskrift, setSponsoratOverskrift] = useState();
    const [sponsorName, setSponsorName] = useState();

    //function for creating the download link
    const DownloadLink = () => {
        return (
            <PDFDownloadLink 
                document={<CreatePDF
                    header={sponsoratOverskrift}
                    sponsorName={sponsorName}
                                                />} 
                 fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download sponsorat')}
            </PDFDownloadLink>
        )
    }


    return (

        <Fragment>
            <Breadcrumb title="Opret sponsorat" parent="Sponsorer" />
               <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Opret sponsorat</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div >
                                        <div className="form-group">
                                                <label className="form-label">Indsæt overskrift</label>
                                                <input className="form-control" type="text" name="overskrift" value={sponsoratOverskrift} onChange={((e) => setSponsoratOverskrift(e.target.value))} ></input> 
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Indsæt overskrift</label>
                                                <input className="form-control" type="text" name="overskrift" value={sponsoratOverskrift} onChange={((e) => setSponsoratOverskrift(e.target.value))} ></input> 
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Sponsornavn</label>
                                                <input className="form-control" type="text" name="overskrift" value={sponsorName} onChange={((e) => setSponsorName(e.target.value))} ></input> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <PDFViewer showToolbar={false} height={800} >
35
                                    <CreatePDF
                                        header={sponsoratOverskrift}
                                        sponsorName={sponsorName} />
                                </PDFViewer>
                                
                            </div>
                        </div>
                    </div>
                
                </div>
                
            <DownloadLink />
            
        </Fragment>



    )
    
}



export default OpretSponsorat;
