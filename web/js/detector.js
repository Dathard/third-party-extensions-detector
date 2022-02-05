let Detector = {
    defaultExtensions: {},
    resultPageContainerWrapper: '.result-page-container-wrapper',
    resultTabsSelector: '.result-page-container .tabs .tab',
    resultTabsContentSelector: '.result-page-container .tabs-content .tab',
    allResultsTabSelector: '.result-page-container .tabs .all-extensions',
    disabledExtensionsResultsTabSelector: '.result-page-container .tabs .disabled-extensions',
    enabledExtensionsResultsTabSelector: '.result-page-container .tabs .enabled-extensions',
    allResultsTabContentSelector: '.result-page-container .tabs-content .all-extensions',
    enabledExtensionsResultsTabContentSelector: '.result-page-container .tabs-content .enabled-extensions',
    disabledExtensionsResultsTabContentSelector: '.result-page-container .tabs-content .disabled-extensions',

    run: function (form) {
        form = $(form);
        let magentoVersion = form.find('[name="magento_version"]:first').val(),
            configCode = form.find('[name="config_code"]:first').val(),
            installModules = this.prepareExtensionsList(configCode),
            thirdPartyExtensions = this.detectThirdPartyExtensions(installModules, magentoVersion);

        if (thirdPartyExtensions) {
            this.showDetectResults(thirdPartyExtensions);
        }
    },
    prepareMagentoVersionsField: function () {
        var magentoVersions = Object.keys(this.getDefaultExtensions()),
            html = '';

        magentoVersions.forEach((version) => {
            html += '<option value="' + version + '">Magento ' + version + ' </option>';
        });

        $('select[name="magento_version"]').html(html);
    },
    showDetectResults: function (results) {
        $(this.allResultsTabContentSelector)
            .data("content", this.prepareDataAttributeValue(results.all))
            .html(this.prepareResultHtml(results.all));
        $(this.enabledExtensionsResultsTabContentSelector)
            .data("content", this.prepareDataAttributeValue(results.enabled))
            .html(this.prepareResultHtml(results.enabled));
        $(this.disabledExtensionsResultsTabContentSelector)
            .data("content", this.prepareDataAttributeValue(results.disabled))
            .html(this.prepareResultHtml(results.disabled));

        this.switchResultTab($(this.allResultsTabSelector));
        $(this.resultPageContainerWrapper).addClass('active');
    },
    /**
     * @param {array} list - Extensions list
     * @return {string}
     */
    prepareDataAttributeValue: function (list) {
        let value = '';

        list.forEach((el) => {
            value += el + '\n';
        });

        return value;
    },
    /**
     * @param {array} list - Extensions list
     * @return {string}
     */
    prepareResultHtml: function (list) {
        let html = '';

        list.forEach((el) => {
            html += '<p>' + el + '</p>';
        });

        return html;
    },
    switchResultTab: function (activeTab) {
        activeTab = $(activeTab);

        $(this.resultTabsSelector).removeClass('active');
        $(this.resultTabsContentSelector).removeClass('active');
        activeTab.addClass('active');

        if (activeTab.hasClass('all-extensions')) {
            $(this.allResultsTabContentSelector).addClass('active');
        } else if (activeTab.hasClass('enabled-extensions')) {
            $(this.enabledExtensionsResultsTabContentSelector).addClass('active');
        } else if (activeTab.hasClass('disabled-extensions')) {
            $(this.disabledExtensionsResultsTabContentSelector).addClass('active');
        }
    },
    /**
     * @param {string} list - Extensions list (content from app/etc/config.php)
     */
    prepareExtensionsList: function (list) {
        let modules = [];

        let matchAll = list.matchAll(/\'([a-zA-Z_-]+)\'.?=>.?([01])/g);
        matchAll = Array.from(matchAll);

        matchAll.forEach(function(match) {
            modules.push({extension: match[1], status: match[2]});
        });

        return modules;
    },
    /**
     * @param {array} extensionsList prepare extensions list (use prepareExtensionsList)
     * @param {string} magentoVersion - Magento version
     */
    detectThirdPartyExtensions: function (extensionsList, magentoVersion) {
        let defaultExtensions = this.getMagentoDefaultExtensions(magentoVersion),
            thirdPartyExtensions = {
            all: [],
            enabled: [],
            disabled: []
        }

        if (! extensionsList.length > 0
            || defaultExtensions == false) {
            return false;
        }

        extensionsList.forEach((item) => {
            if (! defaultExtensions.includes(item.extension)) {
                thirdPartyExtensions.all.push(item.extension);
                if (item.status == 1) {
                    thirdPartyExtensions.enabled.push(item.extension);
                } else {
                    thirdPartyExtensions.disabled.push(item.extension);
                }
            }

        });

        return thirdPartyExtensions;
    },
    getDefaultExtensions: function () {
        if ($.isEmptyObject(this.defaultExtensions)) {
            this.defaultExtensions = (function() {
                var json = null;
                $.ajax({
                    'async': false,
                    'global': false,
                    'url': 'web/js/defaultExtensions.json',
                    'dataType': "json",
                    'success': function(data) {
                        json = data;
                    }
                });
                return json;
            })();
        }

        return this.defaultExtensions;
    },
    /**
     * @param {string} magentoVersion - Magento version
     */
    getMagentoDefaultExtensions: function (magentoVersion) {
        let defaultExtensions = this.getDefaultExtensions(),
             magentoVersionExtensions = defaultExtensions[magentoVersion];

        if (! magentoVersionExtensions) {
            magentoVersionExtensions = false;
        }

        return magentoVersionExtensions;
    }
}