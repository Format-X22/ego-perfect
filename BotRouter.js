/**
 * Роутер для рендеринга страниц для ботов.
 */
Ext.define('B.BotRouter', {

    /**
     * Рендеринг необходимой страницы.
     * @param {Object} request Объект запроса Express.
     * @param {Object} response Объект ответа Express.
     */
    render: function (request, response) {
        var originalPath = request.path;
        var path = originalPath;

        if (!path || path === '/') {
            path = '/page-root-search';
        }

        path = this.normalizePath(path);
        path = this.removeRegisterId(path);
        path = this.removeCompanyId(path);

        this.getContextData(originalPath, function (error, data) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.render(path, data);
            }
        }, this);
    },

    privates: {

        /**
         * @private
         * @param {String} path Путь.
         * @return {String} Путь.
         */
        normalizePath: function (path) {
            return path
                .replace(/\//g, '')
                .replace(/_/g, '-')
                .replace(/-/g, '/');
        },

        /**
         * @private
         * @param {String} path Путь.
         * @return {String} Путь.
         */
        removeRegisterId: function (path) {
            if (/register\//.test(path)) {
                path.split('/').slice(0, -1).join('/');
            }

            return path;
        },

        /**
         * @private
         * @param {String} path Путь.
         * @return {String} Путь.
         */
        removeCompanyId: function (path) {
            if (/company\//.test(path)) {
                path = path.split('/');
                path.splice(2, 1);
                path = path.join('/');
            }

            return path;
        },

        /**
         * @private
         * @param {String} path Путь.
         * @param {Function} callback Следующий шаг, получает аргумент ошибки и аргумент данных.
         * @param {Object} scope Контекст исполнения следующего шага.
         */
        getContextData: function (path, callback, scope) {
            callback.call(scope, null, {});
        }
    }
});