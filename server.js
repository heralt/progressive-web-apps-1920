require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;
const giphy_key = process.env.API_KEY;

app.use((req, res, next) => {
    if(req.is('html')){
        res.header('Cache-Control', 'max-age='+ 365 * 24 * 60 * 60);
    }
    next();
});

//random comment
app.use(express.static('static'));
app.set('views','views');
app.set('view engine', 'ejs');

app.get('/movie-id/:id', (req, res) =>
fetch('https://ghibliapi.herokuapp.com/films/' + req.params.id)
    .then(response => {
        return response.json();
    }).then(json => {
    res.render('detail',{
        data: json
    })
})
    .catch( err => {
        console.error(err);
    })
);

app.get('/', (req,res) => {
    let giphy = fetch('https://ghibliapi.herokuapp.com/films');
    let ghibli = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphy_key}&q=studioghibli&limit=20&offset=0&rating=G&lang=en`);
    Promise.all([ghibli,giphy])
        .then( promises => {
            return Promise.all(promises.map( value => value.json()));
    })
        .then( values => {
        res.render('overview',{
            gifs: values[0].data,
            gibli: values[1]
        });
    })
        .catch( err =>
        console.error(err)
        )

});

app.get('/offline', (req, res) => {
        res.render('offline')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));