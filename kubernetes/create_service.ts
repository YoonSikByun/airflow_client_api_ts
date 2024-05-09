// const k8s = require('@kubernetes/client-node');

// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const service = {
    "metadata": {
        "labels": {
            "app": "jupyter-lab",
        },
        "name": "jupyter-lab-nodeport",
        "namespace": "default",
    },
    "spec": {
        "ports": [
            {
                "name": "airflow-ui",
                "nodePort": 30110,
                "port": 8888,
                "protocol": "TCP",
                "targetPort": 8888
            }
        ],
        "selector": {
            "app": "jupyter-lab",
        },
        "type": "NodePort"
    }
}

k8sApi.createNamespacedService('default', service);