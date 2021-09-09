const http = require('http');
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const route = require("./route/route");
const connection = require('./database/connection');
const session = require('express-session');
const { MemoryStore } = require('express-session');

app.set('view engine','hbs');
app.use(express.urlencoded({extended:true}));
app.use('/public',express.static(path.join(__dirname,'public')));
hbs.registerPartials(__dirname + "/views/layouts");


app.use(
    session({
        secret:"Session",
        store : new MemoryStore(),
        resave : false,
        saveUninitialized : true,
        cookie : {maxAge:1000*60*60*3}
    })
);
app.use(function(request,response,next)
{
    response.locals.message = request.session.message;
    delete request.session.message;
    next();
});

app.use(route);

const port = 8000;
const server = http.createServer(app);
server.listen(port);
console.log(`Aplikasi Berjalan Di http://localhost:${port}`);