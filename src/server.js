"use strict";

const exprees = require("express");
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404.js');
const routes=require('./auth/routes/routes');
const avengersRouts=require('./auth/routes/todoRoute')
const cors=require('cors');
const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}
const app = exprees();
app.use(cors(corsOptions));
app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));
app.use(routes);
app.use(avengersRouts);
// routes
app.get("/", (req, res) => {
  res.send("Home");
});

// start port
const start = (port) => {
  app.listen(port, () => {
    console.log("Listening to port", port);
  });
};

// use middleware
app.use(notFound);
app.use(errorHandler);



// exporting

module.exports = {
  app: app,
  start: start,
};
