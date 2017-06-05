var request = require('request');
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

getRepoContributors("jquery", "jquery", function(err, result) {
  for (var i = 0; i < result.length; i++) {
      console.log(result[i].avatar_url);
  }
});