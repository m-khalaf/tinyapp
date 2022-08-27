function getUserByEmail(usersObject, email) {//returns user's object if it exists
  for (const user in usersObject) {
    if (usersObject[user].email === email) {
      return usersObject[user];
    }
  }
  return null;
};

function generateRandomString() {
  let r = (Math.random() + 1).toString(36).substring(6);
  return r;
};

function urlsForUser(id, URLs) {
  let userUrls = {};
  for (const url in URLs)
    if (id === URLs[url].userID) {
      userUrls[url] = URLs[url];
    };
  return userUrls;
};

module.exports = {
  getUserByEmail,
  generateRandomString,
  urlsForUser,
}