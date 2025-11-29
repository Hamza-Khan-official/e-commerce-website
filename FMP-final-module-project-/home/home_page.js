var firebaseConfig = {
    apiKey: "AIzaSyDJRsEfO3b1Sd2EYpGqwYu-Qk5Xxju1BlE",
    authDomain: "product-db-50ac7.firebaseapp.com",
    databaseURL: "https://product-db-50ac7-default-rtdb.firebaseio.com",
    projectId: "product-db-50ac7",
    storageBucket: "product-db-50ac7.firebasestorage.app",
    messagingSenderId: "628823687355",
    appId: "1:628823687355:web:b39bed5fdc64df68c1699e",
    measurementId: "G-8T0N4G4GLF"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var fb_db = firebase.database();

console.log(app);

function cart_number() {
    var cart_qunatity_num = document.getElementById('cart_qunatity_num');

    firebase.database().ref("products").on('value', function (allSnapshot) {
        var count = allSnapshot.numChildren();
        cart_qunatity_num.innerText = count;
    });
}

cart_number();














var button;

function detailed_button(id) {

    button = document.getElementById(id);
    button.className = "card-body d-flex justify-content-center";
};

function detailed_button_close(id) {
    button = document.getElementById(id);
    button.className = "card-body d-flex justify-content-center d-none";
};
