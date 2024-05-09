// const k8s = require('@kubernetes/client-node');
// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.AppsV1Api); // <-- notice the AppsV1Api


k8sApi.deleteNamespacedDeployment('jupyter-lab', 'default');