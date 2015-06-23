document.createElement('folder');
document.createElement('file');

var doc, explorer,
    folderTag, fileTag, tag,
    CTRL = false,
    CMND = false,
    selection = [],
    fn = {};

fn = (function(j) {
    return {
        getSelection: function() {
            selection = [];
            var selectedItems = explorer.find('.selected'),
                item;
            for (var a = 0; a < selectedItems.length; a++) {
                item = selectedItems.eq(a);
                selection.push(item.attr('id'));
            }
        },
        sort: function(array, prop1, prop2, asc) {
            array = array.sort(function(a, b) {
                if (asc){
                    if(prop2!=null && a[prop1]==b[prop1]){
                        return (a[prop2] > b[prop2]) ? 1 : ((a[prop2] < b[prop2]) ? -1 : 0);
                    }
                    return (a[prop1] < b[prop1]) ? 1 : ((a[prop1] > b[prop1]) ? -1 : 0);
                }
                else{
                    if(prop2!=null && a[prop1]==b[prop1]){
                        return (a[prop2] < b[prop2]) ? 1 : ((a[prop2] > b[prop2]) ? -1 : 0);
                    }
                    return (b[prop1] < a[prop1]) ? 1 : ((b[prop1] > a[prop1]) ? -1 : 0);
                }
            });
        },
        renderExplorer: function(exp, filesArray) {
            for (var i = 0; i < filesArray.length; i++) {
                var file = filesArray[i];
                if (file.type == 'folder') {
                    tag = folderTag.clone();
                    tag.html(file.name);
                } else if (file.type == 'file') {
                    tag = fileTag.clone();
                    tag.attr({
                        extension: file.extension
                    });
                    tag.html(file.name + '.' + file.extension);
                }

                tag.attr({
                    id: file.id
                }).data(file);

                exp.append(tag);
            }
        }
    }
})(jQuery);


;(function(j) {
    j(function() {
        /*j.ajax({
            url: './files.json'
        }).done(function(files) {
            alert(files);
        });*/

        doc = j(document).keydown(function(e) {
            CTRL = e.ctrlKey;
            CMND = e.metaKey;
        }).keyup(function(e) {
            CTRL = e.ctrlKey;
            CMND = e.metaKey;
        });

        explorer = j('.explorer');

        folderTag = j('<folder></folder>');
        fileTag = j('<file></file>');

        doc.delegate('folder, file', 'click', function() {
            var el = j(this);
            if (CTRL || CMND) {
                el.toggleClass('selected');
            } else {
                el.siblings().removeClass('selected');
                el.addClass('selected');
            }

            fn.getSelection();
        });

        fn.sort(files, 'type', 'name', true);

        fn.renderExplorer(explorer, files);

        explorer.click(function() {
            if (!CTRL && !CMND) {
                j('.selected').removeClass('selected');
            }
            fn.getSelection();
        });
    });
})(jQuery);
