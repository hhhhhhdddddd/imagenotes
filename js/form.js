// Pas activé. Todo
familyDocs.form = (function() {

    function _buildUploaldForm() {
        var uploadFormHtml = '<form method="POST" action="upload.php" enctype="multipart/form-data">' +
            // <!-- On limite le fichier à 100Ko -->' +
            // <input type="hidden" name="MAX_FILE_SIZE" value="100 000">' +
            'Fichier : <input type="file" name="avatar">' +
            '<input type="submit" name="envoyer" value="Envoyer le fichier">' +
            '</form>';

        var uploadForm = document.createElement("div");
        uploadForm.innerHTML = uploadFormHtml;

        return uploadForm;
    }

    return {

        create : function(node) {
            var form = Object.create(null);

            form.buildCreationForm = function() {
                var uploadForm = _buildUploaldForm();

                var form = document.createElement("div");
                form.appendChild(uploadForm);

                return form;
            };

            return form;
        }
    };

})();
