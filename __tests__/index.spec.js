/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
};

module.exports = config;

const { JSDOM } = require("jsdom");
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
jest.dontMock('fs');

describe('$', function () {
    let window, document;

    beforeEach(() => {
        const dom = new JSDOM(html, { url: 'https://jestjs.io/' });
        window = dom.window;
        document = window.document;
        global.document = document;
        global.window = window;
    });

    afterEach(() => {
        jest.resetModules();
        delete global.document;
        delete global.window;
    });

    it('Cherche Hello World', function () {
        window.onload = () => {
            const bodyText = document.body.textContent || document.body.innerText;
            expect(bodyText).toContain('Hello World.');
        };
        window.onload();
    });
});
