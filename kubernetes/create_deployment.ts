// const k8s = require('@kubernetes/client-node');
// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.AppsV1Api); // <-- notice the AppsV1Api

function create_jupyerlab_deployment(
    name : string,
    pipelineId : string,
    nodeId : string,
    cpu : number,
    memory : number,
    namespace : string = 'default', 
) {
    const deployment = {
        "metadata": {
            "labels": {
                "app": name
            },
            "name": name,
            "namespace": namespace,
        },
        "spec": {
            "replicas": 1,
            "selector": {
                "matchLabels": {
                    "app": name
                }
            },
            "template": {
                "metadata": {
                    "labels": {
                        "app": name
                    }
                },
                "spec": {
                    "containers": [
                        {
                            "args": [
                                "bash",
                                "-c",
                                "jupyter lab --no-browser --ip=0.0.0.0 --allow-root"
                            ],
                            "env": [
                                {
                                    "name": "APP_HOME",
                                    "value": "/opt/mlstudio"
                                },
                                {
                                    "name": "APP_NAME",
                                    "value": name
                                },
                                {
                                    "name": "MEMORY_LIMI",
                                    "value": "1"
                                },
                                {
                                    "name": "CPU_LIMIT",
                                    "value": "1"
                                }
                            ],
                            "image": "mlstudio/jupyterlab4.1.8:latest",
                            "imagePullPolicy": "IfNotPresent",
                            "name": name,
                            "ports": [
                                {
                                    "containerPort": 8888,
                                    "name": name,
                                    "protocol": "TCP"
                                }
                            ],
                            "resources": {},
                            "volumeMounts": [
                                {
                                    "mountPath": "/home/mlstudio/.jupyter/jupyter_lab_config.py",
                                    "name": "jupyter-lab-config",
                                    "subPath": "jupyter_lab_config.py"
                                },
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
                                    "subPath": `mlstudio/pipelines/${pipelineId}/${nodeId}/input`
                                },
                                {
                                    "mountPath": "/opt/mlstudio/output",
                                    "name": "host-mount",
                                    "subPath": `mlstudio/pipelines/${pipelineId}/${nodeId}/output`
                                },
                                {
                                    "mountPath": "/opt/mlstudio/source",
                                    "name": "host-mount",
                                    "subPath": `mlstudio/pipelines/${pipelineId}/${nodeId}/source`
                                }
                            ],
                            "workingDir": "/opt/mlstudio/source"
                        }
                    ],
                    "restartPolicy": "Always",
                    "terminationGracePeriodSeconds": 10,
                    "volumes": [
                        {
                            "configMap": {
                                "defaultMode": 420,
                                "name": "jupyter-lab-config"
                            },
                            "name": "jupyter-lab-config"
                        },
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

    deployment['spec']['containers'][0]['resources']

    const temp = {limits : {}, requests : {}};

    if(cpu > 0) { 
        temp['requests']['cpu'] = cpu.toString();
        temp['limits']['cpu'] = cpu.toString();
    }

    if(memory > 0) {
        const mem_limit = `${memory * 1000}Mi`;
        temp['requests']['memory'] = mem_limit;
        temp['limits']['memory'] = mem_limit;
    }

    if(cpu || memory)
        deployment['spec']['containers'][0]['resources'] = temp;

    // Sending the request to the API
    k8sApi.createNamespacedDeployment(namespace, deployment).then(
    (response) => {
        console.log('Yay! \nYou spawned: ' + deployment.metadata.name);
    },
    (err) => {
        console.log('Oh no. Something went wrong :(');
        // console.log(err) <-- Get the full output!
    }
    );

}