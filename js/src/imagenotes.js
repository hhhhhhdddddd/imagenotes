var imageNotes = (function(){

    var _translaterName = "tr";

    return {
        debugMode : HD_.LocalWarnings.isLocalHost(),

        init : function() {
            var that = this;

            if (imageNotes.debugMode) {
                HD_.LocalWarnings.persistentLocalWarnings();
            }

            HD_.Translater.setAppTrProperty(that, _translaterName, "fr", imageNotes.trKeys, [
                {name: "en", translations: imageNotes.en},
                {name: "fr", translations: imageNotes.fr},
            ]);

            var mainPanel = imageNotes.mainPanel.create();
            var mainNode = mainPanel.buildDomNode();
            document.body.appendChild(mainNode);
            
            var docList = imageNotes.documents.create();
            docList.registerObserver(mainPanel);
            docList.loadFromDatabase();

            HD_.TranslaterPanel.addTranslaterPanel(that[_translaterName], mainNode, function translationHandler(translationName) {

                function refreshFieldTexts(panel) {
                    panel.mapPanels(function(pan) {
                        if (pan.refreshFieldTexts) {
                            pan.refreshFieldTexts();
                        }
                    });
                }

                that.tr.setCurrentTranlsation(translationName);
                refreshFieldTexts(mainPanel);
            });
        }
    };
})();
