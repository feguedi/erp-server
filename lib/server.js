const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const Qs = require('qs');

const isDev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
const plugins = [];

async function Server () {
  try {
    const server = Hapi.server({
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || 8080,
      query: {
        parser: query => Qs.parse(query),
      },
    });

    plugins.push(require('@hapi/inert'));
    plugins.push(require('@hapi/bell'));
    plugins.push(require('@hapi/jwt'));
    plugins.push(require('@hapi/cookie'));

    await server.register(plugins, { once: true });

    return server;
  } catch (error) {
    throw Boom(error);
  }
}

exports.init = async function () {
  try {
    const server = await Server();
    await server.initialize();

    return server;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

exports.start = async function () {
  try {
    const server = new Server();
    await server.start();

    return server;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
