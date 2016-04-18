/**
 * Модель саммори клиента.
 */
Ext.define('B.biz.client.model.Summary', {
	extend: 'Ext.data.Model',
    
	fields: [
		{
			name: 'key',
			type: 'string',
			validators: {
				type: 'presence'
			}
		},
		{
			name: 'summary',
            type: 'string',
			validators: [
                {
                    type: 'presence',
                    allowEmpty: true
                },
                {
                    type: 'length',
                    max: 10000
                }
            ],
            convert: function (value) {
                if (!value) {
                    return '';
                }
                
                var noTagsValue;
                var pattern = [
                    'script',
                    'onblur',
                    'onchange',
                    'onclick',
                    'ondblclick',
                    'onfocus',
                    'onkeydown',
                    'onkeypress',
                    'onkeyup',
                    'onload',
                    'onmousedown',
                    'onmousemove',
                    'onmouseout',
                    'onmouseover',
                    'onmouseup',
                    'onreset',
                    'onselect',
                    'onsubmit',
                    'onunload',
                    'url',
                    'img'
                ].join('|');
                var re = new RegExp(pattern, 'gi');

                if (re.test(value)) {
                    return null;
                }

                noTagsValue = value
                    .replace(/<\/?[^>]+(>|$)/g, '') // Реплейс тегов
                    .replace(/\u200B/g, '');        // Удаление пустого символа 8203

                if (noTagsValue.length > 2000) {
                    return null;
                }

                return value;
            }
		}
	]
});