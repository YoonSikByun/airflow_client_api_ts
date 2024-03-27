import { get_dags, get_dag } from "./airflow/api";
const prettyjson = require('prettyjson');

// get_dags().then(data => console.log(prettyjson.render(data)));
get_dag('tutoral').then(data => console.log(prettyjson.render(data)));

