/**
 * Миксина определяет способ работы с классами,
 * предоставляющими результат асинхронно.
 *
 * Устанавливает 3 колбека, первый {@link #success} вызывается в случае успеха,
 * второй {@link #failure} в случае провала и третий {@link #always} в любом случае.
 * Так как подобные классы часто нужны для единственного
 * исполнения конструктора и последующего уничтожения -
 * также предоставлен флаг {@link #autoDestroy}, указывающий на необходимость
 * уничтожения класса сразу после исполнения третьего {@link #always} колбека.
 *
 * Для вызова любого колбека необходимо использовать специальный метод,
 * существующий для каждого колбека -
 * {@link #callSuccess}, {@link #callFailure}, {@link #callAlways},
 * который вызовет соответствующий колбек,
 * передав в него полученные при вызове аргументы.
 *
 * Также для упрощение включен автоматический вызов {@link #callAlways} при вызове
 * {@link #callSuccess} или {@link #callFailure},
 * отключается флагом {@link #autoCallAlways}, при отключение
 * необходимо помнить что автоуничтожение класса происходит только после
 * вызова {@link #callAlways}.
 * Отключение авто-вызова может быть применено в том случае когда
 * необходимо вызывать {@link #always} со своими, специальными аргументами.
 */
Ext.define('B.mixin.AsyncResult', {

    config: {

        /**
         * @cfg {Function} success
         * Обработчик на случай удачного выполнения.
         */
        success: Ext.emptyFn,

        /**
         * @cfg {Function} failure
         * Обработчик на случай ошибки выполнения.
         */
        failure: Ext.emptyFn,

        /**
         * @cfg {Function} always
         * Обработчик, выполняемый всегда.
         * Исполняется после {@link #success} или {@link #failure}.
         */
        always: Ext.emptyFn,

        /**
         * @cfg {Function} scope
         * Скоп исполнения колбеков.
         */
        scope: null,

        /**
         * @cfg {Boolean} autoCallAlways
         * Указывает на необходимость автоматически вызывать {@link #callAlways}
         * при вызове {@link #callSuccess} или {@link #callFailure}.
         * При выключении также перестает происходить автоматическое уничтожение класса
         * вызовами {@link #callSuccess} или {@link #callFailure}
         * из-за того что для уничтожения необходимо вызвать {@link #callAlways}.
         *
         * Отключение авто-вызова может быть применено в том случае когда
         * необходимо вызывать {@link #always} со своими, специальными аргументами.
         */
        autoCallAlways: true,

        /**
         * @cfg {Boolean} autoDestroy
         * Указывает на необходимость уничтожения класса после выполнения.
         * Исполняется после {@link #always}.
         */
        autoDestroy: true
    },

    /**
     * Вызывает {@link #success} колбек, затем {@link #always}.
     * Передает все входящие аргументы колбекам.
     * При необходимости - происходит уничтожение класса.
     * Также смотри флаг {@link #autoCallAlways}.
     */
    callSuccess: function () {
        this.getSuccess().apply(this.getScope(), arguments);

        if (this.getAutoCallAlways()) {
            this.callAlways.apply(this, arguments);
        }
    },

    /**
     * Вызывает {@link #failure} колбек, затем {@link #always}.
     * Передает все входящие аргументы колбекам.
     * При необходимости - происходит уничтожение класса.
     * Также смотри флаг {@link #autoCallAlways}.
     */
    callFailure: function () {
        this.getFailure().apply(this.getScope(), arguments);

        if (this.getAutoCallAlways()) {
            this.callAlways.apply(this, arguments);
        }
    },

    /**
     * Вызывает {@link #always} колбек.
     * Передает все входящие аргументы колбеку.
     * При необходимости - происходит уничтожение класса.
     * Также смотри флаг {@link #autoCallAlways}.
     */
    callAlways: function () {
        this.getAlways().apply(this.getScope(), arguments);

        if (this.getAutoDestroy()) {
            this.destroy();
        }
    }
});