import {_getPath, _readLine, ConfigLine} from '../../src/util/vlcrc'
import * as path from "path";

describe('vlcrc', function () {
    it('_getPath', () => {
        const x = _getPath();
        expect(x).toBe(path.resolve('C:\\Users\\dylha\\AppData\\Roaming\\vlc\\vlcrc'));
    });
    it('_readLine', () => {
        const x: ConfigLine = _readLine('http-password==Qwerty');
        expect(x.key).toBe('http-password');
        expect(x.value).toBe('=Qwerty');
        expect(x.enabled).toBe(true);
    })
});