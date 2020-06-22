//App.js --[Path A]-->SignUp.js
//                     --^--
//
/* This is second screen - SignUp Screen */

/* importing required modules */
import React, { Component } from 'react';
import {View, Image, KeyboardAvoidingView, Platform, StyleSheet, YellowBox, TextInput, Text, Dimensions, TouchableHighlight, ScrollView, TouchableOpacity, Alert} from 'react-native';
YellowBox.ignoreWarnings(['RootErrorBoundary']);

//importing list of users
import Users from './users.json'

//importing list of tasks
import Tasks from './tasks.json'

//importing list of all users
import UO from './originaluserlist.json'

//importing user settings
import AppData from './appdata.json'


//importing icons
import User_Check_Light from './assets/User_Check_Light.png'        //check userid image url - light
import User_Check_Dark from './assets/User_Check_Dark.png'          // |->dark
import Verified_User_Dark from './assets/Verified_User_Dark.png'    //verified userid image url - dark
import Verified_User_Light from './assets/Verified_User_Light.png'  // |->light
import Show_Pass from './assets/Show_Pass.png';                     //show password
import Hide_Pass_Light from './assets/Hide_Pass_Light.png'          //hide password - light
import Hide_Pass_Dark from './assets/Hide_Pass_Dark.png';           // |->dark
import Back_Arrow_Dark from './assets/Back_Arrow_Dark.png'          //go back to login - dark
import Back_Arrow_Light from './assets/Back_Arrow_Light.png'        // |->dark

/*list of messages*/
var messages = ["Sorry, this user id is not available","Kindly fill all the fields", "this userid is available", "Passwords do not match!"];

//screen Dimensions
var ms = Dimensions.get('window')

//usercheck availibility
var x;

//variable for theme specific icons
var Hide_Pass
var User_Check
var Verified_User

/* start of default export function */
export default class SignUp extends Component {

    //initial states
    constructor(props) {
        var Hide_Pass = props.theme?Hide_Pass_Dark:Hide_Pass_Light
        var User_Check = props.theme?User_Check_Dark:User_Check_Light
        var Verified_User = props.theme?Verified_User_Dark:Verified_User_Light
        var presignup = props.id!='' && !(props.id in UO)
        super()
        this.state = {
            name:'',          //user's name
            userid:props.id,  //user's id
            password:'',      //user's password
            password2:'',     //confirm password
            displaySignUpBox:presignup?'flex':'none',   //display all field after validating userid
            enablePass1:true,       //true to disable show password when editing another field 
            enablePass2:true,       //true to disable show password when editing another field
            result:presignup?messages[2]:(props.id in UO)?messages[0]:'',              //userid availability messages
            result2:'',             //signup attempt messages
            disableButton:!presignup,     //check userid availability 
            dark:props.theme,       //set theme
            Pass_View1:Hide_Pass,   //pass view icon
            Pass_View2:Hide_Pass,   //pass view icon  
            User_Status:presignup?Verified_User:User_Check,   //user check icon
        }
    }

    // change Theme of Current Page
    change_theme = () => {
        var dark = this.state.dark
        Hide_Pass = !dark?Hide_Pass_Dark:Hide_Pass_Light
        User_Check = !dark?User_Check_Dark:User_Check_Light
        Verified_User =!dark?Verified_User_Dark:Verified_User_Light
        var Pass_View1=this.state.Pass_View1;
        var Pass_View2 = this.state.Pass_View2;
        var User_Status = this.state.User_Status
        this.setState({
            dark:!this.state.dark,
            Pass_View1:!(Pass_View1==Show_Pass)?Hide_Pass:Show_Pass,
            Pass_View2:!(Pass_View2==Show_Pass)?Hide_Pass:Show_Pass,
            User_Status:(User_Status==User_Check_Dark || User_Status==User_Check_Light)?User_Check:Verified_User
        })
    }

    //reset fields if userid changes
    reset_fields = () => {
        User_Check = this.state.dark?User_Check_Dark:User_Check_Light
        this.setState({
            displaySignUpBox:'none',
            User_Status:User_Check,
            result:'',
            result2:'',
            password:'',
            password2:'',
            disableButton:false
        })
    }

