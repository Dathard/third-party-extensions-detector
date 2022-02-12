let config = {
    baseUrl: "web/js",
    paths: {
        'domReady': 'libs/requirejs/domReady',
        'jquery': 'libs/jquery.min',
        'detector': 'detector',
        'checkModel': 'model/check',
        'extensionsListParser': 'model/parser/extensions-list',
        'formBuilder': 'builder/form',
        'resultPage': 'model/page/result',
        'resultPageBuilder': 'builder/result-page',
        'extensionsListDecorator': 'model/decorator/extensions-list',
        'config': 'model/config',
        'operations': 'model/operations'
    }
};

require.config(config);