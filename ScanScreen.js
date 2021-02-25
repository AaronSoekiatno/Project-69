import React from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
constructor(){
    super();
    this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'
    }
}

getCameraPermissions = async () =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  }

  handleBarCodeScanned = async({type, data})=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    });
  }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === "clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }else if (buttonState === "normal"){
        return( 
          <View style={styles.container}>
            <Image
            style={{width:200,height:200}}
            source={
              require('../assets/scanner.jpg')
            }
            />
            <View>
                <TouchableOpacity
                onPress={this.getCameraPermissions}
                style = {styles.scanButton}>
                <Text style = {styles.buttonText}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
      }
      }
  
}

const styles = StyleSheet.create({
    scanBtn:{
        backgroundColor:'cyan',
        borderWidth:2,
      },
      inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20
      },
      inputView:{
        flexDirection:'row',
        margin:20,
        justifyContent:'center'
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
      },
      scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
      buttonText:{
        fontSize: 20,
      }
});
