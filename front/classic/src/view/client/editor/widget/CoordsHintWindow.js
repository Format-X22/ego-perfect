/**
 * Окно с подсказкой о получении координат компании.
 */
Ext.define('A.view.client.editor.widget.CoordsHintWindow', {
    extend: 'Ext.window.Window',
    xtype: 'clientEditorCoordsHintWindow',
    cls: 'client-editor-coords-hint-window',
    
    width: 650,
    height: 550,
    maximizable: true,
    autoShow: true,
    title: 'Подсказка в получении координат',
    defaults: {
        padding: 30
    },
    scrollable: 'vertical',
    items: [
        {
            xtype: 'component',
            padding: '45 30 30 30',
            html:
                '<b>1.</b>' +
                '<span class="simple-text-num-indent">' +
                    'Откройте сайт с ' +
                    '<a href="https://www.google.ru/maps/" target="_blank">картами Google</a>.' +
                '</span>'
        },
        {
            xtype: 'component',
            html:
                '<b>2.</b>' +
                '<span class="simple-text-num-indent">' +
                    'Найдите через поиск место расположения вашей компании.' +
                '</span><br>' +
                '<span class="simple-text-indent">' +
                    'Если у вашей компании нет точного расположения или оно не уместно -' +
                '</span><br>' +
                '<span class="simple-text-indent">' +
                    'укажите город где расположены ваши основные клиенты.' +
                '</span>'
        },
        {
            xtype: 'image',
            src: '/resources/img/clientEditorCoordsHint/search.jpg'
        },
        {
            xtype: 'component',
            html:
                '<b>3.</b>' +
                '<span class="simple-text-num-indent">' +
                    'Нажмите на найденное место на карте правой кнопкой мыши' +
                '</span><br>' +
                '<span class="simple-text-indent">' +
                    'и выберете пункт "Что здесь?".' +
                '</span><br>'
        },
        {
            xtype: 'image',
            src: '/resources/img/clientEditorCoordsHint/select.jpg'
        },
        {
            xtype: 'component',
            html:
                '<b>4.</b>' +
                '<span class="simple-text-num-indent">' +
                    'В нижней части карты появится панелька с описанием этого места.' +
                '</span><br>' +
                '<span class="simple-text-indent">' +
                    'Кликните на координаты в этой панельке.' +
                '</span>'
        },
        {
            xtype: 'image',
            src: '/resources/img/clientEditorCoordsHint/panel.jpg'
        },
        {
            xtype: 'component',
            html:
                '<b>5.</b>' +
                '<span class="simple-text-num-indent">' +
                    'Скопируйте координаты из строки поиска.' +
                '</span>'
        },
        {
            xtype: 'image',
            src: '/resources/img/clientEditorCoordsHint/coords.jpg'
        },
        {
            xtype: 'component',
            padding: '45 30 80 30',
            html:
                '<b>Готово</b> - у вас есть координаты вашей компании!'
        }
    ],

    listeners: {
        maximize: 'updateLayout',
        minimize: 'updateLayout'
    }
});