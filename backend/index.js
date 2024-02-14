const express = require("express");
const cors = require("cors");
const app = express();
const rootRouter = require("./routes/index");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);


app.listen(PORT, () => {
    console.log("Backend server started on PORT", PORT);
})