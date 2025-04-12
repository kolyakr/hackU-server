import { env } from "../utils/env";

var admin = require("firebase-admin");

const mode = env("NODE_ENV", "DEVELOPMENT");

const path =
  mode === "DEVELOPMENT"
    ? "./serviceAccount.json"
    : "/etc/secrets/serviceAccount.json";

var serviceAccount = require(path);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
