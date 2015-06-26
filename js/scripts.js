;(function(j) {
    j(function() {

        j.ajax({
            url: './files.json'
        }).done(function(files, textStatus, jqXHR) {
            fileManager(files, '.explorer');
        }).fail(function(data, textStatus, jqXHR) {
        });

    });
})(jQuery);