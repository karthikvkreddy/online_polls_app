const express = require('express');
require('./db/mongoose')
require('dotenv').config({ path: `../config/.env.${process.env.NODE_ENV}` })

const pollsRouter = require('./routers/polls');
const eventsRouter = require('./routers/events');

const app = express()
const port = process.env.PORT 

// automatically parses incoming request
app.use(express.json());

// separating the router module

app.use(pollsRouter);
app.use(eventsRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});