familyDocs.doc = (function() {

    return {
        
        create : function(json) {
            var doc = Object.create(null);
            doc.jsonObject = JSON.parse(json);

            doc.getName = function() {
                return this.jsonObject.name;
            };

            doc.getDescription = function() {
                return this.jsonObject.description;
            };

            doc.getThumbnailSource = function() {
                return this.jsonObject.thumbnailLocation;
            };

            doc.getImageSource = function() {
                return this.jsonObject.imageLocation;
            };

            return doc;
        }
    };
})();
