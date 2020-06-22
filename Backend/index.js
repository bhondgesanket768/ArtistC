const express = require("express");
const listings = require("./routes/listings");
const users = require("./routes/users");
const auth = require("./routes/auth");
const messages = require("./routes/messages");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

mongoose.connect(config.get("MongoUri"), {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => console.log("mongodb connected successfully..."))
  .catch((ex) => console.log(ex));

app.use("/api/listings", listings);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/messages", messages);

const port = process.env.PORT || config.get("port");
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});
