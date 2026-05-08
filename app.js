import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDf1YrwkPav9mDv28XHF8FZYIJdk-R0Z5s",
    authDomain: "hashdash-01.firebaseapp.com",
    projectId: "hashdash-01"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handles User Login
window.login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, "users", user.user.uid));
        const role = docSnap.data().role;

        if (role === "customer") location.href = "customer.html";
        else if (role === "seller") location.href = "seller.html";
        else if (role === "admin") location.href = "admin.html";
    } catch (e) { alert(e.message); }
};

// Handles New User Signup
window.handleAuth = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const name = document.getElementById('userName').value;
    const role = currentRole; // 'customer' or 'seller'

    try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        const user = res.user;

        const userData = {
            uid: user.uid,
            email: email,
            name: name,
            role: role,
            createdAt: Date.now()
        };

        if (role === 'seller') {
            userData.shopName = document.getElementById('shopName').value;
            userData.city = document.getElementById('city').value;
            userData.isVerified = false;
        }

        await setDoc(doc(db, "users", user.uid), userData);
    } catch (e) { alert(e.message); }
};