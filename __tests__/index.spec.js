const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
jest.dontMock('fs');

describe('$', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });
    afterEach(jest.resetModules);
    it('Cherche Hello World', function () {
        window.onload(expect($('Hello World.')).toBeInTheDocument())
    });
});