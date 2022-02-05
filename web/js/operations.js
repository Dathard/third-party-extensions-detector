let Operations = {
    resultPageContainerWrapper: '.result-page-container .tabs-content .tab.active',
    copyActiveResultTabContent: function () {
        let tmp = $("<textarea>");
        $("body").append(tmp);
        tmp.val($(this.resultPageContainerWrapper).data('content')).select();
        document.execCommand("copy");
        tmp.remove();

        alert('Successfully copied');
    }
}