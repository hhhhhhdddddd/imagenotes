imageNotes.docPanel = (function() {

    return {
        create : function(description, imgSource, thumbnailSource) {
            var buttonsPanel = HD_.HorizontalPanel.create({name: "buttonspanel"});
            buttonsPanel.pushPanelElement(HD_.PanelField.create({
                name: "enlarge",
                type: "button",
                innerLabel: "Enlarge",
                handler : function() {
                    window.open(imgSource, "Image");
                }
            }));

            buttonsPanel.pushPanelElement(HD_.PanelField.create({
                name: "download",
                type: "button",
                innerLabel: "download",
                handler : function() {
                    var encodedImage = HD_.Data.encodeImage(imgSource);
                    HD_.Download.saveEncodedData(imgSource);
                }
            }));

            var docElementsPanel = HD_.HorizontalPanel.create({name: "docelementspanel"});
            docElementsPanel.pushPanelElement(HD_.PanelField.create({
                name: "imagepanel",
                type: "image",
                initValue: thumbnailSource
            }));
            docElementsPanel.pushPanelElement(HD_.PanelField.create({
                name: "descriptionpanel",
                type: "textDisplay",
                initValue: description,
                style: {verticalAlign:"top"}
            }));

            var sourceSplit = imgSource.split("/");
            var title = sourceSplit[sourceSplit.length - 1];
            console.log("title: " + title);
            var docPanel = HD_.VerticalPanel.create({name: "docpanel"});
            docPanel.pushPanelElement(docElementsPanel);
            docPanel.pushPanelElement(buttonsPanel);

            return docPanel;
        }
    };

})();
