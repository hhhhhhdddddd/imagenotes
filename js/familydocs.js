var familyDocs = (function(){

    return {
        debugMode : HD_.Debug.isLocalHost(),

        init : function() {
            if (familyDocs.debugMode) {
                HD_.Debug.persistentLocalWarnings();
            }

            var docList = familyDocs.documents.create();
            docList.loadFromDatabase();
        }
    };
})();
