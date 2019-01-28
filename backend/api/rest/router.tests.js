const request = require('supertest');
describe('Router', () => {
    let router;
    function mockEndpoint (msg) {
        return (router) => {
            router.get('/', async (req, res) => {
                res.body = msg;
            });
        };
    }

    const mockFs = {
        readdirSync: jest.fn(() => [
            'v1',
            'v2'
        ]),
        lstatSync: jest.fn(() => ({
            isDirectory: jest.fn(() => true)
        }))
    };
    beforeAll(() => {
        jest.resetModules();
        jest.mock('fs', () => mockFs);
        jest.mock('/app/api/rest/versions/v1', () => jest.fn(mockEndpoint('extV1')), { virtual: true });
        jest.mock('/app/api/rest/versions/v2', () => jest.fn(mockEndpoint('extV2')), { virtual: true });

        const buildApiRoutes = require('./router');
        router = buildApiRoutes();
    });

    it('should generate a path for checking service status', async () => {
        const response = await request.get('/status');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ status: 'ok' });
    });

    it('should generate routes for each api, defaulting to the latest', async () => {
        let response = await router.get('/v1/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('extV1');

        response = await router.get('/v2/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('extV2');

        response = await router.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('extV2');
    });
});
