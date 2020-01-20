const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBrhZOSoOGyKpAqsTXfz_GkdXHtTJWE3sY",
  authDomain: "jeffrdb-dea9e.firebaseapp.com",
  projectId: "jeffrdb-dea9e"
});

var db = firebase.firestore();
//
// var ss = [
//   {
//     id:1,
//     name:"Focaccia al rosmarino",
//     description:"Wood fired rosemary and garlic focaccia",
//     price:8.50,
//     type:"Appetizers",
//     // "stuff":{
//     //   "id":2,
//     //   "name":"Burratta con speck",
//     //   "descripts": {
//     //     "description":"Burratta cheese, imported smoked prok belly prosciutto, pached balsamic pear",
//     //     "prices": [5.50,32.95,"dollars","usd",52],
//     //     "type":"Appetizers"
//     //   }
//     // }
//   },
//   {
//     id:2,
//     name:"Burratta con speck",
//     description:"Burratta cheese, imported smoked prok belly prosciutto, pached balsamic pear",
//     price:13.50,
//     type:"Appetizers"
//   }
// ]


var recipes = [{
  ingredients : {
    eggs : {
      ingredientName : "Eggs",
      ingredientCode : "eggs",
      ingredientRecipeLabel : "pieces",
      ingredientRecipeValue : 22,
    },
    flour_firstclass : {
      ingredientName : "Flour (1st Class)",
      ingredientCode : "flour_firstclass",
      ingredientRecipeLabel : "kilograms",
      ingredientRecipeValue : 14,
    },
    sugar_white : {
      ingredientName : "Sugar (White)",
      ingredientCode : "sugar_white",
      ingredientRecipeLabel : "kilograms",
      ingredientRecipeValue : 20,
    },
  },
  productCategory : "breads",
  productCode : "breads_pandecoco",
  productName : "Pan de Coco",
  productYield : 42,
  productYieldName : "pieces",
},
  {
    ingredients : {
      eggs : {
        ingredientName : "Eggs",
        ingredientCode : "eggs",
        ingredientRecipeLabel : "pieces",
        ingredientRecipeValue : 36,
      },
      flour_firstclass : {
        ingredientName : "Flour (1st Class)",
        ingredientCode : "flour_firstclass",
        ingredientRecipeLabel : "kilograms",
        ingredientRecipeValue : 9,
      },
      sugar_white : {
        ingredientName : "Sugar (White)",
        ingredientCode : "sugar_white",
        ingredientRecipeLabel : "kilograms",
        ingredientRecipeValue : 7,
      },
    },
    productCategory : "desserts",
    productCode : "desserts_lecheflan",
    productName : "Leche Flan",
    productYield : 8,
    productYieldName : "trays",
  },

  {
    ingredients : {
      eggs : {
        ingredientName : "Eggs",
        ingredientCode : "eggs",
        ingredientRecipeLabel : "pieces",
        ingredientRecipeValue : 23,
      },
      flour_firstclass : {
        ingredientName : "Flour (1st Class)",
        ingredientCode : "flour_firstclass",
        ingredientRecipeLabel : "kilograms",
        ingredientRecipeValue : 12,
      },
      sugar_white : {
        ingredientName : "Sugar (White)",
        ingredientCode : "sugar_white",
        ingredientRecipeLabel : "kilograms",
        ingredientRecipeValue : 18,
      },
    },
    productCategory : "cakes",
    productCode : "cakes_jellyroll",
    productName : "Jelly Roll",
    productYield : 12,
    productYieldName : "rolls",
  }
];

recipes.forEach(recipe => {
  db.collection("recipeMaster").doc(recipe.productCode).set(recipe)
  .then(function(docRef) {
    console.log("Document transmitted!");
  }).catch(function(error) {
      console.error("Error adding document: ", error);
  })
});

//
// recipes.forEach(function(obj) {
//   db.collection("recipeMaster").add({
//     // id: obj.id,
//     // name: obj.name,
//     // description: obj.description,
//     // price: obj.price,
//     // type: obj.type,
//     // stuff: obj.stuff,
//   }).then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//     .catch(function(error) {
//       console.error("Error adding document: ", error);
//     });
// });