    //check userid availability
    check_availability = () => {
        Verified_User =this.state.dark?Verified_User_Dark:Verified_User_Light
        var len1=0
        var len2=0
        for (x in UO) {
            if ([x]!=this.state.userid) {
                len1=len1+1
            }
            len2=len2+1
        }
        if ((len1!=len2) && (len1!=0)) {
            this.setState({result:messages[0]})
        } else if ((len1==len2) && (len1!=0)) {
            this.setState({displaySignUpBox:'flex',result:messages[2], User_Status:Verified_User})
        }
        this.setState({disableButton:true})
    }

    //reset results
    reset_results = () => {
        this.setState({
            result:'',
            result2:''
        })
    }

    //disable passwords on name change
    disable_password = () => {
        Hide_Pass=this.state.dark?Hide_Pass_Dark:Hide_Pass_Light
        this.reset_results
        this.setState({
            Pass_View1:Hide_Pass,
            Pass_View2:Hide_Pass,
            enablePass1:this.state.password=='',
            enablePass2:this.state.password2=='',
        })
    }

    //disable password view in field 2 
    dis_pass2 = () => {
        var dark = this.state.dark
        var Hide_Pass = dark?Hide_Pass_Dark:Hide_Pass_Light
        this.setState({
            enablePass2:(String(this.state.password2).length==''),
            Pass_View2:Hide_Pass,
            result:'',
            result2:''
        })
        if (String(this.state.password)=='') {
            this.setState({
                enablePass1:true,
            })
            // alert('Hola!')
        }
    }

    //disable password view in field 1
    dis_pass1 = () => {
        var dark = this.state.dark
        var Hide_Pass = dark?Hide_Pass_Dark:Hide_Pass_Light
        this.setState({
            enablePass1:(String(this.state.password).length==''),
            Pass_View1:Hide_Pass,
            result:'',
            result2:''
        })
        if (String(this.state.password2)=='') {
            this.setState({
                enablePass2:true,
            })
        }
        
    }

    //add first task should the user chooses to go home after successful signup
    add_first_task = () => {
        var taskid = Math.random().toString(13).replace('0.', '')  //Each time a task is run, taskid increments by 1
        var date = new Date().getTime()
        date = String(date)
        var date2 = new Date().toLocaleString();

        Tasks[this.state.userid].push({"key":taskid, "content":"This is a sample task", "date_created":date, "last_modified":date2, "status":"Incomplete", "deleted":false});   // Pushing new task to list of Tasks
        console.log(taskid)
    }
    
    // signup attempt
    signup_attempt = () => {
        var dark = this.state.dark
        var Hide_Pass = dark?Hide_Pass_Dark:Hide_Pass_Light
        if ((this.state.password) && (this.state.password2) && (this.state.name)) {
            if (this.state.password==this.state.password2) {
                Users[this.state.userid] = {"name":this.state.name, "pwd":this.state.password}
                UO[this.state.userid] = {"name":this.state.name, "pwd":this.state.password}
                AppData[this.state.userid] = {"taskMargin":8,"alwaysshowsearch":true,"SearchResultFound":true,"theme":this.state.dark?'dark':'light'}
                Tasks[this.state.userid] = [];
                this.add_first_task()
                Alert.alert("Account Creation",'Hi '+ Users[this.state.userid].name + '!\nYour account was created successfully!'
                ,[
                    {text:'Ok!', onPress: () => this.setState({ name:'', userid:'', password:'', password2:'', displaySignUpBox:'none', enablePass1:true, enablePass2:true, showPass1:true, showPass2:true, result:'', result2:'', User_Status:User_Check_Light, Pass_View1:Hide_Pass, Pass_View2:Hide_Pass})},
                    {text:'Go to home', onPress: () => {this.props.setUserId(this.state.userid); this.props.signUp(); this.props.goHome(true);alert('Click on the profile icon for more options!')}}
                ], {cancelable:true} )
            } else {
            this.setState({result2:messages[3]})
            }
        } else {
            this.setState({result2:messages[1]})
        }
    }

