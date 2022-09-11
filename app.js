const express = require('express');
const app = express();
const auth = require('./routes/auth');

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.use('/auth', auth);

app.get('/', function (request, response){
    response.status(200).json({ error: false, message: 'JiraHub service is working'});
});


app.listen(process.env.PORT, function (err) {
    if (err) {
        console.log('Something wrong happened, while starting the service');
    } else {
        console.log('JiraHub service is running on port ' + process.env.PORT);
    }
})