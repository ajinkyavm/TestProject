/**
 * Created by Swami on 12/06/17.
 */

var express = require('express');
const mongoose = require('mongoose');
const markerPage = require('../module/refrenceMarkerModule');

setThemeRefrencemarker = function (req,res,next) {
    try{
        let creator={},theme={};
        let marker = new markerPage();
        [creator,theme] = [mongoose.Types.ObjectId(req.body.creator), mongoose.Types.ObjectId(req.body.theme)];

        marker.setThemeMarkerRefrence(req.body.theme,req.body.marker).then(markerList =>{
            res.json(1,`Sucess marker Saved `,markerList);
            }).catch((err) => {
            res.json(-1,`Error on saving marker `,err);
        });
    }catch(err){
        console.log(err)
        res.json(-1,`Error on saving marker`,err);
    }

}

module.exports = setThemeRefrencemarker;
