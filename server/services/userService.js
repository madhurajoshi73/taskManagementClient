
import express from 'express';
import { authenticateToken, generateToken } from '../authentication/authenticateJWT.js'
import * as bcrypt from 'bcrypt';
import { userRepository } from '../repository/userRepo.js';

const userRepo = new userRepository()
const userRoutes = express.Router()

//register user api
userRoutes.post('/register',  (req, res) => {
    const { email, username, password, role } = req.body;
    userRepo.getuser(email).then(async (user)=>{
        if(user && user?.rows?.length>0){
          res.status(500).json({ error: 'user name exist' });
        }
        else{
          const hashedPassword = await bcrypt.hash(password, 10);
          userRepo.adduser(email,username, hashedPassword, role).then((result=>{
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
userRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    userRepo.getuser(username).then((user)=>
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
          const token = generateToken(user)
          return res.send({token});
    }
    }).catch((error) =>{
        console.log(error)
        res.status(500).json({ error: 'login failed' });
    })
});

//reset password api
userRoutes.post('/reset',authenticateToken,async  (req, res) => {
    userRepo.getuserbyid(req.user.id).then(async (user)=>{
       if(user && user.length>0){
         res.status(500).json({ error: 'user name exist' });
       }
       else{
         const hashedPassword = await bcrypt.hash(req.body.password, 10);
         userRepo.updateuserpass(user.id, hashedPassword).then((result=>{
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
 userRoutes.get('/getUser', authenticateToken, async (req, res) => {
    console.log(req)
    userRepo.getuserbyid(req.user.id).then((user)=>{
     if (!user || user.rows.length==0) {
     return res.status(404).json({ error: 'Invalid access' });
     }
     return res.send({user: user.rows[0]});
   }).catch((error)=>{
   res.status(500).json({ error: 'Internal server error' });
 })
 });
 
 export {userRoutes}
