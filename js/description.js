familyDocs.fdescription = (function() {

    return {
        create : function(node) {
            var description = Object.create(null);
            description.node = node;

            description.toTextarea = function() {
                this.node.style.backgroundColor = "red";
            };

            return description;
        }
    };

})();
