var express = require('express');
const UserModule = require('../module/userModule');


getChampions = function(req,res,next){

    try{
        let _userModule =  new UserModule();

        _userModule.getAlluser().then((users)=>{
            res.json(1,"Success",users)
        }).catch((err) => {
            console.log(err)
            res.json(-1,"Failure",err)
        })

    }catch(error){
        console.log(error)
        res.json(-1,`Failure`,error);

    }


}

module.exports = getChampions;