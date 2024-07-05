
async function fetcher(base_url : string, sub_path: string, method : string, data? : Object) {
    const call_url = base_url + sub_path;
    console.log(`- call_url : [${method}] ${call_url}`);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const init = {method: method, headers: headers,  body: JSON.stringify(data)};
    const response : any = { status: true, reason : 'success', data : null };
    let response_code : number = 200;

    return fetch(call_url, init)
        .then((data : any) => {
            if('status' in data) response_code = data['status'];
            if(response_code == 204)
                return null;
            return data.json();
        })
        .then(data => {
            if(response_code == 200) {
                response['data'] = data.data;
            } else if(response_code == 204) {
                return response;
            } else {
                response['status'] = false;
                response['reason'] = data.statusText;
            }
            return response;
        })
        .catch(erro => {
            response['status'] = false;
            response['reason'] = erro;
            return response;
        });
}

//Airflow WebServer API
export class BackendApi {
    private base_url : string = '';

    constructor() {
        const api_url = 'http://localhost:8881';
        this.set_base_url(api_url);
    }

    set_base_url(base_url : string) {
        this.base_url = base_url;
    }

    async testCompress() {
        const data = {};
        return await fetcher(
            this.base_url,
            '/data/test_compress',
            'POST',
            data);
    }
}
