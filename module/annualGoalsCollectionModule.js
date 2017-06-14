/**
 * Created by Swami on 14/06/17.
 */

var express = require('express');
const goalsSchemaCollection = require('../model/goals-schema');
const annualGoalsSchema = goalsSchemaCollection.annualGoalsSchema;
const MarkerModule = require('../module/markerModule');
const mongoose = require('mongoose');
const RefmarkerModule = require('../module/refrenceMarkerModule');
const ThemeModule = require('../module/themeModule');

class AnnualGoalsCollection {

    constructor(){

        this.refmarkerModule = new RefmarkerModule();
        this.markerModule = new  MarkerModule();
        this.themeModule = new ThemeModule();
        this.monthList = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        this.annualGoalList = ["Q1","Q2","Q3","Q4","QPLC"];

    }

    setGoals(req){
        console.log("SET GOALS IN ANNUAL");
        this.creator = mongoose.Types.ObjectId(req.body.creator);
        this.startDate = new Date("2017-01-15 10:02:32.704");
        this.__deadLineDate = new Date(req.body.deadLineDate); // This need to be taken from serve
        this.targetEnabled = req.body.targetEnabled == true ? req.body.targetEnabled : req.body.targetEnabled == undefined ? true : false;
        this.endDate = "";
        this.anualTarget = true; // TO-DO this is for supprt purpose if it's not needed can be removed finally
        this.themeList = [];
        this.goalsArray = [];
        this.annualGoalsArray = [];

        try{
            return new Promise((resolve,reject) => {
                this.checkIsAllDataFreezed().then((goals) => {
                    console.log(goals.length);
                    if(goals.length <= 0){
                        this.themeModule.getAllTheme().then((themeArray) => {
                            this.themCollection = themeArray
                            this.themeList = this.themCollection.map((eachTheme) => {

                                return eachTheme._id;
                            });;
                            this.goalsArray = [];
                            console.log(typeof this._setMarkerAndGoals);

                            this._setMarkerAndGoals(this.themeList.length-1).then((goalsList) => {
                                console.log(" SUCESS ON SETTING GOAL");
                                resolve([1,`success`,goalsList]);

                            }).catch((err) => {
                                console.log("  ERROR ON SETTING GOAL");
                                reject([-1,`Error on setting goal to theme ${err}`,err]);
                            })


                        }).catch((err) => {
                            console.log("  ERROR ON GETTING ALL THEME",err);
                            reject([-1,`Error on getting all theme`,err]);
                        });
                    }else{
                        resolve([0,`Freeze data for current year`,goals]);
                    }
                });

            });
        }catch(err){
            console.log("ERROR ON SAVING TARGET ++++ ",err)
            reject(-1,`Error on setting goal to theme ${err}`);
        }

    }
    /* recursive call to set goal for each theme */

    _setMarkerAndGoals(index){
        console.log(":::: SET MARKER AND GOALS");
        return new Promise((resolve,reject) => {
            let  themeID = this.themeList[index];

            let markerIdList = [];
            let refNewMarkerList = [];

            this.getRefMarkerforTheme(themeID).then((refMarkerList) => {
                refNewMarkerList = refMarkerList.map((eachMarker) => {
                    eachMarker.deadlineDate = this._deadLineDate;
                    eachMarker.targetEnabled = this.targetEnabled;
                    return eachMarker;
                });

                console.log(JSON.stringify(refNewMarkerList));
                if(refMarkerList.length > 0 ){
                    this.markerModule.setMarker(themeID,refMarkerList).then(markerList => {  // This wil set the marker for theme

                        markerIdList = markerList.map((eachmarker) => {
                            return mongoose.Types.ObjectId(eachmarker._id);
                        });
                        this.annualGoalsArray = [] ;
                        this._createGoalWithMarker(themeID,markerIdList,this.annualGoalList.length-1).then((goals) => {
                            if(index == 0){
                                this.goalsArray = [this.goalsArray,goals];
                                resolve(this.goalsArray);
                            }else if (index > 0){
                                this.goalsArray = [this.goalsArray,goals];
                                this._setMarkerandGoals((--index)).then((goals) => {
                                    resolve(this.goalsArray);
                                });
                            }

                        }).catch((err) => {
                            reject(err);
                        });

                    }).catch((err) => {
                        reject(err);
                    });

                }else{
                    this.annualGoalsArray =[] ;
                    this._createGoalWithMarker(themeID,null,this.annualGoalList.length-1).then((goals) => {
                        if(index == 0){
                            this.goalsArray = [this.goalsArray,goals];
                            resolve(this.goalsArray);
                        }else if (index > 0){
                            this.goalsArray = [this.goalsArray,goals];
                            this._setMarkerAndGoals((--index)).then((goals) => {
                                resolve(this.goalsArray);
                            });
                        }

                    }).catch((err) => {
                        reject(err);
                    });
                }
            }).catch((err) => {
                console.log("ERROR IN setMarkerandGoals",err);
                reject(err);
            });
        })
    }

    _createGoalWithMarker(themeID,markerIdList,index){

        return new Promise((resolve,reject) => {
            let themeName = this.themCollection.find((theme) => {
                return theme.id == themeID;
            });

            let title = `${themeName.name} ${this.annualGoalList[index]} goals ${this.__deadLineDate.getFullYear()}-${this.__deadLineDate.getFullYear()+1} `;
            let newGoal = new annualGoalsSchema({
                title: title,
                theme: themeID,
                creator: this.creator,
                marker: markerIdList,
                status: 0,
                startDate: this.startDate,
                endDate: this.endDate,
                annualTarget : this.anualTarget,
                deadlineDate : this.__deadLineDate,

            });

            newGoal.save((err,goals) => {
                if(err){
                    reject(err);
                } else{

                   if(index == 0 ){
                       this.annualGoalsArray.push(goals);
                       resolve(this.annualGoalsArray);
                   }else if(index > 0 ){
                       this.annualGoalsArray.push(goals);
                       this._createGoalWithMarker(themeID,markerIdList,--index).then((goals) => {
                           resolve(this.annualGoalsArray);
                       });;
                   }


                }

            });

        })



    }

    getRefMarkerforTheme(theme){
        return new Promise((resolve,reject) => {
            this.refmarkerModule.getThememarkerRefrenceWithNoId(theme,[]).then((markerList)=>{
                resolve(markerList);
            }).catch((err) => {
                console.log("ERROR in Getting refrence Marker");
                reject(err);

            });
        });

    }

    checkIsAllDataFreezed(){

        console.log("CHECK IS ALL DATA FREEZED");
        return new Promise((resolve,reject) => {
                let goalQuery = annualGoalsSchema.find({annualTarget:true,freeze:false});
                goalQuery.exec((err,goals) => {
                    if(err != null){
                        reject(err);
                    }else{
                        resolve(goals);
                    }
                })



        })
    }

}

module.exports = AnnualGoalsCollection;
