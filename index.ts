import { get_dags, get_dag, get_dag_details, get_tasks, get_task, get_dag_runs, get_dag_run } from "./airflow/api";
const prettyjson = require('prettyjson');

// get_dags().then(data => console.log(prettyjson.render(data)));
// get_tasks('tutorial').then(data => console.log(prettyjson.render(data)));
// get_task('tutorial', 'print_date').then(data => console.log(prettyjson.render(data)));
// get_dag_runs('tutorial').then(data => console.log(prettyjson.render(data)));
get_dag_run('tutorial', 'some_test_run_4a9511089fd149438a5bec706666481f').then(data => console.log(prettyjson.render(data)));