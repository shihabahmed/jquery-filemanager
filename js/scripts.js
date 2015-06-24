document.createElement('folder');
document.createElement('file');


var generalMenu = [
    {
        name: 'refresh',
        img: 'images/create.png',
        title: 'create button',
        fun: function() {
            alert('i am add button')
        }
    },
    {
        name: 'sort',
        img: 'images/update.png',
        title: 'update button',
        subMenu: [
            {
                name: 'sort by name',
                title: 'It will merge row',
                img: 'images/merge.png',
                fun: function() {
                    fn.renderSorted('name', true);
                }
            }, {
                name: 'sort by file type',
                title: 'It will replace row',
                img: 'images/replace.png',
                fun: function() {
                    fn.renderSorted('extension', true);
                }  
            }
        ]
    }
];

var menu = [
    {
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
        subMenu: [
            {
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
                subMenu: [
                    {
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
                    }
                ]
            }
        ]
    }, {
        name: 'delete',
        img: 'images/delete.png',
        title: 'delete button',
        subMenu: [
            {
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
            }
        ]
    }
];

var doc, explorer,
    folderTag, fileTag, tag,
    CTRL = false,
    CMND = false,
    selection = [],
    fn = {};

fn = (function(j) {
    return {
        initContextMenu: function() {
            j('.explorer .bg').contextMenu(generalMenu, { triggerOn:'click', mouseClick: 'right' });
            j('folder, file').contextMenu(menu, { triggerOn:'click', mouseClick: 'right' });
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
        sort: function(array, prop1, prop2, asc) {
            array = array.sort(function(a, b) {
                if (asc) {
                    if (prop2 != null && a[prop1] == b[prop1]) {
                        return (a[prop2] > b[prop2]) ? 1 : ((a[prop2] < b[prop2]) ? -1 : 0);
                    }
                    return (a[prop1] < b[prop1]) ? 1 : ((a[prop1] > b[prop1]) ? -1 : 0);
                } else {
                    if (prop2 != null && a[prop1] == b[prop1]) {
                        return (a[prop2] < b[prop2]) ? 1 : ((a[prop2] > b[prop2]) ? -1 : 0);
                    }
                    return (b[prop1] < a[prop1]) ? 1 : ((b[prop1] > a[prop1]) ? -1 : 0);
                }
            });
        },
        renderExplorer: function(exp, filesArray) {
           //   exp.empty();
            exp.html('<div class="bg"></div>');
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
            fn.initContextMenu();
        },
        renderSorted: function(sortBy, asc) {
            fn.sort(files, 'type', sortBy, asc);
            fn.renderExplorer(explorer, files);
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

        fn.sort(files, 'type', 'name', true);

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
