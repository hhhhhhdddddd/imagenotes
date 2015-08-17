var familyDocs = (function(){

    return {
        debugMode : HD_.Debug.isLocalHost(),

        init : function() {
            if (familyDocs.debugMode) {
                HD_.Debug.persistentLocalWarnings();
            }

            var mainPanel = familyDocs.mainPanel.create();
            document.body.appendChild(mainPanel.buildDomNode());
            
            var docList = familyDocs.documents.create();
            docList.registerObserver(mainPanel);
            docList.loadFromDatabase();
        }
    };
})();
