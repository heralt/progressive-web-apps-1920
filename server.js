const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');

app.use(express.static('static'));
app.set('views','views');
app.set('view engine', 'ejs');

const giphy_key = "R5sfJ4gGXp0b4Fo9eIz8KGlIDW1Dnajj";

app.get('/giphy', (req, res) =>
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphy_key}&q=studioghibli&limit=20&offset=20&rating=G&lang=en`)
        .then(response => {
            return response.json();
        }).then(json => {
            res.render('giphy',{
                data: json.data
            })
    })
        .catch(err => {
            console.error(err)
        })
);

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

app.get('/overview', (req,res) => {
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


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

