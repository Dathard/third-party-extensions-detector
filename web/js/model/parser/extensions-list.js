define([], function () {
    return {
        /**
         * @param {array} extensionsList - prepared extensions list (use extensionsListParser.parse)
         * @return {array}
         */
        parse: function (extensionsList) {
            let extensions = [];

            let matchAll = extensionsList.matchAll(/\'([a-zA-Z_-]+_[a-zA-Z_-]+)\'.?=>.?([01])/g);

            Array.from(matchAll).forEach(function(match) {
                extensions.push({
                    extension: match[1],
                    status: parseInt(match[2])
                });
            });

            return extensions;
        }
    };
});
