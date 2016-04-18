/**
 * Логика размещения компании клиента.
 */
Ext.define('B.biz.client.Release', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.biz.auth.util.Account'
    ],

    config: {

        /**
         * @cfg {Boolean} isDirectMode
         * В управляемом режиме релиз производится логину, указанному в {@link #directLogin}.
         */
        isDirectMode: false,

        /**
         * @cfg {String/Null} directLogin
         * Логин, по которому необходимо произвести релиз в управляемом режиме.
         */
        directLogin: null,

        /**
         * @private
         * @cfg {Object} accountData Данные аккаунта.
         */
        accountData: null,

        /**
         * @private
         * @cfg {String[]} tagsData Массив данных для тегов.
         */
        tagsData: null,

        /**
         * @private
         * @cfg {String[]} tags Массив тегов.
         */
        tags: null,

        /**
         * @private
         * @cfg {Object} searchObject Объект поиска.
         */
        searchObject: null
    },

    constructor: function () {
        this.callParent(arguments);
        
        B.util.Function.queue([
            this.extractAccountStep,
            this.validateAccountStep,
            this.extractTagsDataStep,
            this.makeTagsStep,
            this.makeSearchObjectStep,
            this.writeSearchObjectStep,
            this.sendSuccess
        ], this);

    },

    /**
     * @protected
     * Модифицированная версия, не пытается отправить клиенту ошибку при управляемом запуске.
     */
    sendError: function () {
        if (!this.getIsDirectMode()) {
            this.callParent(arguments);
        }
    },

    /**
     * @protected
     * Модифицированная версия, не пытается отправить клиенту ошибку при управляемом запуске.
     */
    sendSuccess: function () {
        if (!this.getIsDirectMode()) {
            this.callParent(arguments);
        }
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractAccountStep: function (next) {
            var key = null;
            var login = null;

            if (this.getIsDirectMode()) {
                login = this.getDirectLogin();
            } else {
                key = this.getRequestModel().get('key');
            }

            Ext.create('B.biz.auth.util.Account', {
                key: key,
                login: login,
                type: 'company',
                scope: this,
                callback: function (acc) {
                    var data = acc.getPrivateAccountData();
                    
                    if (data) {
                        this.setAccountData(data);
                        next();
                    } else {
                        this.sendError('Данные указанного аккаунта не найдены!');
                    }
                }
            });
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        validateAccountStep: function (next) {
            var data = this.getAccountData();
            var basic =   Ext.create('B.biz.client.model.BasicData');
            var summary = Ext.create('B.biz.client.model.Summary');
            var photo =   Ext.create('B.biz.client.model.Photo');
            var words =   Ext.create('B.biz.client.model.Words');

            data.key = true; // Модели требуют наличия ключа сессии.
            
            basic.set(data);
            summary.set(data);
            photo.set(data);
            words.set(data);

            if (!basic.isValid()) {
                this.sendError('Базовые данные о компании ещё не заполнены.');
                return;
            }

            if (!summary.isValid()) {
                this.sendError('Описание компании ещё не заполнено.');
                return;
            }

            if (!photo.isValid()) {
                this.sendError('Фотографии ещё не заполнены.');
                return;
            }

            if (!words.isValid()) {
                this.sendError('Ключевые слова ещё не заполнены.');
                return;
            }

            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractTagsDataStep: function (next) {
            var data = this.getAccountData();

            this.setTagsData([
                data.name || '',
                data.word1 || '',
                data.word2 || '',
                data.word3 || '',
                data.word4 || '',
                data.word5 || '',
                data.word6 || '',
                data.word7 || '',
                data.word8 || '',
                data.word9 || '',
                data.word10 || '',
                data.address || ''
            ]);
            
            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        makeTagsStep: function (next) {
            Ext.create('B.biz.search.util.Tokens', {
                value: this.getTagsData(),
                scope: this,
                callback: function (self, value) {
                    this.setTags(value);
                    next();
                }
            });
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        makeSearchObjectStep: function (next) {
            var data = this.getAccountData();

            this.setSearchObject({
                company: B.Mongo.makeId(data._id),
                rating: 0,
                tags: this.getTags(),
                map: data.map,
                payDate: data.payDate
            });
            
            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        writeSearchObjectStep: function (next) {
            var searchObject = this.getSearchObject();
            
            B.Mongo.getCollection('search').update(
                {
                    company: searchObject.company
                },
                searchObject,
                {
                    upsert: true
                },
                function (error) {
                    if (error) {
                        this.sendError(B.Mongo.requestErrorText);
                    } else {
                        next();
                    }  
                }.bind(this)
            );
        }
    }
});