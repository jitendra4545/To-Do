

const mongoose=require('mongoose')


const TodoSchema=mongoose.Schema({
    Title:String,
    Desc:String,
    Status: {
        type: String,
        enum: ['To Do', 'Doing', 'Done'],
        default: 'To Do',
      },
},{
    versionKey:false,
    timestamps:true
})


const TodoModel=mongoose.model("todo",TodoSchema)


module.exports={
    TodoModel
}