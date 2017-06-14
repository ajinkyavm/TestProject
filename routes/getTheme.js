/**
 * Created by Swami on 08/06/17.
 */
var express = require('express');
const themeSchema = require('../model/theme-schema');
const ThemeModule = require('../module/themeModule');

getTheme = function(req,res,next){

    let _themeModule = new ThemeModule();
    _themeModule.getAllTheme().then((themes) => {
        res.json(1,"Success",themes)

    }).catch((err) => {
        res.json(-1,"ERROR",err);
    })

}

module.exports = getTheme;