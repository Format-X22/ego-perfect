/**
 * Контроллер отзывов.
 */
Ext.define('A.view.public.company.reviews.SendController', {
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
            this.scrollToBottomIfModern();
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
        this.scrollToTopIfModern();
    },

    /**
     * Отправляет форму на сервер.
     */
    send: function () {
        var form = this.viewDown('#reviewForm');

        if (this.isValid()) {
            form.submit({                         // scope как параметр ломает отправку на модерне
                url: this.SEND_URL,

                success: function () {
                    this.showSendSuccessMessage();
                    this.resetForm();
                }.bind(this),

                failure: this.showSendErrorMessage.bind(this)
            });
        }
    },

    /**
     * Сбрасывает форму в начальный вид.
     */
    resetForm: function () {
        this.hideCaptchaBlock();
        this.set5star();

        if (Ext.isClassic) {
            this.viewDown('#reviewForm').reset();
        } else {
            this.viewDown('[name=name]').setValue();
            this.viewDown('[name=header]').setValue();
            this.viewDown('[name=description]').setValue();
            this.viewDown('[name=captcha]').setValue();
        }
    },

    /**
     * Проверяет на форму на валидность.
     * @return {Boolean} Результат.
     */
    isValid: function () {
        if (Ext.isClassic) {
            return this.isValidClassic();
        } else {
            return this.isValidModern();
        }
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
         */
        scrollToTopIfModern: function () {
            this.scrollToIfModern(0);
        },

        /**
         * @private
         */
        scrollToBottomIfModern: function () {
            this.scrollToIfModern(Infinity);
        },

        /**
         * @private
         */
        scrollToIfModern: function (value) {
            if (Ext.isClassic) {
                return;
            }

            var scroller = this.viewDown('formpanel').getScrollable();

            Ext.defer(function () {
                scroller.scrollTo(null, value);
            }, 100, this);
        },

        /**
         * @private
         */
        showSendSuccessMessage: function () {
            this.showMessage('Успешно', 'Отзыв успешно отправлен!', 'INFO');
        },

        /**
         * @private
         * @param {Ext.form.Basic} form Форма.
         * @param {Ext.form.action.Action/Ext.direct.Event/Object} action Выполняемое действие.
         */
        showSendErrorMessage: function (form, action) {
            var message = 'Проверьте подключение или попробуйте позже.';

            if (Ext.isClassic) {
                message = this.getSendFailureClassicMessage(action, message);
            }

            this.showMessage('Ошибка', message, 'ERROR');
        },

        /**
         * @private
         * @param {Ext.form.action.Action} action Выполняемое действие.
         * @param {String} defaultMessage Стандартное сообщение.
         * @return {String} Сообщение.
         */
        getSendFailureClassicMessage: function (action, defaultMessage) {
            var actionTypes = Ext.form.action.Action;

            switch (action.failureType) {
                case actionTypes.SERVER_INVALID:
                    return action.result.message;

                case actionTypes.CONNECT_FAILURE:
                case actionTypes.LOAD_FAILURE:
                default:
                    return defaultMessage;
            }
        },

        /**
         * @private
         * @return {Boolean} Валидны ли поля.
         */
        isValidClassic: function () {
            return this.viewDown('#reviewForm').isValid();
        },

        /**
         * @private
         * @return {Boolean} Валидны ли поля.
         */
        isValidModern: function () {
            var captcha = this.viewDown('[name=captcha]');
            var captchaEnabled = !captcha.isDisabled();
            var noError =
                this.viewDown('[name=name]').getValue() &&
                this.viewDown('[name=header]').getValue() &&
                this.viewDown('[name=description]').getValue();

            if (captchaEnabled) {
                noError = noError && captcha.getValue();
            }

            if (noError) {
                return true;
            } else {
                this.showMessage('Оопс...', 'Не все поля заполнены.', 'ERROR');
                return false;
            }
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
    },

    /**
     * @private
     * @param {String} title Заголовок.
     * @param {String} message Сообщение.
     * @param {String} icon Текстовое имя иконки для классика.
     */
    showMessage: function (title, message, icon) {
        if (Ext.isClassic) {
            Ext.MessageBox.show({
                title: title,
                message: message,
                icon: Ext.MessageBox[icon]
            });
        } else {
            Ext.Msg.show({
                title: title,
                message: message
            });
        }
    }
});