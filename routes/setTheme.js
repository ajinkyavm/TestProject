/**
 * Created by Swami on 08/06/17.
 */

var express = require('express');
const ThemeModule = require('../module/themeModule');


setTheme = function(req,res,next){


    try{
        let _themeModule = new ThemeModule();
        _themeModule.setTheme(req).then((themes) => {
            res.json(1,"Success",themes)
        }).catch((err) => {
            res.json(-1,"ERROR",err);
        })
    }catch(err){
        res.json(-1,`Error on saving theme`,err);
    }




}

module.exports = setTheme;