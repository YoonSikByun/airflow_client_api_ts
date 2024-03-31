// const prettyjson = require('prettyjson');
const fs = require('node:fs');

/*****************************************
  default_args
******************************************/
export type DagDefaultArgs = {
    owner: string;
    depends_on_past: string;
    email: string;
    email_on_failure: string;
    email_on_retry: string;
    retries: number;
    retry_delay: string;
};

export const dagDefaultArgs : DagDefaultArgs = {
    owner: '',
    depends_on_past: 'False',
    email: '[]',
    email_on_failure: 'False',
    email_on_retry: 'False',
    retries: 0,
    retry_delay: 'timedelta(minutes=5)',
};

/*****************************************
  DAG
******************************************/
export type DagInfo = {
    dag_id : string;
    default_args : string;
    description : string;
    schedule_interval : string;
    start_date: string;
    catchup: string;
    tags: string;
}

export const defaultDagInfo = {
    dag_id : '',
    default_args : 'default_args',
    description : '',
    schedule_interval : 'None',
    start_date:'None',
    catchup:'False',
    tags: '[]'
}

export function makeDagPythonfile(
    dag_folder : string,
    reactflow_savedata : {},
    default_args : DagDefaultArgs,
    dag_info : DagInfo)
{
    try {
        if(!fs.existsSync(dag_folder)) throw new Error(`dag folder("${dag_folder}") not found`);

        const task_name_map : {} = {};
        const reactflow_nodess : Object[] = reactflow_savedata['script']['nodes'];

        let operators : string = '';
        for(const index in reactflow_nodess) {
            const node = reactflow_nodess[index];
            if(node['type'] == 'Kind0') {
                const task_name = `${node['type']}_${index}`;
                task_name_map[node['id']] = task_name;
                operators = operators +
                `    ${task_name} = BashOperator(\n` +
                `        task_id='${node['id']}',\n` +
                `        depends_on_past=False,\n` +
                `        bash_command='sleep 3',\n` +
                `    )\n\n`
            }
        }

        const reactflow_edges : Object[] = reactflow_savedata['script']['edges'];
        let task_pipelines : string = '';

        for(const i in reactflow_edges) {
            const source = reactflow_edges[i]['source'];
            const target = reactflow_edges[i]['target'];

            task_pipelines = task_pipelines + `    ${task_name_map[source]} >> ${task_name_map[target]}\n`;
        }

        const dag_id = dag_info['dag_id'];
        const owner = default_args['owner'];

        if(dag_id == '') throw new Error('"dag id" is empty');
        if(owner == '') throw new Error(`dag's "owner" is empty`);

        const dag_py_template = 
        `from datetime import datetime, timedelta\n` +
        `from textwrap import dedent\n` +
        `from airflow import DAG\n` +
        `from airflow.operators.bash import BashOperator\n\n` +

        `# [START default_args]\n` +
        `default_args = {\n` +
        `    'owner': '${owner}',\n` +
        `    'depends_on_past': ${default_args['depends_on_past']},\n` +
        `    'email': ['${default_args['email']}'],\n` +
        `    'email_on_failure': ${default_args['email_on_failure']},\n` +
        `    'email_on_retry': ${default_args['email_on_retry']},\n` +
        `    'retries': ${default_args['retries']},\n` +
        `    'retry_delay': ${default_args['retry_delay']},\n` +
        `}\n` +
        `# [END default_args]\n\n` +

        `# [START instantiate_dag]\n` +
        `with DAG(\n` +
        `    '${dag_id}',\n` +
        `    default_args=default_args,\n` +
        `    description='${dag_info['description']}',\n` +
        `    schedule_interval=${dag_info['schedule_interval']},\n` +
        `    start_date=${dag_info['start_date']},\n` +
        `    catchup=${dag_info['catchup']},\n` +
        `    tags=${dag_info['tags']},\n` +
        `) as dag:\n` +
        `    # [END instantiate_dag]\n\n` +

        `    # [START tasks]\n` +
        `${operators}` +
        `    # [END tasks]\n\n` +

        `    # [START task pipe lines]\n` +
        `${task_pipelines}` +
        `    # [END task pipe lines]\n\n` +
        `# [END tutorial]\n`;

        const file_path = `${dag_folder}/${dag_id}.py`;
        console.log('dag path : ' + file_path);

        if (fs.existsSync(file_path)) {
            fs.unlinkSync(`file_path`);
        }

        fs.writeFileSync(file_path, dag_py_template);

    } catch (err) {
        return {status: false, reason: err.message};        
    }

    return {status : true, reason: 'success'};
}
