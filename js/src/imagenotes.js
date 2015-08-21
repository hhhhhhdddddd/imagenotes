var imageNotes = (function(){

    return {
        debugMode : HD_.LocalWarnings.isLocalHost(),

        init : function() {
            if (imageNotes.debugMode) {
                HD_.LocalWarnings.persistentLocalWarnings();
            }

            var mainPanel = imageNotes.mainPanel.create();
            document.body.appendChild(mainPanel.buildDomNode());
            
            var docList = imageNotes.documents.create();
            docList.registerObserver(mainPanel);
            docList.loadFromDatabase();
        }
    };
})();
