//App.js

/* This is first screen - Login Screen */

/* importing required modules */
import React, {useState} from 'react';
import { Text, View, TextInput, Platform, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity, TouchableHighlight, StyleSheet, YellowBox, Alert, Button } from 'react-native';
YellowBox.ignoreWarnings(['RootErrorBoundary']);
YellowBox.ignoreWarnings(['Require cycle'])

var ms = Dimensions.get('window')

/*Importing Button Images */
import Userid_Check from './assets/Userid_Check.png';
import Show_Pass from './assets/Show_Pass.png';
import Hide_Pass_Dark from './assets/Hide_Pass_Dark.png';
import Hide_Pass_Light from './assets/Hide_Pass_Light.png'
import Verified_Userid from './assets/Verified_UserId.png';

/* Importing functions*/
import UserHome from './userpages/UserHome';
import SignUp from './SignUp';

/* Importing list of users*/
import Users from './users.json'
/*Main Function */
export default function UserLogin() {

    /*List of Messages */
    var messages = ["seems you're not registered with us!", "Please enter a userid address first!", "Too Many Failed attempts, Please Try Again in "]
    
    /*   Unused Variables for future Usage*
    let [goBack, setGoBack] = useState(false);
    */

    /*List of State Variables*/
    let [count, setCount] = useState(0);     //Counter for unauthorised login attempt
    let [result, setResult] = useState('');    //login attempt messages [if needed]
    let [useridCheckResult, setUseridCheckResult] = useState(Userid_Check);    // Image URI source for userid check
    let [disableUserid, setDisableUserid] = useState(false);     //disables userid input if counter exceeds
    let [useridCheck, setUseridCheck] = useState(true);    // Checks if Userid is registered or not
    let [passBoxVisibility, setPassBoxVisibility] = useState('none');    //enables password box in case userid is registered
    let [registeredUserid, setRegisteredUserid] = useState('none');     //Enables visibility of login messages if needed.
    let [viewPassword, setViewPassword] = useState(Hide_Pass);     // Image URI source for Password View
    let [goHome, setGoHome] = useState(false); // Goes to Home Screen if true
    let [userid, setUserId] = useState('');
    let [signUp, setSignUp] = useState(false);
    let [dark, setDark] = useState(false);
    // let [UserHome, setUserHome] = useState(UserHomeDark);

    var pass = '';  //clears exisiting password if userid is changed
    var x;  //extracts key from JSON
    let Hide_Pass = dark?Hide_Pass_Dark:Hide_Pass_Light


    const [useridEntered, setUseridEntered] = useState('');  //Takes Input for userid
    const [passwordEntered, setPasswordEntered] = useState('');   //Takes Input for password
    const [b, setB] = useState(5);  //for timer in case of repeated failed attempts

/* verifying userid */
    function userid_check() {
        setUseridCheck(false);
        var z = 0;
        if (useridEntered!='') {
            for (x in Users) {
                if ([x] == useridEntered) {
                        setUserId([x]);                
                        setRegisteredUserid('none');
                        setPassBoxVisibility('flex');
                        setUseridCheckResult(Verified_Userid);
                        setCount(0);
                        setB(5);
                        z = 1;
            } }
            if (z==0) {
                setRegisteredUserid('flex');
                setCount(count + 1);
                setResult(messages[0])
                setPassBoxVisibility('none');
                setUseridCheckResult(Userid_Check);
            }
        } else {
            setResult(messages[1]);
            setCount(count + 1);
            setRegisteredUserid('flex');
            setUseridCheckResult(Userid_Check);
        }

        if (count > 2) {
            setDisableUserid(true);
            var timeout_1 = setTimeout(setUseridCheck, b*1000, true);
            var timeout_2 = setTimeout(setDisableUserid, b*1000, false);
            var timeout_3 = setTimeout(setResult, b*1000, '');
            setB(b*2);
            var timeout_4 = setTimeout(setCount, b*1000, 0);
            setResult(messages[2] + b + '\xa0seconds!');        
        }
    }

/*End of Userid verification*/

/* Password Verification */
    function login_attempt() {
        // alert(userid)
        if (passwordEntered==Users[userid].pwd) {            
            setGoHome(true);
        } else {    
            alert('Nope!');
        }
    }
/*End of Password Verification */

if (signUp) {
    return (
        <View style={{flex:1}}>
            <SignUp theme={dark} goHome={setGoHome} setUserId={setUserId} signUp={setSignUp} />
        </View>
    )
}


/*Sample Home Screen */
if (goHome) {
    return(
        <View style={{flex:1}}>
            <UserHome close={reset_defaults} id={userid}/>
        </View>
    )    
}
/*End of Home Screen function */

/* Password visibility setting */
    function password_visibility() {
        if (viewPassword!=Hide_Pass) {
            setViewPassword(Hide_Pass);
        } else {
            setViewPassword(Show_Pass);
        }
    }

/* reset passoword fields and hide password box (Invoked when userid is changed)*/    
    function reset_fields() {
        setPasswordEntered('');
        setPassBoxVisibility('none');
        setUseridCheckResult(Userid_Check);
        setUseridCheck(true);
        setResult('');
        setGoHome(false);
        setViewPassword(Hide_Pass);
    }

    //default reset
    function reset_defaults() {
            setGoHome(false);
            setUseridEntered('');
            setPasswordEntered('');
            setPassBoxVisibility('none');
            setUseridCheckResult(Userid_Check);
            setUseridCheck(true);
            setResult('');
            setViewPassword(Hide_Pass);
    }

    //logout

/*Main Return function */    
    return (
        //Main Container
        <KeyboardAvoidingView style={[styles.mainbox, {backgroundColor:dark?'#333333':'#AAAAAA'}]} behavior={Platform.OS == "ios" ? "padding" : ""}>

            {/*Body (Contain all login elements)*/}
            <View style={styles.bodybox}>
                <View style={[styles.mainloginbox, {backgroundColor:dark?'#777777':'#AAAAAA'}]}>

            {/*Heading Text*/}
                <View style={[styles.headerlogin, {backgroundColor:dark?'#333333':'#367588'}]}>
                    <Text style={styles.headerlogintext}>let's get you signed in!</Text>
                </View>    

            {/*Userid Main Box*/}
                    <View style={[styles.useridbox, {backgroundColor:dark?'#535353':'#AAAAAA'}]}> 

            {/*Userid Input (can be disabled)*/}
                        <TextInput editable={!disableUserid} style={styles.inputuserid}
                            placeholder={'Please enter your user id...'}
                            onChangeText={useridEntered=>setUseridEntered(useridEntered)}
                            returnKeyType='go' placeholderTextColor='gray'
                            autoCapitalize='none' keyboardAppearance={dark?'dark':'light'}
                            onChange={reset_fields} textContentType="username"
                            onSubmitEditing={userid_check}
                            defaultValue={useridEntered} />

            {/*Userid check button [userid_check] (with disable and variable image uri)*/}
                        <TouchableHighlight activeOpacity={1}
                            disabled={!useridCheck}
                            underlayColor="#0070bb" onPress={userid_check} style={styles.useridverify}>
                                <Image style={styles.buttonthumbs} source={useridCheckResult} />
                        </TouchableHighlight>
                    </View>

            {/*Text returning error messages in userid verification*/}
                    <Text style={[styles.resulttext, { display:registeredUserid}]}>{result}</Text>
            
            {/*(Container used for hiding passwordBox until userid is verified)*/}
                    <View style={{display:passBoxVisibility, alignItems:'center'}}>
            
            {/*Flexbox for password*/}
                        <View style={[styles.passwordbox, {backgroundColor:dark?'black':'lightgrey'}]}>

            {/*Password Input Box*/}
                            <TextInput secureTextEntry={viewPassword==Hide_Pass} style={styles.inputpassword}
                                    placeholder={'Input Your Password Here!'} placeholderTextColor='grey'
                                    onChangeText={passwordEntered => setPasswordEntered(passwordEntered)}
                                    defaultValue={passwordEntered} returnKeyType='go' keyboardAppearance={dark?'dark':'light'}
                                    textContentType="password" autoCompleteType='off'
                                    />

            {/*Button for viewing password [password_visibility] (has a variable image uri)*/}
                            <TouchableOpacity activeOpacity={1} underlayColor={'#747474'} onPress={password_visibility} style={styles.passwordview}>
                                <Image style={styles.buttonthumbs} source={viewPassword} />
                            </TouchableOpacity>
                        </View>

            {/*Button to submit password [login_attempt] (shares the visibility criteria same as password box)*/}
                        <TouchableOpacity style={[styles.submitbutton, {backgroundColor:dark?'#444444':'#000044'}]} underlayColor="#000" onPress={login_attempt}>
                            <Text style={styles.submitbuttontext}>submit</Text>                            
                        </TouchableOpacity>
                    </View>
            {/*Button for signing up if the user is not registered and is interested []*/}
                    <View style={[styles.signupbox, {backgroundColor:dark?'#555555':'#C9C9C9'}]}>
                        <Text>Don't have any account with us yet?</Text>
                        <TouchableOpacity style={styles.signupbutton} onPress={() => setSignUp(true)}>
                            <Text style={[styles.signupbuttontext, {color:dark?'green':'darkred'}]}>sign up!</Text>                                
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.footerregion, {backgroundColor:dark?'#ffffff':'#000000'}]}>
                <TouchableHighlight style={styles.themebutton} underlayColor={dark?'#000000':'#ffffff'} onPress={()=>setDark(!dark)}>
                    <Text style={{padding:5, color:dark?'black':'white'}}>{dark?'LIGHT':'DARK'}</Text>
                </TouchableHighlight>                 
            </View>
            {/*End of Main Login Box*/}
        </KeyboardAvoidingView>
        //End of Main Container
    );
    /*End of Main return function*/
}
//End of Main Function

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

    //full container

    mainbox:{
        flex:1,
    },

    //main body [contains login box]

    bodybox:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
    },

    //login box [contains login elements]

    mainloginbox: {
        width:Dimensions.get('window').width*8/9,
        minHeight:230,
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:4,
        paddingVertical:10,
        shadowOpacity:0.7,
        elevation:10,
        shadowRadius:8,
        shadowOffset:{height:1}
    },

    //login heading
    headerlogin:{
        marginVertical:10,
        padding:7,
        borderRadius:4,
        shadowRadius:5,
        shadowOpacity:0.7,
        elevation:3,
        shadowOffset:{height:1}
    },

    headerlogintext:{
        textAlign:'center',
        textAlignVertical:'auto',
        color:'white',
        fontSize:15,        
    },

    //Userid input container main

    useridbox:{
        marginVertical:10,
        borderRadius:4,
        flexDirection:'row',
        width:Dimensions.get('window').width*7.5/9,
        height:40,
        alignContent:'center',
        justifyContent:'center',
        shadowRadius:7,
        shadowOpacity:0.7,
        elevation:5,
        shadowOffset:{height:0.1}
    },

    //input for userid

    inputuserid:{
        borderRadius:4,
        width:Dimensions.get('window').width*7.5/9 - 45,
        paddingHorizontal:10,
        justifyContent:'flex-start',
    },

    //button for userid verification

    useridverify:{
        marginVertical:2.5,
        marginHorizontal: 5,   
        height:35,
        width:35,
        borderRadius:17.5,
        shadowOpacity:0.7,
        elevation:3,
        shadowRadius:2,
    },

    resulttext:
    {
        color:'darkred',
        marginVertical:10,
    },

    //Password input container main

    passwordbox:{
        height:40,
        alignContent:'center',
        justifyContent:'center',
        elevation:5,        
        marginVertical:10,
        flexDirection:'row',
        borderRadius:4,
        width:Dimensions.get('window').width*7.5/9,
        paddingLeft:10,
        shadowRadius:7,
        shadowOpacity:0.7,
        shadowOffset:{height:1},
    },

    //input for password

    inputpassword:{
        justifyContent:'flex-start',
        width:Dimensions.get('window').width*7.5/9 - 55,
        color:'white',
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,       
    },

    //button for password view

    passwordview:{
        justifyContent:"center",
        alignItems:'center',
        width:45,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },

    //button for credential submission

    submitbutton:{
        padding:8,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        shadowRadius:7,
        shadowOpacity:0.7,
        shadowOffset:{height:1},
        elevation:5
        
    },

    //text style for submit button

    submitbuttontext: {
        fontSize:13,
        color:'white',
    },

    //Signup container main

    signupbox:{
        marginVertical:10,
        padding:10,
        justifyContent:"center",
        alignItems:'center',
        borderRadius:4,
        shadowRadius:10,
        shadowOpacity:0.7,
        shadowOffset:{height:1},
        flexDirection:'row',
        elevation:5,
    },

    //styles for signup button

    signupbutton:{
    },

    //text style for signup button

    signupbuttontext:{
        fontStyle:'italic',
        paddingLeft:10,
        textDecorationStyle:"dashed"
    },

    //footer region

    footerregion:{
        justifyContent:'center',
        height:30,
    },

    //button
    themebutton:
    {
        alignItems:'center',
        justifyContent:'center',
    },

    //Thumbnail for buttons
    
    buttonthumbs:{
        height:35,
        width:35,
    },
})