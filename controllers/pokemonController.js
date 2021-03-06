const express = require('express');
const router = express.Router();
const pokemon = require('../models/pokemon.js');

// ROUTES

// INDEX
router.get('/', (req, res) => {
	console.log('hit the get route for index');
	res.render('index.ejs', { 
		pokemon: pokemon 
	});
});

// NEW
router.get('/new', (req, res) => {
	console.log('hit the new route');
	res.render('new.ejs')
})

// POST - add the new pokemon
router.post('/', (req, res) => {
	console.log('hit the post route');
	req.body = {
		name: req.body.name,
		img: req.body.img,
		type: [req.body.type],
		stats: {
			hp: req.body.hp,
			attack: req.body.attack,
			defense: req.body.defense,
			speed: req.body.speed
		}	
	}
	// console.log(req.body)
	pokemon.push(req.body)
	res.redirect('/pokemon');
})


// SHOW
router.get('/:id', (req, res) => {
    console.log('hit the show route for this pokemon');
    res.render('show.ejs', { 
    	pokemon: pokemon[req.params.id] 
    });
});

// EDIT
router.get('/:id/edit', (req, res) => {
	console.log('hit the edit route for this pokemon')
	res.render('edit.ejs', {
		pokemon: pokemon[req.params.id],
		index: req.params.id
	})
})

// UPDATE
router.put('/:id', (req, res) => {
	console.log('hit the update route for this pokemon')
	pokemon[req.params.id] = {
		name: req.body.name,
		img: req.body.img,
		type: [req.body.type],
		stats: {
			hp: req.body.hp,
			attack: req.body.attack,
			defense: req.body.defense,
			speed: req.body.speed
		}
	}
	res.redirect('/pokemon')
})

// DELETE
router.delete('/:id', (req, res) => {
	console.log('hit the delet route for this pokemon')
	const index = req.params.id
	pokemon.splice(index, 1);
	res.redirect('/pokemon');
})



module.exports = router;