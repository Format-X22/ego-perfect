class Router

	constructor: (app) ->
		app.get /.*/, (req, res, next) =>
			path = req.path.slice 1
			path = path || 'index'

			if /^static/.test path
				next()
			else
				res.render path

		app.post '', (req, res) =>
			res.render 'index'

		app.post '/search', (req, res) =>
			res.render 'index'

		app.post '/login', (req, res) =>
			res.render 'login'

		app.post '/restore', (req, res) =>
			res.render 'login'

		app.post '/register', (req, res) =>
			res.render 'register'


module.exports = Router