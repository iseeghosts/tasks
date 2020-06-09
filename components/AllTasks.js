import React, { Component } from 'react'
import {View, Alert} from 'react-native'

import SavedTasksDark from './SavedTasksDark'
import SavedTasksLight from './SavedTasksLight'
import RecycleBinDark from './RecycleBinDark'
import RecycleBinLight from './RecycleBinLight'
import AppData from '../appdata.json'
import Tasks from '../tasks.json'

export default class AllTasks extends Component {
    constructor(props) {
        super()
        this.state = ({
            permdisp:true,
            deletedTask:(props.task.deleted),
            task:props.task.content,
            status:props.task.status,            
        })
    }
    
    edit_task = () => {
        this.setState({task:this.props.task.content, status:this.props.task.status})
        setTimeout(this.props.resetlook,50)
    }
        // This function prompts user confirmation if user request deletion of a task
        delete_task = () => {
            if (!this.state.deletedTask){
            if (this.props.task.content) {
                Alert.alert('Delete?', "Are you sure you want to delete the task '" + this.state.task + "'?", [{text:'Confirm', onPress: () => {
                    this.setState({deletedTask:true});
                    this.props.task.deleted=true;
                    }, style:'destructive'}, {text:'Deny',}], {cancelable:true} ) 
            } else {
                this.props.task.deleted=true;
                this.setState({deletedTask:true});
                this.permanent_delete_task()
            }} else {
                this.props.task.deleted=false
                this.setState({deletedTask:false})
            }
        }
        request_permanent_deletion = () => {
            Alert.alert('Delete?', "Permanently delete task '" + this.state.task + "'?", [{text:'Confirm', onPress: () => {
                this.permanent_delete_task()
                this.setState({permdisp:false})
                //this.props.del()
            }, style:'destructive'}, {text:'Cancel'}], {cancelable:true}) 
        }
        permanent_delete_task = () => {
            var i = 0, id = this.props.id
            for (i=0; i<Tasks[id].length; i++) {
                if (Tasks[id][i].key==this.props.task.key) {
                    Tasks[id].splice(i, 1)
                }
            }
        }
    
    render() {
        var found = false
        var content = (this.state.task).toLowerCase()
        var search = (this.props.search).toLowerCase()
        var status = this.state.status.toLowerCase()
        var deleted = this.state.deletedTask
        var date = this.props.task.last_modified

        // Search Start
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

        if (found) {
            AppData[this.props.id].SearchResultFound = AppData[this.props.id].SearchResultFound + 1
            found = found && this.state.permdisp          
        }
        // Search End


        if (search.slice(0,9)!='@deleted' && !deleted && found) {            
            if (AppData[this.props.id].theme=='dark') {
                return (
                    <View style={{flex:1}}>
                        <SavedTasksDark newtask={this.edit_task} delete={this.delete_task} task={this.props.task} id={this.props.id} search={this.props.search} />
                    </View>
                )
            } else {
                return (
                    <View style={{flex:1}}>
                        <SavedTasksLight newtask={this.edit_task} delete={this.delete_task} task={this.props.task} id={this.props.id} search={this.props.search} />
                    </View>
                )
            }
        }
        else if (search.slice(0,8)=='@deleted' && deleted && found) {
            if (AppData[this.props.id].theme=='dark') {
                return (
                    <View style={{flex:1}}>
                        <RecycleBinDark task={this.props.task} id={this.props.id} restore={this.delete_task} permdelete={this.request_permanent_deletion} search={this.props.search} />
                    </View>
                )
            } else {
                return (
                    <View style={{flex:1}}>
                        <RecycleBinLight task={this.props.task} id={this.props.id} restore={this.delete_task} permdelete={this.request_permanent_deletion} search={this.props.search} />
                    </View>
                )
            }  
        }
        return null
    }
        
}