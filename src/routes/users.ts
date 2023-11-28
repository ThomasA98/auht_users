import express from 'express';

export const UsersRouter = express
.Router()
.get('/users/singin', (req, res) => {
    res.render('users/singin');
})
.get('/users/singup', (req, res) => {
    res.render('users/singup');
});