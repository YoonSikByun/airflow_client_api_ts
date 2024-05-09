// const k8s = require('@kubernetes/client-node');
// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.AppsV1Api); // <-- notice the AppsV1Api

// Definition of the deployment
var amazingDeployment = {
    "metadata": {
        "labels": {
            "app": "jupyter-lab"
        },
        "name": "jupyter-lab",
        "namespace": "default",
    },
    "spec": {
        "replicas": 1,
        "selector": {
            "matchLabels": {
                "app": "jupyter-lab"
            }
        },
        "template": {
            "metadata": {
                "labels": {
                    "app": "jupyter-lab"
                }
            },
            "spec": {
                "containers": [
                    {
                        "args": [
                            "bash",
                            "-c",
                            "jupyter lab --port=8888 --no-browser --ip=0.0.0.0 --allow-root --LabApp.token=''"
                        ],
                        "image": "mlstudio/jupyterlab4.1.8:latest",
                        "imagePullPolicy": "IfNotPresent",
                        "name": "jupyter-lab",
                        "ports": [
                            {
                                "containerPort": 8888,
                                "name": "jupyter-lab",
                                "protocol": "TCP"
                            }
                        ],
                        "resources": {},
                        "volumeMounts": [
                            {
                                "mountPath": "/opt/mlstudio/config/mlstudio-confog.json",
                                "name": "config",
                                "readOnly": true,
                                "subPath": "mlstudio-confog.json"
                            },
                            {
                                "mountPath": "/opt/mlstudio/config/mlstudio-confog2.json",
                                "name": "config",
                                "readOnly": true,
                                "subPath": "mlstudio-confog2.json"
                            },
                            {
                                "mountPath": "/opt/mlstudio/piplines",
                                "name": "host-mount",
                                "readOnly": true,
                                "subPath": "mlstudio/pipelines"
                            },
                            {
                                "mountPath": "/opt/mlstudio/input",
                                "name": "host-mount",
                                "subPath": "mlstudio/pipelines/pipelienid/nodeid/input"
                            },
                            {
                                "mountPath": "/opt/mlstudio/output",
                                "name": "host-mount",
                                "subPath": "mlstudio/pipelines/pipelienid/nodeid/output"
                            },
                            {
                                "mountPath": "/opt/mlstudio/source",
                                "name": "host-mount",
                                "subPath": "mlstudio/pipelines/pipelienid/nodeid/source"
                            }
                        ],
                        "workingDir": "/home/mlstudio"
                    }
                ],
                "restartPolicy": "Always",
                "securityContext": {},
                "terminationGracePeriodSeconds": 10,
                "volumes": [
                    {
                        "configMap": {
                            "defaultMode": 420,
                            "name": "mlstudio-config"
                        },
                        "name": "config"
                    },
                    {
                        "name": "host-mount",
                        "persistentVolumeClaim": {
                            "claimName": "pvc-host"
                        }
                    }
                ]
            }
        }
    }
}

// Sending the request to the API
k8sApi.createNamespacedDeployment('default', amazingDeployment).then(
  (response) => {
    console.log('Yay! \nYou spawned: ' + amazingDeployment.metadata.name);
  },
  (err) => {
    console.log('Oh no. Something went wrong :(');
    // console.log(err) <-- Get the full output!
  }
);