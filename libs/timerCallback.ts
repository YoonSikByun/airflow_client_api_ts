// import { PsqlAgent } from "./pg";
// class TimerCallback {

//     static psqlPool : { [key: ]: PsqlAgent } = {};
//     static start(secs : number,
//         callbackFunc : (interval : any, params : any) => void,
//         param : any)
//     {
//         const interval = setInterval(() => { callbackFunc(interval, param) }, secs);
//         this.psqlPool[interval] = new PsqlAgent();
//     }
//     static end(interval : any) {clearInterval(interval); }
// }


// async function 