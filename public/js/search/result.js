/**
 * @class Result
 * Виджет результата поиска.
 * Рендерет карточки по предоставленным данным, используя метод render.
 * Также иммет методы mask и unmask для блокировки и разблокировки области результата.
 */
$(function () {
	var cardTpl = '<a href="company{id}" class="item" style="background-image: url(img/company/{id})"></a>';
	var target = $('.search-result');
	var maskItem = $('.search-result .mask');
	var searchInputOffset = $('.search').offset().top;

	makePublic({
		render: render,
		mask: mask,
		unmask: unmask
	});

	/**
	 * Рендерит карточки по предоставленным данным.
	 * @param {Object} data Массив объектов с данными.
	 */
	function render (data) {
		var maskTmp = $(maskItem).clone();

		maskItem = maskTmp;
		$(window).scrollTop(searchInputOffset);
		target.empty();
		target.append(maskTmp);

		data.forEach(function (item) {
			var html = cardTpl.replace(/{id}/g, item.id);

			target.append(html);
		});
	}

	/**
	 * Закрывает область результата поиска маской.
	 */
	function mask () {
		maskItem.show();
	}

	/**
	 * Снимает маску с области результата.
	 */
	function unmask () {
		maskItem.hide();
	}

	/**
	 * @private
	 * @param {Object} map Объкт с набором полей, которые нужно сделать публичными.
	 */
	function makePublic (map) {
		window.App = window.App || {};
		window.App.Result = map;
	}
});