const prettyjson = require('prettyjson');

import { Api } from "./mlflow/api";

const api = new Api('admin', 'admin');

api.get_user('admin').then((res) => console.log(prettyjson.render(res)));
// api.get_user('test1').then((res) => console.log(res));
// api.create_user('test3', 'test3').then((res) => console.log(res));
// api.delete_user('test3').then((res) => console.log(res));