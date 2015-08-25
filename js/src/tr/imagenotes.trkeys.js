imageNotes.trKeys = (function() {

    var keysArr = [
        'enlarge_cap',
        'download_cap'
    ];

    var keys = {};
    keysArr.forEach(function(keyName) {
        keys[keyName] = keyName;
    });

    return keys;
})();