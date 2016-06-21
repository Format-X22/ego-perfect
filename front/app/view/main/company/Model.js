/**
 * Вью-модель деталей компании.
 */
Ext.define('A.view.main.company.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.companyContainer',

    config: {

        /**
         * @private
         * @cfg {Ext.Template} linkTemplate Шаблон ссылки.
         */
        linkTemplate: '<a href="{href}" class="link" target="_blank" rel="nofollow noopener noreferrer">{title}</a>'
    },
    
    constructor: function () {
        this.callParent(arguments);
        
        this.setLinkTemplate(new Ext.Template(this.getLinkTemplate()));
    },
    
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
                var tokens;
                
                if (value === '-') {
                    return '';
                }

                tokens = value
                    .replace(/,|;/g, ' ')
                    .replace(/\s+/g, ' ')
                    .split(' ');

                value = Ext.Array.map(tokens, function (token) {
                    var link = token;
                    
                    if (!/(http|https):\/\/|^\/\//.test(token)) {
                        link = 'http://' + token;
                    }

                    return this.getLinkTemplate().apply({
                        href: link,
                        title: token
                    }); 
                }, this);
                
                return value.join(', ');
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

                    return this.getLinkTemplate().apply({
                        href: 'tel:+7' + num.slice(1),
                        title: phone
                    });
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
                    return this.getLinkTemplate().apply({
                        href: 'mailto:' + mail,
                        title: mail
                    });
                }, this);
                
                return format.join(', ');
            }
        },
        mobileFormatAddress: {
            get: function (getter) {
                var value = getter('address');
                var aTag;

                if (value === '-' || !value) {
                    return value;
                }

                aTag = document.createElement('a');
                aTag.href = 'https://www.google.ru/maps/place/' + value;
                
                return this.getLinkTemplate().apply({
                    href: aTag.href.toString(),
                    title: value
                });
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