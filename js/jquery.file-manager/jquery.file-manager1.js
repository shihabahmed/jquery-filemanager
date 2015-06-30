document.createElement('folder');
document.createElement('file');

var doc, explorer, files,
    folderTag, fileTag, tag,
    CTRL = false,
    CMND = false,
    selection = [], fn = {},
    contextmenu = { 
        general: [
            {
                text: 'Refresh',
                action: function(e){
                    e.preventDefault();
                    location.reload();
                }
            }, {
                text: 'Sort',
                subMenu: [
                    {
                        text: 'Sort by name',
                        action: function(e){
                            e.preventDefault();
                            fn.renderSorted(['type', 'name', 'extension'], true);
                        }
                    }, {
                        text: 'Sort by type',
                        action: function(e){
                            e.preventDefault();
                            fn.renderSorted(['type', 'extension', 'name'], true);
                        }
                    }
                ]
            }
        ],

        item: [
            {
                name: 'create',
                img: 'images/create.png',
                title: 'create button',
                fun: function() {
                    alert('i am add button');
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
                            alert('It will merge row');
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
        ]
   

    };

fn = (function(j) {
    return {
        initContextMenu: function() {
            context.init({preventDoubleContext: false});
            context.attach(explorer.find('.bg'), contextmenu.general);
        },

        initSelectable: function(el) {
            var preSelectedItems = [];
            el.selectable({
                filter: 'file, folder',
                selected: function( event, ui ) {
                    preSelectedItems.push(j(ui.selected));
                },
                stop: function( event, ui ) {
                    if (CTRL || CMND) {
                        for(var i = 0; i < preSelectedItems.length; i++) {
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
                drag: function (event, ui) {
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
            console.clear();
            console.log(selection);
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
                }

                tag.attr({
                    id: file.id
                }).data(file);

                explr.append(tag);
            }

            fn.initContextMenu();

            fn.initSelectable(explr);

            fn.initDraggable(j('file, folder'));

            fn.initDroppable(j('folder'));
        },

        renderSorted: function(sortBy, asc) {
            fn.sort(files, sortBy, asc);
            fn.renderExplorer(explorer, files);
        },

        drop: function(item, container) {
            console.clear();
            console.log(item.data());
            console.log(container.data());
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

        folderTag = j('<folder></folder>');
        fileTag = j('<file></file>');

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
};

$(document).ready(function(){

    /*context.attach('body', [

        {header: 'Download'},
        {text: 'The Script', subMenu: [
            {header: 'Requires jQuery'},
            {text: 'context.js', href: 'http://lab.jakiestfu.com/contextjs/context.js', target:'_blank', action: function(e){
                _gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
            }}
        ]},
        {text: 'The Styles', subMenu: [

            {text: 'context.bootstrap.css', href: 'http://lab.jakiestfu.com/contextjs/context.bootstrap.css', target:'_blank', action: function(e){
                _gaq.push(['_trackEvent', 'ContextJS Bootstrap CSS Download', this.pathname, this.innerHTML]);
            }},

            {text: 'context.standalone.css', href: 'http://lab.jakiestfu.com/contextjs/context.standalone.css', target:'_blank', action: function(e){
                _gaq.push(['_trackEvent', 'ContextJS Standalone CSS Download', this.pathname, this.innerHTML]);
            }}
        ]},
        {divider: true},        
        {header: 'Meta'},
        {text: 'The Author', subMenu: [
            {header: '@jakiestfu'},
            {text: 'Website', href: 'http://jakiestfu.com/', target: '_blank'},
            {text: 'Forrst', href: 'http://forrst.com/people/jakiestfu', target: '_blank'},
            {text: 'Twitter', href: 'http://twitter.com/jakiestfu', target: '_blank'},
            {text: 'Donate?', action: function(e){
                e.preventDefault();
                $('#donate').submit();
            }}
        ]},
        {text: 'Hmm?', subMenu: [
            {header: 'Well, thats lovely.'},
            {text: '2nd Level', subMenu: [
                {header: 'You like?'},
                {text: '3rd Level!?', subMenu: [
                    {header: 'Of course you do'},
                    {text: 'MENUCEPTION', subMenu: [
                        {header:'FUCK'},
                        {text: 'MAKE IT STOP!', subMenu: [
                            {header: 'NEVAH!'},
                            {text: 'Shieeet', subMenu: [
                                {header: 'WIN'},
                                {text: 'Dont Click Me', href: 'http://bit.ly/1dH1Zh1', target:'_blank', action: function(){
                                    console.log(this);
                                }}
                            ]}
                        ]}
                    ]}
                ]}
            ]}
        ]}
    ]);*/


});