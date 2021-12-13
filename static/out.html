const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./routes');

const app = express();

app.set('views', './views');
app.use('/static', express.static(path.resolve('static')));
app.use(express.json());


// Sessions are used by web applications to remember data about specific users.
// This is how when you login to a website, it remembers you for a while.
app.use(session({
	secret: 'my-secret',
	resave: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: false
	}
}));

app.use(routes);

app.all('*', (req, res) => {
    return res.status(404).send('404 page not found');
});

// Start listening to requests on the local machine at port 3000.
app.listen(3000, function () {
	console.log('Server listening at localhost:3000');
});
