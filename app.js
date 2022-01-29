const express = require('express');
const { handler } = require('./handler');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.raw());

function registerHandlerAsController(handler) {
    return async function parseEventAndContextMiddleware(req, res, next) {
        let event;
        context = {};
        const body = req.body;
        if (body.event) {
            event = body.event;
            context = body.context;
        } else {
            event = body;
        }
        console.log(JSON.stringify({ event, context }));
        const response = await handler(event, context);
        console.log(JSON.stringify(response), { response });
        return res.send(JSON.stringify(response));
    };
}

app.post('*', registerHandlerAsController(handler));
const port = 3000;
app.listen(port, () => {
    console.log('listening on', port);
});
