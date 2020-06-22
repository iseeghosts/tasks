//App.js => UserHome.js => Welcome.js
//                       |=> SavedNote.js

/* This function maintains flatlist of tasks stored in tasks.json => ./../tasks.json and those added using AddNoteButton => ./AddNoteButton.js*/

/* importing required modules */
import React, { Component } from 'react'
import {View, TextInput, Alert, Image, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions} from 'react-native'

/*Importing Button Images */
import Task_Not_Done from './../assets/Task_Not_Done_Light.png';   //icon for incomplete task
import Task_Done from './../assets/Task_Done_Light.png';            //icon for completed task
import Delete_Task from './../assets/Delete_Task_Light.png';       //icon for delete task
import Edit_Task from './../assets/Edit_Task_Light.png'            //icon for un-edited task
import Edit_Done from './../assets/Edit_Done_Light.png'     //icon during task being edited
import Details_Icon from './../assets/Details_Icon_Light.png'

import AppData from '../appdata.json'

var ms = Dimensions.get('window')
var colors = ['#ffffdddd', '#ddddffdd', '#ffdddddd', '#ddffdddd', '#ffddffdd', '#ddffffdd' , '#D3D3D3dd']
var k = 0
//Start of export
export default class SavedNote extends Component{

    //Initial State
    constructor (props) {
        k = props.task.content!=''?(props.task.content.charCodeAt(0)+1)%6:6
        var color = props.task.status=="Complete"? '#ffd700dd':colors[k]
        // console.log(k)     
        super()
            this.state = ({
                Task_Status:(props.task.status=="Complete"? Task_Done: Task_Not_Done),                                //image uri variable for task status
                Edit_Status:(props.task.content=='' ? Edit_Done:Edit_Task),  // image uri handler for editing state of a task

                enableEditing:(props.task.content==''),            //Enables/Disables editing for tasks (a newly created note will be editable) 
                markDoneDisable:(props.task.content==''),          //adds abiility to prevent marking empty notes as done
                deleteDisable:false,

                backColor:color, 
                backColorTaskBox:(props.task.content==''? '#C0C0C0DD':color),
                disableEditButton:(props.task.status=="Complete"),
                task:props.task.content,                                        //temporararily stores task details passed from UserHome.js => ./../userpages/UserHome.js
            })
    }
    
    // This function changes image of edit icon based on edit state of a task
    change_status = () => {
        k = this.state.task!=''?(this.state.task.charCodeAt(0)+1)%6:6
        this.setState({
                Task_Status:(this.state.Task_Status==Task_Not_Done ? Task_Done:Task_Not_Done),
                backColor: (this.state.Task_Status==Task_Not_Done ?'#ffd700dd':colors[k]),
                disableEditButton:!this.state.disableEditButton,
            })
            this.props.task.status = (this.state.Task_Status==Task_Not_Done ? "Complete":"Incomplete")
            this.props.newtask()
        }


    // This function enables editing of a task when edit icon is clicked/touched  
    edit_task = () => {
        k = this.state.task!=''?(this.state.task.charCodeAt(0)+1)%6:6
        var date = new Date().toLocaleString();
            this.setState({
                'markDoneDisable': (this.state.task=='' || !this.state.enableEditing),
                'Edit_Status': (this.state.enableEditing? Edit_Task:Edit_Done),
                'enableEditing': (!this.state.enableEditing),
                'backColorTaskBox': (this.state.enableEditing ? colors[k]:'#C0C0C0DD'),
                'borderLine': (this.state.enableEditing ? 0:1),
                'deleteDisable': !this.state.enableEditing,
                backColor:colors[k]
            })
            if (this.props.task.content!=this.state.task) {
                this.props.task.last_modified = date;
            }
            this.props.task.content=this.state.task
            this.props.newtask()
            //this.props.del()
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
        var content = (this.state.task)
        var mainbox = StyleSheet.flatten([
            styles.maincontainer,{
                marginVertical:AppData[this.props.id].taskMargin*1.5,
                backgroundColor:this.state.backColor,
            }
        ])

        var inputtask = StyleSheet.flatten([
            styles.taskbox, {
                backgroundColor:this.state.Task_Status==Task_Done?'#ffd700dd':this.state.backColorTaskBox,
                flex:this.state.Task_Status==Task_Done?7:6
            }
        ])
        var colors = StyleSheet.flatten([
            {
                backgroundColor:this.state.backColor
            }
        ])

        //Start return
        return(
            <View style={mainbox}>
                {/* {child} this button allows to change task status [change_status], has a variable image uri Task_Status*/}
                
                <View style={[styles.infobox, colors]}>
                    <TouchableHighlight underlayColor='#7C0A02' onPress={() => this.task_details()} style={styles.detailsbutton}>
                        <Image source={Details_Icon}style={styles.logo} />
                    </TouchableHighlight>
                </View>

                <View style={[styles.taskstatusbox, colors]}>
                    <TouchableHighlight activeOpacity={0} underlayColor={this.state.backColor} disabled={this.state.markDoneDisable} onPress={() => this.change_status()} style={styles.taskdone}>
                        <Image source={this.state.Task_Status} style={styles.logo} /> 
                    </TouchableHighlight>
                </View>
                {/* {child} this container shows the task, editable/uneditable if allowed through edit icon ->next child element */}
                {/* <View style={inputtask}> */}
                    <TextInput keyboardAppearance={'light'} onEndEditing={()=> {if (content!='') this.edit_task()}} enablesReturnKeyAutomatically={true}
                        returnKeyType='done' editable={this.state.enableEditing} defaultValue={this.state.task} placeholder={''}
                        placeholderTextColor={'black'} onChangeText={(task) => this.setState({task})} style={inputtask} />
                {/* </View> */}

                {/* {child} this button allows the task to be modified [edit_task], has a variable image uri Edit_Status */}
                <TouchableOpacity disabled={this.state.Task_Status==Task_Done || content==''} underlayColor="#000"  style={[styles.edittextbox, colors, {display:this.state.Task_Status==Task_Done?'none':'flex'}]} onPress={ () => this.edit_task()}>
                    <Image source={this.state.Edit_Status} style={styles.logo} />                            
                </TouchableOpacity>

                {/* {child} this button allows user to delete a task [delete_task], but not until user confirms in the following confirmation dialog*/}
                <TouchableOpacity disabled={this.state.Edit_Status==Edit_Done && !(content=='')} underlayColor="#000"  style={styles.deletetask} onPress={ () => this.props.delete()}>
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
        height:45,
        marginHorizontal:ms.width*1/40,
    },

    //Infobox container box for task
    infobox: {
        alignItems:'center',
        justifyContent:"center",
        flex:1,
        borderRadius:5,
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

    //button style for task status
    taskdone: {
        justifyContent:'center',
        alignItems:'center',
        height:12,
        width:12,
    },

    //box containing input task element so task details
    taskbox: {
        justifyContent:'center',
        paddingLeft:5,
        fontSize:16,
    },

    //button containing icon for task edit status
    edittextbox: {
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        borderLeftWidth:0.5,
        borderColor:'darkblue',

    },

    //button containing icon for task deletion
    deletetask: {
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        borderTopRightRadius:5,
        borderBottomEndRadius:5,
        borderLeftWidth:1,
        backgroundColor:'#e44d2edd'
    },

    //icon styles for all image
    logo:{
        width:30,
        height:30,
        resizeMode:'center',
    },
})