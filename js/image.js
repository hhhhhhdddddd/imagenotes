familyDocs.image = (function() {

    return {

        create : function(imageLocation, thumbnailLocation) {
            var image = Object.create(null);
            image.thumbnailLocation = thumbnailLocation;
            image.imageLocation = imageLocation;

            image.makeNode = function() {
                var imageNode = document.createElement("img");
                imageNode.setAttribute("src", this.thumbnailLocation);
                imageNode.style.cssFloat = "left";
                return imageNode;
            };

            image.actionsData = [
            {
                name : "displayFullSize",
                label : "Agrandir l'image",
                handler : function() {
                    window.open(image.imageLocation, "Image");
                }
            }
            // Todo
            // ,
            // {
            //     name : "download",
            //     label : "Télécharger l'image",
            //     handler : function() {}
            // }
            ];

            return image;
        }
    };

})();
