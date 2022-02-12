define([], function () {
    return {
        /**
         * @param {array} extensionsList
         * @return {string}
         */
        toHtml: function (extensionsList) {
            let html = '';

            extensionsList.forEach((el) => {
                html += '<p>' + el + '</p>';
            });

            return html;
        },

        /**
         * @param {array} extensionsList
         * @return {string}
         */
        toText: function (extensionsList) {
            let text = '';

            extensionsList.forEach((extensionName) => {
                text += extensionName + '\n';
            });

            return text;
        }
    }
});
