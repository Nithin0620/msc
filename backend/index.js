const express = require("express")
const app = express();
require("dotenv").config();
const cors = require("cors");

const anouncementApi = require("./routes/Anouncements.routes")

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use("/api/announcements",anouncementApi);


app.listen(PORT,()=>{
   console.log(`server started successfully and is running in Port-${PORT}`)
})