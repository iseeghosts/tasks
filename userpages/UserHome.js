//App.js => UserHome.js

/*This is an after login Component */

/* importing required modules */
import React, {Component} from 'react'
import {View, Text, FlatList, Platform, Dimensions, StyleSheet, KeyboardAvoidingView, TextInput, Image} from 'react-native'

//Importing functions
import SavedNoteDark from '../components/SavedNoteDark'    //Function resposible for maintaining notes (editing, deleting, checking)
import SavedNoteLight from '../components/SavedNoteLight'
import WelcomeUser from '../components/WelcomeUser'  //Header for logged in user [View Profile] - incomplete, [settings] - incomplete
import AddNoteButton from '../components/AddNoteButton'  //Button to add notes
import UserSettings from './UserSettings'

import Search_Icon from '../assets/Search_Icon.png'

//imprting list of tasks
import Tasks from '../tasks.json'

import AppData from '../appdata.json'

var ms = Dimensions.get('window');

var SavedNote = SavedNoteDark

 /*This is the User Home Component - accessible after user inputs correct id and password*/

 //Starts export
 export default class UserHome extends Component{
    
    //Initializing initial states of the system
    constructor(props) {
        super()
        this.state={
            taskid:Math.random().toString(13).replace('0.', ''), //Initial taskid of tasks in task.json
            openSettings:false,
            search:'',
            b:0,
            dis:'flex',
            po:false,
            rbo:false
        }
    }

    user_settings = () => {
        this.setState({
            'openSettings':!this.state.openSettings
        })
    }

    add_newtask = () => {
        this.setState({
            'taskid':Math.random().toString(13).replace('0.', '')  //Each time a task is run, taskid increments by 1
        })
        var date = new Date().getTime()
        date = String(date)
        // console.log(date)
        var date2 = new Date().toLocaleString();
        Tasks[this.props.id].push({"key":this.state.taskid, "content":"","date_created":date, "last_modified":date2, "status":"Incomplete", "deleted":false});   // Pushing new task to list of Tasks
    }

    task_header = () => {
        AppData[this.props.id].SearchResultFound=0
        var result = ''
        var search = this.state.search.toLowerCase()
        result = (search?(search.slice(0,8)==('.deleted')?'Recycle Bin':''):'Tasks')
          var taskheadertext = StyleSheet.flatten([
              styles.taskheadertext, {
                  color:(AppData[this.props.id].theme=='dark'?'white':'black'),
              }
          ])
        return(
            <View style={styles.taskheader}>
                <Text style={taskheadertext}>{result}</Text>
            </View>
        )
    }

    task_footer = () => {
        var res = AppData[this.props.id].SearchResultFound
        var search = this.state.search.toLowerCase()
        var res2 = false
        var result = ''
        if (search && !(search.slice(0,8)=='.deleted')) {
            if (search.slice(0,9)=='.complete' || search.slice(0,11)=='.incomplete' || search.slice(0,10)=='.complete ' || search.slice(0,12)=='.incomplete ') {
                res2=true
                if (search.slice(0,10)=='.complete ' || search.slice(0,12)=='.incomplete ') {
                var search3=search.replace(search.slice(0,10)=='.complete '?'.complete ':'.incomplete ', '')
                res2=(search3=='')
                }
            }            
            result = (res<1?'No':res) + " " + (res2?'':'matching ') + (res==1?'result':'results') + (" found!")
            // console.log(result)
        } else if (search && (search=='.deleted' || search=='.deleted ')) {
            result = (res==0?'No':res) + " deleted " + (res==1?'task':'tasks') + " in Recycle Bin"
        } else if (search && search.slice(0,9)==('.deleted ')) {
            var search2 = search.replace('.deleted ', '')
                res2=false
            if (search2.slice(0,9)=='.complete' || search2.slice(0,11)=='.incomplete' || search2.slice(0,10)=='.complete ' || search2.slice(0,12)=='.incomplete ') {
                res2=true
                if (search2.slice(0,10)=='.complete ' || search2.slice(0,12)=='.incomplete ') {
                search2=search2.replace(search2.slice(0,10)=='.complete '?'.complete ':'.incomplete ', '')
                res2=(search2=='')
                }
            }
            result = (res==0?'No':res) + (res2?' ':' matching ') + (res==1?'result':'results') + (" in Recycle Bin!")
        } else {
            result= res + " tasks!"
        }
        // console.log(result)
        return(
            <View style={styles.taskfooter}>
                <Text style={[styles.taskfootertext, {color:AppData[this.props.id].theme=='dark'?'white':'#333333'}]}>{result}</Text>
            </View>
        )
    }

    render () {
        

        if (this.state.openSettings) {
            return (
              <View style={{flex:1}}>
                <UserSettings close={this.props.close} id={this.props.id} closeSettings={this.user_settings} />
              </View>
            )
          }
        const id = this.props.id
        const mytask = Tasks[id]   //this is an array [{key:'', content:''},{}]
        let theme = AppData[this.props.id].theme
        if (theme=='dark') {
            SavedNote=SavedNoteDark
        } else {
            SavedNote= SavedNoteLight
        }

        let ass = AppData[this.props.id].alwaysshowsearch
    
        return(
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} style={[styles.maincontainer,{backgroundColor:(theme=='dark'?'#323232':'white'), paddingTop:theme=='dark'?0:20, marginTop:theme=='dark'?20:0}]}>
                    <View style={styles.firstcontainer}>

                        <View style={[styles.userheader,{flexDirection:this.state.po?'column':'row'}]}>

                            <View style={{display:this.state.dis}}>
                                <WelcomeUser rbo={this.state.rbo} po={this.state.po} op={()=>{this.setState({po:!this.state.po})}} id={this.props.id} openSettings={this.user_settings} recyclebin={() => this.setState({search:(this.state.rbo?'':'.deleted'),rbo:!this.state.rbo})}/>
                            </View>

                            <View style={[styles.searchbox, {flex:this.state.po?0:1, display: ( ass || !this.state.po) ?'flex':"none" ,backgroundColor:theme=='dark'?'#777777':'white'}]}>
                                <Image style={styles.searchicon} source={Search_Icon} />

                                <TextInput style={styles.searchtext} placeholder='Search' placeholderTextColor="#666666" defaultValue={this.state.search}
                                    onEndEditing={()=>{this.setState({dis:(this.state.search==''?'flex':'none'),rbo:this.state.search.includes('.deleted')});}}
                                    onFocus={()=>this.setState({dis:'none'})} clearButtonMode={'while-editing'} onChangeText={(search)=>this.setState({search})}
                                    />

                            </View>
                        </View>
                        <View style={styles.flatlistcontainer}>
                            <FlatList ref={ref => this.flatList = ref}                                
                                ListHeaderComponent={this.task_header}
                                ListFooterComponent={this.task_footer}
                                showsVerticalScrollIndicator={false}
                                // contentInset={{bottom:85}}
                                onLayout={() => {this.setState({search:this.state.search})}}
                                onContentSizeChange={() => {this.setState({search:this.state.search})}}
                                data={mytask.sort((a, b) => b.date_created.localeCompare(a.date_created))}
                                renderItem={({item}) =>
                                <SavedNote task={item} id={id} search={this.state.search} />

                            } keyExtractor={item => item.key.toString()}
                                    />
                        </View>
                    </View>

                    <View style={[styles.addnotes,{display:this.state.rbo?'none':this.state.dis}]}>
                        <AddNoteButton theme={theme} onPress={this.add_newtask}/>
                    </View>
                
            </KeyboardAvoidingView>

        )
    }
}
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({
    
    taskheader:
    {
        margin:5,

    },
    taskheadertext:
    {
        fontSize:50,
    },
    taskfooter:
    {
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        paddingBottom:105,
    },
    taskfootertext:
    {
        fontSize:15,
    },

    //Avoid KeyBoard Overlap
    maincontainer: {
        flex:1,
    },

    //first Container to Include children items
    firstcontainer: {
        flex:1,

    },

    //Header for Logged In Screen
    userheader: {
        padding:5,
        paddingBottom:0,
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    searchbox:
    {
        borderRadius:5,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    searchtext:
    {
        color:'black',
        fontSize:18,
        flex:1,
        padding:5,
    },
    searchicon:
    {
        height:25,
        width:25,
        opacity:0.5,
    },
    flatlistcontainer: {
        width:ms.width,
    },
    addnotes: {
        justifyContent:'flex-end',
        alignItems:'flex-end',
        height:0.001,
    },
})
