express = require 'express'
favicon = require 'serve-favicon'
path = require 'path'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
fileParser = require 'connect-busboy'
http = require 'http'

Router = require './router'

class Main
    app = express()
    server = null
    rerunTime = 10 * 1000
    fileSizeLimitsConfig =
        limits:
            fileSize: 10 * 1024 * 1024

    constructor: ->
        @initDataBaseStep()
        @initExpressStep()
        @initRouter()
        @createServerStep()

    initDataBaseStep: ->
        console.log 'Инициализация Mongo.'

    initExpressStep: ->
        console.log 'Инициализация Express.'

        app.set 'view engine', 'jade'
        app.set 'views', "#{__dirname}/view"

        faviconPath = path.join "#{__dirname}/public/static/img/favicon.png"

        app.use favicon(faviconPath)

        app.use bodyParser.json()
        app.use bodyParser.urlencoded {extended: false}
        app.use cookieParser()
        app.use fileParser fileSizeLimitsConfig

        staticDirSign = express.static "#{__dirname}/public"

        app.use staticDirSign

    initRouter: ->
	    new Router(app)

    createServerStep: ->
        server = http.createServer app

        server.on 'error', @handleServerError.bind(@)
        server.listen @normalizePort(), @onServerStart.bind(@)

    normalizePort: ->
        value = process.env.PORT || 3000
        port = parseInt value, 10

        if isNaN port
            return value

        if port >= 0
            return port

        return false

    handleServerError: (error) ->
            console.log "Ошибка сервера!\n\n#{error}"
            console.log 'Попытка перезапуска сервера...'

            @tryRunServerLate()


    onServerStart: (error) ->
        if error
            console.log error
            @tryRunServerLate()
        else
            console.log 'Сервер успешно запущен.'


    tryRunServerLate: () ->
        server.close()

        setTimeout(
            => @createServer(),
            rerunTime
        )

new Main()