
import { Api, delete_file } from "./airflow/api";
import { DagDefaultArgs, dagDefaultArgs, DagInfo, defaultDagInfo, makeDagPythonfile } from "./airflow/reactflow_to_airflow_dag";
const prettyjson = require('prettyjson');
const dag_folder = '/Users/yoonsikbyun/Documents/minikube_mnt';

// const api : Api = new Api('http://localhost:5000/api/v1', 'admin', 'admin');
// get_import_errors().then(data => console.log(prettyjson.render(data)));

// api.get_dags().then(data => console.log(prettyjson.render(data)));
// get_dags().then(data => console.log(prettyjson.render(data)));
// get_tasks('tutorial').then(data => console.log(prettyjson.render(data)));
// get_task('tutorial', 'print_date').then(data => console.log(prettyjson.render(data)));
// get_dag_runs('tutorial').then(data => console.log(prettyjson.render(data)));
// get_dag_run('tutorial', 'some_test_run_4a9511089fd149438a5bec706666481f').then(data => console.log(prettyjson.render(data)));
// post_dag_run('tutorial').then(data => console.log(prettyjson.render(data)));
// delete_dag_run('tutorial', 'manual__2024-03-28T08:48:57.668247+00:00').then(data => console.log(prettyjson.render(data)));

// const rtn = delete_file('E:/minikube_mnt', 'tutorial.py');
// console.log(prettyjson.render(rtn));

// if(rtn['status'])
//     delete_dag('tutorial').then(data => console.log(prettyjson.render(data)));

