familyDocs.fDocument = (function() {

    return {
        
        create : function(name) {
            var document = Object.create(null);
            document.name = name;
            document.container = document.getElementById(this.name);
            document.imageContainer = document.container.getElementsByClassName("imagecontainer")[0];
            
            document.addImage = function(imageLocation) {
                imageNode = document.createElement("img");
                imageNode.setAttribute("src", imageLocation);
                this.imageContainer.appendChild(imageNode);
            };
        }
    };
})();
