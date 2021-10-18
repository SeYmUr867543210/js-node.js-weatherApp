const express = require("express");
const path = require("path");
const hbs = require("hbs");

const request = require("request");
let basicUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "HERE IS YOU API KEY";


let app = express();


const publicStaticDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicStaticDirPath));

//port
let port = process.env.PORT || 3000;
//routs
app.get("/", function (req, res) {
    res.render("index", {
        title: "Weather app"
    })
})
app.get("/weather", function (req, res) {
    const address = req.query.address;
    if (!address) {
        return res.send("vvedite nazvanie goroda...")
    }
    weatherData(address, function callback({ temperature, description, cityName }) {
        console.log(temperature,description,cityName)
        res.send({ temperature, description, cityName })
    });
})
app.get("*", function (req, res) {
    res.render("404",{title: "page not found"})
})

app.listen(port, function (req, res) {
    console.log(`server is running on port ${port}`);
});



function weatherData(address, callback) {
    const url = `${basicUrl}q=${address}&appid=${apiKey}`//encodeURI?nujen ili net?
    // console.log(url)

    request(url, function (err, data) {
        let parsedData = JSON.parse(data.body)

        callback({
            temperature: parsedData.main.temp,
            description: parsedData.weather[0].description,
            cityName: parsedData.name
        })
    });

}
//nijno sdelat tak chtob cherez formu (index.hbs) input.value letel na rout /weather a na servere lovil input.value index.hbs otrenderennyy fayl uje s dannymi