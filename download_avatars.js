var request = require('request');
var fs = require('fs');
var GITHUB_USER = "tahuana";
var GITHUB_TOKEN = "08e8cb7da8586800c80a4e22648500b94268d63b";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: { 'User-Agent': 'GitHub Avatar Downloader - Student Project' }
  };

  request(options, function(error, response, body) {
    var json = JSON.parse(body);
    cb(error, json);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         // console.log('Downloading images...');
       })
       .pipe(fs.createWriteStream(filePath))
}

getRepoContributors("jquery", "jquery", function(err, result) {
  for (var i = 0; i < result.length; i++) {
      url = result[i].avatar_url;
      filePath = "./avatars/" + result[i].login + ".jpg";
      downloadImageByURL(url, filePath);
  }
});