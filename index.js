import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app=express();
const port=3000;
const api="https://api.adviceslip.com/advice";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
      res.render("index.ejs");
});

app.get("/advice", async (req, res) => {
    try {
        const response = await axios.get(api);
        const result = response.data;
  
        res.render("advice.ejs", {
            slip: {
                advice: result.slip.advice
            }
        });
    } catch (err) {
        res.status(500).send('An error occurred while fetching advice.');
        console.error(err);
    }
  });



app.listen(port,()=>{
    console.log(`server running on ${port}`);
});


