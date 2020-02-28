'use strict';
const mongoose = require('mongoose');

module.exports = function(app) {
    let model = app.models.Salon;

    //parse
    app.param('id', async (req, res, next, id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send('invalid id');
            }
            req.salon = await model.findById(id);
            next();
        } catch (err) {
            res.status(500).json({
                err: err.message
            });
        }
    });

    app.route('/api/salon')
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
                let items = await model.find({});
                res.status(200).json(items);
            } catch (err) {
                res.status(500).json({
                    err: err.message
                });
            }
        });
    app.route('/api/salon/:id')
        //read
        .get((req, res, next) => {
            res.json(req.salon);
        })
        //update
        .put(async (req, res, next) => {
            try {
                Object.assign(req.salon, req.body);
                let items = await req.salon.save();
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
                if (!req.salon) {
                    return res.status(404).send('not found');
                }
                req.salon.delete();
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