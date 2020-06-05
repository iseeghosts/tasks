//App.js => UserHome.js => Welcome.js
//                       |=> SavedNote.js

/* This function maintains flatlist of tasks stored in tasks.json => ./../tasks.json and those added using AddNoteButton => ./AddNoteButton.js*/

/* importing required modules */
import React, { Component } from 'react'
import {View, Text, TextInput, Alert, Image, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions} from 'react-native'

/*Importing Button Images */
import TaskNotDone from './../assets/Task_Incomplete.png';   //icon for incomplete task
import TaskDone from './../assets/Task_Done_Light.png';            //icon for completed task
import Delete_Task_Light from './../assets/Delete_Task_Light.png';       //icon for delete task
import Edit_Task from './../assets/Edit_Task_Light.png'            //icon for un-edited task
import Done_Editing from './../assets/Edit_Done.png'     //icon during task being edited
import Details_Icon from './../assets/Details_Icon_Light.png'
import Restore_Task from '../assets/Restore_Task.png'

/* This function styles and maintains list of items in Tasks passed via UserHome.js
also enables to delete or edit existing items in the tasks list*/
import Tasks from '../tasks.json'
import AppData from '../appdata.json'

var ms = Dimensions.get('window')

//Start of export
export default class SavedNote extends Component{

    //Initial State
    constructor (props) {
        super()
            this.state = ({
                Task_Status:(props.task.status=="Complete"? TaskDone: TaskNotDone),                                //image uri variable for task status
                Edit_Status:(props.task.content=='' ? Done_Editing:Edit_Task),  // image uri handler for editing state of a task

                enableEditing:(props.task.content==''),            //Enables/Disables editing for tasks (a newly created note will be editable) 
                markDoneDisable:(props.task.content==''),          //adds abiility to prevent marking empty notes as done
                deleteDisable:false,
                deletedTask:(props.task.deleted),   // removes deleted tasks from view
                Delete_Task:props.task.deleted?Restore_Task:Delete_Task_Light,
                permdisp:true,

                backColor:(props.task.status=="Incomplete"? 'lightgrey':'skyblue'), 
                backColorTaskBox:(props.task.content==''? 'grey':'transparent'),
                disableEditButton:(props.task.status=="Complete"),
                task:props.task.content,                                        //temporararily stores task details passed from UserHome.js => ./../userpages/UserHome.js
            })
    }
    
    // This function changes image of edit icon based on edit state of a task
    change_status = () => {
        this.setState({
                'Task_Status':(this.state.Task_Status==TaskNotDone ? TaskDone:TaskNotDone),
                'backColor': (this.state.Task_Status==TaskNotDone ? 'skyblue':'lightgray'),
                'disableEditButton':!this.state.disableEditButton,
            })
            this.props.task.status = (this.state.Task_Status==TaskNotDone ? "Complete":"Incomplete")
        // setTimeout(this.props.del,100)
        }

    // This function prompts user confirmation if user request deletion of a task
    delete_task = () => {
        if (!this.state.deletedTask){
        if (this.state.task) {
            Alert.alert('Delete?', "Are you sure you want to delete the task '" + this.state.task + "'?", [{text:'Confirm', onPress: () => {
                this.setState({deletedTask:true, Delete_Task:Restore_Task});
                this.props.task.deleted=true;
                //this.props.del()
                }}, {text:'Deny',}], {cancelable:true} ) 
        } else {
            this.props.task.deleted=true;
            this.setState({deletedTask:true});
            this.permanent_delete_task()
        }} else {
            this.props.task.deleted=false
            this.setState({deletedTask:false, Delete_Task:Delete_Task_Light})
        }
        //this.props.del()
    }
    request_permanent_deletion = () => {
        Alert.alert('Delete?', "Permanently delete task '" + this.state.task + "'?", [{text:'Confirm', onPress: () => {
            this.permanent_delete_task()
            this.setState({permdisp:false})
            //this.props.del()
        }}, {text:'Cancel'}], {cancelable:true}) 
    }
    permanent_delete_task = () => {
        var i = 0, id = this.props.id
        for (i=0; i<Tasks[id].length; i++) {
            if (Tasks[id][i].key==this.props.task.key) {
                Tasks[id].splice(i, 1)
            }
        }
    }

