//App.js --[Path B]-->UserHome.js
//                     --^--
//
/* This is second screen - UserHome Screen */

/* importing required modules */
import React, {Component} from 'react'
import {View, Text, FlatList, Platform, Dimensions, StyleSheet, KeyboardAvoidingView, TextInput, Image} from 'react-native'

//importing components
import AllTasks from '../components/AllTasks'               //All Tasks
import WelcomeUser from '../components/WelcomeUser'         //Header for logged in user [View Profile] - incomplete, [settings] - incomplete
import AddTaskButton from '../components/AddTaskButton'     //Button to add tasks
import UserSettings from './UserSettings'

//importing icons
import Search_Icon_Light from '../assets/Search_Icon_Light.png' //Search icon url - light
import Search_Icon_Dark from '../assets/Search_Icon_Dark.png'   // |-> dark

//importing list of tasks
import Tasks from '../tasks.json'

//importing appdata for user
import AppData from '../appdata.json'

//screen dimensions
var ms = Dimensions.get('window');

//header text
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

    //Open or close UserSettings - invoked by WelcomeUser/UserSettings Component,
    user_settings = () => {
        this.setState({
            'openSettings':!this.state.openSettings
        })
    }

    //add new tasks invoked by AddTask component
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

    //flatlist header (or footer if flatlist is inverted)
    task_header = () => {
        AppData[this.props.id].SearchResultFound=0
        var search = this.state.search.toLowerCase()
        header = (search.slice(0,8)==('@deleted')?'Recycle Bin':'Tasks')
        return( null

        )
    }

    //flatlist footer (or header if flatlist is inverted)
    //shows number of results
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

        // returns results
        return(
            <View>
                <Text style={[styles.taskfootertext, {color:AppData[this.props.id].theme=='dark'?'white':'#333333'}]}>{result}</Text>
            </View>
        )
    }

    render () {   

        //go to usersettings component if true
        if (this.state.openSettings) {
            return (
              <View style={{flex:1}}>
                <UserSettings close={this.props.close} id={this.props.id} closeSettings={this.user_settings} />
              </View>
            )
        }

        //setting a short text variable for repeatedly used long variable text
        const id = this.props.id
        let theme = AppData[this.props.id].theme
        let dark = theme=='dark'
        let ass = AppData[this.props.id].alwaysshowsearch

        /* StyleSheet Mods */
        var taskheadertext = StyleSheet.flatten([
            styles.taskheadertext, {
                color:(AppData[this.props.id].theme=='dark'?'white':'black'),
            }
        ])

        //return    
        return(

        //  A - main container
            <KeyboardAvoidingView behavior={Platform.OS=='ios'?'padding':''} style={[styles.maincontainer,{backgroundColor:(theme=='dark'?'#323232':'white'), paddingTop:theme=='dark'?0:20, marginTop:theme=='dark'?20:0}]}>
                    
        {/* A - 1 - first box containing userheader and flatlist */}
                <View style={styles.firstcontainer}>

        {/* A - 1 - A - userheader containg search and welcome user */}
                    <View style={[styles.userheader,{flexDirection:this.state.po?'column':'row', backgroundColor:theme=='dark'?'#919191':'snow'}]}>

        {/* A - 1 - A - 1 -  */}
                        <View style={{display:this.state.dis}}>
            
        {/* A - 1 - A - 1 - A - welcomeuser component */}
                            <WelcomeUser rbo={this.state.rbo} po={this.state.po} op={()=>{this.setState({po:!this.state.po})}} id={this.props.id} openSettings={this.user_settings} recyclebin={() => this.setState({search:(this.state.rbo?'':'@deleted'),rbo:!this.state.rbo})}/>
                        </View>

        {/* A - 1 - A - 2 - search box */}
                        <View style={[styles.searchbox, {flex:this.state.po?0:1, display: ( ass || !this.state.po) ?'flex':"none" ,backgroundColor:theme=='dark'?'gray':'#00808050'}]}>
        
        {/* A - 1 - A - 2 - A - search icon */}
                            <Image style={styles.searchicon} source={dark?Search_Icon_Dark:Search_Icon_Light} />

        {/* A - 1 - A - 2 - B - search content input */}
                            <TextInput style={styles.searchtext} placeholder='Search' placeholderTextColor="#666666" defaultValue={this.state.search}
                                onEndEditing={()=>{this.setState({dis:(this.state.search==''?'flex':'none'),rbo:this.state.search.includes('@deleted')});}}
                                onFocus={()=>{this.setState({dis:'none'})}} clearButtonMode={'while-editing'} onChangeText={(search)=>this.setState({search})}
                                keyboardAppearance={theme} returnKeyType='search' />
                        </View>
                    </View>
        
        {/* A - 1 - B - header for all tasks the header variable is decided from task_header function */}
                    <View style={styles.taskheader}>
        
        {/* A - 1 - B - 1 - header text */}
                        <Text style={taskheadertext}>{header}</Text>
                    </View>
        
        {/* A - 1 - C - flatlist container */}        
                    <FlatList style={{flex:1}} inverted ref={ref => this.flatList = ref} ListHeaderComponent={this.task_header}
                        ListFooterComponent={this.task_footer} ListFooterComponentStyle={styles.taskfooter}
                        showsVerticalScrollIndicator={false} contentInset={{top:65}} onLayout={()=> this.flatList.scrollToEnd({animated:true})}
                        onContentSizeChange={()=>{this.flatList.scrollToEnd({animated:true});this.setState({mytask:Tasks[id]})}}
                        data={this.state.mytask.sort((a, b) => a.status.localeCompare(b.status))}
                        renderItem={({item}) => <AllTasks resetlook={()=>{this.setState({mytask:Tasks[id]});this.flatList.scrollToEnd({animated:true})}}
                        task={item} id={id} search={this.state.search} />} keyExtractor={item => item.key.toString()} />
                </View>

        {/* A - 2 - add task component container */}
                <View style={[styles.addtasks,{display:this.state.rbo?'none':this.state.dis}]}>

        {/* A - 2 - A - add task component */}
                    <AddTaskButton theme={theme} onPress={this.add_newtask}/>
                </View>                
            </KeyboardAvoidingView>
        )
    }
}
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({
    
    //styles flatlist header (if inverted, may be said footer)
    taskheader:
    {
        alignItems:'center',
    },

    //styles for flatlist header text
    taskheadertext:
    {
        fontSize:40,
    },

    //flatlist footer (or header in case flatlist is inverted)
    taskfooter:
    {
        alignItems:'center',
    },

    //flatlist footer text
    taskfootertext:
    {
        fontSize:15,
    },

    //All items
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

    //styles for search box
    searchbox:
    {
        borderRadius:5,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:5,
    },

    //search input styles
    searchtext:
    {
        color:'black',
        fontSize:18,
        flex:1,
        padding:5,
    },

    //search icon styles
    searchicon:
    {
        height:25,
        width:25,
        opacity:0.5,
    },

    //styles for flatlist container
    flatlistcontainer: {
        width:ms.width,
        flex:1
    },

    //styles for add tasks
    addtasks: {
        justifyContent:'flex-end',
        alignItems:'flex-end',
        height:0.001,
    },
})
