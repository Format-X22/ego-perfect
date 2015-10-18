/**
 * @class Loader
 * Загрузчик-итератор по результатам поиска.
 * Кэширует данные в рамках текущего запроса.
 */
$(function () {
	var PAGE_SIZE = 18;

	var currentPage;
	var maxPage;
	var cash;
	var currentQuery;
	var currentGroup;

	reset();
	makePublic({
		loadNew: loadNew,
		getFirst: getFirst,
		getPrev: getPrev,
		getNext: getNext
	});

	/**
	 * Загружать набор данных по новому запросу.
	 * Старые данные затираются.
	 * @param {String} query Текст запроса.
	 * @param {String} group Имя группы.
	 * @param {Function} callback Следующий шаг.
	 */
	function loadNew (query, group, callback) {
		reset();

		currentQuery = query;
		currentGroup = group;

		sendRequest(callback);
	}

	/**
	 * Получить первую страницу результата поиска.
	 * Если данных нет - вернется пустой массив.
	 * @return {Array} Набор данных.
	 */
	function getFirst () {
		return cash.slice(0, PAGE_SIZE);
	}

	/**
	 * Получить предыдущую страницу результата поиска.
	 * Если данных нет - вернется пустой массив.
	 * @return {Array} Набор данных.
	 */
	function getPrev () {
		var prevPage = currentPage - 1;
		var result;

		if (prevPage < 0) {
			return [];
		}

		result = cash.slice(getPrevPageFrom(), getPrevPageTo());
		currentPage++;

		return result;
	}

	/**
	 * Получить следующую страницу результата поиска.
	 * @param {Function} callback
	 * Следующий шаг, куда первым аргументом будет отправлен результат.
	 */
	function getNext (callback) {
		var nextPage = currentPage + 1;
		var result;

		if (nextPage > maxPage) {
			sendRequest(callback);
			return;
		}

		result = cash.slice(getNextPageFrom(), getNextPageTo());
		currentPage++;

		callback(result);
	}

	/**
	 * @private
	 * @param {Function} callback
	 * Следующий шаг, куда первым аргументом будет отправлен результат.
	 */
	function sendRequest (callback) {
		$.getJSON('/', {
			from: getNextPageFrom(),
			to: getNextPageTo()
		}).done(function (result) {
			currentPage++;
			maxPage++;
			callback(result);
		});
	}

	/**
	 * @private
	 * @return {Number} Индекс.
	 */
	function getPrevPageFrom () {
		return (currentPage - 1) * PAGE_SIZE;
	}

	/**
	 * @private
	 * @return {Number} Индекс.
	 */
	function getPrevPageTo () {
		return currentPage * PAGE_SIZE;
	}

	/**
	 * @private
	 * @return {Number} Индекс.
	 */
	function getNextPageFrom () {
		return (currentPage + 1)* PAGE_SIZE;
	}

	/**
	 * @private
	 * @return {Number} Индекс.
	 */
	function getNextPageTo () {
		return (currentPage + 2) * PAGE_SIZE;
	}

	/**
	 * @private
	 */
	function reset () {
		cash = [];
		currentQuery = '';
		currentGroup = '';
		currentPage = -1;
		maxPage = -1;
	}

	/**
	 * @private
	 * @param {Object} map Объкт с набором полей, которые нужно сделать публичными.
	 */
	function makePublic (map) {
		window.App = window.App || {};
		window.App.Loader = map;
	}
});
