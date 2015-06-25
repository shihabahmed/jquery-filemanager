document.createElement('folder');
document.createElement('file');

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight();
    var w1 = $div1.outerWidth();
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight();
    var w2 = $div2.outerWidth();
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function collidingWhom(knownElem, currentID) {
    $('folder').each(function() {
        var thisID = "#" + $(this).attr("id");
        if (collision(knownElem, $(thisID))) {
            if (currentID != $(this).attr("id")) {
                $(this).addClass('selected').siblings().removeClass('selected');
            }
        }

    });
}

var generalMenu = [{
    name: 'refresh',
    img: 'images/create.png',
    title: 'create button',
    fun: function() {
        location.reload()
    }
}, {
    name: 'sort',
    img: 'images/update.png',
    title: 'update button',
    subMenu: [{
        name: 'sort by name',
        title: 'It will merge row',
        img: 'images/merge.png',
        fun: function() {
            fn.renderSorted(['type', 'name', 'extension'], true);
        }
    }, {
        name: 'sort by file type',
        title: 'It will replace row',
        img: 'images/replace.png',
        fun: function() {
            fn.renderSorted(['type', 'extension', 'name'], true);
        }
    }]
}];

var menu = [{
    name: 'create',
    img: 'images/create.png',
    title: 'create button',
    fun: function() {
        alert('i am add button')
    }
}, {
    name: 'update',
    img: 'images/update.png',
    title: 'update button',
    subMenu: [{
        name: 'merge',
        title: 'It will merge row',
        img: 'images/merge.png',
        fun: function() {
            alert('It will merge row')
        }
    }, {
        name: 'replace',
        title: 'It will replace row',
        img: 'images/replace.png',
        subMenu: [{
            name: 'replace top 100',
            img: 'images/top.png',
            fun: function() {
                alert('It will replace top 100 rows');
            }
        }, {
            name: 'replace all',
            img: 'images/all.png',
            fun: function() {
                alert('It will replace all rows');
            }
        }]
    }]
}, {
    name: 'delete',
    img: 'images/delete.png',
    title: 'delete button',
    subMenu: [{
        'name': 'soft delete',
        img: 'images/soft_delete.png',
        fun: function() {
            alert('You can recover back');
        }
    }, {
        'name': 'hard delete',
        img: 'images/hard_delete.png',
        fun: function() {
            alert('It will delete permanently');
        }
    }]
}];

var doc, explorer,
    folderTag, fileTag, tag,
    CTRL = false,
    CMND = false,
    selection = [],
    fn = {};

fn = (function(j) {
    return {
        initContextMenu: function() {
            j('.explorer .bg').contextMenu(generalMenu, {
                triggerOn: 'click',
                mouseClick: 'right'
            });
            j('folder, file').contextMenu(menu, {
                triggerOn: 'click',
                mouseClick: 'right'
            });
            fn.drag();
        },
        getSelection: function() {
            selection = [];
            var selectedItems = explorer.find('.selected'),
                item;
            for (var a = 0; a < selectedItems.length; a++) {
                item = selectedItems.eq(a);
                selection.push(item.attr('id'));
            }
        },
        sort: function(array, propArray, asc) {
            array = array.sort(function(a, b) {
                if (asc) {
                    for (var i = 0; i < propArray.length; i++) {
                        if (a[propArray[i]] == b[propArray[i]]) {
                            continue;
                        }
                        return (a[propArray[i]] > b[propArray[i]]) ? 1 : -1;
                    }
                } else {
                    for (var i = 0; i < propArray.length; i++) {
                        if (a[propArray[i]] == b[propArray[i]]) {
                            continue;
                        }
                        return (a[propArray[i]] < b[propArray[i]]) ? 1 : ((a[propArray[i]] > b[propArray[i]]) ? -1 : 0);
                    }
                }
                return 0;
            });
        },
        renderExplorer: function(exp, filesArray) {
            //   exp.empty();
            exp.html('<div class="bg"></div>');
            for (var i = 0; i < filesArray.length; i++) {
                var file = filesArray[i];
                if (file.type == 'directory') {
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
            fn.initContextMenu();
            fn.drag();
        },
        renderSorted: function(sortBy, asc) {
            fn.sort(files, sortBy, asc);
            fn.renderExplorer(explorer, files);
        },
        drag: function() {
            j('file,folder').draggable({

                stop: function(event, ui) {
                    j(this).css({
                        'left': 'auto',
                        'right': 'auto',
                        'top': 'auto',
                        'bottom': 'auto'
                    });


                },
                drag: function(event, ui) {
                    var draggedID = j(this).attr("id");
                    var currentDragged = j('#' + draggedID);
                    collidingWhom(currentDragged, draggedID);
                }
            });
        }
    }
})(jQuery);


;
(function(j) {
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

        fn.sort(files, ['type'], true);

        fn.renderExplorer(explorer, files);

        explorer.click(function() {
            if (!CTRL && !CMND) {
                j('.selected').removeClass('selected');
            }
            fn.getSelection();
        });




        //Calling context menu
        fn.initContextMenu();

    });
})(jQuery);
