/**
 * Created by Swami on 12/06/17.
 */
var express = require('express');
const mongoose = require('mongoose');
const markerPage = require('../module/refrenceMarkerModule');

getThemeRefrencemarker = function (req,res,next) {
    try{
        let theme={};
        theme = mongoose.Types.ObjectId(req.body.theme);
        let marker = new markerPage();
        marker.getThememarkerRefrence(req.body.theme,req.body.marker).then(markerList =>{
            res.json(1,`Sucess`,markerList);
            }).catch((err) => {
                console.log(err)
            res.json(-1,`Error on getting marker`,err);
        });
    }catch(err){
        console.log(err)
        res.json(-1,`Error on saving marker`,err);
    }

};

module.exports = getThemeRefrencemarker;
