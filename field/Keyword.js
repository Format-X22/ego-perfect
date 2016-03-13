/**
 * Поле для ключевых слов.
 * Позволяет сохранять слова и фразы, состоящие из 1-3х составных частей.
 * Составные части изначально могут содержать разделители в виде
 * пробелов, тире и дефисов.
 * Содержит валидацию.
 */
Ext.define('B.field.Keyword', {
	extend: 'Ext.data.field.Field',
	alias: 'data.field.keyword',

	convert: function (value) {
		if (!value) {
			return '';
		}

		value = value
			.trim()
			.replace(/ - /g,  ' ')
			.replace( /- /g,  ' ')
			.replace( / -/g,  ' ')
			.replace(  /-/g,  ' ')
			.replace(/[ ]+/g, ' ');

		if (value.split(' ').length < 4) {
			return value;
		} else {
			return null;
		}
	},

	validators: {
		type: 'presence',
		allowEmpty: true
	}
});