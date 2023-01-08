const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs') 
const UserController = require('../controllers/UserController.js')  

router.post('/register', (req, res, next) => {
    const {password} = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt); 

        UserController.register(req.body).then(
            res.json({success:true})
        ).catch(err => next(err))
})

router.post('/login', (req, res, next) => {
    const { username, password} = req.body;
    UserController.login({username, password}).then(user => {
            user ? res.json(user) : res.json({ error: 'Username or password is incorrect' });
        }
    ).catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    UserController.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

module.exports = router;