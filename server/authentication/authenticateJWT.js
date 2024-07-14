import {TOKEN_CONST} from '../constant.js'
import jwt from 'jsonwebtoken';

// JWT auth token
export function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Authentication failed' });
  
    jwt.verify(token, TOKEN_CONST, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token is not valid' });
      req.user = user;
      next();
    });
}

export function generateToken(data){
    return jwt.sign({id: data.id, name: data.name, role: data.role}, TOKEN_CONST);
}


