const k8s = require('@kubernetes/client-node');

const namespace = 'default';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.NetworkingV1Api); // before 1.14 use extensions/v1beta1
const clientIdentifier = 'my-subdomain';

const main = async () => {
    const ingress = {
        "apiVersion": "networking.k8s.io/v1",
        "kind": "Ingress",
        "metadata": {
            "name": "jupyter-lab-ingress",
            "namespace": "default",
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
                                        "name": "jupyter-lab-svc",
                                        "port": {
                                            "number": 8888
                                        }
                                    }
                                },
                                "path": "/jupyter-lab",
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
};

main();