    //render function
    render() {

        // list of variables
        var dark = this.state.dark
        var Back_Arrow= dark?Back_Arrow_Dark:Back_Arrow_Light
        Hide_Pass = (dark?Hide_Pass_Dark:Hide_Pass_Light)

        /*stylesheet mods */
        var signupbox = StyleSheet.flatten([
            styles.userdetails,{
                display:this.state.displaySignUpBox
            }
        ])
        var resulttext = StyleSheet.flatten([
            {
                display:(this.state.result==''?'none':'flex'),
                color:(this.state.displaySignUpBox=='flex'?'darkgreen':'darkred')
            }
        ])
        var signupresult = StyleSheet.flatten([
            styles.signupresulttext,{
                display:(this.state.result2==''?'none':'flex'),
            }
        ])
        var passwordbox = StyleSheet.flatten([
            styles.useridbox,
            {
                backgroundColor:dark?'#000000':'#ffffdd'
            }
        ])
        var inputpassword = StyleSheet.flatten([
            styles.inputuserid, {
                color:dark?'#ffffff':'#000000',
            }
        ])
        var passwordverifybutton = StyleSheet.flatten([
            styles.useridverifybutton, {
                marginHorizontal:5,
            }
        ])
        /* end of stylesheet mods*/

        return(

        //  A - main container 
            <KeyboardAvoidingView style={[styles.mainbox, {backgroundColor:dark?'#808080':'#008080',  paddingTop:dark?0:20, marginTop:dark?20:0}]}  behavior={Platform.OS == "ios" ? "padding" : ""}>

        {/* A - 1 - header for Sign Up */}
                <View style={[styles.header, {backgroundColor:dark?'#444444cc':'#eeeeeecc'}]}>

        {/* A - 1 - A - go back to signin */}
                    <TouchableHighlight activeOpacity={1} underlayColor="#0070bb" style={styles.backnavigation} onPress={()=> {this.props.signUp();}}>

        {/* A - 1 - A - 1 - icon for go back */}
                        <Image style={styles.thumb} source={Back_Arrow} />
                    </TouchableHighlight>

        {/* A - 1 - B - header for signup */}
                    <Text style={[styles.headertext, {color:dark?'#ffffff':'#000000'}]}>Create Your Account!</Text>
                </View>

        {/* A - 2 - scollable signup box */}
                <ScrollView justifyContent={'flex-start'} style={styles.bodybox} showsVerticalScrollIndicator={false}>

        {/* A - 2 - A - body part containing sign up elements */}
                    <View style={[styles.firstcontainer, {backgroundColor:dark?'darkgrey':'skyblue'}]}>

        {/* A - 2 - A - 1 - text as userid box header */}
                        <Text style={styles.useridtext}>enter a userid to signup with...</Text>

        {/* A - 2 - A - 2 - userid box */}
                        <View style={[styles.useridbox, {backgroundColor:dark?'#808080':'#ffffff'}]}>

        {/* A - 2 - A - 2 - A  - userid input*/}
                            <TextInput textContentType="username" defaultValue={this.state.userid}
                                onEndEditing={()=>{if (!this.state.disableButton) this.check_availability()}}
                                style={inputpassword} autoCapitalize='none' placeholder={'userid'} returnKeyType='go'
                                onChangeText={(userid)=>this.setState({userid})} enablesReturnKeyAutomatically={true}
                                onChange={() => this.reset_fields()} keyboardAppearance={dark?'dark':'light'} />

        {/* A - 2 - A - 2 - B - userid check */}
                            <View style={styles.useridverify}>

        {/* A - 2 - A - 2 - B - 1 - userid verify button */}
                                <TouchableHighlight  style={styles.useridverifybutton} onPress={()=>this.check_availability()}  activeOpacity={1} underlayColor='steelblue' disabled={true} >
        
        {/* A - 2 - A - 2 - B - 1 - A - userid verify button icon */}
                                    <Image source={this.state.User_Status} style={styles.thumb}/>                           
                                </TouchableHighlight>
                            </View>
                        </View>

        {/* A - 2 - A - 3 - userid verify result text */}
                        <Text style={resulttext}>{this.state.result}</Text>

        {/* A - 2 - A - 4 - user details box */}
                        <View style={signupbox}>

        {/* A - 2 - A - 4 - A - name text */}
                            <Text style={styles.useridtext}>enter your name...</Text>

        {/* A- 2 - A - 4 - B - enter name box */}
                            <View style={[styles.useridbox, , {backgroundColor:dark?'lightgrey':'#ffffff'}]}>

        {/* A - 2 - A - 4 - B - 1 - name input */}
                                <TextInput textContentType="name" style={styles.inputuserid}
                                    onSubmitEditing={() => { this.newpass.focus(); }} placeholder={'Enter Name!'}
                                    onChangeText={(name)=>this.setState({name})} keyboardAppearance={dark?'dark':'light'}
                                    onChange={()=>this.disable_password()} returnKeyType="next" blurOnSubmit={false}
                                    />
                            </View>

        {/* A - 2 - A - 4 - C - new password text */}
                            <Text style={styles.useridtext}>enter a password...</Text>

        {/* A - 2 - A - 4 - D - new password box */}
                            <View style={passwordbox}>
        
        {/* A - 2 - A - 4 - D - 1 - new password field */}
                                <TextInput textContentType="newPassword" secureTextEntry={this.state.Pass_View1==Hide_Pass}
                                    style={inputpassword} placeholderTextColor={'#808080'}
                                    placeholder={'Enter Your Password Here!'} keyboardAppearance={dark?'dark':'light'}
                                    onChangeText={(password) => this.setState({password})}
                                    onChange={() => this.dis_pass2()} ref={(input) => { this.newpass = input;}}
                                    blurOnSubmit={false} returnKeyType="next" onSubmitEditing={() => { this.confpass.focus(); }}
                                    />

        {/* A - 2 - A - 4 - D - 2 - password view for new password */}
                                <TouchableOpacity
                                    activeOpacity={1}
                                    disabled={(!this.state.enablePass1)}
                                    underlayColor={'#747474'}
                                    style={passwordverifybutton} 
                                    onPress={()=> this.setState({Pass_View1:(this.state.Pass_View1==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                    <Image style={styles.thumb} source={this.state.Pass_View1} />
                                </TouchableOpacity>
                            </View>

        {/* A - 2 - A - 4 - E - confirm password text */}
                            <Text style={styles.useridtext}>confirm your password...</Text>

        {/* A - 2 - A - 4 - F - confirm password box */}
                            <View style={passwordbox}>
        
        {/* A - 2 - A - 4 - F - 1 - confirm password field */}
                                <TextInput textContentType="newPassword" secureTextEntry={this.state.Pass_View2==Hide_Pass}
                                    style={inputpassword} placeholderTextColor={'#808080'}
                                    placeholder={'Reenter Your Password Here!'} returnKeyType='join'                   
                                    onChangeText={(password2) => this.setState({password2})}
                                    onChange={() => this.dis_pass1()} ref={(input) => { this.confpass = input;}}
                                    onSubmitEditing={()=> this.signup_attempt()} keyboardAppearance={dark?'dark':'light'}
                                    />

        {/* A - 2 - A - 4 - F - 2 - password view for confirm password*/}
                                <TouchableOpacity
                                    activeOpacity={1}
                                    disabled={!this.state.enablePass2}
                                    underlayColor={'#747474'}
                                    style={passwordverifybutton}
                                    onPress={()=> this.setState({Pass_View2:(this.state.Pass_View2==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                    <Image style={styles.thumb} source={this.state.Pass_View2} />
                                </TouchableOpacity>
                            </View>

        {/* A - 2 - A - 4 - G - signup button */}
                            <TouchableHighlight style={styles.signupbutton} underlayColor="#000" onPress={() => this.signup_attempt()}>

        {/* A - 2 - A - 4 - G - 1 - signup button text */}
                                <Text style={styles.signupbuttontext}>signup</Text>                            
                            </TouchableHighlight>

        {/* A - 2 - A - 4 - H - shows signup attempt result */}
                            <Text style={signupresult}>{this.state.result2}</Text>
                        </View>
                    </View>
                </ScrollView>

        {/* A - 3 - footer region (contains button to change theme) */}
                <View style={[styles.footerregion, {backgroundColor:dark?'#ffffff':'#000000'}]}>

        {/* A - 3 - A -  theme change button*/}
                    <TouchableHighlight style={styles.themebutton} underlayColor={dark?'#000000':'#ffffff'} onPress={()=>{this.change_theme();this.props.setTheme(!dark)}}>
        
        {/* A - 3 - A - 1 - text for theme change button */}
                        <Text style={{padding:5, color:dark?'#000000':'#ffffff'}}>{dark?'LIGHT':'DARK'}</Text>
                    </TouchableHighlight>                 
                </View>
            </KeyboardAvoidingView>
        )

    }
}

const styles = StyleSheet.create({

    //mainbox containing all
    mainbox:
    {
        flex:1,
        paddingTop:20,
    },

    //header for signup
    header:
    {
        padding:5,
        alignItems:'center',
        flexDirection:'row',
        paddingTop:10,
        borderBottomWidth:0.5,
        flex:1/10 
    },
    
    //navigate Back button
    backnavigation:{
        height:34,
        width:34,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:17,
        shadowRadius:0.5,
        shadowOpacity:0.4,
        elevation:20,
    },

    //header text
    headertext:
    {
        fontSize:25,
        flex:1,
        textAlign:'center',
        shadowRadius:3,
        shadowOpacity:0.4,
        shadowOffset:{height:0.1},
        fontWeight:'500'
    },

    //body containing all signup elements
    bodybox:{
        paddingTop:30,
        flex:1,
    },

    //login box [contains login elements]
    firstcontainer: {
        justifyContent:'space-between',
        marginHorizontal:10,
        alignItems:'center',
        borderRadius:4,
        padding:20,
        shadowRadius:7,
        shadowOpacity:0.7,
        shadowOffset:{height:0.1},
        elevation:5,
        flex:1
    },

    //text for userid box
    useridtext:
    {
        color:'#000000',
        textAlign:'left',
        fontStyle:'italic',
        marginVertical:7,
    },

    //userid box
    useridbox:
    {
        borderRadius:4,
        flexDirection:'row',
        height:40,
        alignContent:'center',
        marginBottom:15,
        shadowRadius:7,
        shadowOpacity:0.7,
        shadowOffset:{height:0.1},
        elevation:5,
        paddingLeft:10,
    },

    //input for userid
    inputuserid:{
        flex:1   
    },

    //userid verification
    useridverify:{
        width:45,
        justifyContent:'center',
        alignItems:'center',
        shadowRadius:1.2,
        shadowOpacity:0.7,
    },

    //button for verification
    useridverifybutton:
    {
        width:34,
        height:34,
        borderRadius:17
    },

    //style for userdetails
    userdetails:
    {
        alignItems:'center'
    },
       
    //button for credential submission
    signupbutton:{
        margin:10,
        borderRadius:4,
        backgroundColor:'#ffffff',
        alignItems:'center',
        justifyContent:'center',
        shadowRadius:7,
        shadowOpacity:0.7,
        shadowOffset:{height:0.1},
        elevation:5,     
    },

    //text style for submit button
    signupbuttontext: {
        fontSize:16,
        color:'#000000',
        padding:7,
        fontStyle:'italic',
    },

    //result of signup attempt in case of failure
    signupresulttext:{
        textAlign:'center',
        color:'darkred',
        fontStyle:'italic'
    },

    //region contain theme change button
    footerregion:{
        justifyContent:'center',
        height:30,
    },

    //theme change button
    themebutton:
    {
        alignItems:'center',
        justifyContent:'center',
    },

    //style for thumbs
    thumb:
    {
        width:35,
        height:35,
    }
})
