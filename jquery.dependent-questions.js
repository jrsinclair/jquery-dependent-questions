/*!
 * Dependent questions jQuery plugin.
 *
 * Author: jsinclair@squiz.com.au
 *
 * Written using boilerplate code from
 * http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
 *
 * © 2012 James Sinclair
 * MIT License. 
 */

/*jslint nomen:true, browser:true*/
/*globals jQuery*/
;
(function ($, window, document, undefined) {
    "use strict";
    // See http://bit.ly/rc0Nzl for reasoning on why window, document and undefined
    // are passed in here.

    // Configuration and defaults.
    var pluginName = 'dependentQuestions',
        defaults = {
            "effect": "slide",
            // Must be one of 'slide' or 'fade'
            "duration": "fast"
        },
        effectsMap = {
            "slide": {
                "show": "slideDown",
                "hide": "slideUp"
            },
            "fade": {
                "show": "fadeIn",
                "hide": "fadeOut"
            }
        };

    // The actual plugin constructor
    function QuestionToggler(element, options) {
        this.element = element;

        // Handle options.
        this.options   = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;

        this.init();
    }

    // Initialisation. Parses all the 'data-depends-on' attributes and sets event
    // listeners.
    QuestionToggler.prototype.init = function () {
        // Find all elements that have a 'data-depends-on' attribute.
        var toHide, dataRe, dependentsMap, effect, duration;

        effect        = this.options.effect;
        duration      = this.options.duration;
        dependentsMap = {};

        // Regular expression for parsing data attribute.
        dataRe = new RegExp('([^=]*)=(.*)');

        // Fetch all the elements with 'data-depends-on' attributes.
        if (!this.element.find) { this.element = $(this.element); }
        toHide = this.element.find('[data-depends-on]');

        // Event handler for when a toggling element changes value.
        function onTogglerChange(evt) {
            var toggler, dependents, showVal, effectFunc, action;
            toggler    = $(evt.target);
            dependents = toggler.data('dependents');
            showVal    = toggler.data('showVal');
            action     = (toggler.val() === showVal) ? 'show' : 'hide';
            effectFunc = effectsMap[effect][action];
            dependents[effectFunc](duration);
        }

        // Create a map of things that need to be toggled.
        function addMapEntry(i, element) {
            var data, el;
            el   = $(element);
            data = el.data('depends-on');
            if (!dependentsMap[data]) {
                dependentsMap[data] = el;
            } else {
                dependentsMap[data] = el.add(dependentsMap[data]);
            }
        }
        toHide.each(addMapEntry);

        // Create event listeners
        function setListener(key, dependents) {
            var matches, name, showVal, toggler;
            // Parse the key value
            matches = dataRe.exec(key);
            if (!matches) { return; }
            name    = matches[1];
            showVal = matches[2];

            // Grab the relevant elements
            toggler = $('[name="' + name + '"]');
            toggler.data('dependents', dependents);
            toggler.data('showVal', showVal);
            toggler.change(onTogglerChange);
        }
        $.each(dependentsMap, setListener);

        toHide.hide();
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(
                    this,
                    'plugin_' + pluginName,
                    new QuestionToggler(this, options)
                );
            }
        });
    };

}(jQuery, window, document));