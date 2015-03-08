var express = require('express');
var fs      = require('fs'); //access to computers file system
var request = require('request');
var cheerio = require('cheerio');
var path    = require('path');
var app     = express();


var outputFile = "maena.json";
var filePath   = path.join(__dirname, 'asdf.html');

app.get('/scrape', function(req, res) {
    main();  
    res.send("Complete!")
});

app.listen(8000)
console.log('Magic happens on port 8000');
exports = module.exports = app;

function deleteOldFile() {
    fs.exists("../"+outputFile, function(exists) {
        if (exists) {
            fs.unlink("../"+outputFile, function(err) {
                if (err) {
                    console.log('error deleting %s', outputFile);
                } else {
                    console.log('successfully deleted old file %s', outputFile);
                }
            });
        }
    });
}

function readHTML() {
    fs.readFile(filePath, 'utf-8', function(err, html) {
        if (err) {
            return console.log(err);
        }
        getHTML(html);
    });
}

function getHTML(html) {
    var $ = cheerio.load(html);

    jsonArray = [];

    $('.grein-grein-grein').each(function(index, data) {
        getData(data);
    });
    saveFile(jsonArray);
}

function getData(data) {
    var $       = cheerio.load(data);
    var title1  = $.html('.Heiti-greinar.para-style-override-1');
    var title2  = $.html('.Heiti-greinar:not(.para-style-override-3, .para-style-override-1)');
    var content = $.html('.greinatexti');
    var author  = $.html('.H-fundur');

    writeToJSON(title1, title2, content, author);
}

function writeToJSON(title1, title2, content, author) {
    jsonArray.push({
        title1 : title1,
        title2 : title2,
        content: content,
        author : author
    });
}

function saveFile() {
    fs.appendFile("../"+outputFile, JSON.stringify(jsonArray, null, 4), function(err) {
        console.log('File successfully written!');
    })
}

function main() {
    deleteOldFile();
    readHTML();
}
