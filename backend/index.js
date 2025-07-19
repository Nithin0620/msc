const express = require("express")
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path")

const anouncementApi = require("./routes/Anouncements.routes")

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/announcements",anouncementApi);

app.use(express.static(path.join(__dirname, '../frontend/build')));



app.listen(PORT,()=>{
   console.log(`server started successfully and is running in Port-${PORT}`)
})

app.get("/" , (req,res)=>{
  res.send(`<h1> This is homepage, response from server hance the server is up and running <h1/>`)
})

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});