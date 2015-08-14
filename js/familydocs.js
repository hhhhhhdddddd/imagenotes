var familyDocs = (function(){

    return {

        init : function() {
            var docList = familyDocs.documents.create();
            docList.loadFromDatabase();
        }
    };
})();
