const admin = require("../config/firebase-config");

export const decodeToken = async (token: string) => {
  return await admin.auth().verifyIdToken(token);
};
