/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(this,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function c(e){this.img=e}function f(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},s.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),c.prototype=new t,c.prototype.check=function(){var e=v[this.img.src]||new f(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},c.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return f.prototype=new t,f.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},f.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},f.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},f.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},f.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},f.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});


var Service = {};

Service.Popup = (function (j) {
    var jMsgBox, jDialogBox, jMsgTitleBar, jMsgTitle, jMsgBody, btnOK, jTimer,
		isHtmlReady = false, popupInterval, timer, timeLeft,
		defaultOptions = {
		    titlebar: true,
		    title: 'Message',
		    message: 'This is the message content...',
		    timeout: 0
		},
		popupHTML = '<div class="bs-modal fade" id="msgBox" tabindex="-1" role="dialog" aria-labelledby="msgBoxTitle" aria-hidden="true">' +
					'	<div class="modal-dialog">' +
					'		<div class="modal-content">' +
					'			<div class="modal-header">' +
					'			    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
					'			    <h4 class="modal-title" id="msgBoxTitle"></h4>' +
					'			</div>' +
					'			<div class="modal-body">' +
					//'		    	Test content...' +
					'			</div>' +
					'			<div class="modal-footer" style="padding: 9px 20px 10px;">' +
                    //'		    	<em class="msgBoxTimer" style="text-align: left;float:left;display:none;font-size:85%;max-width:175px;">This message will automatically close in <span class="time-left"></span> seconds.</em>' +
					'   			<button type="button" class="btn btn-primary btnOK" data-dismiss="modal">OK</button>' +
                    '		    	<em class="msgBoxTimer" style="text-align: right;display:block;font-size:85%;margin-top:10px;">This message will automatically close in <span class="time-left"></span> seconds.</em>' +
					'			</div>' +
					'		</div>' +
					'	</div>' +
					'</div>';

    function init() {
        if (isHtmlReady == false) {
            isHtmlReady = true;
            j('body').append(popupHTML);

            jMsgBox = j('#msgBox');
            jDialogBox = jMsgBox.find('.modal-dialog').css('opacity', 0);
            jMsgTitleBar = jMsgBox.find('.modal-header');
            jMsgTitle = jMsgBox.find('#msgBoxTitle');
            jMsgBody = jMsgBox.find('.modal-body');
            btnOK = jMsgBox.find('.btnOK');
            jTimer = jMsgBox.find('.msgBoxTimer');
            timeLeft = jMsgBox.find('.time-left');
        }
    }

    return {
        // Shows a popup box with options (optional) provided as a JSON object.
        // - options: {
        // - - - titlebar: true,
        // - - - title: 'Message',
        // - - - message: 'This is the message content...',
        // - - - timeout: 0
        // - }
        show: function (options) {
            init();
            j.extend(defaultOptions, options);

            if (defaultOptions.titlebar == false) {
                jMsgTitleBar.hide();
                jMsgBody.css('margin-top', 10);
            } else {
                jMsgTitleBar.show();
                jMsgBody.css('margin-top', 0);
                jMsgTitle.html(defaultOptions.title);
            }

            jMsgBody.html(defaultOptions.message);
            //btnOK.text("OK");
            jTimer.hide();

            if (defaultOptions.timeout > 1) {
                btnOK.text("Close");
                jTimer.show();

                timer = parseInt(defaultOptions.timeout);
                timeLeft.text(timer);

                popupInterval = setInterval(function () {
                    timer -= 1;
                    timeLeft.text(timer);
                    if (timer == 0) {
                        clearInterval(popupInterval);
                        btnOK.click();
                    }
                }, 1000);
            }

            jMsgBox.modal({
                //keyboard: false,
                backdrop: 'static'
            }).on('shown.bs.modal', function (e) {
                jDialogBox.css({
                    'margin-top': -(jDialogBox.height() / 2),
                    'margin-left': -(jDialogBox.width() / 2)
                });

                setTimeout(function() {
                    jDialogBox.animate({
                        opacity: 1
                    });
                }, 200);
            });
        }
    }
})(jQuery);

