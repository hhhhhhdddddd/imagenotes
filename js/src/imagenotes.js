var imageNotes = (function(){

    return {
        debugMode : HD_.Debug.isLocalHost(),

        init : function() {
            if (imageNotes.debugMode) {
                HD_.Debug.persistentLocalWarnings();
            }

            var mainPanel = imageNotes.mainPanel.create();
            document.body.appendChild(mainPanel.buildDomNode());
            
            var docList = imageNotes.documents.create();
            docList.registerObserver(mainPanel);
            docList.loadFromDatabase();
        }
    };
})();
