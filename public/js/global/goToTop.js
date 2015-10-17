/**
 * @class GoToTop
 * Виджет скрола наверх.
 */
$(function () {
	var pageWindow = $(window);
	var goToTop = $('.go-to-top');

	pageWindow.on('scroll', toggleWidgetVisibility);
	goToTop.on('click', scrollToTop);

	/**
	 * @private
	 */
	function toggleWidgetVisibility () {
		if (pageWindow.scrollTop() < 500) {
			goToTop.css('visibility', 'hidden');
		} else {
			goToTop.css('visibility', 'visible');
		}
	}

	/**
	 * @private
	 */
	function scrollToTop () {
		pageWindow.scrollTop(0);
	}
});