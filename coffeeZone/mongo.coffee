driver = require 'mongodb'
client = driver.MongoClient
idMaker = driver.ObjectID
dbLink = outerResourcesConfig.mongo.dataBaseLink
reconnectTime = 10 * 1000
database = null

connect = () -> client.connect dbLink, (error, db) ->
	if error
		console.log 'Ошибка соединения с базой, переподключаемся...'
		setTimeout connect, reconnectTime
	else
		database = db
		console.log 'Соединение с базой установлено'

collection = database.collection.bind(database)

makeId = (value) ->
	try
		idMaker value
	catch
		null

exports.collection = collection
exports.makeId = makeId