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

function getUserByEmail(usersObject, email) {//returns user's object if it exists
  for (const user in usersObject) {
    if (usersObject[user].email === email) {
      return usersObject[user];
    }
  }
  return null;
}

const users = {};//empty object to store users information when they register

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW",
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "aJ48lW",
  },
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
  const templateVars = { urls: urlDatabase, user: users[req.cookies["user_id"]] };
  res.render("urls_index", templateVars)
});

app.get("/urls/new", (req, res) => {
  if (req.cookies["user_id"] === undefined) {//redirect user to login page before creating a new link
    res.redirect("/login");
  }
  const templateVars = { user: users[req.cookies["user_id"]] };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => { //adding route handler for urls/:id to capture the shortebed URL as a parameter
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id].longURL, user: users[req.cookies["user_id"]] };
  res.render("urls_show", templateVars)
});

app.get("/u/:id", (req, res) => {
  if (urlDatabase[req.params.id] === undefined) { //sends an error message if link does not exist
    res.send("Link does not exist, please try again");
  }
  const longURL = urlDatabase[req.params.id].longURL; //saves the corresponding long URL in a variable
  res.redirect(longURL); //redirects the short form to the actual long URL
});

app.get("/register", (req, res) => { //route to register new user 
  if (req.cookies["user_id"]) {//redirects user to main page if they are already logged in
    res.redirect("/urls");
  }
  const templateVars = { user: users[req.cookies["user_id"]] };
  res.render("urls_newForm", templateVars)
});

app.get("/login", (req, res) => {
  if (req.cookies["user_id"]) {//redirects user to main page if they are already logged in
    res.redirect("/urls");
  }
  const templateVars = { user: users[req.cookies["user_id"]] };
  res.render("urls_login", templateVars)
});

app.post("/urls", (req, res) => {
  if (req.cookies["user_id"] === undefined) { //prevents user from adding a new link till they sign in
    res.send("you are sneaky...log in first before creating a new link");
  }
  let id = generateRandomString();// generates random cahracters and saves it to the short ID
  urlDatabase[id] = {
    longURL: req.body.longURL,
    userID: req.cookies["user_id"]
  }
  res.redirect(`/urls/${id}`); //redirect to the urls/:id which initiates a get reuquest that renders the page of the url
});

app.post("/urls/:id/delete", (req, res) => {// add route to delete urls and redirect to main page
  let idToDelete = req.params.id;
  delete urlDatabase[idToDelete];
  res.redirect("/urls");
});

app.post("/urls/:id/update", (req, res) => {
  let idToUpdate = req.params.id;
  urlDatabase[idToUpdate].longURL = req.body.longURL;
  res.redirect("/urls");
});

app.post("/login", (req, res) => { //route to loging when user signs in
  if (getUserByEmail(users, req.body.email) === null) {
    res.status(403).send('user does not exist');//returns error if user doesnt exist
  } else if (getUserByEmail(users, req.body.email).password !== req.body.password) {
    res.status(403).send('wrong password');//returns error if password is wrong
  } else {
    res.cookie("user_id", getUserByEmail(users, req.body.email).id);//passes user id cookie
    res.redirect("/urls");
  }
});

app.post("/logout", (req, res) => { //route to logout when user logs out
  res.clearCookie("user_id");//clears the saved cookie
  res.redirect("/urls");
});

app.post("/register", (req, res) => { //route to add user info to blobal users object
  const userID = generateRandomString();
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (!userEmail || !userPassword) {//checks if either of email or passwords is empty
    res.status(400).send('invalid input');
  } else if (getUserByEmail(users, userEmail) !== null) {//checks if user already exists
    res.status(400).send('User already exists');
  }
  else {//if user does not exists saves the infor to the object
    users[userID] = { //saves user info in the user object
      id: userID,
      email: userEmail,
      password: userPassword
    };

    res.cookie("user_id", users[userID].id);//saves the user info as a cookie
    res.redirect("/urls");
  }

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});