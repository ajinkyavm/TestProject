const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const usersSchema = mongoose.Schema({
     firstName :{
        type:String,
        required :true
     },
    userId:{
         type : Number,
         unique : true,
    },
     middleName : {
        type:String
     },
     lastName : {
         required : true,
         type:String
     },email : {
         required : true,
         unique : true,
         type:String
     },
     theme : {
         type : String
     },
    role : {
         type : Number,
         required : true
    },creator : {
        required : true,
        type:[{ type: mongoose.Schema.Types.ObjectId,ref: 'user' }]
    },
    createdDate : {
        type: Date, default: Date.now
    }
},{strict: true});
autoIncrement.initialize(mongoose.connection);
//usersSchema.plugin(autoIncrement.plugin, {model: 'user', field:'userId'});
/*usersSchema.methods.getuserName = function () {
    return {firstname: this.first_name,lastname:this.last_name};
}*/


//const Contact = module.exports = mongoose.model('Users',userSchema);
module.exports = mongoose.model('users',usersSchema);