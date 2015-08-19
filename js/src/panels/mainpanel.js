imageNotes.mainPanel = (function() {

    return {
        create : function(typeOfInputValues, textVersions) {
            var mainPanel = HD_.VerticalPanel.create({name: "mainPanel"});

            mainPanel.onAddDocument = function(doc) {
                mainPanel.pushAndShow(imageNotes.docPanel.create(
                    doc.getDescription(),
                    doc.getImageSource(),
                    doc.getThumbnailSource())
                );
            };

            return mainPanel;
        }
    };

})();
