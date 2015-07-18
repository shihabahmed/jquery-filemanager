document.createElement('folder');
document.createElement('file');

var print = function(param) {
    console.log(param);
};

var doc, explorer, files,
    folderTag, fileTag, tag,
    searchBox,
    CTRL = false,
    CMND = false,
    selection = [],
    fn = {},
    contextmenu = {
        general: [{
            name: 'refresh',
            img: 'images/create.png',
            title: 'create button',
            fun: function() {
                location.reload();
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
        }],

        item: [{
            name: 'Download',
            img: '',
            title: 'delete file or folder',
            fun: function() {
                alert('i am add button');
            }
        }, {
            name: 'Delete..',
            img: '',
            title: 'delete',
           
        },
        {
            name: 'Rename..',
            img: '',
            title: 'Rename',
           
        },
        {
            name: 'Paste..',
            img: '',
            title: 'Paste',
           
        },
        {
            name: 'Copy..',
            img: '',
            title: 'Copy',
           
        }

        ]
    };

fn = (function(j) {
    return {
        renderNav: function(el) {
            j.get('./js/jquery.file-manager/nav-template.htm', function(nav, textStatus, jqXHR) {
                el.before(nav);
                searchBox = j('.fileSearchBox');
            });
        },

        initContextMenu: function() {
            explorer.find('.bg').contextMenu(contextmenu.general, {
                triggerOn: 'contextmenu'
            });

            explorer.find('folder, file').contextMenu(contextmenu.item, {
                triggerOn: 'contextmenu'
            });
        },

        initSelectable: function(el) {
            var preSelectedItems = [];
            el.selectable({
                filter: 'file, folder',
                distance: 1,
                selected: function(event, ui) {
                    preSelectedItems.push(j(ui.selected));
                },
                stop: function(event, ui) {
                    if (CTRL || CMND) {
                        for (var i = 0; i < preSelectedItems.length; i++) {
                            var item = j(preSelectedItems[i]);
                            if (item.hasClass('selected')) {
                                item.removeClass('ui-selected').removeClass('selected');
                            } else {
                                item.addClass('selected');
                            }
                        }
                    }

                    preSelectedItems = [];
                    fn.getSelection();
                }
            });
        },

        initDraggable: function(el) {
            el.draggable({
                revert: true,
                delay: 200,
                containment: "parent",
                drag: function(event, ui) {
                    var item = ui.helper;
                    item.siblings().removeClass('ui-selected').removeClass('selected');
                    item.addClass('ui-selected').addClass('selected');
                }
            });
        },

        initDroppable: function(el) {
            el.droppable({
                hoverClass: 'drop-container',
                drop: function(event, ui) {
                    fn.drop(j(ui.draggable[0]), j(this));
                }
            });
        },

        getSelection: function() {
            selection = [];
            var selectedItems = explorer.find('.ui-selected'),
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

        renderExplorer: function(explr, filesArray) {
            explr.html('<div class="bg" style="position:absolute;top:0;left:0;right:0;bottom:0;z-index:0;"></div>');

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
                    j(tag).prop('title',file.name);
                }

                tag.attr({
                    id: file.id
                }).data(file);

                explr.append(tag);
            }

            fn.initSelectable(explr);
            fn.initDraggable(j('file, folder'));
            fn.initDroppable(j('folder'));
            fn.initContextMenu();
        },

        renderSorted: function(sortBy, asc) {
            fn.sort(files, sortBy, asc);
            fn.renderExplorer(explorer, files);
        },

        drop: function(item, container) {
            /*console.clear();
            console.log(item.data());
            console.log(container.data());*/
        }
    }
})(jQuery);


var fileManager = function(jsonData, wrapper) {
    files = jsonData;

    (function(j) {

        doc = j(document).keydown(function(e) {
            CTRL = e.ctrlKey;
            CMND = e.metaKey;
        }).keyup(function(e) {
            CTRL = e.ctrlKey;
            CMND = e.metaKey;
        });

        explorer = j(wrapper).addClass('file-manager-window');
        fn.renderNav(explorer);

        folderTag = j('<folder></folder>');
        fileTag = j('<file></file>');


        explorer.delegate('.bg', 'click', function() {
            searchBox.blur();
            explorer.find('.bg, folder, file').contextMenu('close');
        });

        doc.delegate('.fileSearchBox', 'keyup', function() {
            var key = j(this).val(),
                contents = j('file, folder').show();
            if (key == '' || key == undefined) {
                contents.show();
            } else {
                contents.not(':contains("' + key + '")').hide();
            }
        }).delegate('.fileSearchBox', 'focusin', function() {
            j(this).animate({
                width: "350px"
            }, 500);
        }).delegate('.fileSearchBox', 'focusout', function() {
            j(this).animate({
                width: "172px"
            }, 500);
        });

        doc.delegate('folder, file', 'click', function() {
            var el = j(this);
            if (CTRL || CMND) {
                el.toggleClass('ui-selected').toggleClass('selected');
            } else {
                el.siblings().removeClass('ui-selected').removeClass('selected');
                el.addClass('ui-selected').addClass('selected');
            }

            fn.getSelection();
        });
        j(document).delegate('.toolbar-new-folder','click',function(){
            var person = prompt("Enter the folder name", "New folder");
        });

        j(document).delegate('.toolbar-gridview','click',function(){
            j('.explorer').removeClass('list-view');
        });

        j(document).delegate('.toolbar-listview','click',function(){
            j('.explorer').addClass('list-view');
        });

        fn.sort(files, ['type'], true);

        fn.renderExplorer(explorer, files);

        explorer.click(function() {
            if (!CTRL && !CMND) {
                j('.ui-selected').removeClass('ui-selected');
            }
            fn.getSelection();
        });

        fn.initContextMenu();

    })(jQuery);
}
