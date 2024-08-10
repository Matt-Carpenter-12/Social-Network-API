const express = require("express");
const userRoutes = require("./routes/apiUsers")
const app = express()

app.use(userRoutes)

app.listen(3000);
