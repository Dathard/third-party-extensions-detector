define([
    'jquery',
    'resultPage'
], function ($, resultPage) {
    return {
        initialize: function () {
            let self = this;
            $(resultPage.resultTabsSelector).on('click', function(event) {
                let currentTab = $(event.currentTarget);
                self.switchResultTab(currentTab);
            });
        },

        /**
         * @param currentTab
         */
        switchResultTab: function (currentTab) {
            $(resultPage.resultTabsSelector).removeClass('active');
            $(resultPage.resultTabsContentSelector).removeClass('active');

            currentTab.addClass('active');
            switch (currentTab.attr('id')) {
                case 'all-extensions':
                    $(resultPage.allResultsTabContentSelector).addClass('active');
                    break;
                case 'enabled-extensions':
                    $(resultPage.enabledExtensionsResultTabContentSelector).addClass('active');
                    break;
                case 'disabled-extensions':
                    $(resultPage.disabledExtensionsResultTabContentSelector).addClass('active');
                    break;
            }
        }
    }
});
