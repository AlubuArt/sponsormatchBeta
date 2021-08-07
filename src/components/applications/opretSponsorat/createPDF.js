import React, { Fragment,   useState} from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import  HeaderComponent from './PDFcomponents/headerComponent';
import PartnersComponent from './PDFcomponents/partnersComponent';
import ConditionsComponent from './PDFcomponents/conditionsComponent';
import SignatureComponent from './PDFcomponents/signatureComponent';


const styles = StyleSheet.create({
    page: {
      display: 'inline-block',
      flexDirection: 'row'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    header: {
        fontSize: 22
    }
  });

//function for creating the PDF
const CreatePDF = (props) => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
              
                <HeaderComponent />
              
                <PartnersComponent />

                <ConditionsComponent />
              
                <SignatureComponent />
            
            </Page>
    </Document>
    )
}

export default CreatePDF;
