const prettyjson = require('prettyjson');
// import { Api } from "./airflow/api";

// const airflowApi = new Api();
// const username = 'admin';
// airflowApi.set_auth(username, username);

// // airflowApi.get_dag('aaa').then(data => console.log(prettyjson.render(data)));
// airflowApi.get_log('4c7af82c-c123-4efb-8568-cbd498ec7444', 'scheduled__2024-04-10T08:13:02.290416+00:00', 'c0a333ac-37fb-4b4d-8653-45ffdcdc72e8', '1').then(data => console.log(prettyjson.render(data)));
const temp = {limits : {}, requests : {}};
temp['limits']['cpu'] = 1;
temp['requests']['cpu'] = 1;
temp['limits']['memory'] = 1;
temp['requests']['memory'] = 1;

console.log(prettyjson.render(temp))