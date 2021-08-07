import React, { Fragment,   useState} from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    section: {
        display: 'block',
        backgroundColor: 'lightBlue'
    }
})

const PartnersComponent = (props) => {



    return (
        <View style={styles.section}>
            <Text>Aftalens parter</Text>
        </View>
    )
}

export default PartnersComponent;
