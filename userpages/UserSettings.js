//App.js --[Path B]-->UserHome.js ---->UserSettings.js
//                                          --^--
//
/* This is third screen - UserSettings Screen */

/* importing required modules */
import React, { Component } from 'react';
import {View, Text, Image, Alert, Dimensions, TouchableOpacity, ScrollView,StyleSheet, Platform, Button, TextInput, KeyboardAvoidingView, TouchableHighlight} from 'react-native';

//importing icons
import Profile_Pic_Dark from '../assets/Profile_Pic_Dark.png'       //profile pic - light
import Profile_Pic_Light from '../assets/Profile_Pic_Light.png'     // |->dark
import Back_Arrow_Dark from '../assets/Back_Arrow_Dark.png';        //back arrow - dark
import Back_Arrow_Light from '../assets/Back_Arrow_Light.png'       // |-> light
import Show_Pass from '../assets/Show_Pass.png';                    //show password icon
import Hide_Pass_Dark from '../assets/Hide_Pass_Dark.png';          //hide password icon - light
import Hide_Pass_Light from '../assets/Hide_Pass_Light.png';        // |->dark

//importing list of users
import Users from '../users.json'

//importing appdata for user
import AppData from '../appdata.json'

//screen dimensions
var ms = Dimensions.get('window');

//export function
export default class UserSettings extends Component {

    //initial states
    constructor (props) {
        super()
        let Hide_Pass = (AppData[props.id].theme=='dark'?Hide_Pass_Dark:Hide_Pass_Light)        //icon for hide pass
        this.state = ({
            ass:AppData[props.id].alwaysshowsearch,     
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            resultText:'',
            pfv:'none',
            newMargin:'0',
            theme:(AppData[props.id].theme=='light'?"Dark":'Light'),
            enablePass1:true,
            enablePass2:true,
            enablePass3:true,
            Pass_View1:Hide_Pass,
            Pass_View2:Hide_Pass,
            Pass_View3:Hide_Pass,
            verifypassword:'',
            displaydelete:'none',
            Pass_View:Hide_Pass,
        })
    }

    //update password button shows/hides password fields
    show_update_password = () => {
        this.setState({
            pfv:(this.state.pfv=='none'?'flex':'none'),
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            resultText:'',  
        })        
    }

    //makes all other password fields secure when one editted
    disable_2_3 = () => {
        let Hide_Pass = (AppData[this.props.id].theme=='dark'?Hide_Pass_Dark:Hide_Pass_Light)
        this.setState({
            enablePass2:(this.state.newPassword==''),
            enablePass3:(this.state.confirmPassword==''),
            Pass_View2:Hide_Pass,
            Pass_View3:Hide_Pass,
        })
        if (this.state.oldPassword=='') {
            this.setState({
                enablePass1:true
            })
        }
    }
    
    //makes all other password fields secure when one editted
    disable_1_3 = () => {
        let Hide_Pass = (AppData[this.props.id].theme=='dark'?Hide_Pass_Dark:Hide_Pass_Light)
        this.setState({
            enablePass1:(this.state.oldPassword==''),
            enablePass3:(this.state.confirmPassword==''),
            Pass_View1:Hide_Pass,
            Pass_View3:Hide_Pass,
        })
        if (this.state.newPassword=='') {
            this.setState({
                enablePass2:true
            })
        }
    }
    
    //makes all other password fields secure when one editted
    disable_1_2 = () => {
        let Hide_Pass = (AppData[this.props.id].theme=='dark'?Hide_Pass_Dark:Hide_Pass_Light)
        this.setState({
            enablePass2:(this.state.newPassword==''),
            enablePass1:(this.state.oldPassword==''),
            Pass_View2:Hide_Pass,
            Pass_View1:Hide_Pass,
        })
        if (this.state.confirmPassword=='') {
            this.setState({
                enablePass3:true
            })
        }
    }

