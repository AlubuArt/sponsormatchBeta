import React, { Fragment,   useState} from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    section: {
        display: 'block',
        backgroundColor: 'lightGreen'
    }
})


const ConditionsComponent = (props) => {

return (
        <View style={styles.section}>
            <Text>Aftalens vilkår</Text>

        </View>
    )
}
export default ConditionsComponent;
