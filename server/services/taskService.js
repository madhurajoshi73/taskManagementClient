import express from 'express';
import { authenticateToken } from '../authentication/authenticateJWT.js'
import { taskRepository } from '../repository/taskRepo.js';
import { userRepository } from '../repository/userRepo.js';

const taskRoutes = express.Router()
const userRepo = new userRepository()
const taskRepo = new taskRepository()
//add task api
taskRoutes.post('/addtask', authenticateToken, async (req, res) => {
    userRepo.getuserbyid(req.user.id).then((user)=>{
      if (!user || user.rows.length==0) {
      return res.status(404).json({ error: 'Invalid access' });
      }
      taskRepo.addTask(req.user.id,req.body.title, req.body.text, req.body.date, req.body.priority).then((result)=>{
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
taskRoutes.delete('/delTask', authenticateToken, async (req, res) => {
    userRepo.getuserbyid(req.user.id).then((user)=>{
    if (!user || user.length==0) {
    return res.status(404).json({ error: 'Invalid access' });
    }
    taskRepo.deleteTask(req.body.id).then((result)=>{
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
taskRoutes.post('/getTask', authenticateToken, async (req, res) => {
  userRepo.getuserbyid(req.user.id).then((user)=>{
    if (!user || user.rows.length==0) {
    return res.status(404).json({ error: 'Invalid access' });
    }
    taskRepo.getTask(req.user.id).then((result)=>{
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
taskRoutes.post('/editTask', authenticateToken, async (req, res) => {
  userRepo.getuserbyid(req.user.id).then((user)=>{
    if (!user || user.length==0) {
    return res.status(404).json({ error: 'Invalid access' });
    }
    taskRepo.editTask(req.body.id,req.body.title, req.body.text, req.body.status, req.body.priority).then((result)=>{
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
taskRoutes.post('/getFilter', authenticateToken, async (req, res) => {
  userRepo.getuserbyid(req.user.id).then((user)=>{
    if (!user || user.length==0) {
    return res.status(404).json({ error: 'Invalid access' });
    }
    taskRepo.getFilterTask(req.user.id,req.body.status,req.body.priority).then((result)=>{
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

export { taskRoutes }
