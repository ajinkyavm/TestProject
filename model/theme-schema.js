/**
 * Created by Swami on 07/06/17.
 */
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const model = "themes";

const themeSchema = mongoose.Schema({
    name :{
        type:String,
        unique : true,
        required :true
    },
    themeId :{type:Number},
    champ: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    createdDate : {type: Date, default: Date.now},
    markers : [{ type: mongoose.Schema.Types.ObjectId, ref: 'markers',required:true}]
},{strict: true});


autoIncrement.initialize(mongoose.connection);
themeSchema.plugin(autoIncrement.plugin, {model: model, field:'themeId'});
//const Contact = module.exports = mongoose.model('Users',userSchema);
module.exports = mongoose.model(model,themeSchema);