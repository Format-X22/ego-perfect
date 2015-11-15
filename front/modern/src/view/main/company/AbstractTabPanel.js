Ext.define('A.view.main.company.AbstractTabPanel', {
    extend: 'Ext.tab.Panel',

    tabBarPosition: 'top',
    layout: {
        type: 'card',
        animation: 'flip'
    },
    defaults: {
        tab: {
            iconAlign: 'top',
            flex: 1,
            labelCls: 'no-tab-label'
        }
    }
});