/**
 * Контроллер редактора, вкладки описания компании.
 */
Ext.define('A.view.client.editor.SummaryController', {
    extend: 'A.view.widget.AbstractSaveToolbarController',
    alias: 'controller.clientEditorSummary',

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
        maxCount: 2000
    },

    /**
     * @inheritdoc
     */
    save: function () {
        if (this.isInvalidLength()) {
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

        this.removeImages();
        this.calculateCount();
        this.updateCounter();
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
            
            if (value !== cleaned) {
                editor.setValue(cleaned);
            }
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
        }
    }
});