'use strict';
const mongoose = require('mongoose');

module.exports = function(app) {
    let model = app.models.Office;

    //parse
    app.param('id', async (req, res, next, id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send('invalid id');
            }
            req.office = await model.findById(id);
            next();
        } catch (err) {
            res.status(500).json({
                err: err.message
            });
        }
    });

    app.route('/api/office')
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
                let items = await model.find({}, 'name created');
                res.status(200).json(items);
            } catch (err) {
                res.status(500).json({
                    err: err.message
                });
            }
        });
    app.route('/api/office/:id')
        //read
        .get((req, res, next) => {
            res.json(req.office);
        })
        //update
        .put(async (req, res, next) => {
            try {
                Object.assign(req.office, req.body);
                let items = await req.office.save();
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
                if (!req.office) {
                    return res.status(404).send('not found');
                }
                req.office.delete();
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