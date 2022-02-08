define([
    'jquery',
    'detectorForm'
], function ($, detectorForm) {
    return {
        initialize: function () {
            let self = this;

            detectorForm.initialize();

            $('form[name="detector_config"]').on('submit', function(event) {

                alert();

                event.preventDefault();
                self.detect();
            });
        },

        detect: function () {
            alert("113");
        }
    }
});
