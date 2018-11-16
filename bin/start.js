#!/usr/bin/env node

/**
 * Copyright (c) 2018, Watermark
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Module dependencies.
 */

const path = require('path');
const express = require('express');
const app = express();

/**
 * Get port from environment
 */

const port = process.env.PORT || '3000';

/**
 * Serve assets and listen
 */

app.use(express.static(path.resolve(__dirname, '../themes')));
app.listen(port);
