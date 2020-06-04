//App.js => UserHome.js => Welcome.js

/* This is Welcome header, part of After Login Screen, it staays on top, support styles are mentioned in UserHome.js => ../userpages/UserHome.js */

/* importing required modules */
import React, { Component } from 'react'
import {Text, TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native'

/*Importing Button Images */
import Profile_Pic_Dark from '../assets/Profile_Pic_Dark.png'  //sample profile logo
import Profile_Pic_Light from '../assets/Profile_Pic_Light.png'
import Settings_Icon_Dark from '../assets/Settings_Icon_Dark.png'   //settings icon
import Settings_Icon_Light from '../assets/Settings_Icon_Light.png'
import Recycle_Bin_Dark from '../assets/Recycle_Bin_Dark.png'
import Recycle_Bin_Light from '../assets/Recycle_Bin_Light.png'
import Recycle_Bin_Open from '../assets/Recycle_Bin_Open.png'

import Users from '../users.json'
import AppData from '../appdata.json'

var ms = Dimensions.get('window'); //getting screen dimensions


//Starts export
export default class WelcomeUser extends Component {
  
  //Initial State of the function
  constructor(props) {
    let theme = AppData[props.id].theme
    let po = props.po
    super()
    this.state = {
      profileMenu:!po?'none':'flex',   //
      backColor:!po?'transparent':theme=='dark'?'#555555':'skyblue',
      shadow:!po?0:0.8,
      elevated:!po?0:5
    }
  }

  // This functions expands profile icon to profile options if profileMenu:'none', clicking again will undo the changes 
  profile_menu = () => {
    // console.log('rbo = '+ this.props.rbo)
    this.props.op()
    this.setState({
      profileMenu:(this.state.profileMenu=='flex'?'none':'flex'),
      backColor:(this.state.profileMenu=='flex'?'transparent':(AppData[this.props.id].theme=='dark'?'#555555':'skyblue')),
      shadow:(this.state.profileMenu=='flex'?0:0.8),
      elevated:(this.state.profileMenu=='flex'?0:5),
    })
  }

  render() {
    let theme = AppData[this.props.id].theme
    let po = this.props.po
    var header = StyleSheet.flatten([
      styles.header,{
        backgroundColor:this.state.backColor,
        shadowOpacity:this.state.shadow,
        width:po?ms.width-10:50,
        elevation:this.state.elevated
      }
    ])

    return (
      <View style={styles.maincontainer}>
          <View style={header}>
            <TouchableOpacity onPress={() => this.profile_menu()} style={[styles.piccontainer,{backgroundColor:(theme=='dark'?'#888888':'white')}]}>
              <Image source={(theme=='dark'?Profile_Pic_Dark:Profile_Pic_Light)} style={styles.logo} />
            </TouchableOpacity>

            <View style={[styles.seccontainer,{display:this.state.profileMenu}]}>
              <Text style={styles.welcometext}>Hello {Users[this.props.id].name}!</Text>

              <TouchableOpacity style={styles.settings} onPress={() => this.props.openSettings()}>
                  <Image source={(theme=='dark'?Settings_Icon_Dark:Settings_Icon_Light)} style={styles.logo} />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> {this.props.recyclebin();}} style={[styles.bincontainer, {backgroundColor:this.props.rbo?(theme=='dark'?'#003300':'green'):'transparent'}]} activeOpacity={0.7}>
                  <Image style={styles.logo} source={this.props.rbo?Recycle_Bin_Open:theme=='dark'?Recycle_Bin_Dark:Recycle_Bin_Light} />
              </TouchableOpacity>
            </View>

          </View>
      </View>
    )
  }
} 
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

  maincontainer:{
  },

  header: {
    marginBottom:5,
    height:50,
    borderRadius:5,
    flexDirection:'row',
    alignItems:'center',
    shadowOffset:{height:0.1},
    shadowRadius:4,
  },
  piccontainer:{
    marginLeft:5,
    width:40,
    height:40,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    shadowRadius:1,
    shadowOpacity:0.4,
    elevation:5,
    shadowOffset:{height:0.1},
    
  },
  seccontainer: {
      flexDirection:'row',
      flex:1,
      alignItems:'center',
      justifyContent:"space-between",
      // paddingHorizontal:5
  },
  welcometext:{
    marginHorizontal:10,
    color:'black',
    // fontStyle:'italic',
    fontSize:15,
    fontWeight:'500',
  },
  bincontainer:{
    width:50,
    height:50,
    borderTopEndRadius:5,
    borderBottomEndRadius:5,
    justifyContent:'center',
    alignItems:'center',
    shadowRadius:1,
    shadowOpacity:0.4,
    shadowOffset:{height:0.1},
    
  },
  settings:{
    justifyContent:'center',
    alignItems:'center',
    shadowRadius:1,
    shadowOpacity:0.4,
    elevation:10,
    shadowOffset:{height:0.1},
  },
  logo:{
    width:40,
    height:40,
  },
})