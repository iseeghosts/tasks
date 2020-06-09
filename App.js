//App.js
//--^--
//
/* This is first screen - Login Screen */

/* importing required modules */
import React, {useState} from 'react';
import { Text, View, TextInput, Platform, Image, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, StyleSheet, YellowBox, Keyboard} from 'react-native';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
YellowBox.ignoreWarnings(['RootErrorBoundary']);

var theme = false
//variable for screen dimensions if needed
/*importing Button Images */
import Show_Pass from './assets/Show_Pass.png';
import User_Check_Light from './assets/User_Check_Light.png';
import User_Check_Dark from './assets/User_Check_Dark.png'
import Hide_Pass_Dark from './assets/Hide_Pass_Dark.png';
import Hide_Pass_Light from './assets/Hide_Pass_Light.png'
import Verified_User_Light from './assets/Verified_User_Light.png';
import Verified_User_Dark from './assets/Verified_User_Dark.png'


/* importing components*/
import UserHome from './userpages/UserHome';
import SignUp from './SignUp';

/* importing list of users*/
import Users from './users.json'

/*main Function */
export default function UserLogin() {

    /*list of Messages */
    var messages = ["seems you're not registered with us!", "Please enter a userid address first!", "Too Many Failed attempts, Please Try Again in "]
    
    /*   Unused Variables for future Usage*
    let [goBack, setGoBack] = useState(false);
    */
//    setting home theme same as device
    let colorScheme = Appearance.getColorScheme();
    theme=(colorScheme==='dark')
    
    /*List of State Variables*/
    let [count, setCount] = useState(0);                                    //counter for unauthorised login attempt
    let [result, setResult] = useState('');                                 //login attempt messages [if needed]
    let [useridCheckResult, setUseridCheckResult] = useState(User_Check);   //cmage URI source for userid check
    let [disableUserid, setDisableUserid] = useState(false);                //disables userid input if counter exceeds
    let [useridCheck, setUseridCheck] = useState(true);                     //checks if Userid is registered or not
    let [passBoxVisibility, setPassBoxVisibility] = useState('none');       //enables password box in case userid is registered
    let [registeredUserid, setRegisteredUserid] = useState('none');         //enables visibility of login messages if needed.
    let [viewPassword, setViewPassword] = useState(Hide_Pass);              //image URI source for Password View
    let [goHome, setGoHome] = useState(true);                              //goes to Home Screen if true
    let [userid, setUserId] = useState('id1');                                 //sets userid if entered id is valid
    let [signUp, setSignUp] = useState(false);                              //allows signing up
    let [dark, setDark] = useState(theme);                                  //sets theme for userlogin
    
    //set theme specific icons
    let Hide_Pass = dark?Hide_Pass_Dark:Hide_Pass_Light                     
    let User_Check = dark?User_Check_Dark:User_Check_Light
    let Verified_User = dark?Verified_User_Dark:Verified_User_Light

    const [useridEntered, setUseridEntered] = useState('');         //takes Input for userid
    const [passwordEntered, setPasswordEntered] = useState('');     //takes Input for password
    const [b, setB] = useState(5);                                  //for timer in case of repeated failed attempts

/* changing theme */  
    function change_theme() {
        setDark(!dark)
        Hide_Pass = !dark?Hide_Pass_Dark:Hide_Pass_Light
        User_Check = !dark?User_Check_Dark:User_Check_Light
        Verified_User=!dark?Verified_User_Dark:Verified_User_Light
        setViewPassword(viewPassword==Show_Pass?Show_Pass:Hide_Pass)
        setUseridCheckResult((useridCheckResult==Verified_User_Dark||useridCheckResult==Verified_User_Light)?Verified_User:User_Check)
    }


/* verifying userid */
    function userid_check() {
        setUseridCheck(false);
        var z = 0;
        if (useridEntered in Users) {     //userid is true
            setUserId(useridEntered);                
            setRegisteredUserid('none');
            setPassBoxVisibility('flex');
            setUseridCheckResult(Verified_User);
            setCount(0);
            setB(5);
            z = 1;
        }
        if (z==0) {             //userid not registered
            setRegisteredUserid('flex');
            setCount(count + 1);
            setResult(messages[0])
            setPassBoxVisibility('none');
            setUseridCheckResult(User_Check_Light);
        }
        if (count > 2) {
            setDisableUserid(true);
            setTimeout(setUseridCheck, b*1000, true);
            setTimeout(setDisableUserid, b*1000, false);
            setTimeout(setResult, b*1000, '');
            setB(b*2);
            setTimeout(setCount, b*1000, 0);
            setResult(messages[2] + b + '\xa0seconds!');        
        }
    }
/*end of Userid verification*/

/* password Verification */
    function login_attempt() {
        // alert(userid)
        if (passwordEntered==Users[userid].pwd) {            
            setGoHome(true);
        } else {    
            alert('Nope!');
        }
    }
/*end of Password Verification */

/* user requesting sign up*/
if (signUp) {
    var id=''
    if (result==messages[0]) id=useridEntered
    return (
        <View style={{flex:1}}>
            <SignUp theme={dark} id={id} setTheme={change_theme} goHome={setGoHome} setUserId={setUserId} signUp={reset_defaults} />
        </View>
    )
}


/*home Screen */
if (goHome) {
    // alert('Welcome ' + Users[userid].name+'!')
    return(
        <View style={{flex:1}}>
            <UserHome close={reset_defaults} id={userid}/>
        </View>
    )    
}


/* password visibility setting */
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
        setUseridCheckResult(User_Check);
        setUseridCheck(true);
        setResult('');
        setGoHome(false);
        setViewPassword(Hide_Pass);
    }

