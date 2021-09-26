const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const app = express();

require('dotenv').config({ path: path.join(__dirname, '.env')})
const PORT = process.env.PORT   

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

// settings
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

// routes
const routesPath = path.join(__dirname, 'routes');

fs.readdir(routesPath, (err, files) => {
    if(err) throw new Error(err);
    files.forEach(route => {
        const routesPath = path.join(__dirname, 'routes', route);
        const Route= require(routesPath);
        if(Route.path && Route.router) app.use(Route.path, Route.router)
    })
})


// listen
app.listen(PORT, () => console.log("Server is running on *" + PORT));
