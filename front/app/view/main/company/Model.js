/**
 * Вью-модель деталей компании.
 */
Ext.define('A.view.main.company.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.companyContainer',

    data: {
        mapMarker: null,
        _id:       '',
        search_id: 'sample',
        name:      '',
        phone:     '',
        email:      '',
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

                if (value !== '-') {
                    return Ext.String.format(
                        '<a class="link" href="{0}" target="_blank">{0}</a>',
                        value
                    );
                }
                return '';
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
            'search_id',
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