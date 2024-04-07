// const api_base_uri : string = 'http://localhost:5000/api/v1';
const prettyjson = require('prettyjson');

function fetcher(base_url : string, sub_path: string, method : string, auth? : string, data? : Object) {
    const call_url = base_url + sub_path;
    console.log(`- call_url : [${method}] ${call_url}`);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if(auth)
        headers.append('Authorization', 'Basic ' + btoa(auth));

    const init = {method: method, headers: headers,  body: JSON.stringify(data)};
    const response : any = { status: true, reason : 'success', data : null };
    let response_code : number = 200;

    return fetch(call_url, init)
        .then(data => {
            if('status' in data) response_code = data['status'];
            if(response_code == 204)
                return null;
            return data.json();
        })
        .then(data => {
            if(response_code == 200) {
                response['data'] = data;
            } else if(response_code == 204) {
                return response;
            } else {
                response['status'] = false;
                response['reason'] = `[(${response_code}) ${data['title']}] : ${data['detail']}`;
            }
            return response;
        })
        .catch(erro => {
            response['status'] = false;
            response['reason'] = erro;
            return response;
        });
}

const fs = require('fs');

export function delete_file(path : string, filename : string) {
    try {
        fs.unlinkSync(`${path}/${filename}`);
    } catch (err : any) {
        return {status: false, reason: err.message};
    }

    return {status: true, reason: 'success'};
}

//Airflow WebServer API
export class Api {
    private auth : string = '';
    private base_url : string = '';

    constructor() {
        this.set_base_url('http://localhost:30100/api/v1');
        this.set_auth('admin', 'admin');
    }

    set_base_url(base_url : string) {
        this.base_url = base_url;
    }
    set_auth(username : string, password : string) {
        this.auth = username + ':' + password;
    }
    async get_import_errors() {
        return await fetcher(
            this.base_url,
            '/importErrors',
            'GET',
            this.auth);
    }
    async get_dags() {
        return await fetcher(
            this.base_url,
            '/dags',
            'GET',
            this.auth);
    }
    async get_dag(dag_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}`,
            'GET',
            this.auth);
    }
    async delete_dag(dag_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}`,
            'DELETE',
            this.auth);
    }
    async get_dag_details(dag_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/details`,
            'GET',
            this.auth);
    }
    async get_tasks(dag_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/tasks`,
            'GET',
            this.auth);
    }
    async get_task(dag_id : string, task_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/tasks/${task_id}`,
            'GET',
            this.auth);
    }
    async get_dag_runs(dag_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/dagRuns`,
            'GET',
            this.auth);
    }
    async clear_dag_run(dag_id : string, dag_run_id : string) {
        return await fetcher(this.base_url,
            `/dags/${dag_id}/dagRuns/${dag_run_id}/clear`,
            'POST',
            this.auth,
            {dry_run: true});
    }
    async post_dag_run(dag_id : string, data? : any) {
        if(!data) data = {};
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/dagRuns`,
            'POST',
            this.auth,
            data);
    } //Trigger a new DAG run.
    async get_dag_run(dag_id : string, dag_run_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/dagRuns/${dag_run_id}`,
            'GET',
            this.auth);
    }
    async delete_dag_run(dag_id : string, dag_run_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/dagRuns/${dag_run_id}`,
            'DELETE',
            this.auth);
    }
    async get_task_instances(dag_id : string, dag_run_id : string) {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/dagRuns/${dag_run_id}/taskInstances`,
            'GET',
            this.auth);
    }
    async get_task_instance(dag_id : string,
        dag_run_id : string,
        task_id : string)
    {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/dagRuns/${dag_run_id}/taskInstances/${task_id}`,
            'GET',
            this.auth);
    }
    async get_log(dag_id : string,
        dag_run_id : string,
        task_id : string,
        task_try_number : string)
    {
        return await fetcher(
            this.base_url,
            `/dags/${dag_id}/dagRuns/${dag_run_id}/taskInstances/${task_id}/logs/${task_try_number}`,
            'GET',
            this.auth);
    }

    /*************************************
      Customize
    **************************************/
    async is_dag_stop(dag_id : string) {
        //QUEUED = "queued"
        //RUNNING = "running"
        //SUCCESS = "success"
        //FAILED = "failed"
        const response = await this.get_dag_runs(dag_id);
        if(!response['reason']) return response;

            
        // There are two possible terminal states for the DAG Run:
        //     - success if all of the leaf nodes states are either success or skipped,
        //     - failed if any of the leaf nodes state is either failed or upstream_failed.
        // 'success', 'failed'가 아니면 아직 실행중인 dag다.

        const dag_runs = response['data']['dag_runs'];
        for(const index in dag_runs) {
            
            const state = dag_runs[index]['state'];
            if(state != 'success' && state != 'failed')
                return false;
        }

        return true;
    }
}
