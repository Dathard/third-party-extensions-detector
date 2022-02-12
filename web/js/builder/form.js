define([
    'jquery',
    'config',
    'detectorFormPage'
], function ($, config, detectorFormPage) {
    return {
        build: function () {
            this.buildMagentoVersionsField();
        },

        buildMagentoVersionsField: function () {
            let magentoVersions = Object.keys(config.getDefaultExtensions()),
                html = '';

            magentoVersions.forEach((version) => {
                html += '<option value="' + version + '">Magento ' + version + ' </option>';
            });

            $(detectorFormPage.magentoVersionsFieldSelector).html(html);
        }
    }
});
