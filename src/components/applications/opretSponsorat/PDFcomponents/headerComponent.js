import React, { Fragment,   useState} from "react";
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../../../assets/images/logo/compact-logo.png'

const styles = StyleSheet.create({
    section: {
        display: 'flex',
        flexDirection: 'row',

       
    },
    headerTitle: {
        fontSize: 54,
        margin: 20,

    },
    headerLogo: {
        width: 80,
        margin: 20,
    },
    
    
})



const HeaderComponent = (props) => {

    
    return (
        <View >
            <View style={styles.section}>
                <Image src={logo} style={styles.headerLogo}/> 
                <Text style={styles.headerTitle}>Nordens Paris FC</Text>
            </View>
                         
            
                
                         
        </View>

    )
}

export default HeaderComponent;
