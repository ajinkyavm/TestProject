/**
 * Created by Swami on 13/06/17.
 */
const UserSchema = require('../model/user-schema');
const mongoose = require('mongoose');

class User {

    constructor(){

    }

    setUser(req){
        return new Promise((resolve,reject) => {
            let creator = mongoose.Types.ObjectId(req.body.creator);
            let _newUser = new UserSchema ({
                firstName : req.body.first_name,
                lastName : req.body.last_name,
                email : req.body.email,
                theme: req.body.theme,
                role: req.body.role,
                creator : creator
            });

            _newUser.save((err,user)=> {
                if(err){

                    reject(err);
                } else{

                    resolve(user);

                }

            });
        });
    }

    getAlluser(){
        return new Promise((resolve,reject) => {

            UserSchema.find(function(err,users){
                if(err){

                    reject(err);
                }else{
                    resolve(users);
                    //res.json(users);
                }

            });


        });


    }

}

module.exports = User;