// import {Client} from 'pg';

// const client = new Client({
//     host: 'localhost',
//     port: 30000,
//     database: 'postgres',
//     user: 'postgres',
//     password: 'postgres',
// });

// export async function psqlQuery(query : string) {

//     try {
//         await client.connect();
//         const res = await client.query(query);
//         console.log(res)
//      } catch (err) {
//         console.error(err);
//      } finally {
//         await client.end();
//      }
// }

import {Pool} from 'pg';

const spql_conf = {
    host: 'localhost',
    port: 30000,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 
}

const pool = new Pool(spql_conf);


export class PsqlAgent {
    private client : any = null;
    async begin() {
        this.client = await pool.connect();
        this.client.query('BEGIN')
    }

    async query(query : string) {
        return await this.client.query(query);
    }

    async commit() {
        this.client.query('COMMIT');
    }

    async rollback() {
        await this.client.query('ROLLBACK');
    }

    async release() {
        this.client.release();
    }
}

export async function test_psql(query) {
    const pa = new PsqlAgent();
    let res = null;
    try {
        await pa.begin();
        res = await pa.query(query);
    } catch (e) {
        await pa.rollback();
    } finally {
        console.log('-------- start release -----------');
        await pa.release();
        console.log('-------- end release -----------');
    }

    return res;
}