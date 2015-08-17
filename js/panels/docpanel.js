familyDocs.docPanel = (function() {

    return {
        create : function(description, imgSource, thumbnailSource) {
            var buttonsPanel = HD_.HorizontalPanel.create([
                HD_.PanelField.create({
                    name: "enlarge",
                    type: "button",
                    innerLabel: "Enlarge",
                    handler : function() {
                        window.open(imgSource, "Image");
                    }
                })
            ], "buttonspanel");

            var docPanel = HD_.VerticalPanel.create([
                HD_.HorizontalPanel.create([
                    HD_.PanelField.create({
                        name: "imagepanel",
                        type: "image",
                        initValue: thumbnailSource
                    }),
                    HD_.PanelField.create({
                        name: "descriptionpanel",
                        type: "textDisplay",
                        initValue: description,
                        style: {verticalAlign:"top"}
                    })
                ], "docpanel"),
                buttonsPanel],
                "docpanel");

            return docPanel;
        }
    };

})();
