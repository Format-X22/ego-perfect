removeTags = (value) -> value.replace /<\/?[^>]+(>|$)/g, ''

removeScripts = (value) ->
	value.replace(
		///
			script|
			onblur|
			onchange|
			onclick|
			ondblclick|
			onfocus|
			onkeydown|
			onkeypress|
			onkeyup|
			onload|
			onmousedown|
			onmousemove|
			onmouseout|
			onmouseover|
			onmouseup|
			onreset|
			onselect|
			onsubmit|
			onunload
		///gi,
		''
	)

exports.removeTags = removeTags
exports.removeScripts = removeScripts