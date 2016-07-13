;(function(j) {
    j(function() {

        j.ajax({
            url: './sample-data/root.json'
        }).done(function(files, textStatus, jqXHR) {
            j('.explorer').fileManager(files);
        }).fail(function(data, textStatus, jqXHR) {});

        j('.nav-inp').focusin(function() {
            j(this).animate({
                width: "350px"
            }, 700);
        }).focusout(function() {
            j(this).animate({
                width: "172px"
            }, 700);
        });

    });
})(jQuery);
