let config = {
    baseUrl: "web/js",
    paths: {
        'domReady': 'libs/requirejs/domReady',
        'jquery': 'libs/jquery.min',

        'detector': 'model/detector',
        'detectorForm': 'model/detector-form',
        'config': 'model/config'
    }
};
require.config(config);