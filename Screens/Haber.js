import React, { Component,Fragment, useRef, useState } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image,ImageBackground,ScrollView,FlatList,Button,Linking} from 'react-native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Back from  './assets/d.jpg';
import { TextInput } from 'react-native-gesture-handler';
import Deneme from './assets/H.jpg';
import { FontAwesome5,MaterialIcons,MaterialCommunityIcons,Entypo,Ionicons,Fontisto} from '@expo/vector-icons';
import moment from 'moment';
import {Header} from 'react-native-elements';
import { Divider } from 'react-native-elements';

export default class App extends React.Component {

constructor(){
super();
this.state={
  data:[],
  
}
}

componentDidMount(){
this.getPost(); 
 
}

async getPost(){
   let veri = await fetch('http://newsapi.org/v2/top-headlines?country=tr&apiKey=819954f41ce748aba629e959b7707bec')
  let jsonVeri  = await  veri.json()
  // console.log(jsonVeri.articles);
  this.setState({
    datax:jsonVeri.articles,
 }); 
}




render(){
  return (

    <View>

    <Header
    containerStyle={{height:hp("8%")}}
    leftComponent={{  color: '#fff' }}
    centerComponent={{ text: 'HABERLER', style: { color: '#fff', fontWeight:"bold", fontSize:17,top:3} }}
    rightComponent={{  color: '#fff' }}
/>
<ScrollView>
    <FlatList 
      data={this.state.datax}
      // numColumns={3}
      keyExtractor={(item)=>item.id}
      renderItem={({item,index}) =>
  
<TouchableOpacity onPress={()=> Linking.openURL(item.url)}>
      <View nativeID="Ana blok" style={{width:wp("90%"),marginTop:hp("0%"),flexDirection:"column",marginHorizontal:wp("0%")}}>

            <View nativeID="kalıp" style={{backgroundColor:"white",width:wp("98%"),marginLeft:wp("1%"),height:hp("20%"),maxHeight:hp("28%"),marginTop:hp("1%"),borderRadius:5,flexDirection:"row"}}>
                <View style={{marginLeft:wp("2%"),marginTop:hp("3%"),width:wp("27%"),height:hp("14%"),borderRadius:5}}>
                    <Image source={{uri:item.urlToImage}} style={{width:wp("27%"),height:hp("14%"),borderRadius:5}}/> 
                </View>
                <View style={{flexDirection:"column",width:wp("69%")}}>
                  <View style={{flex:2,flexDirection:"row"}}>
                      <View style={{justifyContent:"flex-end",flex:2}}>
                         <Text style={{fontSize:12,fontWeight:"bold",marginLeft:wp("3%"),bottom:3,color:"black"}}>{item.publishedAt.substring(11,16)}</Text>
                      </View>
                      <View style={{justifyContent:"flex-end",alignItems:"center",flex:1}}>
                         <Text style={{fontSize:10,marginLeft:wp("3%"),bottom:6,color:"gray"}}>{item.publishedAt.substring(8,10)+"."+item.publishedAt.substring(5,7)+"."+ item.publishedAt.substring(0,4)}</Text>
                      </View>
                  </View>
                  <View style={{flex:4,justifyContent:"center"}}>
                       <Text style={{fontSize:13,marginLeft:wp("3%"),bottom:3,color:"black",maxWidth:wp("63%")}}>{item.title}</Text>
                  </View>
                  <View style={{flex:0.7,alignItems:"flex-end",justifyContent:"center"}}>
                      <Text style={{fontSize:10,marginRight:wp("3%")}}>{item.source.name}</Text>
                  </View>
                 
                </View>
                
      
            </View>
            <View>
            <Divider style={{ backgroundColor: 'black',width:wp("100%") }} />
            </View>
         
          </View>
          </TouchableOpacity>
        }
    
        />
   
       
      
      </ScrollView>

  </View>

    

    
  );
}
}

