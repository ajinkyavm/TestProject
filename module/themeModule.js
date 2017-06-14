/**
 * Created by Swami on 13/06/17.
 */
const themeSchema = require('../model/theme-schema');
const mongoose = require('mongoose');

class Theme {
    constructor(){

    }

    getAllTheme(){

        return new Promise((resolve,reject) => {
            themeSchema.find().populate({path:'champ'}).exec(function(err,themes){

                if(err){
                    reject({msg:"Error on retrival",err});
                }else{

                    resolve(themes);

                    //res.json(users);
                }
            });
        });

    }

    getAllThemId(){

    return new Promise((resolve,reject) => {
        let themesIdList = [];
        this.getAllTheme().then((themes) => {
            themesIdList = themes.map((eachTheme) => {

                return eachTheme._id;
            });
            resolve(themesIdList);
        })
    })

    }

    setTheme(req){
       return new Promise((resolve,reject) => {
           let creator = mongoose.Types.ObjectId(req.body.creator);
           let champ = mongoose.Types.ObjectId(req.body.champ);
           let newtheme = new themeSchema ({
               name : req.body.name,
               champ : champ,
               creator : creator
           });
           newtheme.save((err,theme) => {
               if(err){
                   reject(err);
               } else{
                   resolve(theme);

               }
           });

       })

    }

    getThemeById(themeId){
        themeId = (typeof themeId == string && themeId.length == 24) ? mongoose.Types.ObjectId(themeId): (themeId) => {return false;};
        return new Promise((resolve,reject) => {
            themeSchema.findOne({id:themeId}).populate({path:'champ'}).exec(function(err,theme){

                if(err){
                    reject({msg:"Error on retrival",err});
                }else{

                    resolve(theme);

                    //res.json(users);
                }
            });
        });

    }


}

module.exports = Theme;