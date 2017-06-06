var request = require('request');
var mkdirp = require('mkdirp');
var fs = require('fs');
require('dotenv').config();
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if ((typeof repoOwner === 'undefined') || (typeof repoName === 'undefined')) {
    error = "Error: The owner and name are required arguments.";
    cb(error);
  } else {
    var requestURL = 'https://'+ process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
    var options = {
      url: requestURL,
      headers: { 'User-Agent': 'GitHub Avatar Downloader - Student Project' }
    };
    request(options, function(error, response, body) {
      var json = JSON.parse(body);
      cb(error, json);
    });
  }
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function () { console.log('Avatar download complete.') });
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  if (err) {
    console.log(err);
  } else{
      mkdirp('avatars', function (err) {
        if (err) console.error(err)
        else {
          console.log('Starting download of ', result.length, 'avatars:');
          result.forEach( function(element) {
            url = element.avatar_url;
            filePath = "./avatars/" + element.login + ".jpg";
            downloadImageByURL(url, filePath);
          });
        }
      });
    }
});

