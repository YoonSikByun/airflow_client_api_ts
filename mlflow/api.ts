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
        .then(res => Promise.all([res.status, res.statusText, res.json()]))
        .then(([status, statusText, jsonData]) => {
            response['status_code'] = status;
            if(status != 200) {
                response['status'] = false;
                response['reason'] = statusText;
                response['data'] = null;
                return response;
            }
            response['status'] = true;
            response['reason'] = statusText;
            response['data'] = jsonData;
            return response;
        })
        .catch(erro => {
            response['status'] = false;
            response['reason'] = erro;
            response['status_code'] = 500;
            response['data'] = null;
            return response;
        });
}

//Airflow WebServer API
export class Api {
    private auth : string = '';
    private ajax_api_base_url : string = '';
    private api_base_url : string = '';

    constructor(id : string, password : string) {
        this.set_ajax_base_url('http://localhost:30002/mlflow/ajax-api/2.0/mlflow');

        //REST API 에서 ajax-api 호출이 아닌 것들은 "--static-prefix=/mlflow" 옵션이 지원되지 않기 때문에
        //Node port를 사용하거나 pod dns로 접속해야된다.
        this.set_api_base_url('http://localhost:32050/api/2.0/mlflow');
        this.set_auth(id, password);
    }

    set_ajax_base_url(base_url : string) {
        this.ajax_api_base_url = base_url;
    }
    set_api_base_url(base_url : string) {
        this.api_base_url = base_url;
    }
    set_auth(username : string, password : string) {
        this.auth = username + ':' + password;
    }

    // get_user : 정상처리 예시
    // {
    //     status: true,
    //     reason: 'OK',
    //     data: {
    //       user: {
    //         experiment_permissions: [Array],
    //         id: 1,
    //         is_admin: true,
    //         registered_model_permissions: [Array],
    //         username: 'admin'
    //       }
    //     },
    //     status_code: 200
    //   }
    async get_user(username : string) {
        return await fetcher(
            this.api_base_url,
            `/users/get?username=${username}`,
            'GET',
            this.auth);
    }

    // create_user : 정상처리 예시
    // {
    //     status: true,
    //     reason: 'OK',
    //     data: {
    //       user: {
    //         experiment_permissions: [],
    //         id: 4,
    //         is_admin: false,
    //         registered_model_permissions: [],
    //         username: 'test3'
    //       }
    //     },
    //     status_code: 200
    //   }
    async create_user(username : string, password : string) {
        return await fetcher(this.api_base_url,
            `/users/create`,
            'POST',
            this.auth,
            {
                username: username,
                password: password
            }
        );
    }
    async delete_user(username : string) {
        return await fetcher(this.api_base_url,
            '/users/delete',
            'DELETE',
            this.auth,
            {
                username: username
            }
        );
    }
}
