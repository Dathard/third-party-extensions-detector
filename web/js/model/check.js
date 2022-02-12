define([
    'jquery',
    'config',
    'detectorFormPage',
    'extensionsListParser'
], function ($, config, detectorFormPage, extensionsListParser) {
    return {
        /**
         * @return {null|Object}
         */
        execute: function () {
            let formData = this.getDetectorFormData();

            if (formData.extensions.length === 0) {
                alert('No extensions found in config.php content. \nPlease check it and try again.');
                return null;
            }

            let thirdPartyExtensions = this.detectThirdPartyExtensions(formData.extensions, formData.magentoVersion);

            if (thirdPartyExtensions.all.length === 0) {
                alert('No third-party extensions found.');
                return null;
            }

            return thirdPartyExtensions;
        },

        /**
         * @return {{extensions: string, magentoVersion: array}}
         */
        getDetectorFormData: function () {
            let detectorForm = $(detectorFormPage.detectorFormSelector);

            return  {
                magentoVersion: detectorForm.find('[name="magento_version"]:first').val(),
                extensions: extensionsListParser.parse(detectorForm.find('[name="config_code"]:first').val())
            };
        },

        /**
         * @param {array} extensionsList - prepared extensions list (use extensionsListParser.parse)
         * @param magentoVersion
         * @return {null|{all: *[], disabled: *[], enabled: *[]}}
         */
        detectThirdPartyExtensions: function (extensionsList, magentoVersion) {
            let defaultExtensions = config.getDefaultExtensionsByMagentoVersion(magentoVersion);

            if (defaultExtensions.length === 0) {
                alert('No default extensions were found for the selected Magento version.');
                return null;
            }

            let thirdPartyExtensions = {
                all: [],
                enabled: [],
                disabled: []
            };

            extensionsList.forEach((item) => {
                if (defaultExtensions.includes(item.extension)) {
                    return;
                }

                switch(item.status) {
                    case 0:
                        thirdPartyExtensions.disabled.push(item.extension);
                        break;
                    case 1:
                        thirdPartyExtensions.enabled.push(item.extension);
                        break;
                }

                thirdPartyExtensions.all.push(item.extension);
            });

            return thirdPartyExtensions;
        }
    }
});
