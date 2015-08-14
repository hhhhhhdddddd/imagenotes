familyDocs.fDescription = (function() {

    return {

        create : function(text) {
            var description = Object.create(null);
            description.text = text;

            description.makeNode = function() {
                var htmlText = this.text.replace(/\n/g,'<br>');
                var descriptionNode = document.createElement("div");
                descriptionNode.innerHTML = htmlText;
                descriptionNode.style.cssFloat = "left";
                return descriptionNode;
            };

            description.actionsData = [
            // Todo
            // {
            //     name : "updateDescription",
            //     label : "Modifier la description",
            //     handler : function() {}
            // }
            ];

            return description;
        }
    };

})();