    /* password nest =>
    1. oldpassword no match => result = fail 
    2. new password empty => result = fail
    3. new password and old password match and new password confirm password match => result fail
    4. new password and old password match and new password confirm password don't match => result fail
    5. new password and confirm password don't match => result => fail
    6. oldpassword field empty => result= fail
    7. new password and old password don't match and new password confirm password match => result success
    */
   //change password function
    change_password = () => {
        var messages = ["old password is incorrect", "new password field/fields cannot be empty", "passwords do not match", "enter new password different than old password"]
        var text1 =''
        if ((this.state.oldPassword==Users[this.props.id].pwd)) {

            if ((this.state.newPassword!='') && (this.state.confirmPassword == this.state.newPassword) && (this.state.newPassword != Users[this.props.id].pwd)) {
                Users[this.props.id].pwd = this.state.newPassword
                alert('Password Changed Successfully')
                this.setState ({
                    pfv:'none',
                    oldPassword:'',
                    newPassword:'',
                    confirmPassword:'',
                    resultText:'',
                })
        }

        else if ((this.state.newPassword==this.state.confirmPassword) && (this.state.newPassword==Users[this.props.id].pwd)) {
            this.setState({resultText:messages[3]})
        }

        else if ((this.state.newPassword=='') || (this.state.confirmPassword=='')) {
            text1 = messages[1]
        }
        
        else if (this.state.confirmPassword!=this.state.newPassword) {
            text1 = messages[2]
        }

    }    else {
        text1 = messages[0]
    }
    this.setState({resultText:text1})
    }
    

    //set margin for userhome flatlist
    set_margin = () => {
        if ((Number(this.state.newMargin)) > 0 && (Number(this.state.newMargin) < 21)) {
        AppData[this.props.id].taskMargin = Number(this.state.newMargin)
        alert('Home Screen margin set to ' + this.state.newMargin+'!')
        } else {
            alert('Please enter an acceptable value (1-20)!')
        }
    }

    //change theme for all userpages
    change_theme = () => {
        let Hide_Pass = (AppData[this.props.id].theme=='dark'?Hide_Pass_Light:Hide_Pass_Dark)
        AppData[this.props.id].theme = (AppData[this.props.id].theme=='light'?"dark":'light')
        this.setState({
            theme:(this.state.theme=='Light'?"Dark":'Light'),
            Pass_View:this.state.Pass_View==Show_Pass?Show_Pass:Hide_Pass,
            Pass_View1:this.state.Pass_View1==Show_Pass?Show_Pass:Hide_Pass,
            Pass_View2:this.state.Pass_View2==Show_Pass?Show_Pass:Hide_Pass,
            Pass_View3:this.state.Pass_View3==Show_Pass?Show_Pass:Hide_Pass,
        })
        alert(this.state.theme +' theme applied successfully!')
    }

    //modify alwats show search
    modify_ass = () => {
        AppData[this.props.id].alwaysshowsearch=(!this.state.ass);
        this.setState({ass:!this.state.ass});
        alert('Always show search '+ (!this.state.ass?'enabled!':'disabled!'))
    }

    //display account deletion request field
    display_delete = () => {
        this.setState({
            verifypassword:'',
            displaydelete:(this.state.displaydelete=='none'?'flex':'none')
        })
    }

    //account deletion request
    delete_account = () => {
        var id = this.props.id
        if (this.state.verifypassword==Users[this.props.id].pwd)
        Alert.alert('Delete Account', "This action is irreversible,\n Do you still want to proceed?", [{text:'Yes', onPress: () => {
            this.props.close();
            alert('Account Deleted Successfully!')
            delete Users[id];
        }, style:'destructive'

    }, {text:'No',}], {cancelable:true} )
    else alert('Incorrect Password!')
    }

