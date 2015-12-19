/**
 * Вью-модель деталей компании.
 */
Ext.define('A.view.main.company.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.companyContainer',

    data: {
        mapMarker: null
    },

    formulas: (function () {
        var getCompany = function () {
            return A.store.Company.getAt(0);
        };
        var getter = function (name) {
            return function () {
                return getCompany().get(name);
            }
        };

        return {
            company: getCompany,
            id:      getter('id'),
            name:    getter('name'),
            phone:   getter('phone'),
            mail:    getter('mail'),
            time:    getter('time'),
            address: getter('address'),
            summary: getter('summary'),
            gallery: getter('gallery'),
            reviews: getter('reviews'),
            map:     getter('map'),

            rating: function () {
                var value = getter('rating')();

                if (value < 100) {
                    return '<i>новая</i>';
                }
                return value;
            },
            site: function () {
                var value = getter('site')();

                if (value !== '-') {
                    return Ext.String.format(
                        '<a class="link" href="{0}" target="_blank">{0}</a>',
                        value
                    );
                }
                return '';
            }
        }
    })()
});