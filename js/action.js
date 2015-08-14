familyDocs.action = (function() {

    return {
        
        create : function(name, label, handler) {
            var action = Object.create(null);
            action.name = name;
            action.label = label;
            action.handler = handler;

            action.toDomNode = function() {
                var actionNode = document.createElement("button");
                actionNode.innerHTML = this.label;
                actionNode.addEventListener("click", this.handler, false);
                return actionNode;
            };

            return action;
        },

        buildActionSeparator : function() {
            var actionSeparator = document.createElement("span");
            actionSeparator.style.padding = "0px 10px 0px 0px";
            return actionSeparator;
        }
    };
})();
