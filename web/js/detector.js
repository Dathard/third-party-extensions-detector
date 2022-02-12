define([
    'jquery',
    'formBuilder',
    'resultPageBuilder',
    'checkModel'
], function ($, formBuilder, resultPageBuilder, checkModel) {
    return {
        initialize: function () {
            formBuilder.build();

            $('form[name="detector_config"]').on('submit', function(event) {
                event.preventDefault();

                let thirdPartyExtensions = checkModel.execute();
                if (null !== thirdPartyExtensions) {
                    resultPageBuilder.build(thirdPartyExtensions);
                }
            });
        }
    }
});