/*default reset invoked when user comes back from signup page or signed in user logs out or deleted their account*/
    function reset_defaults() {
            setGoHome(false);
            setSignUp(false);
            setUseridEntered('');
            setPasswordEntered('');
            setPassBoxVisibility('none');
            setUseridCheckResult(User_Check);
            setUseridCheck(true);
            setResult('');
            setViewPassword(Hide_Pass);
    }


/*main Return function */    
    return (
    //  A - main Container
        <KeyboardAvoidingView style={[styles.mainbox, {backgroundColor:dark?'#333333':'#ffdddd'}]} behavior={Platform.OS == "ios" ? "padding" : ""}>

    {/* A - 1 - body (Contain login box)*/}
            <View style={styles.bodybox}>

    {/* A - 1 - A - contains login elements */}
                <View style={[styles.mainloginbox, {backgroundColor:dark?'#777777':'#ddffff'}]}>

    {/* A - 1 - A - 1 - login Header*/}
                    <View style={[styles.headerlogin, {backgroundColor:dark?'#333333':'#367588'}]}>

    {/* A - 1 - A - 1 - A - login header text */}
                        <Text onPress={Keyboard.dismiss} style={styles.headerlogintext}>let's get you signed in!</Text>
                    </View>    

    {/* A - 1 - A - 2 - userid Main Box*/}
                    <View style={[styles.useridbox, {backgroundColor:dark?'#666666':'#ffffdd'}]}> 

    {/* A - 1 - A - 2 - A - userid Input (can be disabled)*/}
                        <TextInput textContentType="username" defaultValue={useridEntered}
                            onEndEditing={()=>userid_check()} returnKeyType='go' placeholderTextColor='gray'
                            style={[styles.inputuserid, {color:dark?'#ffffff':'#000000'}]}
                            autoCapitalize='none' placeholder={'Please enter your user id...'}
                            onChangeText={(useridEntered)=>setUseridEntered(useridEntered)}
                            editable={!disableUserid} enablesReturnKeyAutomatically={true}
                            onChange={()=>reset_fields()} keyboardAppearance={dark?'dark':'light'}
                            />

    {/* A - 1 - A - 2 - B - userid check button [userid_check] (with disable and variable image uri)*/}
                        <TouchableHighlight activeOpacity={1}
                            disabled={!useridCheck} underlayColor="#0070bb"
                            onPress={userid_check} style={styles.useridverify}>

    {/* A - 1 - A - 2 - B - 1 - userid check button icon*/}
                            <Image style={styles.buttonthumbs} source={(useridCheckResult==null?dark?User_Check_Dark:User_Check_Light:useridCheckResult)} />
                        </TouchableHighlight>
                    </View>

    {/* A - 1 - A - 3 - text returning error messages in userid verification*/}
                    <Text style={[styles.resulttext, { display:registeredUserid}]}>{result}</Text>
            
    {/* A - 1 - A - 4 - container used for hiding passwordBox until userid is verified*/}
                    <View style={{display:passBoxVisibility, alignItems:'center'}}>
            
    {/* A - 1 - A - 4 - A - flexbox for password*/}
                        <View style={[styles.passwordbox, {backgroundColor:dark?'black':'lightgrey'}]}>

    {/* A - 1 - A - 4 - A - 1 - password Input Box*/}
                            <TextInput secureTextEntry={viewPassword==(dark?Hide_Pass_Dark:Hide_Pass_Light)} style={[styles.inputpassword, {color:dark?'white':'black'}]}
                                    placeholder={'Input Your Password Here!'} placeholderTextColor='grey'
                                    onChangeText={passwordEntered => setPasswordEntered(passwordEntered)}
                                    defaultValue={passwordEntered} returnKeyType='done' keyboardAppearance={dark?'dark':'light'}
                                    textContentType="password" autoCompleteType='off'
                                    />

    {/* A - 1 - A - 4 - A - 2 - button for viewing password [password_visibility] (has a variable image uri)*/}
                            <TouchableOpacity
                                activeOpacity={1}underlayColor={'#747474'}
                                onPress={password_visibility} style={styles.passwordview}>

    {/* A - 1 - A - 4 - A - 2 - A - icon for password view button */}
                                <Image style={styles.buttonthumbs} source={viewPassword} />
                            </TouchableOpacity>
                        </View>

    {/* A - 1 - A - 4 - B - button to submit password [login_attempt] (shares the visibility criteria same as password box)*/}
                        <TouchableOpacity
                            style={[styles.submitbutton, {backgroundColor:dark?'#444444':'#000044'}]}
                            underlayColor="#000" onPress={login_attempt}>

    {/* A - 1 - A - 4 - B - 1 - password submit text */}
                            <Text style={styles.submitbuttontext}>submit</Text>                            
                        </TouchableOpacity>
                    </View>

    {/* A - 1 - A - 5 - button for signing up if the user is not registered and is interested []*/}
                    <View style={[styles.signupbox, {backgroundColor:dark?'#777777':'#C9C9C9'}]}>

    {/* A - 1 - A - 5 - A - text for sign up */}
                        <Text on onPress={Keyboard.dismiss}>Don't have any account with us yet?</Text>
                        
    {/* A - 1 - A - 5 - B - signup button */}
                        <TouchableOpacity style={styles.signupbutton} onPress={() => setSignUp(true)}>
    
    {/* A - 1 - A - 5 - B - 1 - signup button text*/}
                            <Text style={[styles.signupbuttontext, {color:dark?'#ffffdd':'darkred'}]}>sign up!</Text>                                
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

    {/* A - 2 - footer region */}
            <View style={[styles.footerregion, {backgroundColor:dark?'#ffffff':'#000000'}]}>

    {/* A - 2 - A - button to change theme */}
                <TouchableHighlight style={styles.themebutton} underlayColor={dark?'#000000':'#ffffff'} onPress={()=>change_theme()}>

    {/* A - 2 - A - 1 - theme change button text */}
                    <Text style={{padding:5, color:dark?'black':'white'}}>{dark?'LIGHT':'DARK'}</Text>
                </TouchableHighlight>                 
            </View>
        </KeyboardAvoidingView>
    );
}
//End of Main Function

