const express = require('express')
const app = express()
const axios = require("axios")
const PORT = process.env.PORT || 3030;

const apiKey = process.env.TRANSLINK_API_KEY; // Replace with your TransLink API key
const busStopNumber = '61890'; // Replace with your bus stop number
const url = `http://api.translink.ca/rttiapi/v1/stops/${busStopNumber}/estimates?apikey=${apiKey}&count=3&timeframe=120&routeNo=181`;

// middleware
app.use(express.json())




app.get('/', (req, res) => {
    axios.get(url, {
        headers: {
            'Accept': 'application/JSON'
        }
    })
    .then(response => {
        // Let's log the full data to inspect its structure first
        res.send(response.data[0].Schedules[0]);

    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


