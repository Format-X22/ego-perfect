$ () ->
	topMenuId = (location.pathname.split '/')[1] || 'search'

	currentMenuItem = $("#top-menu-#{topMenuId}")
	currentMenuItemText = $("#top-menu-#{topMenuId} a").html()

	currentMenuItem.addClass 'active'

	$('#mobile-page-hint').html currentMenuItemText