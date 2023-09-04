import sql from 'mysql2';

// import StoredProcedureParameters from '../interfaces/storedProcedureParamter.interface';
import { DB_CONFIGS } from './database.config';
import { rejects } from 'assert';


export class Database {
  static configs: any;

  private mysqlConfig!: {
    host: string,
    user: string,
    password: string,
    database: string,
    connectionLimit: 10,
    waitForConnections: "true",
    queueLimit: 0,
    port: 3306
  }

  protected async setMySqlConfig(database: string) {
    return new Promise((resolve, _) => {
      this.mysqlConfig = {
        host: DB_CONFIGS[database].host,
        user: DB_CONFIGS[database].user,
        password: DB_CONFIGS[database].password,
        database: DB_CONFIGS[database].database,
        connectionLimit: 10,
        waitForConnections: "true",
        queueLimit: 0,
        port: 3306
      }

      resolve(this.mysqlConfig)
    })
  }

  protected executeQuery(query : string , callback : Function) {
    return new Promise((resolve , rejects)=>{
      const pool = sql.createPool({
        host : "localhost",
        user : "root",
        password : "Lucifer",
        database : "Complain" ,
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
        port: 3306
      }).query(query,callback)
    })
  }
 

}

export default Database;
