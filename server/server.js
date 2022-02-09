const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./src/routes");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/phincon", router);

app.listen(port, () => console.log(`You are Connected to ${port}!`));
