/**
 * Контроллер редактора, вкладки описания компании.
 */
Ext.define('A.view.client.editor.SummaryController', {
    extend: 'A.view.widget.AbstractSaveToolbarController',
    alias: 'controller.clientEditorSummary',

    mixins: [
        'A.view.widget.MessagesMixin'
    ],

    url: '/api/client/summary',

    config: {

        /**
         * @private
         * @cfg {Number} count Текущее количество символов в редакторе.
         */
        count: 0,

        /**
         * @private
         * @cfg {Number} maxCount Максимальное количество символов в редакторе.
         */
        maxCount: 2000,

        /**
         * @private
         * @cfg {RegExp} scriptPatternRe Регексп внедрения скритов.
         */
        scriptPatternRe: new RegExp([
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
        ].join('|'), 'gi'),

        /**
         * @private
         * @cfg {Ext.tip.ToolTip} maxTextTooltipWidget Виджет максимального текста.
         */
        maxTextTooltipWidget: null
    },

    /**
     * Оповещает о изменениях,
     * дефолтный способ с проверкой на изменения не работает для смены режима редактирования.
     * @param {Ext.form.field.HtmlEditor} editor Эдитор.
     */
    notifyChange: function (editor) {
        this.validateAndUpdateCounter();
        this.toggleSaveToolbar(this.getView(), editor.isDirty());
    },

    /**
     * @inheritdoc
     */
    save: function () {
        if (this.isInvalidLength()) {
            this.toggleMaxLengthTooltip();
            return;
        }

        if (this.isAnyScripts()) {
            this.showErrorMessage(
                'Ваш текст содержит опасные невидимые символы,<br>' +
                'которые могут нанести вред другим пользователям системы.<br>' +
                'Пожалуйста, больше не копируйте их из того места, откуда вы их скопировали.<br>' +
                'При острой необходимости - введите текст руками,<br>' +
                'это защитит от "незванных гостей" в виде вирусов.'
            );
            return;
        }
        
        this.callParent(arguments);
    },

    /**
     * Валидирует редактор саммори и обновляет счетчик символов.
     */
    validateAndUpdateCounter: function () {
        var editor = this.getEditor();

        if (!editor.rendered) {
            editor.on('afterrender', this.validateAndUpdateCounter, this, {single: true});
            return;
        }

        this.modifyUrls();
        this.removeImages();
        this.removeScripts();
        this.calculateCount();
        this.updateCounter();
    },

    /**
     * Обновляет размер эдитора до заполнения всего пустого пространства.
     */
    flexEditorSize: function () {
        var view = this.getView();
        var fullWidgetHeight = view.getHeight();
        var editor = view.down('htmleditor');
        var hint = view.down('adminTopDescription');
        var offset = 250;
        
        if (!hint) {
            offset = offset - 145;
        }

        editor.setHeight(fullWidgetHeight - offset);
    },

    /**
     * Переключает отображение тултипа о привышении максимального количества символов.
     */
    toggleMaxLengthTooltip: function () {
        var view = this.getView();
        var tooltip = this.getMaxTextTooltip();
        var target;
        
        if (this.isInvalidLength()) {
            target = view.down('#editorContainer').getEl().dom;
            tooltip.show();
            tooltip.showBy(target, 'tl');
        } else {
            tooltip.hide();
        }
        
    },

    privates: {

        /**
         * @private
         */
        removeImages: function () {
            var editor = this.getEditor();
            var value = editor.getValue();
            var cleaned = value
                .replace('img', 'span')
                .replace('url', 'null');

            editor.setValue(cleaned);
        },

        /**
         * @private
         */
        modifyUrls: function () {
            var editor = this.getEditor();
            var value = editor.getValue();
            var modified = value.replace(
                /<a (?!target="_blank" rel="nofollow noopener noreferrer" )/gi,
                '<a target="_blank" rel="nofollow noopener noreferrer" '
            );

            editor.setValue(modified);
        },

        /**
         * @private
         */
        removeScripts: function () {
            var editor = this.getEditor();
            var value = editor.getValue();
            var re = this.getScriptPatternRe();
            var cleaned = value.replace(re, 'null');

            editor.setValue(cleaned);
        },

        /**
         * @private
         */
        calculateCount: function () {
            var editor = this.getEditor();
            var value = editor.getValue();
            var cleanValue = this.removeTags(value);

            this.setCount(+cleanValue.length);
        },

        /**
         * @private
         */
        updateCounter: function () {
            var counter = this.getCountTextComponent();
            var valueTplString = '{count} {hint} из {max}';
            var valueTpl = new Ext.Template(valueTplString);
            var value = valueTpl.apply({
                count: this.getCount(),
                hint: this.getCountHintText(),
                max: this.getMaxCount()
            });

            if (this.isInvalidLength()) {
                value = this.wrapWithRed(value);
            }

            counter.setHtml(value);
        },

        /**
         * @private
         * @param {String} value Любая строка.
         * @return {String} Строка без тегов.
         */
        removeTags: function (value) {
            return value
                .replace(/<\/?[^>]+(>|$)/g, '') // Реплейс тегов
                .replace(/\u200B/g, '');        // Удаление пустого символа 8203, появляется при старте в начале
        },

        /**
         * @private
         * @return {Ext.form.field.HtmlEditor} Редактор.
         */
        getEditor: function () {
            return this.getView().down('htmleditor');
        },

        /**
         * @private
         * @return {Ext.toolbar.Toolbar} Тулбар эдитора.
         */
        getEditorToolbar: function () {
            return this.getEditor().getToolbar();
        },

        /**
         * @private
         * @return {Ext.toolbar.TextItem} Тектовое поле количества символов.
         */
        getCountTextComponent: function () {
            var toolbar = this.getEditorToolbar();
            var text = toolbar.down('tbtext');

            if (!text) {
                text = toolbar.insert(0, {
                    itemId: 'maxLengthText',
                    xtype: 'tbtext',
                    width: 180
                });
                toolbar.insert(1, '-');
            }

            return text;
        },

        /**
         * @private
         * @return {String} Склоненный текст.
         */
        getCountHintText: function () {
            var count = this.getCount();
            var countPredicate = +count.toString().slice(-1);
            var countDoublePredicate = +count.toString().slice(-2);

            switch (countDoublePredicate) {
                case 11:
                case 12:
                case 13:
                case 14:
                    return 'символов';
            }

            switch (countPredicate) {
                case 1:
                    return 'символ';
                case 2:
                case 3:
                case 4:
                    return 'символа';
                default:
                    return 'символов';
            }
        },

        /**
         * @private
         * @param {String} value Любая строка.
         * @return {String} Обернутая строка.
         */
        wrapWithRed: function (value) {
            return '<span style="color: red">' + value + '</span>';
        },

        /**
         * @private
         * @return {Boolean} Результат валидации.
         */
        isInvalidLength: function () {
            return this.getCount() > this.getMaxCount();
        },

        /**
         * @private
         * @return {Boolean} Результат валидации.
         */
        isAnyScripts: function () {
            var value = this.getEditor().getValue();
            var re = this.getScriptPatternRe();

            return re.test(value);
        },

        /**
         * @private
         * @return {Ext.tip.ToolTip} Тултип.
         */
        getMaxTextTooltip: function () {
            var tooltip = this.getMaxTextTooltipWidget();
            
            if (tooltip) {
                return tooltip;
            } else {
                tooltip = this.makeMaxTextTooltip();

                this.setMaxTextTooltipWidget(tooltip);
                
                return tooltip;
            }
        },

        /**
         * @private
         * @return {Ext.tip.ToolTip} Тултип.
         */
        makeMaxTextTooltip: function () {
            return Ext.create('Ext.tip.ToolTip', {
                html: 'Слишком много символов',
                autoHide: false
            });
        }
    }
});