Service.Confirm = (function (j) {
    var jMsgBox, jDialogBox, jMsgTitleBar, jMsgTitle, jMsgBody,
		btnYes, btnNo, btnClose,
		isConfirmBoxReady = false,
		defaultOptions = {
		    titlebar: true,
		    title: 'Confirm',
		    message: 'This is the question...',
		    yes: function () { },
		    no: function () { }
		},
		popupHTML = '<div class="bs-modal fade" id="confirmDialog" tabindex="-1" role="dialog" aria-labelledby="msgBoxTitle" aria-hidden="true">' +
					'	<div class="modal-dialog">' +
					'		<div class="modal-content">' +
					'			<div class="modal-header" style="padding: 8px 15px;">' +
					'   			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
					'	    		<h4 class="modal-title" id="confirmDialogTitle"></h4>' +
					'			</div>' +
					'			<div class="modal-body" style="padding: 12px 20px;">' +
					//' 			Test content...' +
					'			</div>' +
					'			<div class="modal-footer" style="padding: 9px 20px 10px;">' +
					'   			<button type="button" style="padding: 3px 16px;" class="btn btn-primary btnConfirm-Yes">Yes</button>' +
					'	    		<button type="button" style="padding: 3px 16px;" class="btn btn-danger btnConfirm-No">No</button>' +
					'		    	<button type="button" style="display:none;width:0;height:0;position:absolute;z-index:-1;" class="btn btnConfirm-Close" data-dismiss="modal"></button>' +
					'			</div>' +
					'		</div>' +
					'	</div>' +
					'</div>';

    function init() {
        if (isConfirmBoxReady == false) {
            isConfirmBoxReady = true;
            j('body').append(popupHTML);

            jMsgBox = j('#confirmDialog');
            jDialogBox = jMsgBox.find('.modal-dialog').css('opacity', 0);
            jMsgTitleBar = jMsgBox.find('.modal-header');
            jMsgTitle = jMsgBox.find('#confirmDialogTitle');
            jMsgBody = jMsgBox.find('.modal-body');
            btnYes = jMsgBox.find('.btnConfirm-Yes');
            btnNo = jMsgBox.find('.btnConfirm-No');
            btnClose = jMsgBox.find('.btnConfirm-Close');

            btnYes.click(function () {
                defaultOptions.yes.call();
                btnClose.click();
            });

            btnNo.click(function () {
                defaultOptions.no.call();
                btnClose.click();
            });
        }
    }

    return {

        // Shows a confirm dialog box with options (optional) provided as a JSON object.
        // - options: {
        // - - - titlebar: true,
        // - - - title: 'Confirm',
        // - - - message: 'This is the question...',
        // - - - yes: function() {
        // - - - 	// do something if clicked 'YES'
        // - - - },
        // - - - no: function() {
        // - - - 	// do something if clicked 'NO'
        // - - - }
        // - }
        show: function (options) {
            init();
            j.extend(defaultOptions, options);

            if (defaultOptions.titlebar == false) {
                jMsgTitleBar.hide();
                jMsgBody.css('margin-top', 10);
            } else {
                jMsgTitleBar.show();
                jMsgBody.css('margin-top', 0);
                jMsgTitle.html(defaultOptions.title);
            }

            jMsgBody.html(defaultOptions.message);

            jMsgBox.modal({
                backdrop: 'static'
            }).on('shown.bs.modal', function (e) {
                jDialogBox.css({
                    'margin-top': -(jDialogBox.height() / 2),
                    'margin-left': -(jDialogBox.width() / 2)
                });

                setTimeout(function() {
                    jDialogBox.animate({
                        opacity: 1
                    });
                }, 200);
            });
        }
    }
})(jQuery);

