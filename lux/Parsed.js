"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parsed = void 0;
class Parsed {
    constructor(str, d) {
        this.str = str;
        this.contents = str.split(d);
        // remove the last element if its empty string
        if (this.contents[this.contents.length - 1] === '') {
            this.contents = this.contents.slice(0, this.contents.length - 1);
        }
        this.index = 0;
    }
    _nextStr() {
        if (this.index < this.contents.length) {
            return this.contents[this.index++];
        }
        else {
            throw new Error("No more contents to consume from line");
        }
    }
    // Returns the remainder of the line as an array of integers
    nextIntArr() {
        if (this.index < this.contents.length) {
            return this.contents.slice(this.index, this.contents.length).map((val) => parseInt(val, 10));
        }
        else {
            throw new Error("No more contents to consume from line");
        }
    }
    nextInt() {
        const str = this._nextStr();
        return parseInt(str, 10);
    }
    // Returns the remainder of the line as an array of floats
    nextFloatArr() {
        if (this.index < this.contents.length) {
            return this.contents.slice(this.index++).map((val) => parseFloat(val));
        }
        else {
            throw new Error("No more contents to consume from line");
        }
    }
    nextFloat() {
        const str = this._nextStr();
        return parseFloat(str);
    }
    // Returns the remainder of the line as an array of strings
    nextStrArr() {
        if (this.index < this.contents.length) {
            return this.contents.slice(this.index++);
        }
        else {
            throw new Error("No more contents to consume from line");
        }
    }
    nextStr() {
        return this._nextStr();
    }
}
exports.Parsed = Parsed;
//# sourceMappingURL=Parsed.js.map