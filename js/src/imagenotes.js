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
                {name: "中文(繁體)", translations: imageNotes.zhTw},
                {name: "中文(簡體)", translations: imageNotes.zhCn},
            ]);

            var mainPanel = imageNotes.mainPanel.create();
            var mainNode = mainPanel.buildDomNode();
                        
            var docList = imageNotes.documents.create();
            docList.registerObserver(mainPanel);
            docList.loadFromDatabase();

            HD_.TranslaterPanel.addTranslaterPanel(that[_translaterName], mainPanel);

            document.body.appendChild(mainNode);
        }
    };
})();
