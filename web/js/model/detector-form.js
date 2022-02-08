define([
    'jquery',
    'config'
], function ($, config) {
    return {
        magentoVersionsFieldSelector: 'form[name="detector_config"] select[name="magento_version"]',

        initialize: function () {
            this.initMagentoVersionsField();
        },

        initMagentoVersionsField: function () {
            let magentoVersions = Object.keys(config.getDefaultExtensions()),
                html = '';

            magentoVersions.forEach((version) => {
                html += '<option value="' + version + '">Magento ' + version + ' </option>';
            });

            $(this.magentoVersionsFieldSelector).html(html);
        }
    }
});
