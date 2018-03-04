'use strict'

const path 		= require('path')
const express 	= require('express')
const app 		= express()
const port 		= 8080
const https 	= require('https')
const cc 			= require('cryptocompare')
global.fetch 	= require('node-fetch')

// Directories.
app.use('/static',express.static(path.join(__dirname,'static')))
app.set('views',path.join(__dirname,'templates'))
app.set('view engine','pug')


// Home Page
app.get('/', (req,res) => {
	res.render('base',{
		title : 'home'
	})
})


// graph url
app.get('/names', (req,res) => {
	cc.coinList()
	.then(coinList => {
		let data = coinList.Data

		let coin_names = new Array()
		for (const coin in data) {
				coin_names.push(data[coin].Name)
		}
		console.log(coin_names)
		res.send(coin_names)
	})
	.catch(console.error)
})



// User interface
app.get('/graph/:crupto/:currecncy', (req,res) => {
	let args = {
		currecncies:req.params
	}
	res.send(args)
})


app.listen(port, () => {
	console.log(`Server runs at ${port}`)
})


//nodemon
//bower
//node-fetch
//cryptocompare
