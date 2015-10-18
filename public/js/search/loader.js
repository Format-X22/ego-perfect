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
		var from;
		var to;

		if (prevPage < 0) {
			return [];
		}

		from = prevPage * PAGE_SIZE;
		to = currentPage * PAGE_SIZE;

		currentPage = prevPage;

		return cash.slice(from, to);
	}

	/**
	 * Получить следующую страницу результата поиска.
	 * @param {Function} callback
	 * Следующий шаг, куда первым аргументом будет отправлен результат.
	 */
	function getNext (callback) {
		var nextPage = currentPage + 1;
		var from;
		var to;

		if (nextPage > maxPage) {
			sendRequest(callback);
			return;
		}

		from = (currentPage * PAGE_SIZE) + PAGE_SIZE;
		to = (nextPage * PAGE_SIZE) + PAGE_SIZE;

		currentPage = nextPage;

		callback(cash.slice(from, to));
	}

	/**
	 * @private
	 * @param {Function} callback
	 * Следующий шаг, куда первым аргументом будет отправлен результат.
	 */
	function sendRequest (callback) {
		// @TODO в ожидании апи, не забыть currentPage++ maxPage++
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