Service.Prompt = (function (j) {
    var jMsgBox, jMsgTitleBar, jMsgTitle, jMsgBody, jTextBox,
		prompt, jReportStatus,
		btnSubmit, btnCancel, btnClose,
		isPromptBoxReady = false,
		defaultOptions = {
		    title: 'Message',
		    height: 80,
		    placeholder: 'Write your message here...',
            validation: 'You must write a message.',
		    onSubmit: function (message) { }
		},
		popupHTML = '<div class="bs-modal fade" id="promptDialog" tabindex="-1" role="dialog" aria-labelledby="msgBoxTitle" aria-hidden="true">' +
					'	<div class="modal-dialog">' +
					'		<div class="modal-content">' +
					'			<div class="modal-header" style="padding: 8px 15px;">' +
					'   			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
					'	    		<h4 class="modal-title" id="promptDialogTitle"></h4>' +
					'			</div>' +
					'			<div class="modal-body" style="padding: 12px 20px;">' +
					' 				<textarea class="textBox" rows="4" cols="15" style="width:100%; resize: none;"></textarea>' +
                    '               <div class="prompt-error" style="display: none; color: #f00; font-size: 90%; margin-top: 4px;"></div>' +
					'			</div>' +
					'			<div class="modal-footer" style="padding: 9px 20px 10px;">' +
                    //'		    	<em class="reportStatus" style="text-align: left;float:left;display:none;font-size:85%;max-width:60px;">Submitting report...</em>' +
					'   			<button type="button" style="padding: 3px 16px;" class="btn btn-primary btnPrompt-Submit">Submit</button>' +
					'	    		<button type="button" style="padding: 3px 16px;" class="btn btn-danger btnPrompt-Cancel" data-dismiss="modal">Cancel</button>' +
                    '		    	<em class="reportStatus" style="text-align: right;display:block;font-size:85%;margin-top:10px;">Submitting report...</em>' +
					'			</div>' +
					'		</div>' +
					'	</div>' +
					'</div>';

    function init(options) {
        if (isPromptBoxReady == false) {
            isPromptBoxReady = true;
            j('body').append(popupHTML);

            jMsgBox = j('#promptDialog');
            jDialogBox = jMsgBox.find('.modal-dialog').css('opacity', 0);
            jMsgTitleBar = jMsgBox.find('.modal-header');
            jMsgTitle = jMsgBox.find('#promptDialogTitle');
            jMsgBody = jMsgBox.find('.modal-body');
            jTextBox = jMsgBody.find('.textBox');
            jReportStatus = jMsgBox.find('.reportStatus');
            btnSubmit = jMsgBox.find('.btnPrompt-Submit');
            btnCancel = jMsgBox.find('.btnPrompt-Cancel');

            prompt = {
                close: function () {
                    //btnCancel.removeAttr().click();
                    jMsgBox.modal('hide');
                }
            };

            btnSubmit.click(function () {
                j.extend(prompt, {
                    message: jTextBox.val(),
                });

                if (prompt.message.length > 0) {
                    jMsgBody.css('padding-bottom', 12).children('.prompt-error').hide().text("");
                    btnSubmit.attr('disabled', 'disabled');
                    btnCancel.attr('disabled', 'disabled');

                    jReportStatus.fadeIn();

                    defaultOptions.onSubmit.apply(this, [prompt]);
                } else {
                    jMsgBody.css('padding-bottom', 0).children('.prompt-error').text(options.validation).show();
                }
            });
        }
    }

    return {

        // Shows a input dialog box with options (optional) provided as a JSON object.
        // - options: {
        // - - - title: 'Message',
        // - - - height: 80,
        // - - - placeholder: 'Write your message here...',
        // - - - validation: 'This field is required.',
        // - - - onSubmit: function(message) {
        // - - - 	// do something if clicked 'Submit'
        // - - - }
        // - }
        show: function (options) {
            j.extend(defaultOptions, options);
            init(defaultOptions);

            jMsgTitle.html(defaultOptions.title);
            jMsgBody.css('margin-top', 0);

            jTextBox.css('height', defaultOptions.height)
					.attr('placeholder', defaultOptions.placeholder);

            jReportStatus.hide();
            btnSubmit.removeAttr('disabled');
            btnCancel.removeAttr('disabled');

            jMsgBox.modal({
                backdrop: 'static'
            }).on('shown.bs.modal', function (e) {
                jDialogBox.css({
                    'margin-top': -(jDialogBox.height() / 2),
                    'margin-left': -(jDialogBox.width() / 2)
                });

                setTimeout(function() {
                    jDialogBox.animate({
                        opacity: 1
                    }, 300, function() {
                        jTextBox.focus();
                    });
                }, 200);
            }).on('hidden.bs.modal', function (e) {
                jTextBox.val("");
            });

        }
    }
})(jQuery);


