const express = require("express");
const app = express();
const PORT = 8080; //default port 8000
app.set("view engine", "ejs"); //Set ejs as the view engine
app.use(express.urlencoded({ extended: true })); //translates the buffer sent in the body of post request

function generateRandomString() {
  let r = (Math.random() + 1).toString(36).substring(6);
  return r;
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res)=>{
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req,res)=>{ //adding a route for/urls and passing variables to the template
  const templateVars={urls:urlDatabase};
  res.render("urls_index",templateVars)
});

app.get("/urls/new", (req,res)=>{
res.render("urls_new");
});

app.get("/urls/:id", (req,res)=>{ //adding route handler for urls/:id to capture the shortebed URL as a parameter
  const templateVars={id:req.params.id, longURL:urlDatabase[req.params.id]};
  res.render("urls_show",templateVars)
});

app.post("/urls", (req, res) => {
  console.log(req.body.longURL); // Log the POST request body to the console
  console.log("short id: ", generateRandomString());
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

app.listen(PORT, ()=>{
  console.log(`Example app listening on port ${PORT}!`);
});