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
        cart_item_count++;

        var price = parseFloat(product.pro_price.replace('$', ''));
        var quantity = parseInt(product.pro_quantity);  // ✅ Get quantity
        var product_total = price * quantity;

        total_ui_price += product_total;
        document.getElementById("grand_total").innerText = "$" + total_ui_price.toFixed(2)


        // del icon for remove product
        var create_tr = document.createElement("tr");
        create_tr.id = "row_" + product.id;

        // console.log(total_ui_price);

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

        var td_delete = document.createElement("td");
        var del_icon = document.createElement("i");
        del_icon.className = "fa-solid fa-trash";
        del_icon.style.cursor = "pointer";
        del_icon.style.color = "grey";
        del_icon.style.fontSize = "20px";

        del_icon.onclick = function () {
            console.log("Clicked product ID:", product.id);
            deleteProduct(product.id);
        };


        td_delete.appendChild(del_icon);

        create_tr.appendChild(td_img);
        create_tr.appendChild(td_name);
        create_tr.appendChild(td_color);
        create_tr.appendChild(td_quantity);
        create_tr.appendChild(td_price);
        create_tr.appendChild(td_total_price);
        create_tr.appendChild(td_delete)

        // Append row to table
        document.getElementById("cart_table").appendChild(create_tr);
        console.log(cart_item_count);

        // cart qunatity;
        var cart_qunatity_num = document.getElementById('cart_qunatity_num');
        cart_qunatity_num.innerHTML = cart_item_count;


    });


function deleteProduct(id) {
    console.log("Deleting product with ID:", id);

    // firebase.database().ref("products").child(id).remove()
    //     .then(function () {
    //         console.log("Product deleted successfully!");
    //     })
    //     .catch(function (error) {
    //         console.error("Delete error:", error);
    //     });

    firebase.database().ref("products").child(id).remove()
        .then(function () {
            console.log("Product deleted successfully!");
            // document.getElementById("row_" + id).remove();
            window.location.reload();
        })
        .catch(function (error) {
            console.error("Delete error:", error);
        });
}