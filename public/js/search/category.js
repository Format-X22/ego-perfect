/**
 * @class Category
 * Виджет списка категорий.
 */
$(function () {
	$('.categories .as-tabs .tab').on('click', function () {
		changeSelectedTab(this);
		searchInCategory(); // @TODO ID категории
	});

	$('.categories .as-tabs .more').on('click', function () {
		showCategoryList();
	});

	// @TODO третий обработчик выбора в списке категорий, вызывающий поиск по категории

	/**
	 * @private
	 * @param {HTMLElement} tab Вкладка для отмеки как выбранная.
	 */
	function changeSelectedTab (tab) {
		$('.categories .as-tabs .tab.selected').removeClass('selected');
		$(tab).addClass('selected animation-off');

		setTimeout(function () {
			$(tab).removeClass('animation-off');
		}, 0);
	}

	/**
	 * @private
	 */
	function searchInCategory () {
		console.log('SEARCH IN CATEGORY'); // @TODO
	}

	/**
	 * @private
	 */
	function showCategoryList () {
		console.log('SHOW CATEGORY LIST'); // @TODO
	}

	/**
	 * @private
	 */
	function updateMobileCategoryLabel () {
		// @TODO
	}
});