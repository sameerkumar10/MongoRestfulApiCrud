const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to mongodb succesfully ");

}).catch((err)=>{
    console.log(err);

})

const student = new mongoose.Schema({
    name:String,
    workout:Boolean,
    height:Number
})

const Student = new mongoose.model("Student", student);
const adder = async ()=> {
  /*  const ss = new Student({
        name: "Sameer",
        workout:true,
        height:6
    })
    */
  /* const ss = await Student.create({
    name: "Sameer",
    workout:true,
    height:6
   });*/

  /* const ss = await Student.find();*/
    await ss.save();
}

adder();