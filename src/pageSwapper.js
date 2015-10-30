/**
 * pageSwapper.js 
 * @single page swapper frame 
 * @param elem1 
 * @param elem2
 * @param option
 * @param callback
 */
(function (root, factory) {

 	//  AMD. Register as an anonymous module.
  	if (typeof define === 'function' && define.amd) {
        define(function () {
      	    return factory();
        });

    //  Next for Node.js or CommonJS. 
    } else if (typeof exports !== 'undefined' && module.exports) {
        module.exports = factory();

    //  Finally, as a browser global.
    } else {
    	root.Swapper = factory();
    }

})(this, function () {
    
    var isNode = function (elem) {
        if ( !elem ) {
            return false;
        }

        try {
            return (elem instanceof Node) || (elem instanceof HTMLElement);
        } catch (err) {}

        if ( typeof elem !== 'object' ) {
            return false;
        }

        if ( typeof elem.nodeType !== 'number' ) {
            return false;
        }

        if ( typeof elem.nodeName !== 'string' ) {
            return false;
        }

        return true;
    };

    var isInDOM = function (elem, skipNodeCheck) {
        if ( !skipNodeCheck && !isNode(elem) ) {
            throw TypeError('element must be a DOM node, got ' + elem);
        }

        while ( elem = elem.parentNode ) {
            if ( elem === document ) {
                return true;
            }
        }

        return false;
    };

    var validateElement = function (elem) {
        if ( !isNode(elem) ) {
            throw TypeError('element must be a DOM node, got ' + elem);
        }
    };

    var insertBefore = function (newElem, targetElem) {
        targetElem.parentNode.insertBefore(newElem, targetElem);
    };

    var insertAfter = function (newElem, targetElem) {
        var parent = targetElem.parentNode;

        if ( parent.lastchild === targetElem ) {
            parent.appendChild(newElem);
        } else {
            parent.insertBefore(newElem, targetElem.nextSibling);
        }
    };

    var removeNode = function (elem) {
        if ( elem.parentNode ) {
            elem.parentNode.removeChild(elem);
        }
    };

    var setStyle = function (elem1, elem2, config) {
        elem1.style['-webkit-animation-name'] = config.animateOne;
        elem1.style['-webkit-animation-duration'] = config.duration + 'ms';
        elem1.style['-webkit-animation-timing-function'] = config.easing;

        elem1.style['animation-name'] = config.animateOne;
        elem1.style['animation-duration'] = config.duration + 'ms';
        elem1.style['animation-timing-function'] = config.easing;

        elem2.style['-webkit-animation-name'] = config.animateTwo;
        elem2.style['-webkit-animation-duration'] = config.duration + 'ms';
        elem2.style['-webkit-animation-timing-function'] = config.easing;

        elem2.style['animation-name'] = config.animateTwo;
        elem2.style['animation-duration'] = config.duration + 'ms';
        elem2.style['animation-timing-function'] = config.easing;
    };

    var performSwap = function (elem1, elem2, config, callback) {
        insertAfter(elem2, elem1);
        setStyle(elem1, elem2, config);

        setTimeout(function () {
            callback();

            setTimeout(function () {
                removeNode(elem1);
            }, 0);
        }, config.duration);
    };

    var Swapper = function (elem1, elem2, options, callback) {
        validateElement(elem1);
        validateElement(elem2);

        if ( typeof options === 'function' ) {
            var callback = options;
            var options  = {};
        }

        if ( typeof options !== 'object' ) {
            throw TypeError('options must be an object');
        }

        if ( !isInDOM(elem1, true) ) {
            throw Error('elem1 must be in the DOM to be swapped');
        }

        if ( elem1._swapper ) {
            throw Error('elem1 is currently being swapped');
        } else if ( elem2._swapper ) {
            throw Error('elem2 is currently being swapped');
        }

        var config = {
            animateOne: options.animateOne || 'slideouttoleft', 
            animateTwo: options.animateTwo || 'slideinfromright',
            duration: options.duration || 400,
            easing: options.easing || 'ease-in-out'
        };

        elem1._swapper = true;
        elem2._swapper = true;

        removeNode(elem2);

        performSwap(elem1, elem2, config, function () {
            elem1._swapper = false;
            elem2._swapper = false;
            callback();
        });   
    };

    return Swapper;
});