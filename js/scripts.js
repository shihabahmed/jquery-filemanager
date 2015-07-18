;
(function(j) {
    j(function() {

        j.ajax({
            url: './files.json'
        }).done(function(files, textStatus, jqXHR) {
            //fileManager(files, '.explorer');
            j('.explorer').fileManager(files);
        }).fail(function(data, textStatus, jqXHR) {});

        j('.nav-inp').focusin(function() {
            j(this).animate({
                width: "350px"
            }, 700);
        });
        j('.nav-inp').focusout(function() {
            j(this).animate({
                width: "172px"
            }, 700);
        });

    });
})(jQuery);
