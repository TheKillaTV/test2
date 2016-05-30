'use strict';

let nock = require('nock');
let request = require('supertest');
let assert = require('assert');
let Bot = require('../index.js');

const BOT_USERNAME = 'qwsbot';
const BOT_API_KEY = 'a907b85e-637d-4407-9ecb-7553bcae9572';

describe('Bot construction', () => {
    it('throws for a missing API key', () => {
        assert.throws(() => {
            let bot = new Bot({
                username: BOT_USERNAME
            });
        });
    });

    it('throws for an invalid API key', () => {
        assert.throws(() => {
            let bot = new Bot({
                username: BOT_USERNAME,
                apiKey: '123123123y'
            });
        });
    });

    it('throws for a missing username', () => {
        assert.throws(() => {
            let bot = new Bot({
                apiKey: BOT_API_KEY
            });
        });
    });

    it('throws for an invalid username', () => {
        assert.throws(() => {
            let bot = new Bot({
                username: 'abc-123',
                apiKey: BOT_API_KEY
            });
        });
    });

    it('throws for an invalid path', () => {
        assert.throws(() => {
            let bot = new Bot({
                username: 'abc-123',
                apiKey: BOT_API_KEY,
                incomingPath: 12
            });
        });
    });

    it('throws for an invalid manifest path', () => {
        assert.throws(() => {
            let bot = new Bot({
                username: 'abc-123',
                apiKey: BOT_API_KEY,
                manifestPath: 12
            });
        });
    });

    it('does not copy over arbitrary option keys', () => {
        let bot = new Bot({
            username: BOT_USERNAME,
            apiKey: BOT_API_KEY,
            otherKey: 'some value'
        });

        assert.ifError(bot.otherKey);
    });
});
