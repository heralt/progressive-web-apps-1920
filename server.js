const express = require('express')
const app = express();
const port = 3000
const fetch = require('node-fetch');

app.use(express.static('static'));
app.set('views','views');
app.set('view engine', 'ejs');

app.get('/giphy', (req, res) =>
    fetch('https://api.giphy.com/v1/gifs/search?api_key=R5sfJ4gGXp0b4Fo9eIz8KGlIDW1Dnajj&q=studioghibli&limit=20&offset=0&rating=G&lang=en')
        .then(response => {
            return response.json();
        }).then(json => {
            //console.log(json.data[0].images)
            res.render('giphy',{
                data: json.data
            })
    })
        .catch(err => {
            console.error(err)
        })
)

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
)

app.get('/overview', (req, res) =>
    fetch('https://ghibliapi.herokuapp.com/films')
        .then(response => {
            return response.json();
        }).then(json => {
        console.log(json)
            res.render('overview',{
                data: json
            })
    })
        .catch( err => {
            console.error(err);
        })
);

const render = {
    overview: function () {

    },
    detail: function () {

    }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

