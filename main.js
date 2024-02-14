const galleryImages = [

    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },

    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },

    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }

]


const products = [{
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
]


//Menu Section
function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function() {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });


    document.querySelector("#close-nav-menu").addEventListener("click", function() {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}


//Temperature Conversion
function celsiusToFahr(temperature) {
    let fahr = (temperature * 9 / 5) + 32;
    return fahr;
}
//celsiusToFahr(25); //to test
//celsiusToFahr(30); //to test


//Greeting Section
function greetingHandler() {
    let currentHour = new Date().getHours();
    //console.log(currentHour); //to test
    let greetingText;

    if (currentHour < 12) {
        greetingText = "Good Morning!";
    } else if (currentHour < 19) {
        greetingText = "Good Afternoon!";
    } else if (currentHour < 24) {
        greetingText = "Good Evening!";
    } else {
        greetingText = "Welcome!";
    }


    const wheatherCondition = "sunny";
    const userLocation = "New York";
    let temperature = 25;


    //let weatherText = "The weather is cloudy in Londonand it's 22°C outside"; or
    //let weatherText = 'The weather is cloudy in Londonand it\'s 22°C outside';
    //Replace dynamic values:
    //let celsiusText = `The weather is ${wheatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1)}°C outside`;
    let celsiusText = `The weather is ${wheatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside`;
    //let weatherText = `The weather is ${wheatherCondition} in ${userLocation} and it's ${temperature.toString()}°C outside`;
    let fahrText = `The weather is ${wheatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside`;

    document.querySelector("#greeting").innerHTML = greetingText;
    //document.querySelector("p#weather").innerHTML = weatherText;


    document.querySelector(".weather-group").addEventListener("click", function(e) {
        if (e.target.id == "celsius") {
            document.querySelector("p#weather").innerHTML = celsiusText;
        } else if (e.target.id == "fahr") {
            document.querySelector("p#weather").innerHTML = fahrText;
        }
    });
};


//Local Time Section
function clockHandler() {
    setInterval(function() {
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0");
    }, 1000)
}


//Gallery Section
function galleryHandler() {
    let mainImage = document.querySelector("#gallery > img"); //sección imagen principal
    let thumbnails = document.querySelector("#gallery .thumbnails"); //sección thumbnails

    mainImage.src = galleryImages[0].src; //acá la imagen que se muestra en pantalla es la primera del array (se muestra el src). Comparar con línea 117.
    //console.log(mainImage.src) //to test
    mainImage.alt = galleryImages[0].alt;
    //console.log(mainImage.alt) //to test

    /* 
    Create an img tag (using Js) for each element of the galleryImages array. And on each element of the array add the attributes src, alt, data-array-index, and data-selected.
    Also add the values for each attribute. The values are in the galleryImages array for src and alt attributes.
    Example:
    img 
    src = "./assets/gallery/image1.jpg"
    alt = "Thumbnail Image 1"
    data-array-index = "0"
    data-selected = "true" >
    see below:
    */


    galleryImages.forEach(function(element, index) {
        let thumb = document.createElement("img");
        thumb.src = galleryImages[index].src; //i coulda use element instead of galleryImages[index]
        thumb.alt = element.alt; //similar as in the one above but using element parameter
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false; //ternary conditional to select only the first image of the array 
        //console.log(thumb); //to test

        /* replaced by ternary conditional above 
        if (index === 0) {
            thumb.dataset.selected = "true";
        } else {
            thumb.dataset.selected = "false";
        } */
        document.addEventListener("click", function(e) {
            let selectedIndex = e.target.dataset.arrayIndex; //el elemento img fue creado previamente y se le agregó la propiedad arrayIndex, la cual toma el valor del índice del array, y acá estamos accediendo al elemento img y a su propiedad array index (cuando hay un evento) mediante el objeto e del evento y guardamos su índice (índice del elemento seleccionado).
            //console.log(selectedIndex); //to test. returns the index.
            let selectedImage = galleryImages[selectedIndex]; //el elemento fue creado previamente y acá lo estamos accediendo con el objeto e del evento
            mainImage.src = selectedImage.src; //acá la imagen que se muestra en pantalla es la seleccionada del array mediante el evento (se muestra el src). Comparar con línea 86.
            mainImage.alt = selectedImage.alt;

            //first: unselect them all
            thumbnails.querySelectorAll("img").forEach(function(img) {
                img.dataset.selected = false;
            });
            //second: select the one clicked
            e.target.dataset.selected = true;

        })


        thumbnails.appendChild(thumb); //este comando dice: agregale las imágenes que creamos (thumb) a la sección thumbnails
    });
}


//Product Section
function populateProducts(productList) {

    let productsSection = document.querySelector(".products-area");
    productsSection.textContent = "";

    productList.forEach(function(product, index) {

        let productElm = document.createElement("div"); //Creates a div element for each product. For that, create an object and run through it. 
        productElm.classList.add("product-item"); //adds a class to the div

        //Create the product image
        let productImage = document.createElement("img"); //creates an image tag. 
        productImage.src = product.image; //add a src and an alt property to each image
        productImage.alt = "Image for " + product.title;

        //Create the product detail section
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        //Create product title, author, price
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title"); //adds a class to the div
        productTitle.textContent = product.title; // PAY ATTENTION HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author"); //adds a class to the div
        productAuthor.textContent = "product.author";

        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";

        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);

        //Add all child html elements for the products   
        productElm.append(productImage); //append each img tag to each div tag
        productElm.append(productDetails); //append each div (with product-details class) to each div tag

        productsSection.append(productElm); //Add each img-div tags to the single product section, which is a div with the class products-area.
    });
}



/* <div class="product-item">
<img src="./assets/products/img6.png" alt="AstroFiction">

<div class="product-details">
    <h3 class="product-title">AstroFiction</h3>
    <p class="product-author">John Doe</p>
    <p class="price-title">Price</p>
    <p class="product-price">$ 49.90</p>
</div>
</div> */
function productsHandler() {

    let freeProducts = products.filter(function(item) {
        return !item.price || item.price <= 0; //dont have any item or price below or equal to zero (with this, try to set a price to undefine or delete a price from products).
    });
    let paidProducts = products.filter(function(item) {
        return item.price > 0;
    });

    //console.log("free: ", freeProducts); //to test
    //console.log("paid: ", paidProducts); //to test

    //run a loop through the products and create an HTML element for each of them

    populateProducts(products);

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    let productsFilter = document.querySelector(".products-filter");

    productsFilter.addEventListener("click", function(e) {
        //console.log(e.target.id); //to test
        if (e.target.id === "all") {
            populateProducts(products);
        } else if (e.target.id === "paid") {
            populateProducts(paidProducts);
        } else if (e.target.id === "free") {
            populateProducts(freeProducts);
        }
    });


}


function footerHandler() {
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `${currentYear} - All Rights Reserved`;
}


//Page Load:
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler()