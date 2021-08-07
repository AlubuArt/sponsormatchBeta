import React, { Fragment,   useState} from "react";
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    section: {
        display: 'block',
        backgroundColor: 'lightGrey'
    },
    header: {
        display: 'block'
    },
    headline: {
        display: 'block'
    } 

})

const HeaderComponent = (props) => {
    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Image></Image>
                <Text>Nordens Paris FC</Text>
            </View>
            <View style={styles.headline}>
                <Text>Sponsoraftale</Text>
            </View>
        </View>

    )
}

export default HeaderComponent;
