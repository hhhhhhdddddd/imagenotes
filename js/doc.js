familyDocs.doc = (function() {

    return {
        
        create : function(json) {
            var fdocument = Object.create(null);
            fdocument.jsonObject = JSON.parse(json);

            fdocument.getName = function() {
                return this.jsonObject.name;
            };

            fdocument.getDescription = function() {
                return this.jsonObject.description;
            };

            fdocument.getThumbnailSource = function() {
                return this.jsonObject.thumbnailLocation;
            };

            fdocument.getImageSource = function() {
                return this.jsonObject.imageLocation;
            };

            return fdocument;
        }
    };
})();