Service.Spinner = (function (j) {
    var jMsgBox, jMsgTitleBar, jMsgTitle, jMsgBody, jLabel, jTextBox,
        spinner, jReportStatus,
        btnPlus, btnMinus, btnSubmit, btnCancel, btnClose,
        isSpinnerBoxReady = false,
        defaultOptions = {
            title: 'Message',
            label: 'Quantity',
            onSubmit: function (message) { }
        },
        popupHTML = '<div class="bs-modal fade" id="spinnerDialog" tabindex="-1" role="dialog" aria-labelledby="msgBoxTitle" aria-hidden="true">' +
                    '   <div class="modal-dialog modal-sm">' +
                    '       <div class="modal-content">' +
                    '           <div class="modal-header" style="padding: 8px 15px;">' +
                    '               <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                    '               <h4 class="modal-title" id="spinnerDialogTitle"></h4>' +
                    '           </div>' +
                    '           <div class="modal-body" style="padding: 12px 20px;">' +
                    '               <div class="form-horizontal">' +
                    '                   <div class="form-group">' +
                    '                       <label class="col-sm-4 control-label spinnerBoxLabel"></label>' +
                    '                       <div class="col-sm-8">' +
                    '                           <div class="input-group">' +
                    '                               <span class="input-group-btn">' +
                    '                                   <button class="btn btn-default btnSpinner-Minus" type="button"><em class="glyphicon glyphicon-minus"></em></button>' +
                    '                               </span>' +
                    '                               <input type="text" class="form-control textBox" value="1" readonly="readonly" style="font-weight: bold; text-align: center;">' +
                    '                               <span class="input-group-btn">' +
                    '                                   <button class="btn btn-default btnSpinner-Plus" type="button"><em class="glyphicon glyphicon-plus"></em></button>' +
                    '                               </span>' +
                    '                           </div>' +
                    '                       </div>' +
                    '                   </div>' +
                    '               </div>' +
                    '           </div>' +
                    '           <div class="modal-footer" style="padding: 9px 20px 10px;">' +
                    '               <button type="button" style="padding: 3px 16px;" class="btn btn-primary btnSpinner-Submit"><em class="glyphicon glyphicon-ok"></em></button>' +
                    '               <button type="button" style="padding: 3px 16px;" class="btn btn-danger btnSpinner-Cancel" data-dismiss="modal"><em class="glyphicon glyphicon-remove"></em></button>' +
                    '               <em class="reportStatus" style="text-align: right;display:block;font-size:85%;margin-top:10px;">Sending...</em>' +
                    '           </div>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>';

    function init(options) {
        if (isSpinnerBoxReady == false) {
            isSpinnerBoxReady = true;
            j('body').append(popupHTML);

            jMsgBox = j('#spinnerDialog');
            jDialogBox = jMsgBox.find('.modal-dialog').css('opacity', 0);
            jMsgTitleBar = jMsgBox.find('.modal-header');
            jMsgTitle = jMsgBox.find('#spinnerDialogTitle');
            jMsgBody = jMsgBox.find('.modal-body');
            jLabel = jMsgBox.find('.spinnerBoxLabel');
            jTextBox = jMsgBody.find('.textBox');
            jReportStatus = jMsgBox.find('.reportStatus');
            btnPlus = jMsgBox.find('.btnSpinner-Plus');
            btnMinus = jMsgBox.find('.btnSpinner-Minus');
            btnSubmit = jMsgBox.find('.btnSpinner-Submit');
            btnCancel = jMsgBox.find('.btnSpinner-Cancel');

            spinner = {
                close: function () {
                    jMsgBox.modal('hide');
                }
            };

            btnPlus.click(function() {
                var val = jTextBox.val();
                val = parseInt(val) + 1;
                jTextBox.val(val);
            });

            btnMinus.click(function() {
                var val = jTextBox.val();
                if (val > 0) {
                    val = parseInt(val) - 1;
                    jTextBox.val(val);
                }
            });

            btnSubmit.click(function () {
                j.extend(spinner, {
                    val: jTextBox.val(),
                });

                spinner.close();
                defaultOptions.onSubmit.apply(this, [spinner]);
            });
        }
    }

    return {

        // Shows a input dialog box with options (optional) provided as a JSON object.
        // - options: {
        // - - - title: 'Message',
        // - - - label: 'Message',
        // - - - onSubmit: function(spinner) {
        // - - -    // console.log(spinner);
        // - - - }
        // - }
        show: function (options) {
            j.extend(defaultOptions, options);
            init(defaultOptions);

            jMsgTitle.html(defaultOptions.title);
            jMsgBody.css('margin-top', 0);
            jLabel.html(defaultOptions.label);

            jReportStatus.hide();
            btnSubmit.removeAttr('disabled');
            btnCancel.removeAttr('disabled');

            jMsgBox.modal({
                backdrop: 'static'
            }).on('shown.bs.modal', function (e) {
                jDialogBox.css({
                    'margin-top': -(jDialogBox.height() / 2),
                    'margin-left': -(jDialogBox.width() / 2)
                });

                setTimeout(function() {
                    jDialogBox.animate({
                        opacity: 1
                    }, 300, function() {
                        jTextBox.focus();
                    });
                }, 200);
            }).on('hidden.bs.modal', function (e) {
                jTextBox.val("1");
            });
        }
    }
})(jQuery);

