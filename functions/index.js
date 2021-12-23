const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();


// GETTING USERS TEACHER /STUDENT  CLAIMS
exports.studentClaims = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);

    const currentCustomClaims = user.customClaims;
    if (currentCustomClaims) {
      return currentCustomClaims
    }
    else {
      return null
    }

  } catch (error) {
    return error;
  }

});

// GETTING USERS CLAIMS



// GIVING STUDENT CUSTOM CLAIMS FIRST TIME //

exports.studentRole = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    const setRole = admin.auth().setCustomUserClaims(user.uid, { isActive: true });
    return {
      message: `Success! ${data.email} has given Role`
    }
  } catch (error) {
    return error;
  }

});

// GIVING STUDENT CUSTOM CLAIMS FIRST TIME //




// SETTING STUDENT CUSTOM CLAIMS BY ADMIN //

exports.setStudentByAdmin = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    const setRole = admin.auth().setCustomUserClaims(user.uid, { isActive: data.claim });
    return {
      message: `Success! ${data.email} Role has been updated`
    }
  } catch (error) {
    return error;
  }

});

// SETTING STUDENT CUSTOM CLAIMS BY ADMIN //









// GIVING TEACHER CUSTOM CLAIMS ON SIGNUP //

exports.checkRole = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    const setRole = admin.auth().setCustomUserClaims(user.uid, { teacher: true, isActive: true });
    return {
      message: `Success! ${data.email} has given Role`
    }
  } catch (error) {
    return error;
  }

});

// GIVING TEACHER CUSTOM CLAIMS ON SIGNUP //



// SETTING TEACHER CUSTOM CLAIMS BY ADMIN //

exports.setTeacherByAdmin = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    const setRole = admin.auth().setCustomUserClaims(user.uid, {
      teacher: true,
      isActive: data.claim
    });
    return {
      message: `Success! ${data.email} role has been updated`
    }
  } catch (error) {
    return error;
  }

});

// SETTING TEACHER CUSTOM CLAIMS BY ADMIN //







// GIVING ADMIN CUSTOM CLAIMS FIRST TIME //

exports.adminRole = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    const setRole = admin.auth().setCustomUserClaims(user.uid, { admin: true });
    return {
      message: `Success! ${data.email} has given Role`
    }
  } catch (error) {
    return error;
  }

});

// GIVING ADMIN CUSTOM CLAIMS FIRST TIME //





exports.CreateUser = functions.https.onCall(async (data, context) => {
  const user = await admin.auth().createUser({ email: data.email, password: data.password });
  const userRole = admin.auth().setCustomUserClaims(user.uid, { role: data.role });
  const FS = admin.firestore().collection('students').doc(user.uid).set({
    email: data.email
  })
  return user;
  return userRole;
})
