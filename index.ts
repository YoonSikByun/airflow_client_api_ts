
import { Api, delete_file } from "./airflow/api";
import { DagDefaultArgs, dagDefaultArgs, DagInfo, defaultDagInfo, makeDagPythonfile } from "./airflow/reactflow_to_airflow_dag";
const prettyjson = require('prettyjson');
const dag_folder = '/Users/yoonsikbyun/Documents/minikube_mnt';

const api : Api = new Api('http://localhost:5000/api/v1', 'admin', 'admin');

// api.get_dags().then(data => console.log(prettyjson.render(data)));
// api.get_import_errors().then(data => console.log(prettyjson.render(data)));
// api.delete_dag('4c7af82c-c123-4efb-8568-cbd498ec7444').then(data => console.log(prettyjson.render(data)));

let date = new Date();

console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDay());