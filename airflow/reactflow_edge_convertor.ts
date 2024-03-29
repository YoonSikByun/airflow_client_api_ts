const test_data = [
    {
        "source": "59821bae-326b-4207-89bf-f2264349cd95",
        "sourceHandle": "right",
        "target": "d6e9e50d-c745-4e72-bad5-9c2f79e1cb03",
        "targetHandle": "left",
        "id": "4c9c8c85-f9e5-419f-b9f3-49428b1d9d06",
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
        "source": "59821bae-326b-4207-89bf-f2264349cd95",
        "sourceHandle": "right",
        "target": "cba2ebed-512a-483d-9016-bc4206744113",
        "targetHandle": "left",
        "id": "f62be0da-3e69-416d-8003-20c7620826cb",
        "type": "custom-edge",
        "markerEnd": {
            "type": "arrowclosed",
            "width": 13,
            "height": 13,
            "color": "#009591"
        }
    },
    {
        "source": "c4183cf3-831a-4e4f-baf8-5a500f3489b5",
        "sourceHandle": "right",
        "target": "cba2ebed-512a-483d-9016-bc4206744113",
        "targetHandle": "left",
        "id": "0656bf83-626b-4de4-9b88-c7e95daa764a",
        "type": "custom-edge",
        "markerEnd": {
            "type": "arrowclosed",
            "width": 13,
            "height": 13,
            "color": "#009591"
        }
    },
    {
        "source": "d6e9e50d-c745-4e72-bad5-9c2f79e1cb03",
        "sourceHandle": "right",
        "target": "f03274ea-9d03-457b-8443-41c94e077c74",
        "targetHandle": "left",
        "id": "447c713e-d092-4b7d-8a74-ab17a6bf624c",
        "type": "custom-edge",
        "markerEnd": {
            "type": "arrowclosed",
            "width": 13,
            "height": 13,
            "color": "#009591"
        }
    }
];

export function reactflowEdgeConvertor(edges : []) {
    const start_nodes: { [id: string] : any } = {};
    let head;

    //첫 시작 노드를 찾는다.
    for(let i = 0; i < edges.length; i++) {

        const e = edges[i];
        head = true;

        for(let j = 0; j < edges.length; j++) {
            if(e['source'] == edges[j]['target']) {
                head = false;
                break;
            }
        }

        if(!head) continue;

        for(const key in start_nodes) {
            const item = start_nodes[key];

            if( typeof item == 'string') {
                if(item == e['target']) {
                    start_nodes[key] = [item, e['']]
                }
            }

        }

        start_nodes[e['source']] = e['target'];



    }
}