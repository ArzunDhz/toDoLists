//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-arjun:9869579607Aa1@cluster0.ldmnk.mongodb.net/todolistDB?retryWrites=true&w=majority" , {useNewUrlParser:true})

const itemsSchema = {
  name:String,
};

const Item = mongoose.model("Item" , itemsSchema);


const defaultItem1 = new Item ({
 name:"cook"
})

const defaultItem2 = new Item ({
  name:"eat"
 })
 

 const defaultItem3 = new Item ({
  name:"dance"
 })


 const defaultItems = [defaultItem1,defaultItem2,defaultItem3];


const listSchema = {

  name:String,
  items:[itemsSchema]
}

const List = mongoose.model("List" , listSchema)














/*


*/



app.get("/", function(req, res) {

const day = date.getDate();
Item.find({},function(e , out){
  console.log(out.length);

if( out.length === 10){
  Item.insertMany(defaultItems ,(err)=>{
    if(err){
      console.log(err);
    }else(
      console.log("inserted succesfully")
    )
  })
res.redirect("/");
}else{
  res.render("list", {listTitle: day, newListItems: out});
}

  })
  


});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const listName = req.body.list;
   const addedItems = new Item({
     name: item,
   })

  




   addedItems.save();
   res.redirect("/")

});



app.post("/delete", function(req, res){
const checkedItems =req.body.checkbox;
Item.findByIdAndRemove(checkedItems, (e)=>{
  if(e){
    console.log(e);
  }else{
    console.log("deleted");
    res.redirect("/")
  }
})
   })




/*

app.get("/:customListName" , (req,res)=>{
 const listName  = req.params.customListName;

 List.findOne({name: listName} , (err, foundlist)=>{
  if(!err){
    if(!foundlist){
      const list = new List({
        name: listName,
        items: defaultItems
     
      });
      list.save();
      res.redirect("/"+ listName)


    }else{

      res.render("list", {listTitle: foundlist.name, newListItems: foundlist.items});
    }
  }
 })




})



*/
app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port , function(){
  console.log("server is stared");
});