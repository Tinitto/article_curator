/** server file for the message queue service */
const path = require("path");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

// Load gRPC package definitions
const packageDefinition = protoLoader.loadSync(
  path.resolve("../article_curator.proto"),
  {}
);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const articleCurator = grpcObject.articleCurator;

// the server
const server = new grpc.Server();
server.bind("0.0.0.0:38000", grpc.ServerCredentials.createInsecure());

// Add services to the Server
server.addService(articleCurator.MessageQueue.service, {
  sendMessage,
  subscribeToTopic,
});

// start the Server
server.start();

function sendMessage(call, callback) {
  callback(null, { received: true });
}

function subscribeToTopic(call, callback) {
  callback(null, { data: JSON.stringify({ hi: "hello" }) });
}
