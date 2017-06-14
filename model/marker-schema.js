/**
 * Created by Swami on 13/06/17.
 */
const mongoose = require('mongoose');
const markerSchema = mongoose.Schema({

    name : {
        type: String,
        required: true,
    },
    commited :{
        type:mongoose.Schema.Types.Mixed,
    },
    target :{
        type : mongoose.Schema.Types.Mixed,
    },
    actual : {
        type: mongoose.Schema.Types.Mixed
    },
    markerType : {
        type : Number,
        required : true
    },
    commitEnabled : {
        type : Boolean,
        default: true
    },
    targetEnabled : {
        type : Boolean,
        default: true
    },
    createdDate : {
        type: Date, default: Date.now
    },
    deadlineDate : {
        type: Date,
    },
    theme : [{ type: mongoose.Schema.Types.ObjectId, ref: 'theme' }],
});

[refMarkerSchema ,themeMarkerSchema] = [mongoose.model('refrenceMarkers',markerSchema),mongoose.model('markers',markerSchema)]
module.exports = {refMarkerSchema ,themeMarkerSchema} ;
