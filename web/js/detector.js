let Detector = {
    resultTabsSelector: '.result-page-container .tabs .tab',

    run: function (form) {
        var form = $(form),
            magentoVersion = form.find('[name="magento_version"]:first').val(),
            configCode = form.find('[name="config_code"]:first').val();

        var installModules = this.prepareExtensionsList(configCode),
            detectThirdPartyExtensions = this.detectThirdPartyExtensions(installModules);

        var json;

        var json = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "web/js/defaultExtensions.json",
                'dataType': "json",
                'success': function(data) {
                    json = data;
                }
            });
            return json;
        })();

        console.log(json);

        // fetch("web/js/defaultExtensions.json")
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => console.log(data));

        console.log(magentoVersion);
        console.log(configCode);
        console.log(installModules);
    },
    prepareResultPage: function (data) {

    },
    switchResultTab: function (el) {
        let self = this;
        if (! $(el).hasClass('active')) {
            $(this.resultTabsSelector).removeClass('active');
            $(el).addClass('active');
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
     * @param {string} extensionsList підготовлений списое екстеншинів (вокирист. prepareExtensionsList)
     * @param {string} magentoVersion - Magento version
     */
    detectThirdPartyExtensions: function (extensionsList, magentoVersion) {
        let defaultExtensions = this.getMagentoDefaultExtensions(magentoVersion);
        let thirdPartyExtensions = {
            all: [],
            enabled: [],
            disabled: []
        }

        if (defaultExtensions == false) {
            return false;
        }

        extensionsList.forEach((item) => {
            if (defaultExtensions.includes(item.extension)) {
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
    /**
     * @param {string} magentoVersion - Magento version
     */
    getMagentoDefaultExtensions: (magentoVersion) => {
        switch(magentoVersion) {
            case '2.3.1':
                return [];
            default:
                return false;
        }
    }
}