var express = require('express');
const mongoose = require('mongoose');
const UserModule = require('../module/userModule');


setChampion = function(req,res,next){


    try{
        let _userModule =  new UserModule();

        _userModule.setUser(req).then((users)=>{
            res.json(1,"Success",users)
        }).catch((err) => {

            res.json(-1,"Failure",err)
        })

    }catch(err){

        res.json(-1,`Error on saving user ${err}`);
    }




}

module.exports = setChampion;