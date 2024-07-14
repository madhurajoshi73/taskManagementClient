//database query temporary

import pool from './db.js'
const status={
  "pending": "pending",
  "active": "active",
  "complete": "complete",
}

export class dbService {
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
    deleteTask(id){
      return new Promise(function(resolve,reject){
        pool.query("DELETE from public.task where id = $1",[id],(error,result)=>{
            if(error){
              return reject(error)
            }else{
              return resolve(result)
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

    addTask(
        userid,
        title,
        description,
        date,
        priority
      ){
        return new Promise(function(resolve,reject){
          pool.query('insert into public.task(title,description,userid,status,created_time,priority) values($1,$2,$3,$4, $5,$6)',
          [title,description,userid,status.pending, date,priority], (err,res)=>{
            if(err){
              return reject(err)
            }else{
              return resolve(res)
            }
          })
        })
    }

    getTask(
      userid
    ){
      return new Promise(function(resolve,reject){
        pool.query('select * from public.task where userid=$1',
        [userid], (err,res)=>{
          if(err){
            return reject(err)
          }else{
            return resolve(res)
          }
        })
      })
   }

    editTask(
        id,
        title,
        description,
        upstatus,
        priority
      ){
        return new Promise(function(resolve,reject){
          pool.query('update public.task set title=$1, description=$2, status=$3, priority=$4 where id=$5',
          [title,description,upstatus, priority,id], (err,res)=>{
            if(err){

              return reject(err)
            }else{
              return resolve(res)
            }
          })
        })
    }
    getFilterTask(
        userid,
        filstatus,
        prio
      ){
        return new Promise(function(resolve,reject){
          let qu ="select * from public.task where userid=$1"
          let quarr =[userid]
          let num = "$2"
          if(filstatus!="all"){
            qu = qu + " and status=$2"
            num="$3"
            quarr.push(filstatus)
          }
          if(prio!="all"){
            qu = qu + " and priority="+num
            quarr.push(prio)
          }
          console.log(qu)
          pool.query(qu, quarr, (err,res)=>{
            if(err){
              return reject(err)
            }else{
              return resolve(res)
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