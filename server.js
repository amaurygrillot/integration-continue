const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./dist/PokemonArena'));
app.get('/', function (req, res) {
  res.sendFile('index.html', {root : 'dist/PokemonArena'});
});
app.listen(process.env.PORT || 8081);
