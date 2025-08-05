import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// Fungsi untuk mendapatkan semua pengguna
export const listUsers = functions.https.onCall(async (
  data: unknown, context: functions.https.CallableContext) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }));
    return {users};
  } catch (error) {
    throw new functions.https.HttpsError(
      "internal",
      "Error listing users",
      error
    );
  }
});
