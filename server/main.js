import { Meteor } from 'meteor/meteor';
import QrlNode from '@theqrl/node-helpers';

const ip = 'testnet-1.automated.theqrl.org'
const port = '19009'
const testnet = new QrlNode(ip, port)

Meteor.startup(() => {
  testnet.connect().then(() => {
    // Routes - get
    JsonRoutes.add("get", "/grpc/:request", function (req, res, next) {
      const id = req.params.request;
       testnet.api(id).then((result) => {
         JsonRoutes.sendResult(res, {
           data: result,
         });  
       });        
    });
    // Routes - post
    JsonRoutes.add("post", "/grpc/:request", function (req, res, next) {
      const id = req.params.request;
      const options = req.body;
      console.log(options);
       testnet.api(id, options).then((result) => {
         JsonRoutes.sendResult(res, {
           data: result,
         });  
       });
     });
  });
});
