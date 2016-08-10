import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, RouterContext, match } from 'react-router';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

const finalCreateStore = applyMiddleware()(createStore);
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);

const app = express();


app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use((req, res, next) => {
    const store = finalCreateStore();
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

    });
});
