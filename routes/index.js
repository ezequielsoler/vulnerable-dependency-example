const path = require('path');
const express  = require('express');
const pug = require('pug');
const { unflatten } = require('flat');
const { checkSchema } = require('express-validator');
const router = express.Router();

const items = ["Item 1", "Iteam 2", "Iteam 3", "Iteam 4"]

router.get('/', (req, res) => {
    return res.sendFile(path.resolve('views/index.html'));
});


router.post('/api/submit', (req, res) => {
    const { search } = unflatten(req.body);

	return res.json({
		'response': {
            'search': pug.compile('span #{search}')({ search }),
            'results':items
        }
	});
});

module.exports = router;