/*styles (in order of heirarchy)*/
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
        minHeight:230,
        marginHorizontal:10,
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

//text styles for login header
    headerlogintext:{
        textAlign:'center',
        textAlignVertical:'auto',
        color:'white',
        fontSize:15,        
    },

//userid input container main
    useridbox:{
        margin:10,
        borderRadius:4,
        flexDirection:'row',
        height:40,
        alignContent:'center',
        justifyContent:'center',
        paddingLeft:10,
        shadowRadius:7,
        shadowOpacity:0.7,
        elevation:5,
        shadowOffset:{height:0.1}
    },

//input for userid
    inputuserid:{
        flex:1,
    },

//button for userid verification
    useridverify:{
        marginVertical:2.5,
        marginHorizontal: 5,   
        height:35,
        width:35,
        borderRadius:17.5,
        shadowOpacity:0.4,
        elevation:3,
        shadowRadius:2,
    },

//text style for login messages
    resulttext:
    {
        color:'darkred',
        marginVertical:10,
    },

//password input container main
    passwordbox:{
        height:40,
        alignContent:'center',
        justifyContent:'center',
        elevation:5,        
        margin:10,
        flexDirection:'row',
        borderRadius:4,
        paddingLeft:10,
        shadowRadius:7,
        shadowOpacity:0.7,
        shadowOffset:{height:1},
    },

//input for password
    inputpassword:{
        flex:1,
    },

//button for password view
    passwordview:{
        justifyContent:"center",
        alignItems:'center',
        width:45,
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

//signup container main
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

//theme button
    themebutton:
    {
        alignItems:'center',
        justifyContent:'center',
    },

//thumbnail for buttons
    buttonthumbs:{
        height:35,
        width:35,
    },
})