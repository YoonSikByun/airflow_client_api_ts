const prettyjson = require('prettyjson');

import { Api, delete_file } from "./airflow/api";
// import { DagDefaultArgs, dagDefaultArgs, DagInfo, defaultDagInfo, makeDagPythonfile } from "./airflow/reactflow_to_airflow_dag";

// const dag_folder = '/Users/yoonsikbyun/Documents/minikube_mnt';
const api : Api = new Api();
// api.get_dags().then(data => console.log(prettyjson.render(data)));
// api.delete_dag('tutorial').then(data => console.log(prettyjson.render(data)));
// api.post_dag_run('tutorial').then(data => console.log(prettyjson.render(data)));
// api.get_dag_details('tutorial').then(data => console.log(prettyjson.render(data)));
// api.get_tasks('tutorial').then(data => console.log(prettyjson.render(data)));

// api.is_dag_stop('tutorial').then(data => console.log(prettyjson.render(data)));
// api.delete_dag_run('tutorial', 'manual__2024-04-07T10:33:10.950749+00:00').then(data => console.log(prettyjson.render(data)));
api.get_import_errors().then(data => console.log(prettyjson.render(data)));
