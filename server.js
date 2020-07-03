// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var todos = ['Đi chợ',
          'Nấu cơm',
          'Rửa bát',
          'Học code tại CodersX'
         ];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (request, response) => {
  response.render('index', {
    todos: todos
  });
});

app.get("/todos/search", (request, response)=> {
  var q = request.query.q;
  var matched = todos.filter(function (todo) {
    return todo.toLowerCase().indexOf(q) !== -1; 
  });
  response.render('index', {
    todos: matched
  });
});

app.get("/todos/create", (req, res) => {
  res.render('create');
});

app.post("/todos/create", (req, res) => {
  todos.push(req.body.todo);
  res.redirect('/todos');
});


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
