// Firebase configuration helper for SRAMS React Client
// You can enter your Firebase project credentials here when ready,
// or toggle between Demo Auth and Live Firebase Auth.

export const defaultFirebaseConfig = {
  apiKey: "AIzaSyDemoKeySRAMS2026",
  authDomain: "srams-project.firebaseapp.com",
  projectId: "srams-project",
  storageBucket: "srams-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:demo12345678"
};

export const demoAuthProfiles = {
  admin: {
    uid: "admin-sharma",
    email: "admin@srams.edu",
    displayName: "Dr. R. Sharma (Chief Warden)",
    role: "ADMIN"
  },
  student: {
    uid: "student-aarav",
    email: "aarav@srams.edu",
    displayName: "Aarav Patel",
    rollNo: "CS2505",
    role: "STUDENT"
  }
};
