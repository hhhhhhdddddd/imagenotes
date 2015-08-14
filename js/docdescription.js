familyDocs.docDescription = (function() {

    var _types = {
        withText : {
            addNodeContent : function(descriptionNode) {
                var htmlText = this.text.replace(/\n/g,'<br>');
                descriptionNode.innerHTML = htmlText;
            }
        },

        withoutText : {
            addNodeContent : function(descriptionNode) {
                var textarea = document.createElement("textarea");
                descriptionNode.appendChild(textarea);
            }
        }
    };

    return {

        create : function(text) {
            var type = null;
            if (! text) {
                type = _types.withoutText;
            }
            else {
                type = _types.withText;
            }
            var description = Object.create(type);
            description.text = text;

            description.makeNode = function() {
                var descriptionNode = document.createElement("div");
                this.addNodeContent(descriptionNode);
                descriptionNode.style.cssFloat = "left";
                return descriptionNode;
            };

            description.actionsData = [];
            if (!text) {
                description.actionsData.push({
                    name : "addDescription",
                    label : "Ajouter",
                    handler : function() {}
                });
            }
            
            // Todo
            // {
            //     name : "updateDescription",
            //     label : "Modifier la description",
            //     handler : function() {}
            // }


            return description;
        }
    };

})();
