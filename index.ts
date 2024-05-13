const prettyjson = require('prettyjson');
// import { Api } from "./airflow/api";

// const airflowApi = new Api();
// const username = 'admin';
// airflowApi.set_auth(username, username);

// // airflowApi.get_dag('aaa').then(data => console.log(prettyjson.render(data)));
// airflowApi.get_log('4c7af82c-c123-4efb-8568-cbd498ec7444', 'scheduled__2024-04-10T08:13:02.290416+00:00', 'c0a333ac-37fb-4b4d-8653-45ffdcdc72e8', '1').then(data => console.log(prettyjson.render(data)));
const testFolder = 'E:\\minikube_mnt\\mlstudio';

const fs = require('node:fs');
const path = require('path');

const walk = function(dir, done) {

  let results = [];

  fs.readdirSync(dir, function(err, list) {

    if (err) return done(err);

    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

const folder = {name: "", children : []};

function walkSync (dir, filelist = []) {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        const stat = fs.statSync(dirFile)
        console.log(dirFile);
        console.log(stat.isDirectory());

        try {
            filelist = walkSync(dirFile, filelist);
        }
        catch (err) {
            if (err.code === 'ENOTDIR' || err.code === 'EBUSY') filelist = [...filelist, dirFile];
            else throw err;
        }
    });
    return filelist;
}

console.log(walkSync(testFolder));