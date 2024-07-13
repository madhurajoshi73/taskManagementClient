import express from 'express';
import * as bcrypt from 'bcrypt';
import { dbService } from './dbservice.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const dbservice = new dbService() 

//localhost cors error
const corsOps = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
    credentials: true,
  }

app.use(express.json());
app.use(cors(corsOps));

//test
app.get('/', (req, res) => {
    res.send('Hello World');  
});
// JWT auth token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Authentication failed' });
  
    jwt.verify(token, "secret", (err, user) => {
      if (err) return res.status(403).json({ error: 'Token is not valid' });
      req.user = user;
      next();
    });
}

//register user api
app.post('/register',  (req, res) => {
        const { email, username, password, role } = req.body;
         dbservice.getuser(email).then(async (user)=>{
            if(user && user.length>0){
              res.status(500).json({ error: 'user name exist' });
            }
            else{
              const hashedPassword = await bcrypt.hash(password, 10);
              dbservice.adduser(email,username, hashedPassword, role).then((result=>{
                res.status(201).json({ message: 'User registered successfully' });
              })).catch((err)=>{
                console.log(err)
                res.status(500).json({ error: 'Registration Error' });
              })
            }
        }).catch((err)=>{
          console.log(err)
          res.status(500).json({ error: 'Registration failed' });
        }) 
});

//login api
app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        dbservice.getuser(username).then((user)=>
        {
        if(!user || user.rows?.length==0){
            res.status(500).json({ error: 'user not found' });
        }
        else{
            user = user.rows[0]
            const passwordMatch = bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
              }
              const token = jwt.sign({id: user.id, name: user.name, role: user.role}, 'secret');
              return res.send({token});
        }
        }).catch((error) =>{
            console.log(error)
            res.status(500).json({ error: 'login failed' });
        })
});

//add task api
app.post('/addtask', authenticateToken, async (req, res) => {
      dbservice.getuserbyid(req.user.id).then((user)=>{
        if (!user || user.rows.length==0) {
        return res.status(404).json({ error: 'Invalid access' });
        }
        dbservice.addTask(req.user.id,req.body.title, req.body.text, req.body.date, req.body.priority).then((result)=>{
        if(result && result.rowCount){
            res.status(200).json({ message: 'Task registered successfully' });
        }
      }
        ).catch((err)=>{
            console.log(err)
            res.status(500).json({ error: 'Internal server error' });
        })
        }).catch((error)=>{
        console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    })
});

//delete task api
app.delete('/delTask', authenticateToken, async (req, res) => {
  dbservice.getuserbyid(req.user.id).then((user)=>{
    if (!user || user.length==0) {
    return res.status(404).json({ error: 'Invalid access' });
    }
    dbservice.deleteTask(req.body.id).then((result)=>{
    if(result && result.rowCount){
        res.status(200).json({ message: 'Task deleted successfully' });
    }
  }
    ).catch((err)=>{
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    })
    }).catch((error)=>{
    console.log(error)
  res.status(500).json({ error: 'Internal server error' });
})
});

//get task api
app.post('/getTask', authenticateToken, async (req, res) => {
    dbservice.getuserbyid(req.user.id).then((user)=>{
      console.log(user)
      if (!user || user.rows.length==0) {
      return res.status(404).json({ error: 'Invalid access' });
      }
      dbservice.getTask(req.user.id).then((result)=>{
      if(result){
          res.send(result.rows);
      }
    }
      ).catch((err)=>{
          res.status(500).json({ error: 'Internal server error' });
      })
      }).catch((error)=>{
    res.status(500).json({ error: 'Internal server error' });
  })
});

//edit task api
app.post('/editTask', authenticateToken, async (req, res) => {
    dbservice.getuserbyid(req.user.id).then((user)=>{
      if (!user || user.length==0) {
      return res.status(404).json({ error: 'Invalid access' });
      }
      dbservice.editTask(req.body.id,req.body.title, req.body.text, req.body.status, req.body.priority).then((result)=>{
      if(result && result.rowCount){
          res.status(200).json({ message: 'Task updated successfully' });
      }
    }
      ).catch((err)=>{
          console.log(err)
          res.status(500).json({ error: 'Internal error' });
      })
      }).catch((error)=>{
      console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  })
});

//task filter by status
app.post('/getFilter', authenticateToken, async (req, res) => {
    dbservice.getuserbyid(req.user.id).then((user)=>{
      if (!user || user.length==0) {
      return res.status(404).json({ error: 'Invalid access' });
      }
      dbservice.getFilterTask(req.user.id,req.body.status,req.body.priority).then((result)=>{
      if(result){
          res.send(result.rows);
      }
    }
      ).catch((err)=>{
          res.status(500).json({ error: 'Internal server error' });
      })
      }).catch((error)=>{
    res.status(500).json({ error: 'Internal server error' });
  })
});

//reset password api
app.post('/reset',authenticateToken,async  (req, res) => {
   dbservice.getuserbyid(req.user.id).then(async (user)=>{
      if(user && user.length>0){
        res.status(500).json({ error: 'user name exist' });
      }
      else{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        dbservice.updateuserpass(user.id, hashedPassword).then((result=>{
          res.status(201).json({ message: 'User registered successfully' });
        })).catch((err)=>{
          console.log(err)
          res.status(500).json({ error: 'Registration Error' });
        })
      }
  }).catch((err)=>{
    console.log(err)
    res.status(500).json({ error: 'Registration failed' });
  }) 
});

//get user api
app.get('/getUser', authenticateToken, async (req, res) => {
  dbservice.getuserbyid(req.user.id).then((user)=>{
    if (!user || user.rows.length==0) {
    return res.status(404).json({ error: 'Invalid access' });
    }
    return res.send({user: user.rows[0]});
  }).catch((error)=>{
  res.status(500).json({ error: 'Internal server error' });
})
});
//server on 3000 port
app.listen(3000, () => {
    console.log(`Server listening on port ${3000}`);  
});