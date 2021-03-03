/** Tests for the server in message queue service */
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

describe("message-queue server", () => {
  describe("sendMessage method", () => {
    it("should receive messages", (done) => {
      // when the sendMessage() method is used, it should receive the message
      const client = new articleCurator.MessageQueue(
        "localhost:38000",
        grpc.credentials.createInsecure()
      );
      client.sendMessage(
        {
          topic: "test",
          data: JSON.stringify({ id: 2, last_name: "Doe", first_name: "John" }),
        },
        (err, response) => {
          expect(response).toMatchObject({
            received: true,
          });
          done();
        }
      );
    });
  });

  it("should send server stream to subscriber clients", async () => {
    // when a client subscribes to it, it should start sending some messages on a stream
  });
});
