# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs.
It also allow users to delete and edit their own URLs.

Stretch parts were solved as well:
* using PUT and DELETE HTTP request with the help of method override.
* Tracking every visit to the short URLs showing the time stamp, visitor IDs and how many visits were done to those sites.

## Final Product
!["Main page showing urls in their short and long forms allowing user to edit and delete them"](https://github.com/m-khalaf/tinyapp/blob/master/docs/urls-page.png?raw=true)
!["edit page showing tracking all visits to the url "](https://github.com/m-khalaf/tinyapp/blob/master/docs/edit-page.png?raw=true)
!["Create new short form of the url"](https://github.com/m-khalaf/tinyapp/blob/master/docs/new-url.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcryptjs
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.