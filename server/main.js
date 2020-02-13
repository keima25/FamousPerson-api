import { Meteor } from "meteor/meteor";
import { FamousPersons } from "../imports/api/FamousPersons";
import bodyParser from "body-parser";

Meteor.startup(() => {
  // code to run on server at startup

  WebApp.connectHandlers.use("/api/fetch", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");

    let response = FamousPersons.find().fetch();
    res.end(JSON.stringify(response));
  });

  WebApp.connectHandlers
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use("/api/add", (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization,Content-Type"
      );

      if (req.method !== "POST") {
        res.end("Wrong HTTP Method!");
      } else {
        const { body } = req;

        let response = FamousPersons.insert({
          name: body.values.name,
          gender: body.values.gender,
          date: body.values.date,
          age: body.values.age,
          mobile_number: body.values.mobile_number,
          email: body.values.email,
          address: body.values.address,
          experience: body.values.experience,
          education: body.values.education
        });

        res.end(JSON.stringify(response));
      }
    });

  WebApp.connectHandlers
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use("/api/update", (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization,Content-Type"
      );

      if (req.method !== "PUT") {
        res.end("Wrong HTTP Method!");
      } else {
        const { body } = req;

        let response = FamousPersons.update(
          {
            _id: body.values.id
          },
          {
            $set: {
              name: body.values.name,
              gender: body.values.gender,
              date: body.values.date,
              age: body.values.age,
              mobile_number: body.values.mobile_number,
              email: body.values.email,
              address: body.values.address,
              experience: body.values.experience,
              education: body.values.education
            }
          }
        );
        res.end(JSON.stringify(response));
      }
    });

  WebApp.connectHandlers
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use("/remove", (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization,Content-Type"
      );

      if (req.method !== "DELETE") {
        res.end("Wrong HTTP Method!");
      } else {
        const { body } = req;

        let response = FamousPersons.remove(body.id);
        res.end(JSON.stringify(response));
      }
    });
});
