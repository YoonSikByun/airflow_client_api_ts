const api_base_uri : string = 'http://localhost:5000/api/v1';
const username : string = 'admin';
const password : string = 'admin';
const prettyjson = require('prettyjson');

export function fetcher2() {

    const headers = new Headers();
    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Basic ' + btoa('admin:admin'));

    const init = {method: 'GET', headers: headers};
    return fetch('http://localhost:5000/api/v1/dags/tutorial', init).then((data) => data.json())
    .then((data) => { return {status : true, reason : 'success', data : data}; });
    // const res = fetch('http://localhost:5000/api/v1/dags/tutorial', init);
    // rtn['data'] = res.json();
    // console.log(rtn['data']);
    // return rtn['data'];
 }


export function fetcher(sub_path: string) {
    const call_api_url = api_base_uri + sub_path;
    console.log(`- call_api_url : ${call_api_url}`);
    const headers = new Headers();
    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Basic ' + btoa('admin:admin'));

    const init = {method: 'GET', headers: headers};
    const response : Object = {status: true, reason : 'success', data : null};

    return fetch(call_api_url, init)
        .then(data => data)
        .then(data => {
            if('status' in data && data['status'] != 200) {
                response['status'] = false;
                response['reason'] = data['detail'];
                return response;
            }

            response['data'] = data.json();
            return response;
        })
        .catch(erro => {
            response['status'] = false;
            response['reason'] = erro;
            return response;
        });
}

export async function get_dags() { return await fetcher('/dags'); }
export async function get_dag(dag_id) { return await fetcher(`/dags/${dag_id}`); }