    //logout function
    log_out = () => {
        Alert.alert('logout?', 'Are you sure you want to logout?', [
            {text:'logout', onPress: () => {this.props.closeSettings();
            this.props.close()}},
            {text:'No'}],
            {cancelable:true} )
        }

    
    //main render
    render() {

        //list of short variable names for convenience
        let dark = AppData[this.props.id].theme=='dark'
        let theme = this.state.theme.toLowerCase()
        let Hide_Pass = (dark?Hide_Pass_Dark:Hide_Pass_Light)

        /* StyleSheet Mods */
        var buttontboxtext = StyleSheet.flatten([styles.buttontboxtext, {color:dark?'#BFBFBF':'black'}])
        var margintext = StyleSheet.flatten([styles.margintext, {color:dark?'#BFBFBF':'black'}])
        var passbox = StyleSheet.flatten([styles.passbox, {backgroundColor:dark?'black':'#BFBFBF'}])
        var textinputpass = StyleSheet.flatten([styles.textinputpass, {color:dark?'#BFBFBF':'black'}])
        var margbox = StyleSheet.flatten([styles.margbox,{backgroundColor:dark?'grey':'#BFBFBF'}])
        
        //return function
        return(
        //  A - all items container
            <View style={[styles.mainbox, {backgroundColor:(dark?'black':'white'), paddingTop:dark?0:20, marginTop:dark?20:0}]}>
                
        {/* A - 1 - keyboard avoiding field for the page */}
                <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS == "ios" ? "padding" : ""}>
        
        {/* A - 1 - A - go back to userhome */}
                    <TouchableHighlight activeOpacity={1} underlayColor="steelblue" style={styles.backnavigation} onPress={()=> this.props.closeSettings()}>
        
        {/* A - 1 - A - 1 - go back button icon */}
                        <Image style={styles.buttonthumbs} source={(dark?Back_Arrow_Dark:Back_Arrow_Light)} />
                    </TouchableHighlight>

        {/* A - 1 - B - header for usersettings page */}
                    <View style={[styles.header, {borderColor:dark?'white':'black'}]}>
                        
        {/* A - 1 - B - 1 - profile icon box */}
                        <View style={[styles.profilepiccontainer, {backgroundColor:(dark?'#555555':'#BFBFBF')}]}>
        
        {/* A - 1 - B - 1 - A - profile icon */}
                            <Image source={(dark?Profile_Pic_Dark:Profile_Pic_Light)} style={styles.picthumb} />
                        </View>

        {/* A - 1 - B - 2 - user welcome text box */}
                        <View style={[styles.welcometextbox, {backgroundColor:dark?'#666666':'#BFBFBF'}]}>
        
        {/* A - 1 - B - 2 - A - userwelcome text */}
                            <Text style={[styles.userwelcometext, {color:dark?'#FAEBD7':'black'}]}> Hello {Users[this.props.id].name}!</Text>
                        </View>
                    </View>
        
        {/* A - 1 - C - usersettings containing box */}
                    <ScrollView showsVerticalScrollIndicator={false} style={[styles.settingsbox, {backgroundColor:dark?'black':'white'}]}>
        
        {/* A - 1 - C - 1 - password update request submit button */}
                        <TouchableOpacity activeOpacity={0.5} onPress={()=> this.show_update_password()} style={[styles.buttontbox2, {backgroundColor:dark?'#333333':'#0087BD'}]}>
        
        {/* A - 1 - C - 1 - A - password update request submit button text */}
                            <Text style={buttontboxtext}>{this.state.pfv=='flex'?'Cancel Password Update':'Update Password'}</Text>
                        </TouchableOpacity>

        {/* A - 1 - C - 2 - password update box */}
                        <View style={[styles.updatepasscontainer,{display:this.state.pfv, backgroundColor:dark?'#666666':'skyblue'}]}>
        
        {/* A - 1 - C - 2 - A - old password box  */}
                            <View style={styles.inputboxes}>
        
        {/* A - 1 - C - 2 - A - 1 - text above old password  */}
                                <Text style={styles.passtext}>Enter Old Password!</Text>
        
        {/* A - 1 - C - 2 - A - 2 - old password input box  */}
                                <View style={passbox}>

        {/* A - 1 - C - 2 - A - 2 - A - input to old password  */}
                                    <TextInput keyboardAppearance={theme} style={textinputpass} secureTextEntry={this.state.Pass_View1==Hide_Pass}
                                        placeholder={''} onChangeText={(oldPassword)=>this.setState({oldPassword})} returnKeyType="next"
                                        onChange={() => this.disable_2_3()} onSubmitEditing={() => { this.newpass.focus(); }}
                                        blurOnSubmit={false} />
        
        {/* A - 1 - C - 2 - A - 2 - B - show old password button  */}
                                    <TouchableOpacity activeOpacity={1} disabled={!this.state.enablePass1} style={styles.passwordview} onPress={()=> this.setState({Pass_View1:(this.state.Pass_View1==Hide_Pass ? Show_Pass:Hide_Pass)})}>
        
        {/* A - 1 - C - 2 - A - 2 - B - 1 - show old password button icon  */}
                                        <Image style={styles.buttonthumbs} source={this.state.Pass_View1} />
                                    </TouchableOpacity>
                                </View>
                            </View>

        {/* A - 1 - C - 2 - B - new password box  */}
                            <View style={styles.inputboxes}>
        
        {/* A - 1 - C - 2 - B - 1 - text above new password  */}
                                <Text style={styles.passtext}>Enter New Password!</Text>
                                
        {/* A - 1 - C - 2 - B - 2 - new password input box  */}
                                <View style={passbox}>
        
        {/* A - 1 - C - 2 - B - 2 - A - input for new password  */}
                                    <TextInput keyboardAppearance={theme} style={textinputpass} secureTextEntry={this.state.Pass_View2==Hide_Pass}
                                        placeholder={''} onChangeText={(newPassword) => this.setState({newPassword})} returnKeyType='next'
                                        onChange={() => this.disable_1_3()} ref={(input) => { this.newpass = input;}} blurOnSubmit={false}
                                        onSubmitEditing={() => { this.confpass.focus(); }}/>
        
        {/* A - 1 - C - 2 - B - 2 - B - show new password button  */}
                                    <TouchableOpacity activeOpacity={1} disabled={!this.state.enablePass2} style={styles.passwordview} onPress={()=> this.setState({Pass_View2:(this.state.Pass_View2==Hide_Pass ? Show_Pass:Hide_Pass)})}>
        
        {/* A - 1 - C - 2 - B - 2 - B - 1 - show new password button icon  */}
                                        <Image style={styles.buttonthumbs} source={this.state.Pass_View2} />
                                    </TouchableOpacity>
                                </View>                                
                            </View>

        {/* A - 1 - C - 2 - C - confirm new password box */}
                            <View style={styles.inputboxes}>
        
        {/* A - 1 - C - 2 - C - 1 - text above confirm new password */}
                                <Text style={styles.passtext}>Confirm your new password!</Text>

        {/* A - 1 - C - 2 - C - 2 - confirm  new password input box */}
                                <View style={passbox}>

        {/* A - 1 - C - 2 - C - 1 - A - input to confirm new password */}
                                    <TextInput keyboardAppearance={theme} style={textinputpass} secureTextEntry={this.state.Pass_View3==Hide_Pass}
                                        placeholder={''} onChangeText={(confirmPassword)=>this.setState({confirmPassword})}
                                        onChange={() => this.disable_1_2()}  ref={(input) => { this.confpass = input;}} blurOnSubmit={false} returnKeyType='done'
                                        onSubmitEditing={()=> this.change_password()} />
                                    
        {/* A - 1 - C - 2 - C - 1 - B - show conf password button */}
                                    <TouchableOpacity activeOpacity={1} disabled={!this.state.enablePass3} style={styles.passwordview} onPress={()=> this.setState({Pass_View3:(this.state.Pass_View3==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                    
        {/* A - 1 - C - 2 - C - 1 - B - 1 - show conf password button icon */}
                                        <Image style={styles.buttonthumbs} source={this.state.Pass_View3} />
                                    </TouchableOpacity>
                                </View>
                            </View>

        {/* A - 1 - C - 2 - D - result from new password submit request */}
                            <Text style={styles.resulttext}>{this.state.resultText}</Text>
                            
        {/* A - 1 - C - 2 - E - submit request to change password button */}
                            <TouchableOpacity marginTop={10} activeOpacity={0.5} onPress={()=> this.change_password()} style={[styles.buttontbox, {margin:0,backgroundColor:dark?'#333333':'#0087BD'}]}>
        
        {/* A - 1 - C - 2 - E - 1 - submit request to change password button text */}
                                <Text style={buttontboxtext}>update</Text>
                            </TouchableOpacity>    
                        </View>

        {/* A - 1 - C - 3 - margin update box */}
                        <View style={styles.boxes}>

        {/* A - 1 - C - 3 - A - margin upper box */}
                            <View style={margbox}>

        {/* A - 1 - C - 3 - A - 1 - text left to new margin input */}
                                <Text style={margintext}>Enter New Margin Value (max. 20) -</Text>
        
        {/* A - 1 - C - 3 - A - 2 - input for margin value */}
                                <TextInput keyboardAppearance={theme} onSubmitEditing={()=> this.set_margin()} style={styles.marginvalue} keyboardType={'number-pad'} returnKeyType={'done'} maxLength={20} placeholder={'___'} placeholderTextColor='steelblue' onChangeText={(newMargin) => this.setState({newMargin})} />
                            </View>
        
        {/* A - 1 - C - 3 - B - update margin button */}
                            <TouchableOpacity activeOpacity={0.5} onPress={()=> this.set_margin()} style={[styles.buttontbox, {backgroundColor:dark?'#333333':'#0087BD'}]}>
        
        {/* A - 1 - C - 3 - B - 1 - update margin button text */}        
                                <Text style={buttontboxtext}>update margin</Text>
                            </TouchableOpacity>
                        </View>

        {/* A - 1 - C - 4 - box containing change theme option */}
                        <View style={[styles.boxes,{marginVertical:10}]}>

        {/* A - 1 - C - 4 - A - boc containing change theme text */}
                            <View style={margbox}>

        {/* A - 1 - C - 4 - A - 1 - text above change theme option */}
                                <Text style={margintext}>Change Theme</Text>
                            </View>

        {/* A - 1 - C - 4 - B - change theme button */}
                            <TouchableOpacity activeOpacity={0.5} onPress={()=> {this.change_theme()}} style={[styles.buttontbox, {backgroundColor:dark?'#BCBCBC':'black'}]}>

        {/* A - 1 - C - 4 - B - 1 - theme change button text */}
                                <Text style={[styles.buttontboxtext, {color:dark?'black':'white'}]}>{String(this.state.theme).toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>                        
        
        {/* A - 1 - C - 5 - a-s-s enable/disable button */}
                        <TouchableOpacity activeOpacity={0.8}  onPress={()=> this.modify_ass()}
                                style={[styles.buttontbox2, {backgroundColor:dark?'steelblue':'#BCBCBC'}]}>
                            
        {/* A - 1 - C - 5 - A - a-s-s button text */}
                            <Text style={buttontboxtext}>{!this.state.ass?'Enable':'Disable'} Always Show Search Box</Text>
                        </TouchableOpacity>
                    </ScrollView>
        
        {/* A - 1 - D - logout button */}
                    <TouchableOpacity activeOpacity={0.5} onPress={()=> this.log_out()} style={[styles.buttontbox2, {backgroundColor:'orange'}]}>

        {/* A - 1 - D - 1 - logout button text */}
                        <Text style={styles.buttontboxtext}>LOGOUT</Text>
                    </TouchableOpacity>

        {/* A - 1 - E - button for requesting account deletion*/}                    
                    <TouchableOpacity activeOpacity={0.5} onPress={()=> this.display_delete()} style={styles.buttontbox2}>

        {/* A - 1 - E - 1 - text for requesting account deletion button */}
                        <Text style={styles.buttontboxtext}>{this.state.displaydelete=='flex'?'Cancel':'Request'} Account Deletion</Text>
                    </TouchableOpacity>

        {/* A - 1 - F - box containing account deletion */}
                    <View style={[styles.updatepasscontainer,{display:this.state.displaydelete}]}>

        {/* A - 1 - F - 1 - text over password input for account deletion */}
                        <Text style={[styles.deletiontext, {color:dark?'#BFBFBF':'black'}]}>Please verify your password!</Text>

        {/* A - 1 - F - 2 - delete account password input box */}
                        <View style={passbox}>

        {/* A - 1 - F - 2 - A - password input for confirming deletion */}
                            <TextInput keyboardAppearance={theme} style={textinputpass} secureTextEntry={this.state.Pass_View==Hide_Pass} placeholder={''}
                                onChangeText={(verifypassword) => this.setState({verifypassword})} returnKeyType='done' onSubmitEditing={()=> this.delete_account()} />

        {/* A - 1 - F - 2 - B - pass view button */}
                            <TouchableOpacity activeOpacity={1} style={styles.passwordview} onPress={()=> this.setState({Pass_View:(this.state.Pass_View==Hide_Pass ? Show_Pass:Hide_Pass)})}>

        {/* A - 1 - F - 2 - B - 1 - pass view icon */}
                                <Image style={styles.buttonthumbs} source={this.state.Pass_View} />
                            </TouchableOpacity>
                        </View>                                

        {/* A - 1 - F - 3 - delete account confirmation button */}
                        <TouchableOpacity disabled={this.state.verifypassword==''} activeOpacity={0.5} onPress={()=> this.delete_account()} style={styles.buttontbox2}>

        {/* A - 1 - F - 3 - A - delete account confirmation button text */}
                            <Text style={styles.buttontboxtext}>DELETE ACCOUNT</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

//stylesheet
const styles = StyleSheet.create({

    //main container
    mainbox:
    {
        flex:1,
        backgroundColor:'#333333',
        alignItems:'center',
    },

    //back button for going home
    backnavigation:
    {
        alignItems:'center',
        justifyContent:'center',
        borderRadius:16,
        height:32,
        width:32,
        marginTop:10,
        marginLeft:10,
        shadowRadius:2,
        shadowOpacity:0.4,
        elevation:5,
        shadowOffset:{height:0.1}
        
    },

    //back button icon style
    buttonthumbs:{
        height:35,
        width:35,
    },

    //header region contains profile icon and user welcome text
    header:
    {
        flex:3/5,
        maxHeight:140,
        alignItems:'center',
        width:ms.width,
        justifyContent:'center',
        paddingBottom:5,
        borderBottomWidth:3
    },

    //box containing profile icon
    profilepiccontainer:
    {
        marginTop:10,
        height:60,
        width:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        shadowRadius:2,
        shadowOpacity:0.8,
        elevation:10,
        shadowOffset:{height:0.1}
        
    },

    //thumb for profile icon
    picthumb:
    {
        height:55,
        width:55,
    },

    //box containing welcome text
    welcometextbox:
    {
        marginVertical:5,
        marginTop:10,
        padding:4,
        borderRadius:3,
        shadowRadius:40,
        shadowOpacity:1,
        elevation:5,
        shadowOffset:{height:0.1}
        
    },

    //text style for user welcome
    userwelcometext:
    {
        fontSize:15,
    },

    //box conatning all settings
    settingsbox:
    {
        paddingTop:10,
        flex:2/5,
    },

    //button style for single row button
    buttontbox2:
    {
        backgroundColor:'#660000',
        alignItems:'center',
        justifyContent:'center',
        padding:8,
        borderRadius:5,
        margin:5,
        marginTop:5,
        shadowRadius:10,
        shadowOpacity:0.6,
        elevation:5,
        shadowOffset:{height:1}
    },

    //text style for buttons
    buttontboxtext:{
        fontSize:15,
        padding:3,
        color:'white'
    },

    //box containing password update inputs
    updatepasscontainer:
    {
        backgroundColor:'#cd5c5c',
        margin:10,
        marginTop:0,
        borderRadius:5,
        shadowRadius:2,
        shadowOpacity:0.8,
        elevation:5,
        shadowOffset:{height:0.1}      
    },

    //boxes for each password field
    inputboxes:
    {
        marginTop:10,
    },

    //text shown above password input field
    passtext:
    {
        fontStyle:'italic',
        color:'black',
        fontSize:10,
        padding:2,
        marginLeft:10,
    },

    //paswword box
    passbox:
    {
        margin:5,
        marginBottom:10,
        paddingLeft:10,
        borderRadius:3,
        flexDirection:'row',
        shadowRadius:2,
        shadowOpacity:0.8,
        elevation:3,
        shadowOffset:{height:0.1}
        
    },

    //password input field
    textinputpass:
    {
        padding:5,
        color:'#BFBFBF',
        fontSize:18,
        flex:1,
    },

    //password view icon
    passwordview:{
        justifyContent:"flex-start",
        alignItems:'center',
        width:45,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },

    //result style on password submission
    resulttext:
    {
        color:'darkred',
        fontSize:12,
        padding:2,
        textAlign:'center'
    },

    //button style for dual box options
    buttontbox:
    {
        alignItems:'center',
        justifyContent:'center',
        padding:8,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        marginTop:0
    },

    //boxes containing two row options
    boxes:
    {
        marginHorizontal:5,
        borderRadius:5,
        marginTop:10,
        elevation:5,
        shadowRadius:2,
        shadowOpacity:0.8,
        shadowOffset:{height:0.1}
    },

    //non button region of two row boxes
    margbox:{
        flexDirection:'row',
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        justifyContent:'center',
    },

    //text style for above
    margintext:
    {
        padding:10,
        fontSize:18,
        textAlign:'center'
    },

    //input for margin value
    marginvalue:
    {
        color:'darkgreen',
        width:30,
        fontSize:20,
        paddingTop:2,
    },

    //text shown above delete account password input
    deletiontext: {
        textAlign:'center',
        margin:10,
        fontSize:15,
    },
})