Service.Loader = (function(j) {
    var options = {},
        el, elType, position, id,
        cl_container, cl_container_width, cl,
        ajaxCall = false;

    j(function() {
        _init();

        j(document).ajaxSuccess(function () {
            ajaxCall = true;
            _init();
        });
    });

    function _init() {
        j('[data-loader]').each(function(index, elem) {
            el = j(elem);
            position = el.offset();
            id = 'canvasLoader_' + index;

            elType = el[0].type;
            elTYpe = (elType ? elType.toLowerCase() : undefined);
            if (elType == 'button' || elType == 'submit' || elType == 'reset' || elType == 'file' || elType == 'text') {
                elType = 'button';
            }

            if (!el.data('loader')) {
                if (ajaxCall) {
                    j('#' + id + '_container').remove();
                }

                if (elType == 'button') {
                    j('body').append('<div id="' + id + '_container" class="canvasLoader_container"><div class="canvasLoader_bg"></div><div id="' + id + '"></div></div>');
                } else {
                    el.html('<div id="' + id + '_container" class="canvasLoader_container"><div class="canvasLoader_bg"></div><div id="' + id + '"></div></div>');
                }
                el.data({
                    'type': elType,
                    'loader': id
                });

                cl_container_width = (el.outerWidth() < el.outerHeight() ? el.outerWidth() : el.outerHeight()) - 4;
                cl_container_width = (cl_container_width > 35 ? 35 : cl_container_width);

                cl_container = j('#' + id + '_container');

                if (elType != 'button') {
                    cl_container.parent().css({
                        'position': 'relative'
                    });
                }

                cl_container.css({
                    'position': 'absolute',
                    'overflow': 'hidden',
                    'top': (elType == 'button' ? position.top : '50%'),
                    'left': (elType == 'button' ? position.left : '50%'),
                    'width': (elType == 'button' ? el.outerWidth() : cl_container_width),
                    'height': (elType == 'button' ? el.outerHeight() : cl_container_width),
                    'margin-top': (elType == 'button' ? '' : (cl_container_width * -0.5)),
                    'margin-left': (elType == 'button' ? '' : (cl_container_width * -0.5)),
                    'z-index': 999999
                }).children('.canvasLoader_bg').css({
                    'background': (el.data('background') ? el.data('background') : '#fff'),
                    'opacity': (el.data('opacity') ? el.data('opacity') : 0.8),
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'width': '100%',
                    'height': '100%'
                });

                _activate(el);
            }
        });

        ajaxCall = false;
    }

    function _activate(el) {
        options = el.data();

        cl = new CanvasLoader(options.loader);

        options.diameter = (el.outerWidth() < el.outerHeight() ? el.outerWidth() : el.outerHeight()) - 4;
        options.diameter = (options.diameter > 35 ? 35 : options.diameter);

        cl.setShape(options.shape ? options.shape : 'spiral');
        cl.setColor(options.color ? options.color : '#000000');
        cl.setDiameter(options.diameter);
        cl.setDensity(options.density ? options.density : 50);
        cl.setRange(options.range ? options.range : 1);
        cl.setSpeed(options.speed ? options.speed : 2);
        cl.setFPS(options.fps ? options.fps : 25);
        cl.show();

        j("#canvasLoader")
            .attr('id', options.loader + '_loader')
            .css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'margin-top': (options.diameter * -0.5),
                'margin-left': (options.diameter * -0.5)
            });

        if (el.data('visible') != true) {
            j('#' + options.loader + '_container').hide();
        }
    }

    return {
        reset: function() {
            _init();
        },

        show: function (selector) {
            j(selector).each(function (index, _el) {
                var el = j(_el),
                    options = el.data();

                if (_el.type == 'button' || _el.type == 'submit' || _el.type == 'reset') {
                    //el.css('opacity', '0.5');
                    el.attr('disabled', 'disabled').addClass('disabled');
                    j('#' + options.loader + '_container .canvasLoader_bg').css({
                        'background': 'transparent'
                    });
                }

                var el_loader = j('#' + options.loader + '_container');

                if (el.data('type') == 'button') {
                    el_loader.css({
                        'top': el.offset().top,
                        'left': el.offset().left,
                        'width': el.outerWidth(),
                        'height': el.outerHeight()
                    }).fadeIn();

                    j(window).resize(function () {
                        //el_loader.hide();

                        //setTimeout(function () {
                            el_loader.css({
                                'top': el.offset().top,
                                'left': el.offset().left,
                                'width': el.outerWidth(),
                                'height': el.outerHeight()
                            });
                        //}, 500);
                    }).resize();
                } else {
                    el_loader.fadeIn();
                }
            });
        },

        hide: function (selector) {
            j(selector).each(function (index, _el) {
                //j('#' + j(el).css('opacity', 1).data('loader') + '_container').fadeOut();

                var el = j(_el);

                if (_el.type == 'button' || _el.type == 'submit' || _el.type == 'reset') {
                    el.removeAttr('disabled', 'disabled').removeClass('disabled');
                }
                j('#' + el.data('loader') + '_container').fadeOut();
            });
        }
    }
})(jQuery);

var __scrollTo;
(function (j) {
	__scrollTo = function(el, margin) {
		j('html, body').animate({
			scrollTop: j(el).offset().top - (margin ? margin : 0)
		});
	}
})(jQuery);

Service.ScrollTo = __scrollTo;
