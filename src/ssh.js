import {existsSync, lstatSync, readdirSync, readFileSync} from 'fs';
import {join} from 'path';
import {_path} from './utils.js';
import {homedir} from "os";

// async function get__dirname() {
//     // depends upon
//     import {dirname} from 'path';
//     import {fileURLToPath} from 'url';
//     const __dirname = dirname(fileURLToPath(import.meta.url));
// return __dirname
// }

const {isPosix, isWin32} = await _path();

/* this is our exported functionality.
 * But we have divided it into posix vs windows.
 */
let getSSHInfo;

if (isPosix) {
    // TODO: remove
    console.log('posix');
    getSSHInfo = async function () {
        const defaultPath = join(homedir(), `.ssh`);
        const existsSSHDir = existsSync(defaultPath);

        if (existsSSHDir) {
            const readDir = readdirSync(defaultPath);
            const files = readDir
                .map(i => ({name: i, path: join(defaultPath, i)}))
                .map(({name, path}) => ({name, path, stat: lstatSync(path)}));

            const publicKeys = readDir.filter(i => i.endsWith('.pub'));
            const publicKeysData = publicKeys
                .map(k => ({key: k, path: join(defaultPath, k)}))
                .map(({key, path}) => ({name: key, path, [path]: readFileSync(path).toString()}));

            return {
                files,
                publicKeys,
                publicKeysData
            };
        }

        return [null];
    };
}

if (isWin32) {
    console.log('windows');
    getSSHInfo = async function () {
        console.log('Where are we? windows??');
    };
}

// await getSSHInfo();

export {
    getSSHInfo
};
