const { assert } = require('chai');
const { getUserByEmail,urlsForUser } = require('../helpers.js');

//database of test users
const testUsers = {
  ad4fh5: {
    id: "ad4fh5",
    email: "abc@gmail.com",
    password: "aaa"
  },
  artyfh5: {
    id: "artyfh5",
    email: "qwe@gmail.com",
    password: "qqq"
  },
  bre4s5: {
    id: "bre4s5",
    email: "zxc@gmail.com",
    password: "asd"
  }
};

//Database of test urls
const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "ad4fh5",
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "ad4fh5",
  },
  Kloy43:{
    longURL: "https://www.formula1.com",
    userID: "bre4s5",
  }
  
};

//testing getUserByEmail helper function
describe('getUserByEmail', function () {
  it('should return a user with valid email', function () {
    const user = getUserByEmail(testUsers, "abc@gmail.com")
    const expectedUserID = "ad4fh5";
    assert.strictEqual(user.id, expectedUserID);
  });

  it('should return null since user does not exist', function () {
    const user = getUserByEmail(testUsers, "abc123@gmail.com")
    const expectedUserID = null;
    assert.strictEqual(user, expectedUserID);
  });
});

//testing urlsForUSer helper function
describe('urlsForUser', function () {
  it('should return urls object that belongs to the user', function () {
    const userUrls = urlsForUser("ad4fh5", urlDatabase);
    const expectedUrls = {
      b6UTxQ: {
        longURL: "https://www.tsn.ca",
        userID: "ad4fh5",
      },
      i3BoGr: {
        longURL: "https://www.google.ca",
        userID: "ad4fh5",
      },
    };
    assert.deepEqual(userUrls, expectedUrls);
  });

  it('should return an empty object since there are no urls that belong to the user', function () {
    const userUrls = urlsForUser("aabce", urlDatabase);
    const expectedUrls = {};
    assert.deepEqual(userUrls, expectedUrls);
  });
});