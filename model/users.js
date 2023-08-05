const {model,Schema}=require('mongoose')

const User= new Schema({
    username:{type: String,uniqne:true,required: true},
    password:{type: String,required: true},
    nodes:[]
})
module.exports = model('User', User)