let config = {
    baseUrl: "web/js",
    paths: {
        'domReady': 'libs/requirejs/domReady',
        'jquery': 'libs/jquery.min',

        'checkModel': 'model/check',
        'config': 'model/config',
        'detector': 'detector',
        'detectorFormPage': 'model/page/detector-form',
        'extensionsListDecorator': 'model/decorator/extensions-list',
        'extensionsListParser': 'model/parser/extensions-list',
        'formBuilder': 'builder/form',
        'operations': 'model/operations',
        'resultPage': 'model/page/result',
        'resultPageBuilder': 'builder/result-page',
    }
};

require.config(config);