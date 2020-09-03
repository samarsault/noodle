const NodeEnvironment = require("jest-environment-node");
const MongodbMemoryServer = require("mongodb-memory-server");

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    // eslint-disable-next-line
    this.mongod = new MongodbMemoryServer.default({
      binary: {
        version: "3.6.1",
      },
    });
  }

  async setup() {
    await super.setup();

    this.global.MONGO_URL = await this.mongod.getConnectionString();
    this.global.MONGO_DB_NAME = await this.mongod.getDbName();
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;
