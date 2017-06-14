/**
 * Created by Swami on 13/06/17.
 */
var express = require('express');
const markerSchemaCollection = require('../model/marker-schema');
const mongoose = require('mongoose');
const markerSchema = markerSchemaCollection.themeMarkerSchema;


class Marker{
    constructor(theme,markerList){

    }
    setMarker(theme,markerList){

        return new Promise((resolve,reject) =>{
            let markerSaveError = [];
            let markerSavedList = [];
            console.log("MARKERRLIST IN MARKER MODULE",JSON.stringify(markerList));
                //TO-DO this has to be changed to bulkinsert/recursive function this is temperory -Swami
                for (let marker=0 ; marker < markerList.length  ;marker++ ){

                  let  refNewMarker = new markerSchema({
                        name : markerList[marker].name,
                        commited : markerList[marker].commited,
                        deadlineDate:markerList[marker].deadlineDate,
                        target :markerList[marker].target,
                        actual:markerList[marker].actual,
                        markerType:markerList[marker].markerType,
                        theme:mongoose.Types.ObjectId(markerList[marker].theme[0]),
                        createdDate:markerList[marker].createdDate,
                        targetEnabled : markerList[marker].targetEnabled,
                        commitEnabled : markerList[marker].commitEnabled


                    });

                    refNewMarker.save((err,markersaved) => {
                        console.log("IS ERROR FOUND",err)
                        if(err){
                            //reject(`Error on saving marker ${marker.name},${err}`);
                            markerSaveError.push(err);
                            if(marker == (markerList.length - 1)) {
                                if(markerSaveError.length <= 0){
                                    resolve(markerSavedList);
                                }else{
                                    reject(markerSaveError);
                                }
                            }
                        } else{
                            markerSavedList.push(markersaved._id);
                            if(marker == (markerList.length - 1)) {
                                if(markerSaveError.length <= 0){
                                    resolve(markerSavedList);
                                }else{
                                    reject(markerSaveError);
                                }
                            }
                        }

                    })
                }


        });


    }
}


module.exports = Marker;
