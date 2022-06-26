const express = require("express");
const port = process.env.PORT || 6000;
const Router = require("./router");
const app = express();
var cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(Router);
// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
