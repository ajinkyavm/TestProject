/**
* Created by Swami on 11/06/17.
*/
var express = require('express');
const markerSchemaCollection = require('../model/marker-schema');
const refMarkerSchema = markerSchemaCollection.refMarkerSchema;
const mongoose = require('mongoose');

class RefrenceMarker {
    constructor(){

   }

   setThemeMarkerRefrence (theme,markerList){
       this.theme = theme;
       this.markerList = markerList;

      return new Promise((resolve,reject) => {
         this._deleteThememarkerRefrence().then(deleteSucessfull => {  // Delete already existing refrences for the theme
            if(deleteSucessfull == true) {
               if(this.markerList.length == 0){
                  resolve(this.markerList)
               }else{

                  this._addThemeMarkerRefrence().then(markerSavedList => { // set New refrence for the theme
                     console.log("ADD THEME SUCESS");
                     resolve(markerSavedList);
                  }).catch((err) => {
                     console.log("ADD THEME FAILURE");
                     reject (err);
                  });

               }
            }else{
               console.log("ERROR IN DELETING THEME");
               reject (err);
            }
         }).catch((err) => {
            reject (err);
         });
      })
   }

   _deleteThememarkerRefrence (){
      return new Promise((resolve,reject) =>{
         try{
            let theme = mongoose.Types.ObjectId(this.theme);
            let _refMarkerSchema = refMarkerSchema;
            _refMarkerSchema.remove({theme : theme},(err,theme) => {
               if(err != null){
                  console.log(`error is ${err}`);
                  reject(err);
               }else{
                  console.log("INSIDE SUCESS DELETION")
                  resolve(true);
               }
            })
         }catch(err){
            reject(err);
         }
      })
   }


   _addThemeMarkerRefrence (){
      return new Promise((resolve, reject) => {
         try{
            let refNewMarker;
            let markerSavedList = [],markerSaveError= [];
            let markerList = this.markerList != undefined ? this.markerList : [];
            let theme = this.theme;
            console.log("ADD THEME REFRENC MARKER")
            //TO-DO this has to be changed to bulkinsert/recursive function this is temperory -Swami
            for (let marker=0 ; marker < markerList.length  ;marker++ ){
               refNewMarker = new refMarkerSchema({
                  name  :  markerList[marker].name,
                  commited : markerList[marker].commited,
                  target : markerList[marker].target,
                  actual : markerList[marker].actual,
                  markerType : markerList[marker].markerType,
                  theme : theme
               });

               refNewMarker.save((err,markersaved) => {
                  if(err){
                     //reject(`Error on saving marker ${marker.name},${err}`);
                     markerSaveError.push(err);
                     if(marker == (markerList.length - 1)) {
                        if(markerSaveError.length <= 0){
                           resolve(markerSavedList);
                        }else{
                           reject(`Error on saving marker`,markerSaveError);
                        }
                     }
                  } else{
                     markerSavedList.push(markersaved._id);
                     if(marker == (markerList.length - 1)) {
                        if(markerSaveError.length <= 0){
                           resolve(markerSavedList);
                        }else{
                           reject(`Error on saving marker`,markerSaveError);
                        }
                     }
                  }

               })
            }
         }catch(err){
            console.log('error is',err);
            reject(`Error on saving marker ${marker.name},${err}`);
         }
      });
   }



   getThememarkerRefrence(theme){
       return new Promise( (resolve,reject) => {
             try{
                let refmarkerSchema =  refMarkerSchema;
                let themeID = mongoose.Types.ObjectId(theme);
                refmarkerSchema.find({theme : themeID},(err,marker) => {
                   if(err != null){
                      reject(err);
                   }else{
                      resolve(marker);
                   }
                })
             }catch(err){
                reject(err);
             }
       });

   }

    getThememarkerRefrenceWithNoId(theme){
        return new Promise( (resolve,reject) => {
            try{
                let refmarkerSchema =  refMarkerSchema;
                let themeID = mongoose.Types.ObjectId(theme);
                var getMarkerQuery = refmarkerSchema.find({theme : themeID});
                getMarkerQuery.select("-_id");
                getMarkerQuery.select("-__v");
                getMarkerQuery.exec((err,marker) => {
                    if(err != null){
                        reject(err);
                    }else{
                        resolve(marker);
                    }
                })

            }catch(err){
                reject(err);
            }
        });

    }


}

module.exports = RefrenceMarker;