const test_data : {} =  {
    "script": {
        "nodes": [
            {
                "id": "1f19ce18-1dc9-4702-b737-08079cfc3bca",
                "type": "Kind0",
                "position": {
                    "x": -30,
                    "y": -45
                },
                "data": {
                    "width": 125,
                    "height": 50,
                    "nodeKind": "Kind0",
                    "icon": "Kind0",
                    "className": "select-none bg-nodedg-node-back m-1 shadow-md border-[1px] border-borderclr-light border-solid rounded-[8px]",
                    "parentId": "c0269306-8c26-496b-bd7f-7fcbdaf7fc0c"
                },
                "width": 132,
                "height": 57,
                "selected": false,
                "dragging": false,
                "positionAbsolute": {
                    "x": -30,
                    "y": -45
                }
            },
            {
                "id": "b69dbae7-1d77-4624-8e1a-cd8851d1885f",
                "type": "Kind0",
                "position": {
                    "x": 510,
                    "y": -45
                },
                "data": {
                    "width": 125,
                    "height": 50,
                    "nodeKind": "Kind0",
                    "icon": "Kind0",
                    "className": "select-none bg-nodedg-node-back m-1 shadow-md border-[1px] border-borderclr-light border-solid rounded-[8px]",
                    "parentId": "c0269306-8c26-496b-bd7f-7fcbdaf7fc0c"
                },
                "width": 132,
                "height": 57,
                "selected": false,
                "dragging": false,
                "positionAbsolute": {
                    "x": 510,
                    "y": -45
                }
            },
            {
                "id": "b8df31de-03cc-4a8b-a7a6-0b1e0133acb3",
                "type": "Kind0",
                "position": {
                    "x": -30,
                    "y": 105
                },
                "data": {
                    "width": 125,
                    "height": 50,
                    "nodeKind": "Kind0",
                    "icon": "Kind0",
                    "className": "select-none bg-nodedg-node-back m-1 shadow-md border-[1px] border-borderclr-light border-solid rounded-[8px]",
                    "parentId": "c0269306-8c26-496b-bd7f-7fcbdaf7fc0c"
                },
                "width": 132,
                "height": 57,
                "selected": false,
                "dragging": false,
                "positionAbsolute": {
                    "x": -30,
                    "y": 105
                }
            },
            {
                "id": "8512a750-9242-480f-925d-a4782512638d",
                "type": "Kind0",
                "position": {
                    "x": -270,
                    "y": 105
                },
                "data": {
                    "width": 125,
                    "height": 50,
                    "nodeKind": "Kind0",
                    "icon": "Kind0",
                    "className": "select-none bg-nodedg-node-back m-1 shadow-md border-[1px] border-borderclr-light border-solid rounded-[8px]",
                    "parentId": "c0269306-8c26-496b-bd7f-7fcbdaf7fc0c"
                },
                "width": 132,
                "height": 57,
                "positionAbsolute": {
                    "x": -270,
                    "y": 105
                },
                "selected": false,
                "dragging": false
            },
            {
                "id": "6f927b7a-8d62-4443-bcc0-bc852ab08556",
                "type": "Kind0",
                "position": {
                    "x": 600,
                    "y": 120
                },
                "data": {
                    "width": 125,
                    "height": 50,
                    "nodeKind": "Kind0",
                    "icon": "Kind0",
                    "className": "select-none bg-nodedg-node-back m-1 shadow-md border-[1px] border-borderclr-light border-solid rounded-[8px]",
                    "parentId": "c0269306-8c26-496b-bd7f-7fcbdaf7fc0c"
                },
                "width": 132,
                "height": 57,
                "positionAbsolute": {
                    "x": 600,
                    "y": 120
                },
                "selected": false,
                "dragging": false
            },
            {
                "id": "a7ba18ae-2d1b-4343-be6e-b10129f5258b",
                "type": "Kind0",
                "position": {
                    "x": 345,
                    "y": 240
                },
                "data": {
                    "width": 125,
                    "height": 50,
                    "nodeKind": "Kind0",
                    "icon": "Kind0",
                    "className": "select-none bg-nodedg-node-back m-1 shadow-md border-[1px] border-borderclr-light border-solid rounded-[8px]",
                    "parentId": "c0269306-8c26-496b-bd7f-7fcbdaf7fc0c"
                },
                "width": 132,
                "height": 57,
                "selected": false,
                "dragging": false,
                "positionAbsolute": {
                    "x": 345,
                    "y": 240
                }
            },
            {
                "id": "0f27c796-8fef-4a61-8285-14f20b24cf87",
                "type": "Kind0",
                "position": {
                    "x": 600,
                    "y": 240
                },
                "data": {
                    "width": 125,
                    "height": 50,
                    "nodeKind": "Kind0",
                    "icon": "Kind0",
                    "className": "select-none bg-nodedg-node-back m-1 shadow-md border-[1px] border-borderclr-light border-solid rounded-[8px]",
                    "parentId": "c0269306-8c26-496b-bd7f-7fcbdaf7fc0c"
                },
                "width": 132,
                "height": 57,
                "positionAbsolute": {
                    "x": 600,
                    "y": 240
                },
                "selected": false,
                "dragging": false
            }
        ],
        "edges": [
            {
                "source": "1f19ce18-1dc9-4702-b737-08079cfc3bca",
                "sourceHandle": "right",
                "target": "b69dbae7-1d77-4624-8e1a-cd8851d1885f",
                "targetHandle": "left",
                "id": "03dcf6fb-2b3f-4d14-9379-192e6b38c57d",
                "type": "custom-edge",
                "markerEnd": {
                    "type": "arrowclosed",
                    "width": 13,
                    "height": 13,
                    "color": "#009591"
                }
            },
            {
                "source": "1f19ce18-1dc9-4702-b737-08079cfc3bca",
                "sourceHandle": "right",
                "target": "a7ba18ae-2d1b-4343-be6e-b10129f5258b",
                "targetHandle": "left",
                "id": "27fee5e5-e751-4554-b1bb-112aad6c5ad8",
                "type": "custom-edge",
                "markerEnd": {
                    "type": "arrowclosed",
                    "width": 13,
                    "height": 13,
                    "color": "#009591"
                },
                "selected": false
            },
            {
                "source": "a7ba18ae-2d1b-4343-be6e-b10129f5258b",
                "sourceHandle": "right",
                "target": "0f27c796-8fef-4a61-8285-14f20b24cf87",
                "targetHandle": "left",
                "id": "73606835-e479-460c-b2a8-19249cd54e00",
                "type": "custom-edge",
                "markerEnd": {
                    "type": "arrowclosed",
                    "width": 13,
                    "height": 13,
                    "color": "#009591"
                }
            },
            {
                "source": "b8df31de-03cc-4a8b-a7a6-0b1e0133acb3",
                "sourceHandle": "right",
                "target": "b69dbae7-1d77-4624-8e1a-cd8851d1885f",
                "targetHandle": "left",
                "id": "658ae9e8-2f79-416e-83cb-25f4e95a4d9b",
                "type": "custom-edge",
                "markerEnd": {
                    "type": "arrowclosed",
                    "width": 13,
                    "height": 13,
                    "color": "#009591"
                }
            },
            {
                "source": "8512a750-9242-480f-925d-a4782512638d",
                "sourceHandle": "right",
                "target": "b8df31de-03cc-4a8b-a7a6-0b1e0133acb3",
                "targetHandle": "left",
                "id": "e04171f8-00ab-464d-bab6-c30625ea177a",
                "type": "custom-edge",
                "markerEnd": {
                    "type": "arrowclosed",
                    "width": 13,
                    "height": 13,
                    "color": "#009591"
                }
            },
            {
                "source": "a7ba18ae-2d1b-4343-be6e-b10129f5258b",
                "sourceHandle": "right",
                "target": "6f927b7a-8d62-4443-bcc0-bc852ab08556",
                "targetHandle": "left",
                "id": "4065ac0f-426e-40fb-aade-40ca1dda669b",
                "type": "custom-edge",
                "markerEnd": {
                    "type": "arrowclosed",
                    "width": 13,
                    "height": 13,
                    "color": "#009591"
                }
            }
        ],
        "viewport": {
            "x": 363.2823986965281,
            "y": 167.93884785128353,
            "zoom": 0.9984608402523547
        }
    },
    "setting": ""
}

const test_dagargs : DagDefaultArgs = {
    ...dagDefaultArgs,
    owner: 'admin'
}

const test_daginfo : DagInfo = {
    ...defaultDagInfo,
}

const rtn = makeDagPythonfile(dag_folder, test_data, test_dagargs, test_daginfo);
console.log(rtn);