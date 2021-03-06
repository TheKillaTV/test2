'use strict';

let nock = require('nock');
let request = require('supertest');
let assert = require('assert');
let Bot = require('../index.js');

const BOT_USERNAME = 'qwsbot';
const BOT_API_KEY = 'a907b85e-637d-4407-9ecb-7553bcae9572';

describe('Data scan code', () => {
    it('returns regular data URL', (done) => {
        let bot = new Bot({
            username: BOT_USERNAME,
            apiKey: BOT_API_KEY,
            skipSignatureCheck: true
        });

        let engine = nock('https://api.kik.com')
            .post('/v1/codes')
            .reply(200, { 'id': '54bd91bf1a2044abcde7c9d87378cf32572bd927' });

        bot.getKikCodeUrl({ 'data': { abc: 123 } })
            .then((url) => {
                assert.equal(url, 'https://scancode.kik.com/api/v1/images/remote/'
                           + '54bd91bf1a2044abcde7c9d87378cf32572bd927' + '/1200x1200.png');
                done();
            });
    });
});

describe('Username scan code', () => {
    it('returns regular username URL', (done) => {
        let bot = new Bot({
            username: BOT_USERNAME,
            apiKey: BOT_API_KEY,
            skipSignatureCheck: true
        });

        bot.getKikCodeUrl()
            .then((url) => {
                assert.equal(url, 'https://scancode.kik.com/api/v1/images/username/'
                           + BOT_USERNAME + '/1200x1200.png');
                done();
            });
    });
    it('respects size parameters', (done) => {
        let bot = new Bot({
            username: BOT_USERNAME,
            apiKey: BOT_API_KEY,
            skipSignatureCheck: true
        });

        bot.getKikCodeUrl({ 'width': 128, 'height': 256 })
            .then((url) => {
                assert.equal(url, 'https://scancode.kik.com/api/v1/images/username/'
                           + BOT_USERNAME + '/128x256.png');
                done();
            });
    });
    it('respects color parameter', (done) => {
        let bot = new Bot({
            username: BOT_USERNAME,
            apiKey: BOT_API_KEY,
            skipSignatureCheck: true
        });

        bot.getKikCodeUrl({ 'color': Bot.KikCode.Colors.Sunshine })
            .then((url) => {
                assert.equal(url, 'https://scancode.kik.com/api/v1/images/username/'
                           + BOT_USERNAME + '/1200x1200.png?c=5');
                done();
            });
    });
});
