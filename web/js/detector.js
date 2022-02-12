define([
    'jquery',
    'checkModel',
    'detectorFormPage',
    'formBuilder',
    'resultPageBuilder'
], function ($, checkModel, detectorFormPage, formBuilder, resultPageBuilder) {
    return {
        initialize: function () {
            formBuilder.build();

            $(detectorFormPage.detectorFormSelector).on('submit', function(event) {
                event.preventDefault();

                let thirdPartyExtensions = checkModel.execute();
                if (null !== thirdPartyExtensions) {
                    resultPageBuilder.build(thirdPartyExtensions);
                }
            });
        }
    }
});
