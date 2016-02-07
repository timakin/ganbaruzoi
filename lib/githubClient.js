var configPath      = path.join(__dirname, '../', 'config.json');
var currentJsonPath = path.join(__dirname, '../', 'current.json');
var jsonfile        = require('jsonfile');
var config          = jsonfile.readFileSync(configPath);
var currentJson     = jsonfile.readFileSync(currentJsonPath);
var github          = require('octonode');
var client          = github.client({
  username: config.github.userInfo.name,
  password: config.github.userInfo.password
});
var ghrepo     = client.repo(config.github.reportRepository);
module.exports = {
    pushDailyReport: function(reportName, content, cb) {
        ghrepo.createContents('daily/' + reportName, reportName + 'is uploaded.', content, cb());
    }
};
