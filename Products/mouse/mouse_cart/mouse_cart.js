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

// console.log(fb_db);
var total_ui_price = 0;
var cart_item_count = 0;



firebase
    .database()
    .ref("products")
    .on("child_added", function (data) {
        var product = data.val();  // Object mil gaya
        cart_item_count ++;

        var price = parseFloat(product.pro_price.replace('$', ''));
        var quantity = parseInt(product.pro_quantity);  // ✅ Get quantity
        var product_total = price * quantity;
        
        total_ui_price += product_total;
        document.getElementById("grand_total").innerText = "$" + total_ui_price.toFixed(2)


        // console.log(total_ui_price);




        var create_tr = document.createElement("tr");

        // Image column
        var td_img = document.createElement("td");
        var img = document.createElement("img");
        img.src = product.pro_img;
        img.width = 100;  // Size set karo
        td_img.appendChild(img);

        // Name column
        var td_name = document.createElement("td");
        td_name.innerText = product.pro_name;

        // Color column
        var td_color = document.createElement("td");
        td_color.innerText = product.pro_color;

        // price
        var td_price = document.createElement("td");
        td_price.innerText = product.pro_price;

        // Quantity
        var td_quantity = document.createElement("td");
        td_quantity.innerText = product.pro_quantity;

        // Total Price
        var td_total_price = document.createElement("td");
        td_total_price.innerText = "$" + product_total.toFixed(2);

        // Append all columns to row
        create_tr.appendChild(td_img);
        create_tr.appendChild(td_name);
        create_tr.appendChild(td_color);
        create_tr.appendChild(td_quantity);
        create_tr.appendChild(td_price);
        create_tr.appendChild(td_total_price);

        // Append row to table
        document.getElementById("cart_table").appendChild(create_tr);
        console.log(cart_item_count);

        // cart qunatity;
        var cart_qunatity_num = document.getElementById('cart_qunatity_num');
        cart_qunatity_num.innerHTML = cart_item_count;
    });

