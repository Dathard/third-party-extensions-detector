define([
    'jquery'
], function ($) {
    return {
        defaultExtensions: {},

        /**
         * @param {string} magentoVersion - Magento version
         * @return {Object}
         */
        getDefaultExtensionsByMagentoVersion: function (magentoVersion) {
            let magentoVersionExtensions = this.getDefaultExtensions()[magentoVersion];

            if (! magentoVersionExtensions) {
                magentoVersionExtensions = [];
            }

            return magentoVersionExtensions;
        },

        /**
         * @return {Object}
         */
        getDefaultExtensions: function () {
            if ($.isEmptyObject(this.defaultExtensions)) {
                this.defaultExtensions = this.loadDefaultExtensionsData();
            }

            return this.defaultExtensions;
        },

        /**
         * @return {Object}
         */
        loadDefaultExtensionsData: function () {
            let json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': 'config/defaultExtensions.json',
                'dataType': "json",
                'success': function(data) {
                    json = data;
                }
            });

            return json;
        }
    }
});
