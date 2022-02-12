define([
    'jquery',
    'extensionsListDecorator',
    'resultPage',
    'operations'
], function ($, extensionsListDecorator, resultPage, operations) {
    return {
        build: function (results) {
            this.prepareTabContent(resultPage.allResultsTabContentSelector, results.all);
            this.prepareTabContent(resultPage.enabledExtensionsResultTabContentSelector, results.enabled);
            this.prepareTabContent(resultPage.disabledExtensionsResultTabContentSelector, results.disabled);

            operations.switchResultTab($('#all-extensions'));
            $(resultPage.resultPageContainerWrapperSelector).addClass('active');
        },

        /**
         * @param tabSelector
         * @param results
         */
        prepareTabContent: function (tabSelector, results) {
            $(tabSelector)
                .data("content", extensionsListDecorator.toText(results))
                .html(extensionsListDecorator.toHtml(results));
        }
    }
});
