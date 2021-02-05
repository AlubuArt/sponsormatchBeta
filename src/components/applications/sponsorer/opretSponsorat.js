import React, { Fragment,   useState} from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import Breadcrumb from "../../common/breadcrumb";


//applying style to the PDF - remove this to another place
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });


const OpretSponsorat =() => {


    const [sponsoratOverskrift, setSponsoratOverskrift] = useState();
    const [sponsorName, setSponsorName] = useState();

    //function for creating the download link
    const DownloadLink = () => {
        return (
            <PDFDownloadLink document={<CreatePDF />} fileName="somename.pdf">
    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download sponsorat')}
    </PDFDownloadLink>
        )
    }

    //function for creating the PDF
    const CreatePDF = () => {

        return (
            <Document>
                <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>{sponsoratOverskrift}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Hej {sponsorName}</Text>
                </View>
                </Page>
        </Document>
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
                                <CreatePDF />
                                
                            </div>
                        </div>
                    </div>
                
                </div>
                
            <DownloadLink />
            
        </Fragment>



    )
    
}



export default OpretSponsorat;
