familyDocs.documents = (function() {

    function _findContainers() {
        return document.getElementsByClassName("doccontainer");
    }

    function _eachDocContainer(fun) {
        var containers = document.getElementsByClassName("doccontainer");
        for (var i = 0; i < containers.length; i++) {
            fun(containers[i]);
        }
    }

    return {
        create : function() {
            var documents = HD_.MapCollection.create();
            documents._observers = [];

            documents.addDocument = function(docName, doc) {
                this.addElement(docName, doc);
                this._observers.forEach(function(observer) {
                    observer.onAddDocument(doc);
                });
                return doc;
            };

            documents.loadFromDatabase = function() {
                var that = this;
                familyDocs.ajax.getAllDocumentsNames(function onSuccess(responseText) {
                    var docNames = responseText.split(",");
                    familyDocs.ajax.getDocuments(docNames, function processElement(docName, docJson) {
                        var doc = familyDocs.doc.create(docJson);
                        that.addDocument(docName, doc);
                    }, function onFinished() {
                        // Rien
                    }, function onError() {
                        // Rien
                    }, function onAllFinished() {
                        console.log("loadFromDatabase - onAllFinished: ajax.getAllDocumentsNames...");
                        that.eachElement(function(doc) {
                            console.log(doc.getDescription());
                        });
                    });
                }, function onError() {
                    console.log("loadFromDatabase - Error: ajax.getAllDocumentsNames");
                }, function onFinished() {
                    console.log("loadFromDatabase - onFinished...");
                });
            };

            documents.registerObserver = function(observer) {
                this._observers.push(observer);
            };

            return documents;
        }
    };
})();
