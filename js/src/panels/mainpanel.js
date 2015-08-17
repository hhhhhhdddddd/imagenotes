imageNotes.mainPanel = (function() {

    return {
        create : function(typeOfInputValues, textVersions) {
            var mainPanel = HD_.VerticalPanel.create([], "mainPanel");

            mainPanel.onAddDocument = function(doc) {
                mainPanel.addAndShow(imageNotes.docPanel.create(
                    doc.getDescription(),
                    doc.getImageSource(),
                    doc.getThumbnailSource())
                );
            };

            return mainPanel;
        }
    };

})();
