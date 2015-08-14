familyDocs.doc = (function() {

    function _addComponent(fdocument, component) {
        familyDocs.docComponent.init(component);
        fdocument.components.push(component);
        fdocument.actions = fdocument.actions.concat(component.getActions());
    }

    return {
        
        create : function(json) {
            console.log("create - json: " + json);
            var fdocument = Object.create(null);
            fdocument.jsonObject = JSON.parse(json);
            fdocument.actions = [];

            fdocument.components = [];
            _addComponent(fdocument, familyDocs.image.create(fdocument.jsonObject.imageLocation, fdocument.jsonObject.thumbnailLocation));
            _addComponent(fdocument, familyDocs.fDescription.create(fdocument.jsonObject.description));
            
            fdocument.getName = function() {
                return this.jsonObject.name;
            };

            fdocument.buildNode = function() {
                var dataContainer = document.createElement("div");
                this.components.forEach(function(component) {
                    dataContainer.appendChild(component.toDomNode());
                });
                dataContainer.style.clear = "both";

                var actionsContainer = document.createElement("div");
                this.actions.forEach(function(action) {
                    actionsContainer.appendChild(action.toDomNode());
                    actionsContainer.appendChild(familyDocs.action.buildActionSeparator());
                });
                actionsContainer.style.clear = "both";

                var mainContainer = document.createElement("div");
                mainContainer.appendChild(dataContainer);
                mainContainer.appendChild(actionsContainer);
                mainContainer.style.padding = "0px 0px 10px 0px";
                return mainContainer;
            };

            console.log("doc.create - json: " + json);
            return fdocument;
        }
    };
})();
