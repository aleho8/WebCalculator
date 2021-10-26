const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const fs = require("fs");

let number = 0;

fs.access("number.txt", fs.constants.W_OK | fs.constants.R_OK, (err) => {
    if (!err) {
        fs.readFile("number.txt", (err, data) => {
            if (!err) {
                number = Number(data.toString());
                number = isNaN(number) ? 0 : number;
            }
        });
    }
});

app.use(express.json());
app.use(cors());

app.get("/number", (req, resp) => {
    resp.status(200);
    resp.send({
        number: number
    });
    console.log(`Sent number ${number} to ${req.ip}`);
});

app.post("/number", (req, resp) => {
    console.log("Got new number:", req.body);

    number = req.body.number === "" || isNaN(req.body.number) ? number : Number(req.body.number);
    console.log("Set number to: ", number);

    resp.status(200);
    resp.send();

    fs.writeFile("number.txt", number.toString(), (err) => {
        if (err) {
            console.log(err);
        }
    });
});

app.listen(port, () => {
    console.log("App listening on port: " + port);
});
