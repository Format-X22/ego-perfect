/**
 * Логика сохранения фото клиента.
 */
Ext.define('B.biz.client.Photo', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.biz.auth.util.Account'
    ],

    config: {

        /**
         * @cfg {Object} busboy Утилита получения файлов.
         */
        busboy: null,

        /**
         * @private
         * @cfg {Object} accountData Данные аккаунта.
         */
        accountData: null,

        /**
         * @private
         * @cfg {Object} uploader Утилита загрузки в облако.
         */
        uploader: null,

        /**
         * @private
         * @cfg {Number} fieldsCount Количество оставшихся полей.
         */
        fieldsCount: 11
    },

    constructor: function () {
        this.callParent(arguments);

        this.setUploader(B.Cloudinary.getCloudinaryUtil().uploader);

        B.util.Function.queue([
            this.getAccountStep,
            this.uploadImagesStep
        ], this);
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        getAccountStep: function (next) {
            var key = this.getRequestModel().get('key');

            Ext.create('B.biz.auth.util.Account', {
                key: key,
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
         */
        uploadImagesStep: function () {
            var busboy = this.getBusboy();

            busboy.on('file', this.handleFileGet.bind(this));

            this.getExpressRequest().pipe(busboy);
        },

        /**
         * @private
         * @param {String} fieldName Имя поля.
         * @param {Object} file Объектное представление файла.
         * @param {String} fileName Имя файла.
         */
        handleFileGet: function (fieldName, file, fileName) {
            if (this.isInvalidRequest(fileName)) {
                this.sendSuccessIfDone();
                return;
            }

            var publicId = this.getImagePublicName(fieldName);
            var publicIdConfig = {
                public_id: publicId
            };

            if (publicId) {
                file.pipe(this.uploadStream(publicIdConfig));
            } else {
                this.sendAccessDenied();
            }
        },

        /**
         * @private
         * @param {String} fileName Имя файла.
         * @return {Boolean} Результат проекта.
         */
        isInvalidRequest: function (fileName) {
            return !/\.jpg$|\.png$/i.test(fileName);
        },

        /**
         * @private
         * @param {Object} config Конфиг для загрузки.
         * @return {Object} Объект процесса загрузки.
         */
        uploadStream: function (config) {
            var doneFn = this.sendSuccessIfDone.bind(this);
            var uploader = this.getUploader();

            return uploader.upload_stream(doneFn, config);
        },

        /**
         * @private
         * @param {String} fieldName Имя поля.
         * @return {String/Null} Имя публичного файла либо null.
         */
        getImagePublicName: function (fieldName) {
            var id = this.getAccountData()._id;

            switch (fieldName) {
                case 'logo':
                    return id;
                case 'photo1':
                    return id + '_1';
                case 'photo2':
                    return id + '_2';
                case 'photo3':
                    return id + '_3';
                case 'photo4':
                    return id + '_4';
                case 'photo5':
                    return id + '_5';
                case 'photo6':
                    return id + '_6';
                case 'photo7':
                    return id + '_7';
                case 'photo8':
                    return id + '_8';
                case 'photo9':
                    return id + '_9';
                case 'photo10':
                    return id + '_10';
                default:
                    return null;
            }
        },

        /**
         * @private
         */
        sendSuccessIfDone: function () {
            var count = this.getFieldsCount();

            this.setFieldsCount(--count);

            if (!count) {
                this.sendSuccess();
            }
        },

        /**
         * @private
         */
        sendAccessDenied: function () {
            this.getProtocol().sendAccessDenied();
        }
    }
});