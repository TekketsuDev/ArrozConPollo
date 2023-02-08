"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Parsed_1 = require("./Parsed");
/**
 * Parser class to help parse a input line of data
 */
class Parser {
    constructor(d = ',') {
        this.delimiter = d;
        return this.parse.bind(this);
    }
    setDelimeter(s) {
        this.delimiter = s;
    }
    parse(str) {
        return new Parsed_1.Parsed(str, this.delimiter);
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map