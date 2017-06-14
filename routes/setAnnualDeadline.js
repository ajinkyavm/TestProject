/**
 * Created by Swami on 08/06/17.
 */
var express = require('express');
const mongoose = require('mongoose');
const annualGolasCollectionModule = require('../module/annualGoalsCollectionModule');

setAnnualDeadLine = function(req,res,next){  // This method is for setting goals for all the theme

    let golasCollection  = new annualGolasCollectionModule();
    golasCollection.setGoals(req).then((resultArray) => {

        if(resultArray[0] == 1){
            res.json(resultArray[0],resultArray[1],resultArray[2]);
        }else{
            res.json(resultArray[0],resultArray[1],resultArray[2]);
        }

    }).catch((errArray) => {
        console.log('ERROR ARRAY',JSON.stringify(errArray));
        res.json(-1,errArray[1],errArray[2])
    });

};

module.exports = setAnnualDeadLine;