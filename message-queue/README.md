# event-bus

This service is the orchestrator of all the other services. It keeps track of all events in a proper queue
in mongodb such under an appropriate topic so that all subscribers to that topic are updated whenever a new event is added to that topic.

This uses the grpc server streaming with a form of acknowldegment that uses the 'metadata' event as suggested in
[issue #9170](https://github.com/grpc/grpc/issues/9170)
