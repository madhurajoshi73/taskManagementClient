//database query

import pool from '../dbconnection/db.js'


export class userRepository {
    adduser(email, username, password, role) {
      return new Promise(function(resolve,reject){
            pool.query("insert into public.usertable(email,name, password, role) values($1,$2,$3,$4)",
            [email,username,password,role], (err,res)=>{
              if(err){
                return reject(err)
              }else{
                return resolve(res)
              }
            }
          )
        })
    }
    getuser(email) {
      return new Promise(function(resolve,reject){
            pool.query("SELECT * from public.usertable where email = $1",[email], (err,res)=>{
              if(err){
                return reject(err)
              }else{
                return resolve(res)
              }
      })
    })
    }
    getuserbyid(id) {
        return new Promise(function(resolve,reject){
          pool.query("SELECT * from public.usertable where id = $1",[id],(error,result)=>{
              console.log(error)
              if(error){
                return reject(error)
              }else{
                return resolve(result)
              }
            })
          })
    }
    updateuserpass(id, password) {
        return new Promise(function(resolve,reject){
              pool.query("update public.usertable set password=$1 where id=$2",
              [password,id], (err,res)=>{
                if(err){
                  return reject(err)
                }else{
                  return resolve(res)
                }
              }
            )
          })
      }
}

