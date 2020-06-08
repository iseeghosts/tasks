//App.js => UserHome.js => Welcome.js
//                       |=> SavedNote.js

/* This function maintains flatlist of tasks stored in tasks.json => ./../tasks.json and those added using AddNoteButton => ./AddNoteButton.js*/

/* importing required modules */
import React, { Component } from 'react'
import {View, Text, Alert, Image, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions} from 'react-native'

/*Importing Button Images */
import Task_Not_Done from './../assets/Task_Not_Done_Light.png';   //icon for incomplete task
import Task_Done from './../assets/Task_Done_Light.png';            //icon for completed task
import Delete_Task from './../assets/Delete_Task_Light.png';       //icon for delete task
import Details_Icon from './../assets/Details_Icon_Light.png'
import Restore_Task from '../assets/Restore_Task_Light.png'

import AppData from '../appdata.json'

var ms = Dimensions.get('window')
var colors = ['#ffffdd77', '#ddddff77', '#ffdddd77', '#ddffdd77', '#ffddff77', '#ddffff77']
var k = 0
//Start of export
export default class SavedNote extends Component{

    //Initial State
    constructor (props) {
        k = (props.task.content.charCodeAt(0)+1)%6
        console.log(k)     
        super()
            this.state = ({
                Task_Status:(props.task.status=="Complete"? Task_Done: Task_Not_Done),    //image uri variable for task status
                backColor:(props.task.status=="Complete"? '#ffd70077':colors[k]), 
                task:props.task.content,   //temporararily stores task details passed from UserHome.js => ./../userpages/UserHome.js
            })
    }
    task_details = () => {
        var task = (this.state.task=='' ? '🤷🏿‍♂️':this.state.task);
        var date = Number(this.props.task.date_created)
        date = new Date(date).toLocaleString();
        var du = this.props.task.last_modified
        Alert.alert('Task Details', 'Task - ' + task + '\nDate Created - ' + date + '\nLast Modified - ' + du + '\nStatus - ' + this.props.task.status);
        // console.log(date)
        // alert(AppData[this.props.id].taskMargin)
        // console.log(Tasks[this.props.id])
    }

//Start of render function (handles all styles and events in notes except adding new notes)
    render () {
        var mainbox = StyleSheet.flatten([
            styles.maincontainer,{
                marginVertical:AppData[this.props.id].taskMargin*1.5,
                backgroundColor:this.state.backColor,
            }
        ])


        //Start return
        return(
            <View style={mainbox}>
                
                <View style={styles.infobox}>
                    <TouchableHighlight underlayColor='#7C0A02' onPress={() => this.task_details()} style={styles.detailsbutton}>
                        <Image source={Details_Icon}style={styles.logo} />
                    </TouchableHighlight>
                </View>

                <View style={styles.taskstatusbox}>
                        <Image source={this.state.Task_Status} style={styles.logo} /> 
                </View>
                {/* {child} this container shows the task, editable/uneditable if allowed through edit icon ->next child element */}
                <View style={styles.taskbox}>
                    <Text style={styles.inputtask}>{this.state.task}</Text>
                </View>
                {/* {child} this button allows the task to be modified [edit_task], has a variable image uri Edit_Status */}
                <TouchableOpacity underlayColor="#000"  style={styles.restoretask} onPress={ () => this.props.restore()}>
                    <Image source={Restore_Task} style={styles.logo} />                            
                </TouchableOpacity>

                {/* {child} this button allows user to delete a task [delete_task], but not until user confirms in the following confirmation dialog*/}
                <TouchableOpacity underlayColor="#000"  style={styles.deletetask} onPress={ () => this.props.permdelete()}>
                    <Image source={Delete_Task} style={styles.logo} />                            
                </TouchableOpacity>
            </View>
        //End of main Container
        )
        //End of return
    }
    //End of render
}
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

    //main container with all child items
    maincontainer: {
        flex:1,
        justifyContent:'center',
        borderRadius:5,
        shadowRadius:7,
        shadowOpacity:1,
        elevation:5,
        shadowOffset:{height:0.1},
        flexDirection:'row',
        height:ms.height*1/14,
        marginHorizontal:ms.width*1/40,
    },

    //Infobox container box for task
    infobox: {
        alignItems:'center',
        justifyContent:"center",
        flex:1,
    },

    //button for infobox
    detailsbutton:{
        justifyContent:'center',
        alignItems:'center',
        width:23,
        height:23,
        borderRadius:11.5,
    },

    //box containing task status icon and button
    taskstatusbox: {
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:0.3,
        flex:1,
        
    },
    taskbox:
    {
        flex:6,
        // alignItems:'center',
        justifyContent:'center'
    },

    //box containing input task element so task details
    inputtask: {
        paddingLeft:5,
        fontSize:16,
    },

    //button containing icon for task edit status
    restoretask: {
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        borderLeftWidth:0.5,
        borderColor:'darkblue',
        backgroundColor:'#00800077'

    },

    //button containing icon for task deletion
    deletetask: {
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        borderTopRightRadius:5,
        borderBottomEndRadius:5,
        borderLeftWidth:1,
        backgroundColor:'#e44d2e77'
    },

    //icon styles for all image
    logo:{
        width:30,
        height:30,
        resizeMode:'center',
    },
})