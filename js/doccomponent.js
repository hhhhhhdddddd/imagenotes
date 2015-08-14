familyDocs.docComponent = (function() {

    function _addActions(docComponent) {
        docComponent.actions = [];
        if (! docComponent.actionsData) {
            return;
        }

        docComponent.actionsData.forEach(function(data) {
            docComponent.actions.push(familyDocs.action.create(data.name, data.label, data.handler));
        });
    }

    return {

        init : function(docComponent) {
            docComponent.node = null; // initialisé lors de la première construction du node
            _addActions(docComponent);

            docComponent.toDomNode = function() {
                this.node = this.makeNode();
                return this.node;
            };

            docComponent.getActions = function() {
                return docComponent.actions;
            };

            docComponent.buildActionsButtons = function() {
                var actions = this.makeActionsButtons();
                return actions;
            };
        }
    };

})();
