import React, { Fragment,   useState} from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    section: {
        display: 'block',
        backgroundColor: 'lightYellow'
    }
})

const SignatureComponent = (props) => {

    return (
        <View style={styles.section}>
            <Text>Underskrifter</Text>
        </View>
    )
}

export default SignatureComponent;
