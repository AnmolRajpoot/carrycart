const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose");


mongoose
    // .connect(`${config.get(MONGODB_URI)}/carrycart`)   // this is wrong because MONGODB_URI is a string and not a variable
    .connect(`${config.get("MONGODB_URI")}/carrycart`)
    // .connnect(config.get("MONGODB_URI")+"/carrycart")
    .then(function(){
        dbgr("db connected");
    })
    .catch(function(err){
        dbgr(err);
    })

module.exports=mongoose.connections;


















