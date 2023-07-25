const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

punkAPI
    .getBeers()
    .then(beersArr => {
      console.log(beersArr)
      res.render('beers', {beersArr})
    })
    .catch(error => console.log(error)) 
})

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log('Random Beer: ', randomBeer)
      res.render('randomBeer', {randomBeer})
    })
})

app.get('/beers/:id', (req, res, next) => {
  console.log(req.params.id)
  const paramsBeerId = req.params.id;

  punkAPI
    .getBeer(paramsBeerId)
    .then(beer => {
      res.render('beer', {beer})
    })
})

app.listen(3005, () => console.log('🏃‍ on port 3005'));
