// const k8s = require('@kubernetes/client-node');

// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

function create_jupyerlab_service(name : string, namespace : string = 'default') {
    const service = {
        "metadata": {
            "name": `${name}-svc`,
            "namespace": namespace,
        },
        "spec": {
            "ports": [
                {
                    "name": "port8888",
                    "port": 8888,
                    "protocol": "TCP",
                    "targetPort": 8888
                }
            ],
            "selector": {
                "app": name
            },
            "type": "ClusterIP"
        }
    }

    k8sApi.createNamespacedService(namespace, service);
}