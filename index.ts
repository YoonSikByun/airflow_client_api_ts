import { get_dags, get_dag, get_dag_details, get_tasks, get_task, get_dag_runs } from "./airflow/api";
const prettyjson = require('prettyjson');

// get_dags().then(data => console.log(prettyjson.render(data)));
// get_tasks('tutorial').then(data => console.log(prettyjson.render(data)));
// get_task('tutorial', 'print_date').then(data => console.log(prettyjson.render(data)));
get_dag_runs('tutorial').then(data => console.log(prettyjson.render(data)));
