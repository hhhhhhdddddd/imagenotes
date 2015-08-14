familyDocs.list = (function() {

    return {
        
        init : function(listWannabe) {
            listWannabe._data = {};
            listWannabe._size = 0;

            listWannabe.add = function(key, element) {
                if (this.initElement) {
                    this.initElement(element);
                }

                this._data[key] = element;
                this._size++;
            };

            listWannabe.getElement = function(key) {
                return this._data[key];
            };

            listWannabe.getSize = function() {
                return _size;
            };

            listWannabe.each = function(fun) {
                for (var key in this._data) {
                    fun(this._data[key]);
                }
            };
        },

        createIterator : function (anArray) {
            var iterator = Object.create(null);
            iterator.position = 0;
            iterator.list = anArray;

            iterator.hasNext = function() {
                return this.position < this.list.length;
            };
            
            iterator.next = function() {
                return this.list[this.position++];
            };

            return iterator;
        }
    };

})();
