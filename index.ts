const prettyjson = require('prettyjson');
// import { Api } from "./airflow/api";

// const airflowApi = new Api();
// const username = 'admin';
// airflowApi.set_auth(username, username);

// // airflowApi.get_dag('aaa').then(data => console.log(prettyjson.render(data)));
// airflowApi.get_log('4c7af82c-c123-4efb-8568-cbd498ec7444', 'scheduled__2024-04-10T08:13:02.290416+00:00', 'c0a333ac-37fb-4b4d-8653-45ffdcdc72e8', '1').then(data => console.log(prettyjson.render(data)));

import { Database } from "duckdb-async";

async function getRowCount(filepath : string) {
  const db = await Database.create(":memory:");
  const res = await db.all(`SELECT count(*) AS row_count FROM read_csv('${filepath}')`);

  console.log('Get rowcount ----------------');
  console.log(res);
  return res;
}

async function getColumnsInfo(filepath : string) {
  const db = await Database.create(":memory:");
  const res = await db.all(`DESCRIBE SELECT * FROM read_csv('${filepath}') LIMIT 1`);

  console.log('Get Column info ----------------');
  console.log(prettyjson.render(res));
  console.log(res.length)

  return res;
}

async function agGridGetRows(filepath : string, startRow : number, endRow : number) {
  if (startRow < 1) {
    await getRowCount(filepath);
    await getColumnsInfo(filepath);
  }

  const db = await Database.create(":memory:");
  const res = await db.all(`SELECT * FROM read_csv('${filepath}') LIMIT ${endRow-startRow} OFFSET ${startRow}`);

  console.log('Get data ----------------');
  console.log(prettyjson.render(res));

  return {
    success: true,
    rows: res,
    lastRow: 0,
  };
}

// agGridGetRows('/Users/yoonsikbyun/Documents/total_bank_data.csv', 500000, 500002);
agGridGetRows('/Users/yoonsikbyun/Documents/bank.csv', 0, 2);