    // This function enables editing of a task when edit icon is clicked/touched  
    edit_task = () => {
        var date = new Date().toLocaleString();
            this.setState({
                'markDoneDisable': (this.state.task=='' || !this.state.enableEditing),
                'Edit_Status': (this.state.enableEditing? Edit_Task:Done_Editing),
                'enableEditing': (!this.state.enableEditing),
                'backColorTaskBox': (this.state.enableEditing ? 'transparent':'lightblue'),
                'borderLine': (this.state.enableEditing ? 0:1),
                'deleteDisable': !this.state.enableEditing,
                'backColor': (this.state.task==''? '#515151':'lightgray'),
            })
            if (this.props.task.content!=this.state.task) {
                this.props.task.last_modified = date;
            }
            this.props.task.content=this.state.task
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
        
        var found = false
        var content = (this.props.task.content).toLowerCase()
        var search = (this.props.search).toLowerCase()
        var status = this.props.task.status.toLowerCase()
        var deleted = this.state.deletedTask
        var date = this.props.task.last_modified
        if (search=='' && !deleted) {
            found=true
        } else if (search && !deleted) {
            if (!(search.slice(0,8)=='@deleted') && !(search.slice(0,9)==('@complete')|| search.slice(0,11)==('@incomplete')) && (search!='@empty')) {
                found=(content.includes(search) || date.includes(search))
                // console.log("content/date")
            } else if (search.includes('@'+status)) {
                    found=(search=='@'+status || search=='@'+status+' ')
                if (search.includes('@'+status+' ')) {
                    var search2 = search.replace("@"+status+" ", "")
                    found=(content.includes(search2) || date.includes(search2))
                    }                
            } else if (search=='@empty') {
                found=(content=='')
            }
        } 
        else if (search.slice(0,8)==('@deleted') && deleted) {
            if (search=='@deleted' || search=='@deleted ') {
                found=true
            }
            if (search.slice(0,9)==('@deleted ')) {
                var search3 = search.replace("@deleted ", "")
                found=(content.includes(search3) || date.includes(search3))
                if ((search3.slice(0,9)=='@complete')||(search.slice(0,11)=='@incomplete')) {
                    if (search3=='@'+status || search3=='@'+status+' ') {
                        found=true
                    }
                    if (search3.includes('@'+status+' ')) {
                        var search4 = search3.replace("@"+status+" ", "")
                        found=(content.includes(search4) || date.includes(search4))
                    }
                }
            }              
        }

        if (found && this.state.permdisp) {
            AppData[this.props.id].SearchResultFound = AppData[this.props.id].SearchResultFound + 1            
        }
        // End of search
        
        var mainbox = StyleSheet.flatten([
            styles.maincontainer,{
                display:found && this.state.permdisp ?'flex':'none',
                marginTop:AppData[this.props.id].taskMargin,
                marginHorizontal:ms.width*1/40,
            }
        ])

        var mainbox2 = StyleSheet.flatten([
            styles.seccontainer,{
                backgroundColor:this.state.backColor,
                height:ms.height*1/15,
                borderBottomLeftRadius:found && search.includes('@deleted')?0:5,
                borderBottomRightRadius:found && search.includes('@deleted')?0:5            }
        ])

        var inputtask = StyleSheet.flatten([
            styles.taskbox, {
                backgroundColor:this.state.backColorTaskBox,
            }
        ])

        //Start return
        return(
            <View style={mainbox}>
            {/* main Container containing all children items */}
                <View style={mainbox2}>

                    {/* {child} this button allows to change task status [change_status], has a variable image uri Task_Status*/}
                    <View style={styles.taskstatusbox}>
                        <TouchableHighlight disabled={this.state.markDoneDisable||this.state.deletedTask} onPress={() => this.change_status()} style={styles.taskdone}>
                            <Image source={this.state.Task_Status} style={styles.logo} /> 
                        </TouchableHighlight>
                    </View>

                    <View style={styles.infobox}>
                        <TouchableHighlight underlayColor='#7C0A02' onPress={() => this.task_details()} style={styles.detailsbutton}>
                            <Image source={Details_Icon}style={styles.logo} />
                        </TouchableHighlight>
                    </View>

                    {/* {child} this container shows the task, editable/uneditable if allowed through edit icon ->next child element */}
                    <View style={inputtask}>
                        <TextInput onSubmitEditing={()=> {if (this.state.task!='') this.edit_task()}} editable={this.state.enableEditing && !deleted} defaultValue={this.state.task} placeholder={''} placeholderTextColor={'black'} onChangeText={(task) => this.setState({task})} />
                    </View>

                    {/* {child} this button allows the task to be modified [edit_task], has a variable image uri Edit_Status */}
                    <TouchableOpacity disabled={this.state.Task_Status==TaskDone || this.state.deletedTask || content==''} underlayColor="#000"  style={styles.edittextbox} onPress={ () => this.edit_task()}>
                        <Image source={this.state.Edit_Status} style={styles.logo} />                            
                    </TouchableOpacity>

                    {/* {child} this button allows user to delete a task [delete_task], but not until user confirms in the following confirmation dialog*/}
                    <TouchableOpacity disabled={this.state.Edit_Status==Done_Editing && !(content=='')} underlayColor="#000"  style={[styles.deletetask, {backgroundColor:this.state.deletedTask?'green':'darkred', borderBottomRightRadius:found && search.includes('@deleted')?0:5}]} onPress={ () => this.delete_task()}>
                        <Image source={this.state.Delete_Task} style={styles.logo} />                            
                    </TouchableOpacity>
                </View>                
                <View style={[styles.deleteperm, {display:found && search.includes('@deleted')?'flex':'none'}]}>
                    <Text style={styles.deletepermtext} onPress={()=> this.request_permanent_deletion()}>Delete permanently</Text>
                </View>

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
        shadowRadius:8,
        shadowOpacity:0.8,
        elevation:5,
        shadowOffset:{height:0.1},
        backgroundColor:'white'
    },
    seccontainer: {
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },

    //box containing task status icon and button
    taskstatusbox: {
        paddingHorizontal:3,
        justifyContent:'center',
        borderTopStartRadius:5,
        borderRightWidth:0.5,
    },

    //button style for task status
    taskdone: {
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        height:12,
        width:12,
    },

    //Infobox container box for task
    infobox: {
        alignItems:'center',
        justifyContent:"center",
        paddingHorizontal:5,
    },

    //button for infobox
    detailsbutton:{
        justifyContent:'center',
        alignItems:'center',
        width:23,
        height:23,
        borderRadius:11.5,
        shadowRadius:1,
        shadowOpacity:0.7,
        shadowOffset:{height:0.1},
    },

    //box containing input task element so task details
    taskbox: {
        justifyContent:'center',
        paddingLeft:5,
        flex:5,
        borderRightWidth:0.5,
        borderColor:'darkblue',
    },

    //button containing icon for task edit status
    edittextbox: {
        paddingHorizontal:3,
        justifyContent:'center',
    },

    //button containing icon for task deletion
    deletetask: {
        paddingHorizontal:3,
        justifyContent:'center',
        borderTopRightRadius:5,
        borderLeftWidth:1
    },

    //icon styles for all image
    logo:{
        width:30,
        height:30,
        resizeMode:'center',
    },
    deleteperm:
    {
        justifyContent:'center',
        alignItems:'center',
        padding:6,
    },
    deletepermtext:
    {
        fontSize:16,
        color:'darkred'
    }
})

