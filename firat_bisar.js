(() => {

    const init = () => {
        buildHTML();
        buildCSS();
        setEvents();
    };

    const buildHTML = () => {
        const html = `
            <div class="similar-products"><h2>Benzer Ürünler</h2></div>
            <div class="carousel-container">
                <button class="prev">❮</button>
                <div class="carousel-full-lenght">
                <div class="carousel-position"></div>
            </div>
            <button class="next">❯</button>
            </div>
        `;

        $('.product-detail').append(html);
    };

    const buildCSS = () => {
        const css = `
            .product-detail{
                width: 1300px;
                align-items: center;
                justify-content: center;
                margin: auto;
            }
            .similar-products{
                color:#0056b3;
                margin-left: 20px;
            }
            .carousel-container {
                position: relative;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .carousel-full-lenght {
                width: 100%;
                overflow:hidden;
            }
            
            .carousel-position {
                display: flex;
                transition: transform 0.5s ease-in-out;
            }
            .carousel-item {
                color: black;
                text-decoration: none;
                position: relative;
                min-width: 180px;
                max-width: 180px;
                height: 330px;
                background-color: #ddd;
                font-size: 18px;
                border-radius: 8px;
                margin-left:10px;
            }
            
            /* HEART CSS */ 
            .p-fav{
                position: absolute;
                border-radius: 8px;
                height: 25px;
                width: 25px;
                padding: 5px;
                background-color: white;
                top:8px;
                right: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .heart {
                width: 12px;
                height: 12px;
                position: relative;
                border: 1px solid black;
                border-top: none;
                border-right: none;
                transform: rotate(-45deg);
                background-color: white;
                display: inline-block;
            }
            
            .heart::before,
            .heart::after {
                content: "";
                position: absolute;
                width: 9px;
                height: 10px;
                border: 1px solid black;
                border-radius: 50%;
                background-color: white;
            }
            
            .heart::before {
                top: -4px;
                left: 0px;
                border-bottom: none;
                border-right: none;
                transform: rotate(75deg);
            }
            
            .heart::after {
                top: 2px;
                left: 7px;
                border-bottom: none;
                border-right: none;
                transform: rotate(105deg);
            }
            
            .heart.blue-heart {
                background-color: #0056b3;
                border-color: #0056b3;
            }
            
            .heart.blue-heart::before,
            .heart.blue-heart::after {
                background-color: #0056b3;
                border-color: #0056b3;
            }
            /* HEART CSS */
            
            /* İMAGE CSS */
            .p-image img{
                border-radius: 8px;
                max-width: 100%;
                height: 240px;
            }
            /* İMAGE CSS */
            
            /* TEXT CSS */
            .p-name {
                padding: 5px;
                font-size: 12px;
            }
            .p-price {
                color: #0056b3;
                padding: 5px;
                font-size: 20px;
            }
            /* TEXT CSS */
            
            /* NEXT AND PREV CSS */
            button {
                background: rgba(0, 0, 0, 0);
                font-size: 25px;
                border: none;
                padding: 10px;
                cursor: pointer;
            }
            /* NEXT AND PREV CSS */
            
            /* LAPTOP CSS CHANGES */ 
            @media (max-width: 1360px) {
                .product-detail{
                    max-width: 1025px;
                }
                .carousel-container {
                    max-width: 1025px;
                }
            
            }
            /* LAPTOP CSS CHANGES */
            
            /* TABLET CSS CHANGES */ 
            @media (max-width: 1060px) {
                .product-detail{
                    max-width: 635px;
                }
                .carousel-container {
                    max-width: 635px;
                }
            }
            /* TABLET CSS CHANGES */
            
            /* MOBİLE CSS CHANGES */ 
            @media (max-width: 768px) {
                .product-detail{
                    margin: unset;
                    max-width: 450px;
                }
                .carousel-container {
                    max-width: 450px;
                }
            }
            /* MOBİLE CSS CHANGES */
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        $(document).ready(function () {
            $(document).on("click", ".carousel-item", function (e) {
                if ($(e.target).hasClass("heart")) {
                    e.preventDefault();
                    let favVal = $(e.target).data("value");
                    let favLoc = $(e.target).data("id");
            
                    if (favVal == 0) {
                        $(e.target).addClass("blue-heart").data("value", 1);
                        EditLocalData("productHeart",favLoc,1);
                    } else {
                        $(e.target).removeClass("blue-heart").data("value", 0);
                        EditLocalData("productHeart",favLoc,0);
                    }
                }
            });
            //Fuctions
            function EditLocalData(key,index,value) {//Local storoge data editing function
                let oldData = getLocalData(key);
                oldData[index] = value;
                setLocalData(key,oldData);
            }
            function getLocalData(key) {//Local storoge data takeing function
                return JSON.parse(localStorage.getItem(key));
            }
        
            function setLocalData(key, data) {//Local storoge data seting function
                localStorage.setItem(key, JSON.stringify(data));
            }
        
            function datasetMaker() {//Local storoge dataset maker function
                return {
                    productId: getLocalData("productId"),
                    productImg: getLocalData("productImg"),
                    productName: getLocalData("productName"),
                    productPrice: getLocalData("productPrice"),
                    productUrl: getLocalData("productUrl"),
                    productHeart: getLocalData("productHeart")
                };
            }
        
            function pushDataHtml(printData) {//prints the sent data to HTML
                $.each(printData.productId, function(index) {
                    let isFav = printData.productHeart[index] == 1 ? "blue-heart" : "";//Cheking is item favorite item
        
                    $(".carousel-position").append('<a href="'+printData.productUrl[index]+'" target="_blank" class="carousel-item">'+
                                                    '<div class="p-fav">'+
                                                        '<div class="heart '+isFav+'" data-id="'+index+'" data-value="'+printData.productHeart[index]+'"></div>'+
                                                    '</div>'+
                                                    '<div class="p-image">'+
                                                        '<img src="'+printData.productImg[index]+'">'+
                                                    '</div>'+
                                                    '<div class="p-name">'+printData.productName[index]+'</div>'+
                                                    '<div class="p-price">'+printData.productPrice[index]+' TRY</div>'+
                                                '</a>');
                });
            }
            //Fuctions
        
            // Api Data Write to local storoge or get from local storage
            let productId = getLocalData("productId");
            if (!productId) { //This work if no data in local stroge 
        
                $.get("https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json", function (response) {
                    let apiData = JSON.parse(response);
                    //Register Api data to local stroge
                    setLocalData("productId", apiData.map(item => item.id));
                    setLocalData("productImg", apiData.map(item => item.img));
                    setLocalData("productName", apiData.map(item => item.name));
                    setLocalData("productPrice", apiData.map(item => item.price));
                    setLocalData("productUrl", apiData.map(item => item.url));
                    let heartData = {};
                    apiData.forEach((item, index) => {heartData[index] = 0;});
                    setLocalData("productHeart", heartData);
        
                    let localStoragedata=datasetMaker();
                    pushDataHtml(localStoragedata);
                });
            } else {//This work if have data in local stroge
        
                let localStoragedata=datasetMaker();
                pushDataHtml(localStoragedata);
            }
            // Api Data Write to local storoge or get from local storage
        
            // Carousel JS codes
            function CarouselCalculate(visibleItems,itemLenght,cPosition) {//Carousel Calculation Function
                let itemWidth = $(".carousel-item").outerWidth(true);
                let totalItems = $(".carousel-item").length;
                let maxMove = (totalItems*itemWidth) - visibleItems;
            
                $(".next").click(function () {
                    itemWidth = $(".carousel-item").outerWidth(true);
                    maxMove = (totalItems*itemWidth) - $(".carousel-full-lenght").outerWidth(true);      
                    if (itemLenght+1 < maxMove) {
                        if ($(".product-detail").outerWidth() == 1300 && itemLenght==0) {itemLenght=itemLenght+(itemWidth/2);}
                        itemLenght=itemLenght+itemWidth;
                        cPosition.css("transform", `translateX(-${itemLenght}px)`);
                    }
                });
            
                $(".prev").click(function () {
                    if (itemLenght-1 > 0) {
                        itemWidth = $(".carousel-item").outerWidth(true);
                        if ($(".product-detail").outerWidth() == 1300 && itemLenght==(itemWidth/2)) {itemLenght=itemLenght+(itemWidth/2);}
                        itemLenght=itemLenght-itemWidth;
                        cPosition.css("transform", `translateX(-${itemLenght}px)`);
                    }
                });
            }
            let currentItemLenght = 0;
            let carouselPosition = $(".carousel-position");
        
            //First Calculate
            CarouselCalculate($(".carousel-full-lenght").outerWidth(true),currentItemLenght,carouselPosition);
        
            let resizeTimeout;
            $(window).on("resize", function () {//When resize page make again calculates
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    currentItemLenght = 0;
                    $(".carousel-position").css("transform", "translateX(0px)");
                    CarouselCalculate($(".carousel-full-lenght").outerWidth(true),currentItemLenght,carouselPosition);
                }, 250);
            });
            // Carousel JS codes

        });
    };
    init();  
})();