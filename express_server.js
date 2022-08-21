const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080; //default port 8000

app.set("view engine", "ejs"); //Set ejs as the view engine
app.use(express.urlencoded({ extended: true })); //translates the buffer sent in the body of post request
app.use(cookieParser());

function generateRandomString() { //generates random 6 charachter string
  let r = (Math.random() + 1).toString(36).substring(6);
  return r;
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => { //adding a route for/urls and passing variables to the template
  const templateVars = { urls: urlDatabase, username: req.cookies["username"] };
  res.render("urls_index", templateVars)
});

app.get("/urls/new", (req, res) => {
  const templateVars={username: req.cookies["username"]};
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => { //adding route handler for urls/:id to capture the shortebed URL as a parameter
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id], username: req.cookies["username"]};
  res.render("urls_show", templateVars)
});

app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id]; //saves the corresponding long URL in a variable
  res.redirect(longURL); //redirects the short form to the actual long URL
});

app.get("/register",(req,res)=>{
  const templateVars={username: req.cookies["username"]};
res.render("urls_newForm",templateVars)
});

app.post("/urls", (req, res) => {
  let id = generateRandomString();// generates random cahracters and saves it to the short ID
  urlDatabase[id] = req.body.longURL;
  res.redirect(`/urls/${id}`); //redirect to the urls/:id which initiates a get reuquest that renders the page of the url
});

app.post("/urls/:id/delete", (req, res)=>{// add route to delete urls and redirect to main page
  let idToDelete= req.params.id;
  delete urlDatabase[idToDelete];
  res.redirect("/urls");
});

app.post("/urls/:id/update", (req,res)=>{
let idTOUpdate = req.params.id;
urlDatabase[idTOUpdate]=req.body.longURL;
res.redirect("/urls");
});

app.post("/login",(req, res)=>{ //route to loging when user signs in
res.cookie("username",req.body.username); //assigns a name to the saved username cookie
res.redirect("/urls");
});

app.post("/logout", (req,res)=>{ //route to logout when user logs out
res.clearCookie("username");//clears the saved cookie
res.redirect("/urls")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});