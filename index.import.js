/**
 * based on glittershark/reactable
 */
import { Table } from './reactable/table.import';
import { Tr } from './reactable/tr.import';
import { Td } from './reactable/td.import';
import { Th } from './reactable/th.import';
import { Tfoot } from './reactable/tfoot.import';
import { Thead } from './reactable/thead.import';
import { Sort } from './reactable/sort.import';
import { unsafe } from './reactable/unsafe.import';

React.Children.children = function(children) {
    return React.Children.map(children, x => x) || [];
};

// Array.prototype.find polyfill - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;
            for (var i = 0; i < length; i++) {
                if (i in list) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
            }
            return undefined;
        }
    });
}

export { Table, Tr, Td, Th, Tfoot, Thead, Sort, unsafe };
