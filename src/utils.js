import os from 'os';
import path from 'path';

async function _os() {
    async function functionalOutput() {
        return Object.entries(os)
            .filter(([_, v]) => typeof v === 'function' && v.length === 0)
            .concat([['userInfo', os.userInfo]])
            .map(([k, v]) => ({[k]: v()}))
            .reduce((a, c) => ({...a, ...c}), {});
    }

    async function valueOutput() {
        return Object.entries(os)
            .filter(([_, v]) => typeof v === 'string' || typeof v === 'number')
            .map(([k, v]) => ({[k]: v}))
            .reduce((a, c) => ({...a, ...c}), {});
    }

    const fnOutput = functionalOutput();
    const values = valueOutput();

    return {
        ...await fnOutput,
        ...await values
    };
}

async function _path() {
    return {
        delimiter: path.delimiter,
        separator: path.sep,
        isWin32: path.win32.sep === path.sep && path.win32.delimiter === path.delimiter,
        isPosix: path.posix.sep === path.sep && path.posix.delimiter === path.delimiter
    };
}

export {
    _os,
    _path
};
