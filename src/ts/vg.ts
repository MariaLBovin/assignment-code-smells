/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  )
    {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  let sortedList: Product[] = []; //skriv om till switch
  if (sort === Sort.PRICE_ASCENDING) {
    sortedList = sortList("Price", copiedList);
    sortedList.reverse();
  } else if (sort === Sort.PRICE_DECENDING) {
    sortedList = sortList("Price", copiedList);
  } else if (sort === Sort.NAME_ALPHABETIC) {
    sortedList = sortList("Name", copiedList);
  } else if (sort === Sort.NAME_ALPHABETIC_REVERSE) {
    sortedList = sortList("Name", copiedList);
    sortedList.reverse();
  }

  return sortedList;
}


export function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if ((whichAttribute === "Price") && (p1.price < p2.price)) { 
        return 1;
      } else if (p1.price > p2.price) {
        return -1;
      } else if  (p1.name < p2.name){
        return 1;
      } else if (p1.name > p2.name) {
        return -1;
      }
      return 0; 
  });
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");


export function shoppingCart (cartList : number []){
  const quantity = cartList.reduce((previousListLenght, currentListLenght) => {
    return previousListLenght += currentListLenght
  });

  let floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;
}
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");
export function createProductHtml(cartList : number[] ) {
  
  for (let i = 0; i < productList.length; i++) { 
    let dogproduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = createDogImgContainer(dogproduct);
    let dogImg: HTMLImageElement = createDogImg(i, dogImgContainer);
    let cartSymbolContainer: HTMLDivElement = createCartSymbolContainer(dogImgContainer);
    let cartSymbol: HTMLElement = createCartsymbol(cartSymbolContainer);

    createNameP(i, dogproduct);

    createPriceP(i, dogproduct);

    createInfoP(i, dogproduct);

    productList[i].productSpec = false;

    addEventlisteners(dogImg, cartSymbolContainer, i, cartSymbol);

    if (productList[i].category === "sassy") {
      createSassyDiv(dogproduct);
    }
    if (productList[i].category === "kriminella") {
      createKriminellaDiv
      (dogproduct);
    }
    if (productList[i].category == "singlar") {
      createSinglarDiv(dogproduct);
    }
    if (productList[i].category === "puppy") {
      createPuppyDiv(dogproduct);
    }
    if (productList[i].category === "oldies") {
      createOldiesDiv(dogproduct);
    }
  }
  let listAsText= JSON.stringify(productList);
  localStorage.setItem("savedList", listAsText);
  sessionStorage.clear();

  function addEventlisteners(dogImg: HTMLImageElement, cartSymbolContainer: HTMLDivElement, i: number, cartSymbol: HTMLElement) {
    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });

    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listAsText= JSON.stringify(productList);
      localStorage.setItem("savedList", listAsText);
    });

    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCart(i);
    });
  }

  function createDogImg(i: number, dogImgContainer: HTMLDivElement) {
    let dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImgContainer.appendChild(dogImg);
    return dogImg;
  }

  function createDogImgContainer(dogproduct: HTMLDivElement) {
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogproduct.appendChild(dogImgContainer);
    return dogImgContainer;
  }

  function createCartSymbolContainer(dogImgContainer: HTMLDivElement) {
    let cartSymbolContainer: HTMLDivElement = document.createElement("div"); //refaktorera
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);
    return cartSymbolContainer;
  }

  function createCartsymbol(cartSymbolContainer: HTMLDivElement) {
    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);
    return cartSymbol;
  }

  function createNameP(i: number, dogproduct: HTMLDivElement) {
    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);
  }

  function createPriceP(i: number, dogproduct: HTMLDivElement) {
    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogproduct.appendChild(price);
  }

  function createInfoP(i: number, dogproduct: HTMLDivElement) {
    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogproduct.appendChild(info);
  }

  function createOldiesDiv(dogproduct: HTMLDivElement) {
    let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
    dogproduct.className = "dogproduct";
    cat5.appendChild(dogproduct);
  }

  function createPuppyDiv(dogproduct: HTMLDivElement) {
    let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
    dogproduct.className = "dogproduct";
    cat4.appendChild(dogproduct);
  }

  function createSinglarDiv(dogproduct: HTMLDivElement) {
    let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
    dogproduct.className = "dogproduct";
    cat3.appendChild(dogproduct);
  }

  function createKriminellaDiv
  (dogproduct: HTMLDivElement) {
    let cat2: HTMLElement = document.getElementById(
      "kriminella"
    ) as HTMLElement;
    dogproduct.className = "dogproduct";
    cat2.appendChild(dogproduct);
  }

  function createSassyDiv(dogproduct: HTMLDivElement) {
    let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement; //refaktorera
    dogproduct.className = "dogproduct";
    cat1.appendChild(dogproduct);
  }
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getfromstorage() {
  let container = document.getElementById("checkout-table");

  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  createAmountText();

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  createQuantityText();

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  createTotalAmountText();

  for (let i: number = 0; i < astext.length; i++) {
    createInnerHtml(i);
  }

  let addition: number = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  createTotalprice();

  function createTotalprice() {
    let totalprice2: HTMLTableCellElement = document.createElement("th");
    checkkouttotal2.appendChild(totalprice2);
    totalprice2.innerHTML = addition + "$";
    totalprice2.id = "totalincenter";
  }

  function createInnerHtml(i: number) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  function createTotalAmountText() {
    let totaltext: HTMLTableCellElement = document.createElement("th");
    checkkouttotal2.appendChild(totaltext);
    totaltext.innerHTML = "total:";
  }

  function createQuantityText() {
    let qttext: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(qttext);
    qttext.innerHTML = "change quantity:";
  }

  function createAmountText() {
    let amounttext: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amounttext);
    amounttext.innerHTML = "amount:";
  }
}
