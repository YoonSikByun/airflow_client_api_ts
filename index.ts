const prettyjson = require('prettyjson');

// import { Api, delete_file } from "./airflow/api";
// import { DagDefaultArgs, dagDefaultArgs, DagInfo, defaultDagInfo, makeDagPythonfile } from "./airflow/reactflow_to_airflow_dag";

// const dag_folder = '/Users/yoonsikbyun/Documents/minikube_mnt';
// const api : Api = new Api();
// api.get_dags().then(data => console.log(prettyjson.render(data)));
// api.delete_dag('tutorial').then(data => console.log(prettyjson.render(data)));
// api.post_dag_run('tutorial').then(data => console.log(prettyjson.render(data)));
// api.get_dag_details('tutorial').then(data => console.log(prettyjson.render(data)));
// api.get_tasks('tutorial').then(data => console.log(prettyjson.render(data)));

// api.is_dag_stop('tutorial').then(data => console.log(prettyjson.render(data)));
// api.delete_dag_run('tutorial', 'manual__2024-04-07T10:33:10.950749+00:00').then(data => console.log(prettyjson.render(data)));


// import { psqlQuery } from "./libs/pg";

// const query = `
// SELECT
// 	config AS congifuration
// FROM
// 	USER_CONFIGURATIONS
// 	CROSS JOIN jsonb_array_elements(DATA -> 'configurations') config
// WHERE (DATA ->> 'userid') = 'ihor@gmail.com'
// 	AND (config ->> 'name') = 'myconf';
// `;

// console.log('--------- start --------');
// psqlQuery(query);

// import { test_psql } from "./libs/pg";

// const query = `
// SELECT dag_id, task_id, state, duration, try_number, hostname FROM task_instance WHERE dag_id like 'tutorial%'
// `;

// test_psql(query).then(data => {
//     console.log('-------11111');
//     console.log(prettyjson.render(data.rows))
//     console.log('-------222222');
// });

// const fs = require('node:fs');

// const file_path = '';

// if (fs.existsSync(file_path)) {
//     fs.unlinkSync(file_path);
// }

// const glob = require("glob").sync;
// const path = require("path");
// const files = glob("/Users/yoonsikbyun/Documents/minikube_mnt/tutorial*.py");

// for (const index in files) {
//     const fp = files[index].toLowerCase();
//     console.log(path.basename(fp).split('.').slice(0, -1).join('.'));
// }

import { ExampleClass } from "./libs/deco";

const t = new ExampleClass();

// t.method();
t.testf();


// // Decorator function 
// function gfg(target, name, descriptor) {
//     var fn = descriptor.value;
//     // Checks if "descriptor.value"
//     // is a function or not
//     if (typeof fn == 'function') {
//         descriptor.value = function(...args) {
//             console.log(`parameters: ${args}`);
//             var result = fn.apply(this, args);
//             console.log(`addition: ${result}`);

//             return result;
//         }
//     }
//     return descriptor;
// }

// class geek {
//     @gfg
//     add(a, b) {
//         console.log('------- add')
//         return a + b;
//     }
// }

// var e = new geek(); 
// const result = e.add(100, 200);
// console.log(`----- result : ${result}`);
