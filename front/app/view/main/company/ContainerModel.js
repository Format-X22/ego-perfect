Ext.define('A.view.main.company.ContainerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.companyContainer',

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
            company:      getCompany,
            id:           getter('id'),
            name:         getter('name'),
            rating:       getter('rating'),
            phone:        getter('phone'),
            site:         getter('site'),
            mail:         getter('mail'),
            time:         getter('time'),
            address:      getter('address'),
            socialHrefN1: getter('socialHrefN1'),
            socialHrefN2: getter('socialHrefN2'),
            socialHrefN3: getter('socialHrefN3'),
            socialHrefN4: getter('socialHrefN4'),
            socialIconN1: getter('socialIconN1'),
            socialIconN2: getter('socialIconN2'),
            socialIconN3: getter('socialIconN3'),
            socialIconN4: getter('socialIconN4'),
            summary:      getter('summary'),
            gallery:      getter('gallery'),
            reviews:      getter('reviews'),
            map:          getter('map')
        }
    })()
});