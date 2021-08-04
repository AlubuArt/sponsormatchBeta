import React, { Fragment,   useState} from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
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
            <View style={styles.section}>
                <Text style={styles.header}>{props.header}</Text>
            </View>
            <View style={styles.section}>
                <Text>Hej {props.sponsorName}</Text>
            </View>
            </Page>
    </Document>
    )
}

export default CreatePDF;
