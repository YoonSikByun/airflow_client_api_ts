const k8s = require('@kubernetes/client-node');

const namespace = 'default';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.NetworkingV1Api); // before 1.14 use extensions/v1beta1
const clientIdentifier = 'my-subdomain';

function create_jupterlab_ingress(name : string, namespace : string = 'default') {
    const ingress = {
        "apiVersion": "networking.k8s.io/v1",
        "kind": "Ingress",
        "metadata": {
            "annotations": {
                "nginx.ingress.kubernetes.io/proxy-body-size": "1000m"
            },
            "name": `${name}-ingress`,
            "namespace": namespace,
        },
        "spec": {
            "ingressClassName": "nginx",
            "rules": [
                {
                    "http": {
                        "paths": [
                            {
                                "backend": {
                                    "service": {
                                        "name": `${name}-svc`,
                                        "port": {
                                            "number": 8888
                                        }
                                    }
                                },
                                "path": `/${name}`,
                                "pathType": "ImplementationSpecific"
                            }
                        ]
                    }
                }
            ]
        }
    }

    try {
        const createIngressRes = k8sApi.createNamespacedIngress(namespace, ingress);
        console.log(createIngressRes.body);
    } catch (err) {
        console.error(err);
    }
}
