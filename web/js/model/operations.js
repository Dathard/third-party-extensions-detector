define([
    'jquery',
    'resultPage'
], function ($, resultPage) {
    return {
        copyResultButtonSelector: '.result-page-container #copy',

        initialize: function () {
            let self = this;

            $(resultPage.resultTabsSelector).on('click', function(event) {
                let currentTab = $(event.currentTarget);
                self.switchResultTab(currentTab);
            });

            $(self.copyResultButtonSelector).on('click', function(event) {
                self.copyActiveResultTabContent();
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
        },

        copyActiveResultTabContent: function () {
            let tmp = $("<textarea>");
            $("body").append(tmp);
            tmp.val($(resultPage.activeResulttabContentSelector).data('content')).select();
            document.execCommand("copy");
            tmp.remove();

            alert('Successfully copied');
        }
    }
});
