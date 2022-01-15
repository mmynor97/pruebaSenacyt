const mariadb = require('mariadb');

const config ={
     host: 'localhost', 
     user:'root', 
     password: 'annuedi',
     database: 'pruebagob'
     
};

class DBConnector{
    dbconnector = mariadb.createPool(config);

    async query(param){
        var conn = await this.dbconnector.getConnection();
        var ret = null;

        await conn.query(param).then(
            data => {
                ret = data;
                conn.end();
               
            }
        ).catch(err=>{
            console.log(err);
            conn.end()
        });
        return ret;

        
    }

    async update(sQuery,param){
        var conn = await this.dbconnector.getConnection();
        var ret = null;

        await conn.query(sQuery,param).then(
            data => {
                ret = data;
                conn.end();
               
            }
        ).catch(err=>{
            console.log(err);
            conn.end()
        });
        return ret;

        
    }

    async add(sQuery,param){
        var conn = await this.dbconnector.getConnection();
        var ret = null;
        console.log(param)
        await conn.query(sQuery,param).then(
            data => {
                ret = data;
                conn.end();
               
            }
        ).catch(err=>{
            console.log(err);
            conn.end()
        });
        return ret;

        
    }

    async delete(sQuery,param){
        var conn = await this.dbconnector.getConnection();
        var ret = null;

        await conn.query(sQuery,param).then(
            data => {
                ret = data;
                conn.end();
               
            }
        ).catch(err=>{
            console.log(err);
            conn.end()
        });
        return ret;

        
    }
}


module.exports = new DBConnector();




