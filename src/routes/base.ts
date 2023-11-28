import express from 'express';

export const BaseRouter = express
    .Router()
    .get('/', (req, res) => {
        return res.render('index');
    });