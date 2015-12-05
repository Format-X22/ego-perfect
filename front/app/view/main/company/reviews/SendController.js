/**
 * Контроллер отзывов.
 */
Ext.define('A.view.main.company.reviews.SendController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyReviewsSend',

    SEND_URL: '/api/reviews',

    /**
     * Показывает блок капчи.
     */
    showCaptchaBlock: function () {
        if (this.isValid()) {
            this.viewDown('#captchaInputContainer').show();
            this.viewDown('#captchaImageContainer').show();
            this.viewDown('#sendWithCaptchaContainer').show();
            this.viewDown('#captchaInput').enable();
        }
    },

    /**
     * Прячет блок капчи.
     */
    hideCaptchaBlock: function () {
        this.viewDown('#captchaInputContainer').hide();
        this.viewDown('#captchaImageContainer').hide();
        this.viewDown('#sendWithCaptchaContainer').hide();
        this.viewDown('#captchaInput').disable();
    },

    /**
     * Отправляет форму на сервер.
     */
    send: function () {
        var form = this.viewDown('#reviewForm');

        if (this.isValid()) {
            form.submit({
                url: this.SEND_URL,
                scope: this,
                success: this.resetForm,
                failure: this.showSendErrorMessage
            });
        }
    },

    /**
     * Сбрасывает форму в начальный вид.
     */
    resetForm: function () {
        this.hideCaptchaBlock();
        this.set5star();
        this.viewDown('#reviewForm').reset();
    },

    /**
     * Проверяет на форму на валидность.
     * @return {Boolean} Результат.
     */
    isValid: function () {
        return this.viewDown('#reviewForm').isValid();
    },

    /**
     * Устанавливает одну звезду.
     */
    set1star: function () {
        this.setRating(1);
        this.setStar('#star2', false);
        this.setStar('#star3', false);
        this.setStar('#star4', false);
        this.setStar('#star5', false);
    },

    /**
     * Устанавливает две звезды.
     */
    set2star: function () {
        this.setRating(2);
        this.setStar('#star2', true);
        this.setStar('#star3', false);
        this.setStar('#star4', false);
        this.setStar('#star5', false);
    },

    /**
     * Устанавливает три звезды.
     */
    set3star: function () {
        this.setRating(3);
        this.setStar('#star2', true);
        this.setStar('#star3', true);
        this.setStar('#star4', false);
        this.setStar('#star5', false);
    },

    /**
     * Устанавливает четыре звезды.
     */
    set4star: function () {
        this.setRating(4);
        this.setStar('#star2', true);
        this.setStar('#star3', true);
        this.setStar('#star4', true);
        this.setStar('#star5', false);
    },

    /**
     * Устанавливает пять звезд.
     */
    set5star: function () {
        this.setRating(5);
        this.setStar('#star2', true);
        this.setStar('#star3', true);
        this.setStar('#star4', true);
        this.setStar('#star5', true);
    },

    privates: {

        /**
         * @private
         * @param {Ext.form.Basic} form Форма.
         * @param {Ext.form.action.Action} action Выполняемое действие.
         */
        showSendErrorMessage: function (form, action) {
            var actionTypes = Ext.form.action.Action;
            var message;

            switch (action.failureType) {
                case actionTypes.SERVER_INVALID:
                    message = action.result.message;
                    break;

                case actionTypes.CONNECT_FAILURE:
                case actionTypes.LOAD_FAILURE:
                default:
                    message = 'Проверьте подключение или попробуйте позже.';
                    break;
            }

            Ext.MessageBox.show({
                title: 'Ошибка',
                message: message,
                icon: Ext.MessageBox.ERROR
            });
        },

        /**
         * @private
         * @param {Number} rating Значение рейтинга.
         */
        setRating: function (rating) {
            this.viewDown('#rating').setValue(rating);
        },

        /**
         * @private
         * @param {String} selector Селектор звезды.
         * @param {Boolean} notEmpty Полная или пустая.
         */
        setStar: function (selector, notEmpty) {
            var iconCls = 'x-fa fa-star-o';

            if (notEmpty) {
                iconCls = 'x-fa fa-star'
            }

            this.viewDown(selector).setIconCls(iconCls);
        },

        /**
         * @private
         * @param {String} selector Селектор.
         * @return {Ext.Component} Компонент.
         */
        viewDown: function (selector) {
            return this.getView().down(selector);
        }
    }
});