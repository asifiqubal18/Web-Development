//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => console.log("Database connected!"))
  .catch(err => console.log(err));;

const itemSchema = {
  name: String
};

const listSchema = {
  name: String,
  lists: itemSchema,
}
const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "work",
});
const item2 = new Item({
  name: "fun",
});
const item3 = new Item({
  name: "done",
});
const arrayItems = [item1, item2, item3];





app.get("/", function (req, res) {



  Item.find({}, function (err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(arrayItems, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Succesfully saved default items to db");
        }
      })
      res.redirect("/");
    }
    else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }

  })



});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  })
  item.save();

  res.redirect('/');


});
app.post("/delete", function (req, res) {


  const checktrue = req.body.checkbox;
  Item.findByIdAndRemove(checktrue, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Succesfully deleted the item");
    }
  })
  res.redirect('/');


});

app.get("/:customRoute", function (req, res) {
  const temp = req.params.customRoute;

  List.findOne("name:temp", function (err, listFound) {

    if (!err) {
      if (!listFound) {
        // create list
        const list = new List({
          name: temp,
          items: arrayItems,
        });
        list.save();

      }
      else {
        // render list
        res.render("list", { listTitle: foundItems.name, newListItems: foundItems.items });
      }
    }
  })



});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
