'use strict';
const mongoose = require('mongoose');

module.exports = function(app) {
    let model = app.models.Client;

    //parse
    app.param('id', async (req, res, next, id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send('invalid id');
            }
            req.client = await model.findById(id);
            next();
        } catch (err) {
            res.status(500).json({
                err: err.message
            });
        }
    });

    app.route('/api/client')
        //create
        .post(async (req, res, next) => {
            try {
                let item = await new model(req.body).save();
                res.status(201).json(item);
            } catch (err) {
                res.status(500).json({
                    err: err.message
                });
            }
        })
        //list
        .get(async (req, res, next) => {
            try {
                let items = await model.find({}).lean();
                res.status(200).json(items);
            } catch (err) {
                res.status(500).json({
                    err: err.message
                });
            }
        });
    app.route('/api/client/:id')
        //read
        .get((req, res, next) => {
            res.json(req.client);
        })
        //update
        .put(async (req, res, next) => {
            try {
                Object.assign(req.client, req.body);
                let items = await req.client.save();
                res.status(200).json(items);
            } catch (err) {
                res.status(500).json({
                    err: err.message
                });
            }
        })
        //delete
        .delete(async (req, res, next) => {
            try {
                if (!req.client) {
                    return res.status(404).send('not found');
                }
                req.client.delete();
                res.status(200).json({
                    status: 'deleted'
                });
            } catch (err) {
                res.status(500).json({
                    err: err.message
                });
            }
        });
};