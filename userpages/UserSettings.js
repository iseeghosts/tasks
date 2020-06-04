import React, { Component } from 'react';
import {View, Text, Image, Alert, Dimensions, TouchableOpacity, ScrollView,StyleSheet, Platform, Button, TextInput, KeyboardAvoidingView} from 'react-native';

import Profile_Pic_Dark from '../assets/Profile_Pic_Dark.png'
import Profile_Pic_Light from '../assets/Profile_Pic_Light.png'

import Back_Arrow_Dark from '../assets/Back_Arrow_Dark.png';
import Back_Arrow_Light from '../assets/Back_Arrow_Light.png'

import Show_Pass from '../assets/Show_Pass.png';
import Hide_Pass_Dark from '../assets/Hide_Pass_Dark.png';
import Hide_Pass_Light from '../assets/Hide_Pass_Light.png';

import Users from '../users.json'
import AppData from '../appdata.json'

var ms = Dimensions.get('window');

export default class UserSettings extends Component {
    constructor (props) {
        super()
        let Hide_Pass = (AppData[props.id].theme=='dark'?Hide_Pass_Dark:Hide_Pass_Light)
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


    update_password = () => {
        this.setState({
            pfv:(this.state.pfv=='none'?'flex':'none'),
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            resultText:'',  
        })        
    }

    reset_field1 = () => {
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
    
    reset_field2 = () => {
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
    
    reset_field3 = () => {
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

    /*
    password nest =>
    1. oldpassword no match => result = fail 
    2. new password empty => result = fail
    3. new password and old password match and new password confirm password match => result fail
    4. new password and old password match and new password confirm password don't match => result fail
    5. new password and confirm password don't match => result => fail
    6. oldpassword field empty => result= fail
    7. new password and old password don't match and new password confirm password match => result success
    */
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
    
    set_margin = () => {
        if ((Number(this.state.newMargin)) > 0 && (Number(this.state.newMargin) < 21)) {
        AppData[this.props.id].taskMargin = Number(this.state.newMargin)
        alert('Home Screen margin set to ' + this.state.newMargin+'!')
        } else {
            alert('Please enter an acceptable value (1-20)!')
        }
    }

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
    display_delete = () => {
        this.setState({
            verifypassword:'',
            displaydelete:(this.state.displaydelete=='none'?'flex':'none')
        })
    }

    delete_account = () => {
        var id = this.props.id
        if (this.state.verifypassword==Users[this.props.id].pwd)
        Alert.alert('Delete Account', "This action is irreversible,\n Do you still want to proceed?", [{text:'Yes', onPress: () => {
            this.props.close();
            alert('Account Deleted Successfully!')
            delete Users[id];
        }
    }, {text:'No',}], {cancelable:true} )
    else alert('Incorrect Password!')
    }

    log_out = () => {
        Alert.alert('logout?', 'Are you sure you want to logout?', [
            {text:'logout', onPress: () => {this.props.closeSettings();
            this.props.close()}},
            {text:'No'}],
            {cancelable:true} )
        }

    
    render() {

        let theme = AppData[this.props.id].theme

        var buttontboxtext = StyleSheet.flatten([styles.buttontboxtext, {color:theme=='dark'?'#BFBFBF':'black'}])
        var margintext = StyleSheet.flatten([styles.margintext, {color:theme=='dark'?'#BFBFBF':'black'}])
        var passbox = StyleSheet.flatten([styles.passbox, {backgroundColor:theme=='dark'?'black':'#BFBFBF'}])
        var textinputpass = StyleSheet.flatten([styles.textinputpass, {color:theme=='dark'?'#BFBFBF':'black'}])
        var margbox = StyleSheet.flatten([styles.margbox,{backgroundColor:theme=='dark'?'grey':'#BFBFBF'}])
        let Hide_Pass = (theme=='dark'?Hide_Pass_Dark:Hide_Pass_Light)        

        return(
            <View style={[styles.mainbox, {backgroundColor:(theme=='dark'?'black':'white'), paddingTop:theme=='dark'?0:20, marginTop:theme=='dark'?20:0}]}>
                <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS == "ios" ? "padding" : ""}>
                        <TouchableOpacity activeOpacity={1} underlayColor="#BFBFBF" style={[styles.backnavigation, {backgroundColor:(theme=='dark'?'black':'#BFBFBF')}]} onPress={()=> this.props.closeSettings()}>
                            <Image style={styles.buttonthumbs} source={(theme=='dark'?Back_Arrow_Dark:Back_Arrow_Light)} />
                        </TouchableOpacity>

                    <View style={[styles.header, {borderColor:theme=='dark'?'white':'black'}]}>
                        
                        <View style={[styles.profilepiccontainer, {backgroundColor:(theme=='dark'?'#555555':'#BFBFBF')}]}>
                            <Image source={(theme=='dark'?Profile_Pic_Dark:Profile_Pic_Light)} style={styles.picthumb} />
                        </View>

                        <View style={[styles.welcometextbox, {backgroundColor:theme=='dark'?'#666666':'#BFBFBF'}]}>
                            <Text style={[styles.userwelcometext, {color:theme=='dark'?'#FAEBD7':'black'}]}> Hello {Users[this.props.id].name}!</Text>
                        </View>

                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.settings}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=> this.update_password()} style={[styles.buttontbox2, {backgroundColor:theme=='dark'?'#333333':'#0087BD'}]}>
                            <Text style={buttontboxtext}>{this.state.pfv=='flex'?'Cancel Password Update':'Update Password'}</Text>
                        </TouchableOpacity>

                        <View style={[styles.updatepasscontainer,{display:this.state.pfv, backgroundColor:theme=='dark'?'#666666':'skyblue'}]}>
                                <View style={styles.inputboxes}>
                                    <Text style={styles.passtext}>Enter Old Password!</Text>
                                    <View style={passbox}>
                                        <TextInput keyboardAppearance={theme} style={textinputpass} secureTextEntry={this.state.Pass_View1==Hide_Pass} placeholder={''} defaultValue={this.state.oldPassword} onChangeText={(oldPassword)=>this.setState({oldPassword})} onChange={() => this.reset_field1()} />
                                        <TouchableOpacity activeOpacity={1} disabled={!this.state.enablePass1} style={styles.passwordview} onPress={()=> this.setState({Pass_View1:(this.state.Pass_View1==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                            <Image style={styles.buttonthumbs} source={this.state.Pass_View1} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.inputboxes}>
                                    <Text style={styles.passtext}>Enter New Password!</Text>
                                    <View style={passbox}>
                                        <TextInput keyboardAppearance={theme} style={textinputpass} secureTextEntry={this.state.Pass_View2==Hide_Pass} placeholder={''} defaultValue={this.state.newPassword} onChangeText={(newPassword) => this.setState({newPassword})} onChange={() => this.reset_field2()} />
                                        <TouchableOpacity activeOpacity={1} disabled={!this.state.enablePass2} style={styles.passwordview} onPress={()=> this.setState({Pass_View2:(this.state.Pass_View2==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                            <Image style={styles.buttonthumbs} source={this.state.Pass_View2} />
                                        </TouchableOpacity>
                                    </View>                                
                                </View>

                                <View style={styles.inputboxes}>
                                    <Text style={styles.passtext}>Confirm your new password!</Text>
                                    <View style={passbox}>
                                        <TextInput keyboardAppearance={theme} style={textinputpass} secureTextEntry={this.state.Pass_View3==Hide_Pass} placeholder={''} defaultValue={this.state.confirmPassword} onChangeText={(confirmPassword)=>this.setState({confirmPassword})} onChange={() => this.reset_field3()} />
                                        <TouchableOpacity activeOpacity={1} disabled={!this.state.enablePass3} style={styles.passwordview} onPress={()=> this.setState({Pass_View3:(this.state.Pass_View3==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                            <Image style={styles.buttonthumbs} source={this.state.Pass_View3} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Text style={styles.resulttext}>{this.state.resultText}</Text>
                            
                            <TouchableOpacity marginTop={10} activeOpacity={0.5} onPress={()=> this.change_password()} style={[styles.buttontbox, {margin:0,backgroundColor:theme=='dark'?'#333333':'#0087BD'}]}>
                                <Text style={buttontboxtext}>update</Text>
                            </TouchableOpacity>    

                        </View>
                        <View style={styles.boxes}>
                            <View style={margbox}>
                                <Text style={margintext}>Enter New Margin Value (max. 20) -</Text>
                                <TextInput keyboardAppearance={theme} onSubmitEditing={()=> this.set_margin()} style={styles.marginvalue} keyboardType={'numeric'} maxLength={20} placeholder={'___'} placeholderTextColor='steelblue' onChangeText={(newMargin) => this.setState({newMargin})} />
                            </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={()=> this.set_margin()} style={[styles.buttontbox, {backgroundColor:theme=='dark'?'#333333':'#0087BD'}]}>
                                <Text style={buttontboxtext}>update margin</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.boxes,{marginVertical:10}]}>
                            <View style={margbox}>
                                <Text style={margintext}>Change Theme</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={()=> {this.change_theme()}} style={[styles.buttontbox, {backgroundColor:theme=='dark'?'#BCBCBC':'black'}]}>
                                <Text style={[styles.buttontboxtext, {color:theme=='dark'?'black':'white'}]}>{String(this.state.theme).toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>                        
                        <TouchableOpacity activeOpacity={0.8}
                        onPress={()=> {
                                AppData[this.props.id].alwaysshowsearch=(!this.state.ass);
                                this.setState({ass:!this.state.ass});
                                console.log(AppData[this.props.id])}}
                                style={[styles.buttontbox2, {backgroundColor:theme=='dark'?'steelblue':'#888'}]}>
                            <Text style={buttontboxtext}>{!this.state.ass?'Enable':'Disable'} Always Show Search Box</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=> this.log_out()} style={[styles.buttontbox2, {backgroundColor:'orange'}]}>
                        <Text style={styles.buttontboxtext}>LOGOUT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=> this.display_delete()} style={styles.buttontbox2}>
                        <Text style={styles.buttontboxtext}>{this.state.displaydelete=='flex'?'Cancel':'Request'} Account Deletion</Text>
                    </TouchableOpacity>
                    <View style={[styles.updatepasscontainer,{display:this.state.displaydelete}]}>
                        <Text style={[styles.deletiontext, {color:theme=='dark'?'#BFBFBF':'black'}]}>Please verify your password!</Text>
                        <View style={passbox}>
                            <TextInput keyboardAppearance={theme} style={textinputpass} secureTextEntry={this.state.Pass_View==Hide_Pass} placeholder={''} defaultValue={this.state.verifypassword} onChangeText={(verifypassword) => this.setState({verifypassword})} />
                            <TouchableOpacity activeOpacity={1} style={styles.passwordview} onPress={()=> this.setState({Pass_View:(this.state.Pass_View==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                <Image style={styles.buttonthumbs} source={this.state.Pass_View} />
                            </TouchableOpacity>
                        </View>                                
                        <TouchableOpacity disabled={this.state.verifypassword==''} activeOpacity={0.5} onPress={()=> this.delete_account()} style={styles.buttontbox2}>
                            <Text style={styles.buttontboxtext}>DELETE ACCOUNT</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainbox:
    {
        flex:1,
        backgroundColor:'#333333',
        alignItems:'center',
    },
    backnavigation:
    {
        alignItems:'center',
        justifyContent:'center',
        borderRadius:16,
        height:32,
        width:32,
        marginTop:10,
        marginLeft:10,
        shadowRadius:4,
        shadowOpacity:0.8,
        elevation:5,
        shadowOffset:{height:0.1}
        
    },
    buttonthumbs:{
        height:35,
        width:35,
    },
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
    profilepiccontainer:
    {
        marginTop:10,
        height:60,
        width:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        shadowRadius:4,
        shadowOpacity:0.8,
        elevation:10,
        shadowOffset:{height:0.1}
        
    },
    picthumb:
    {
        height:55,
        width:55,
    },
    welcometextbox:
    {
        marginVertical:5,
        marginTop:10,
        padding:4,
        borderRadius:3,
        shadowRadius:4,
        shadowOpacity:0.8,
        elevation:5,
        shadowOffset:{height:0.1}
        
    },
    userwelcometext:
    {
        fontSize:15,
    },
    settings:
    {
        paddingTop:10,
        flex:2/5,
    },
    buttontbox2:
    {
        backgroundColor:'#660000',
        alignItems:'center',
        justifyContent:'center',
        padding:8,
        borderRadius:5,
        margin:5,
        marginTop:0,
        shadowRadius:4,
        shadowOpacity:0.8,
        elevation:5,
        shadowOffset:{height:0.1}
    },
    buttontboxtext:{
        fontSize:15,
        padding:3,
        color:'white'
    },
    updatepasscontainer:
    {
        backgroundColor:'#cd5c5c',
        margin:10,
        marginTop:0,
        borderRadius:5,
        shadowRadius:4,
        shadowOpacity:0.8,
        elevation:5,
        shadowOffset:{height:0.1}      
    },
    inputboxes:
    {
        marginTop:10,
    },
    passtext:
    {
        fontStyle:'italic',
        color:'black',
        fontSize:10,
        padding:2,
        marginLeft:10,
    },
    passbox:
    {
        margin:5,
        marginBottom:10,
        paddingLeft:10,
        borderRadius:3,
        flexDirection:'row',
        shadowRadius:4,
        shadowOpacity:0.8,
        elevation:3,
        shadowOffset:{height:0.1}
        
    },
    textinputpass:
    {
        padding:5,
        color:'#BFBFBF',
        fontSize:18,
        flex:1,
    },
    passwordview:{
        justifyContent:"flex-start",
        alignItems:'center',
        width:45,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },
    resulttext:
    {
        color:'darkred',
        fontSize:12,
        padding:2,
        textAlign:'center'
    },
    buttontbox:
    {
        alignItems:'center',
        justifyContent:'center',
        padding:8,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        marginTop:0
    },
    boxes:
    {
        marginHorizontal:5,
        borderRadius:5,
        marginTop:10,
        elevation:5,
        shadowRadius:4,
        shadowOpacity:0.8,
        shadowOffset:{height:0.1}
    },
    margbox:{
        flexDirection:'row',
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
    },
    margintext:
    {
        padding:10,
        fontSize:18,
    },
    marginvalue:
    {
        color:'darkgreen',
        width:30,
        fontSize:20,
        paddingTop:2,
    },
    deletiontext: {
        textAlign:'center',
        margin:10,
        fontSize:15,
    },
})