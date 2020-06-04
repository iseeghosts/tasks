//App.js => UserHome.js => Welcome.js
//                        |=> SavedNote.js
//                        |=> AddNoteButton.js

/* importing required modules */
import React from 'react'
import {View, Image, TouchableHighlight, StyleSheet} from 'react-native'

/*Importing Button Images */
import Add_Notes_Dark from './../assets/Add_Notes_Dark.png' //Image uri for Add note button
import Add_Notes_Light from '../assets/Add_Notes_Light.png'

/* this function enables handling style and input to addnote button*/

//Note:this is a function rather than a class component to avoid unneccessary extra work as it doesn't need much configuration

//Start Export (imports props which is a function in UserHome => ./../userpages/UserHome.js, [add_newtask])
export default function AddNote(props){
    
    //start return
    return(

        // this contains add note button
        <View style={styles.maincontainer}>

        {/* {child} this button adds an empty note to tasks declared in Tasks in UserHome => ./../userpages/UserHome.js
        when clicked/touched triggers add_newtask function in UserHome  [add_newtask] */}
            <TouchableHighlight underlayColor='black' style={[styles.addnotebutton, {backgroundColor:(props.theme=='dark'?'gray':'skyblue')}]} onPress={ () => props.onPress()}>
                <Image source={(props.theme=='dark'?Add_Notes_Dark:Add_Notes_Light)} style={styles.thumbnail}  />                       
            </TouchableHighlight>

        </View>
        //End of main container
    )
    //End of return
}
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

    //main container containing all child items
    maincontainer:{
        marginRight:5,
        marginBottom:5,
    },

    //button containing add note logo 
    addnotebutton:{
        height:60,
        width:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        shadowRadius:8,
        shadowOpacity:0.7,
        elevation:5,
    },

    //image style
    thumbnail:{
        width:60,
        height:60,
        shadowRadius:8,
        shadowOpacity:0.7,
    },
})

