/**
 * Вью-модель деталей компании.
 */
Ext.define('A.view.main.company.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.companyContainer',

    data: {
        mapMarker: null,
        _id:       'empty_logo',
        name:      '',
        phone:     '',
        email:     '',
        time:      '',
        address:   '',
        summary:   '',
        reviews:   null,
        map:       null,
        rating:    0,
        site:      ''
    },

    formulas: {
        formatRating: {
            get: function (getter) {
                var value = getter('rating');

                if (value === '-' || value < 100) {
                    return '<i>новая</i>';
                }
                return value;
            }
        },
        formatSite: {
            get: function (getter) {
                var value = getter('site');
                var link = value;
                
                if (value === '-') {
                    return '';
                }

                if (!/(http|https):\/\/|^\/\//.test(value)) {
                    link = 'http://' + value;
                }

                return Ext.String.format(
                    '<a class="link" href="{0}" target="_blank" rel="nofollow noopener noreferrer">{1}</a>',
                    link,
                    value
                );
            }
        },
        formatPhone: {
            get: function (getter) {
                var value = getter('phone');
                var cleaned;
                var split;
                var format;

                if (value === '-' || !value) {
                    return '-';
                }

                cleaned = value
                    .replace(/-|\(|\)/g, '')
                    .replace(',', ' ')
                    .replace(/\s+/g, ' ')
                    .replace(/\+7|\+\s7/gi, '8')
                    .replace(/\s/g, '')
                    .trim();

                if (/[^0-9]/gi.test(cleaned)) {
                    return value;
                }

                split = cleaned.match(/.{1,11}/g);

                format = Ext.Array.map(split, function (num) {
                    var code = ' (' + num.slice(1, 4) + ') ';
                    var start = num.slice(4, 7);
                    var mid = num.slice(7, 9);
                    var end = num.slice(9, 11);
                    var full = [start, mid, end].join('-');
                    var phone = '+7' + code + full;

                    return '<a class="link" href="tel:+7' + num.slice(1) + '">' + phone + '</a>';
                }, this);

                return format.join(', ');
            }
        },

        formatEmail: {
            get: function (getter) {
                var value = getter('email');
                var split;
                var cleaned;
                var format;
                var notOnlyMail = false;

                if (value === '-' || !value) {
                    return '-';
                }

                cleaned = value.replace(',', '');
                split = cleaned.split(/\s/);

                Ext.each(split, function (mail) {
                    var match = mail.match(/@/g) || [];

                    if (match.length !== 1) {
                        notOnlyMail = true;
                        return false;
                    }
                }, this);

                if (notOnlyMail) {
                    return value;
                }

                format = Ext.Array.map(split, function (mail) {
                    return '<a class="link" href="mailto:' + mail + '">' + mail + '</a>';
                }, this);
                
                return format.join(', ');
            }
        }
    },

    /**
     * @return {A.model.Company} Модель компании.
     */
    getCompanyModel: function () {
        if (this.model) {
            return this.model;
        }
        return this.model = Ext.create('A.model.Company');
    },

    /**
     * Переносит данные из модели компании в эту вью модель.
     */
    applyDataFromModel: function () {
        var model = this.getCompanyModel();
        var value;

        Ext.each([
            '_id',
            'name',
            'phone',
            'email',
            'time',
            'address',
            'summary',
            'reviews',
            'map',
            'rating',
            'site'
        ], function (key) {
            value = model.get(key) || '-';
            this.set(key, value);
        }, this);

        this.notify();
    },

    privates: {

        /**
         * @private
         * @property {Ext.data.Model} Модель.
         */
        model: null
    }
});