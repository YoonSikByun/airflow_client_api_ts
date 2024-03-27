import exp = require("constants");

const api_base_uri : string = 'http://localhost:5000/api/v1';
const username : string = 'admin';
const password : string = 'admin';
const prettyjson = require('prettyjson');

export function fetcher(sub_path: string, method : string) {
    const call_api_url = api_base_uri + sub_path;
    console.log(`- call_api_url : ${call_api_url}`);
    const headers = new Headers();
    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Basic ' + btoa('admin:admin'));

    const init = {method: method, headers: headers};
    const response : Object = { status: true, reason : 'success', data : null };
    let res_code : number = 200;
    let res : any = null;

    return fetch(call_api_url, init)
        .then(data => {
            if('status' in data) res_code = data['status'];
            return data.json();
        })
        .then(data => {
            if(res_code == 200) {
                response['data'] = data;
            } else {
                response['status'] = false;
                response['reason'] = data['detail'];
            }
            return response;
        })
        .catch(erro => {
            response['status'] = false;
            response['reason'] = erro;
            return response;
        });
}

export async function get_dags() { return await fetcher('/dags', 'GET'); }
export async function get_dag(dag_id) { return await fetcher(`/dags/${dag_id}`, 'GET'); }
export async function delete_dag(dag_id) { return await fetcher(`/dags/${dag_id}`, 'DELETE'); }
export async function get_dag_details(dag_id) { return await fetcher(`/dags/${dag_id}/details`, 'GET'); }
export async function get_tasks(dag_id) { return await fetcher(`/dags/${dag_id}/tasks`, 'GET'); }
export async function get_task(dag_id, task_id) { return await fetcher(`/dags/${dag_id}/tasks/${task_id}`, 'GET'); }
export async function get_dag_runs(dag_id) { return await fetcher(`/dags/${dag_id}/dagRuns`, 'GET'); }

//Trigger a new DAG run.
export async function post_dag_run(dag_id) { return await fetcher(`/dags/${dag_id}/dagRuns`, 'POST'); }
export async function get_dag_run(dag_id, dag_run_id) { return await fetcher(`/dags/${dag_id}/dagRuns/${dag_run_id}`, 'GET'); }
export async function delete_dag_run(dag_id, dag_run_id) { return await fetcher(`/dags/${dag_id}/dagRuns/${dag_run_id}`, 'DELETE'); }
export async function get_task_instances(dag_id, dag_run_id) { return await fetcher(`/dags/${dag_id}/dagRuns/${dag_run_id}/taskInstances`, 'GET'); }
export async function get_task_instance(dag_id, dag_run_id, task_id) { return await fetcher(`/dags/${dag_id}/dagRuns/${dag_run_id}/taskInstances/${task_id}`, 'GET'); }
