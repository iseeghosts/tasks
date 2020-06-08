//App.js => UserHome.js

/*This is an after login Component */

/* importing required modules */
import React, {Component} from 'react'
import {View, Text, FlatList, Platform, Dimensions, StyleSheet, KeyboardAvoidingView, TextInput, Image} from 'react-native'

//Importing functions
// import SavedNoteDark from '../components/SavedNoteDark'    //Function resposible for maintaining notes (editing, deleting, checking)
// import SavedNoteLight from '../components/SavedNoteLight'
import SavedNote from '../components/AllNotes'
import WelcomeUser from '../components/WelcomeUser'  //Header for logged in user [View Profile] - incomplete, [settings] - incomplete
import AddNoteButton from '../components/AddNoteButton'  //Button to add notes
import UserSettings from './UserSettings'

import Search_Icon_Light from '../assets/Search_Icon_Light.png'
import Search_Icon_Dark from '../assets/Search_Icon_Dark.png'
//imprting list of tasks
import Tasks from '../tasks.json'

import AppData from '../appdata.json'

var ms = Dimensions.get('window');
var header = ''

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
            rbo:false,
            mytask:Tasks[props.id],
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
        var search = this.state.search.toLowerCase()
        header = (search.slice(0,8)==('@deleted')?'Recycle Bin':'Tasks')
        return( null

        )
    }

    task_footer = () => {
        var res = AppData[this.props.id].SearchResultFound
        var result=''
        var search = this.state.search.toLowerCase()
        var res2 = false
        if (search && !(search.slice(0,8)=='@deleted')) {
            if (search.slice(0,9)=='@complete' || search.slice(0,11)=='@incomplete' || search.slice(0,10)=='@complete ' || search.slice(0,12)=='@incomplete ') {
                res2=true
                if (search.slice(0,10)=='@complete ' || search.slice(0,12)=='@incomplete ') {
                var search3=search.replace(search.slice(0,10)=='@complete '?'@complete ':'@incomplete ', '')
                res2=(search3=='')
                }
            }            
            result = (res<1?'No':res) + " " + (res2?'':'matching ') + (res==1?'result':'results') + (" found in Tasks!")
            // console.log(result)
        } else if (search && (search=='@deleted' || search=='@deleted ')) {
            result = (res==0?'No':res) + " deleted " + (res==1?'task':'tasks') + " in Recycle Bin"
        } else if (search && search.slice(0,9)==('@deleted ')) {
            var search2 = search.replace('@deleted ', '')
                res2=false
            if (search2.slice(0,9)=='@complete' || search2.slice(0,11)=='@incomplete' || search2.slice(0,10)=='@complete ' || search2.slice(0,12)=='@incomplete ') {
                res2=true
                if (search2.slice(0,10)=='@complete ' || search2.slice(0,12)=='@incomplete ') {
                search2=search2.replace(search2.slice(0,10)=='@complete '?'@complete ':'@incomplete ', '')
                res2=(search2=='')
                }
            }
            result = (res==0?'No':res) + (res2?' ':' matching ') + (res==1?'result':'results') + (" in Recycle Bin!")
        }
        // console.log(result)
        return(
            <View>
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
        let theme = AppData[this.props.id].theme
        let dark = theme=='dark'

        let ass = AppData[this.props.id].alwaysshowsearch
        var taskheadertext = StyleSheet.flatten([
            styles.taskheadertext, {
                color:(AppData[this.props.id].theme=='dark'?'white':'black'),
            }
        ])
    
        return(
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "height" : ""} style={[styles.maincontainer,{backgroundColor:(theme=='dark'?'#323232':'white'), paddingTop:theme=='dark'?0:20, marginTop:theme=='dark'?20:0}]}>
                    <View style={styles.firstcontainer}>

                        <View style={[styles.userheader,{flexDirection:this.state.po?'column':'row', backgroundColor:theme=='dark'?'#919191':'snow'}]}>

                            <View style={{display:this.state.dis}}>
                                <WelcomeUser rbo={this.state.rbo} po={this.state.po} op={()=>{this.setState({po:!this.state.po})}} id={this.props.id} openSettings={this.user_settings} recyclebin={() => this.setState({search:(this.state.rbo?'':'@deleted'),rbo:!this.state.rbo})}/>
                            </View>

                            <View style={[styles.searchbox, {flex:this.state.po?0:1, display: ( ass || !this.state.po) ?'flex':"none" ,backgroundColor:theme=='dark'?'gray':'#00808050'}]}>
                                <Image style={styles.searchicon} source={dark?Search_Icon_Dark:Search_Icon_Light} />

                                <TextInput style={styles.searchtext} placeholder='Search' placeholderTextColor="#666666" defaultValue={this.state.search}
                                    onEndEditing={()=>{this.setState({dis:(this.state.search==''?'flex':'none'),rbo:this.state.search.includes('@deleted')});}}
                                    onFocus={()=>this.setState({dis:'none'})} clearButtonMode={'while-editing'} onChangeText={(search)=>this.setState({search})}
                                    keyboardAppearance={theme} returnKeyType='search' />

                            </View>
                        </View>
                        <View style={styles.taskheader}>
                            <Text style={taskheadertext}>{header}</Text>
                        </View>
                        <View style={styles.flatlistcontainer}>
                            <FlatList  inverted ref={ref => this.flatList = ref}                                
                                ListHeaderComponent={this.task_header}
                                ListFooterComponent={this.task_footer}
                                ListFooterComponentStyle={styles.taskfooter}
                                showsVerticalScrollIndicator={false}
                                contentInset={{top:65}}
                                onContentSizeChange={()=>{this.setState({mytask:Tasks[id]}); this.flatList.scrollToEnd({animated:true})}}
                                data={this.state.mytask.sort((a, b) => a.status.localeCompare(b.status))}
                                renderItem={({item}) =>
                                <SavedNote resetlook={()=>this.setState({mytask:Tasks[id]})} task={item} id={id} search={this.state.search} />

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
        alignItems:'center',
    },
    taskheadertext:
    {
        fontSize:40,
    },
    taskfooter:
    {
        alignItems:'center',
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
        padding:3,
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundColor:'snow',
        borderBottomWidth:0.3,
    },
    searchbox:
    {
        borderRadius:5,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:5,
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
        flex:1
    },
    addnotes: {
        justifyContent:'flex-end',
        alignItems:'flex-end',
        height:0.001,
    },
})
