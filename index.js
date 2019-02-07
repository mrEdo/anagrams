
const express = require('express');

const app = express();

let port = process.env.PORT || 3001;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact', function(req, res){
    res.send('Welcome to the Nodemon <i>Contact Page</i>');
});

app.get('/about', function(req, res){
    res.sendFile(__dirname + '/pages/about.html');
});

app.get('/students/:social', function(req, res){
    res.send('Your Student has a Social Security Number of: ' + req.params.social + '</i>');
});

app.get('/anagrams/:word',makeAnagrams, makelowerCase, checkRepeats);

function makeAnagrams(req,res,next){
    function anagrams(word, qt){
        var newAnagramArray = [];
        for(var i = 0; i < qt; i++){
            newAnagramArray.push(word);
        }
    
        newAnagramArray = newAnagramArray.map(function(w){
            var originalWord = w.split('');
            var oldWord = w.split('');
            var newWord = [];
            newWord = originalWord.map(function(l){
                return oldWord.splice(Math.floor(Math.random() * oldWord.length),1)[0];
            });
            return newWord.join('');
        });
    
        return newAnagramArray;
    }
    res.locals.createdAnagrams = anagrams(req.params.word, 6);
    next();
}
function makelowerCase(req,res,next){
    res.locals.lowerCaseWords = res.locals.createdAnagrams.map( word => word.toLowerCase() );
    next();
}
function checkRepeats(req,res,next){
    res.send("We will check for repeats in a minute but here are your angrams: " + String( res.locals.lowerCaseWords ));
    res.end();
}

app.listen(port);