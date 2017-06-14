/**
 * Created by Swami on 14/06/17.
 */
/**
 * Created by Swami on 08/06/17.
 */
const mongoose = require('mongoose');
let endDate = new Date();
let startDate = new Date("2017-06-12 10:02:32.704");
endDate.setDate(endDate.getDate() + 90);

const goalsSchema = mongoose.Schema({
    title :{
        type:String,
        required :true
    },
    theme : [{ type: mongoose.Schema.Types.ObjectId, ref: 'theme' }],
    marker : [{ type: mongoose.Schema.Types.ObjectId, ref: 'marker' }],
    createdDate : {

        type: Date, default: Date.now
    },
    creator : {
        required:true,
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
    },
    startDate :{
        type: Date,
        default: Date.now
    },
    endDate : {
        type: Date,
        default : null

    },
    deadlineDate : {
        type: Date,
        required : true
    },
    updated : {
        type: Date,
        default: Date.now
    },
    highlights : {
        type : [mongoose.Schema.Types.Mixed]

    },
    status : {
        type : Number,
        default : 0
    },freeze : {
        type : Boolean,
        default : false
    },
    annualTarget : {
        type : Boolean,
        default:false
    }
});

//const Contact = module.exports = mongoose.model('Users',userSchema);
let [generalGoalsSchema , annualGoalsSchema]= [mongoose.model('goals',goalsSchema),mongoose.model('annualGoals',goalsSchema) ];
module.exports = {generalGoalsSchema,annualGoalsSchema};
