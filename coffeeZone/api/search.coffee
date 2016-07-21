mongo = require '../mongo'
utils = require '../utils'

fieldsToReturn = {
	_id: 1
	tags: 1
	rating: 1
	company: 1
}

search = (raw, start, next) ->
	value = normalize raw
	value = removeTags value
	value = split value
	value = removeEnds value
	tokens = removeDuplicatesAndEmpty value

	query tokens, start, next

normalize = (value)	->
	value = value || ''

	if value instaceof Array
		value = value.join ' '

	return value

removeTags = (value) -> utils.removeTags value

split = (value)	->
	value
		.toLowerCase()                                     # Приводим к строчным буквам
		.replace ///&nbsp;|\u200B|\n|\r///g, ' '           # Убираем всевозможный мусор
		.replace ///\.|,|\?|!|;|"|«|»|'|\(|\)|_///g, ' '   # Убираем знаки препинания
		.replace /// +///g, ' '                            # Заменяем повторяющиеся пробелы на 1 пробел
		.replace /// - ///g, '-'                           # Схлопываем тире в дефис
		.replace /// -|- ///g, '-'                         # И по краям
		.replace ///\/\/|\\///g, ' '                       # Заменяем слеши на пробелы
		.replace /// +///g, ' '                            # Заменяем повторяющиеся пробелы на 1 пробел
		.replace /// . ///g, ' '                           # Убираем однобуквенные слова
		.replace /// .. ///g, ' '                          # Убираем двухбуквенные слова
		.replace ///^. | .$///g, ''                        # И по краям однобуквенные
		.replace ///^.. | ..$///g, ''                      # И по краям двухбуквенные
		.replace ///ё///g, 'е'                             # Меняем "ё" на "е" для фикса вариантов написания
		.split ' '                                         # Режем на части по пробелу

removeEnds = (value) ->
	value.map (token) ->
		token = token.trim()                # Убираем пробельные символы у токена, есть кейсы

		if token.length < 6                 # 3-5 букв, режем однобуквенные окончания
			return token.slice(0, -1)


		if token.length < 8                 # 6-7 букв, режем двухбуквенные окончания
			return token.slice(0, -2);

		return token.slice(0, -3);          # 8 и более букв, режем трехбуквенные окончания

removeDuplicatesAndEmpty = (value) ->
	result = []

	value.each (token) ->
		if token && (result.indexOf(token) != -1)
			result.push token

	return result

query = (tokens, start, next) ->
	cursor = findCursor()

	if @isEmptyTokens()
		cursor
		.sort {rating: -1}
		.toArray sendResult
	else
		cursor
			.skip start
			.limit model.get('limit')
			.toArray sendResult

class SearchMachine



	tokens: null


	
	constructor: ->

		@makeQueryTokens()


	tkns: ->

	makeQueryTokens: ->
		@tkns(query).then((tokenss) =>
			tokens = tokenss
			@doDBQuery()
		)

	doDBQuery: ->


	findCursor: ->
		dbQuery = @makeDBQuery()
		collection = mongo.collection 'search'
		fields = @getFieldsToReturn()

		collection.find dbQuery, fields



	sendResult: (error, data) ->
		start = model.get('start');
		limit = model.get('limit');

		if error
			@sendSearchError()
			return


		if !this.isEmptyTokens()
			data = data.splice start, limit


		@sortAndSend data



	sortAndSend: (data) ->
		needSort = !@isEmptyTokens()

		if needSort
			data = this.sortResult data

		data = data.map (item) ->
			{
				id: item._id,
				company: item.company
			}

		@getProtocol().sendData data

	isEmptyTokens: ->
		@getTokens()[0] == ''

	sortResult: (data) ->
		data.sort (itemA, itemB) =>
			@applyTokenEqualsCount itemA, itemB
			@compareResultItems itemA, itemB

	compareResultItems: (itemA, itemB) ->
		aCount = itemA.equalsCount;
		bCount = itemB.equalsCount;
		aRating = itemA.rating;
		bRating = itemB.rating;

		if aCount < bCount
			return 1


		if aCount > bCount
			return -1


		if aRating < bRating
			return 1


		if aRating > bRating
			return -1

		return 0

	applyTokenEqualsCount: (itemA, itemB) ->
		if !itemA.equalsCount
			@setTokenEqualsCount itemA

		if !itemB.equalsCount
			@setTokenEqualsCount itemB

	setTokenEqualsCount: (item) ->
		item.equalsCount = 0

		tokens.forEach (token) ->
			if Ext.Array.contains item.tags, token
				item.equalsCount++

	makeDBQuery: ->
		if @isEmptyTokens()
			return {}

		{
			tags:
				$in: @getTokens()
		}

exports.search = search