import {_getPath} from '../../src/util/vlcrc'
import * as path from "path";

describe('vlcrc', function () {
    it('_getPath', () => {
        const x = _getPath();
        expect(x).toBe(path.resolve('C:\\Users\\dylha\\AppData\\Roaming\\vlc\\vlcrc'));
    });
});