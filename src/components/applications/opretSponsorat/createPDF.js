import React, { Fragment,   useState} from "react";
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';
import  HeaderComponent from './PDFcomponents/headerComponent';
import PartnersComponent from './PDFcomponents/partnersComponent';
import ConditionsComponent from './PDFcomponents/conditionsComponent';
import SignatureComponent from './PDFcomponents/signatureComponent';
import logo from '../../../assets/images/logo/compact-logo.png';



const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
    backgroundColor: '#E4E4E4'
    }
  });

//function for creating the PDF
const CreatePDF = (props) => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
              <HeaderComponent />
               
               
            

            </Page>
    </Document>
    )
}

export default CreatePDF;
