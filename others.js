let myRecipes = [];
let AddCocktail_btn = document.getElementById('add');
var btnAddCocktail = document.getElementById("btn_addcocktail");
var formAdd = document.getElementById("form");
var overlay = document.getElementById("overlay");
let PagesShowMore = document.getElementById("showMore");
let btnClose = document.getElementById("close");


function Cocktail(namec, ingredients, instructions, hasDone) {
    this.namec = namec;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.hasDone = hasDone;
}

Cocktail.prototype.updateHasDone = function() {
    this.hasDone = !this.hasDone;
}

AddCocktail_btn.addEventListener('click', addCocktailToRecipe);
btnAddCocktail.addEventListener("click", showFormAddCocktail);
overlay.addEventListener("click", ShowOverlay);

function addCocktailToRecipe() {
    event.preventDefault();
    newCocktail = new Cocktail(namec.value, ingredients.value, instructions.value, hasDone.checked); 
    myRecipes.push(newCocktail); 
    CreateShowCocktail();
    showFormAddCocktail();
    formAdd.reset();
}

function CreateShowCocktail() {
    let recipe = document.getElementById("recipe");
    recipe.innerHTML = "";
    for(let i = 0; i < myRecipes.length; i++) {
        let cocktail = myRecipes[i]
        let cocktailDiv = document.createElement("div");
        cocktailDiv.setAttribute("id", "cocktail");
        cocktailDiv.setAttribute("class", "cocktail");
        cocktailDiv.innerHTML =  `
            <div id="dtitle">
                <p class="ptiitle" id="ptitle">${cocktail.namec}</p>
                <button onclick="updateHasDone(${i})" class="btn_updatehasdone"></button>
            </div>
            <button onclick="ShowMoreCocktail(${i})" id="btn_showmore">Voir plus</button>
            <button onclick="deleteCocktail(${i})" id="btn_deletecocktail">Supprimer</button>
        `
        recipe.appendChild(cocktailDiv);
        SwitchColorRead(i);
        updateLocalStorage(myRecipes);
    }
}

function updateHasDone(id) {
    myRecipes[id].updateHasDone();
    CreateShowCocktail();
    updateLocalStorage(myRecipes);
}

function deleteCocktail(id) {
    myRecipes.splice(id, 1);
    CreateShowCocktail();
    updateLocalStorage(myRecipes);
}

function ShowMoreCocktail(id) {
    let rec = myRecipes[id];
    let sMore = document.getElementById("showMore");
    sMore.innerHTML = "";

    let sMoreDiv = document.createElement("div");
    sMoreDiv.setAttribute("id", "sMoreCocktail");
    sMoreDiv.setAttribute("class", "sMoreCocktail");
    sMoreDiv.innerHTML =  `
        <div id="sMoreContent">
            <span onclick="closeMenuMore()" id="close">X</span>
            <p id="ptitle">${rec.namec}</p>
            <p id="ptitle">Ingrédients : </p>
            <p id="ptitle">${rec.ingredients.replace(/\n/g,'<br/>')}</p>
            <p id="ptitle">Instructions : </p>
            <p id="ptitle">${rec.instructions.replace(/\n/g,'<br/>')}</p>
            <p id="ptitle">${rec.hasDone ? "Déjà fait" : "Pas encore fait"}</p>
        </div>
    `
    sMore.appendChild(sMoreDiv);
    updateLocalStorage(myRecipes);
    SwitchDisplayMore();
}

function closeMenuMore() {
    PagesShowMore.style.display = "none";
}


function showFormAddCocktail() {
    if(formAdd.style.display == "flex") {
        formAdd.style.display = "none";
        overlay.style.display = "none";
    } else {
        formAdd.style.display = "flex";
        overlay.style.display = "flex";
    }
}

function ShowOverlay() {
    if(formAdd.style.display == "flex") {
        formAdd.style.display = "none";
        overlay.style.display = "none";
        PagesShowMore.style.display = "none";
    } else {
        formAdd.style.display = "flex";
        overlay.style.display = "flex";
        PagesShowMore.style.display = "flex";
    }
}

function SwitchColorRead(i) {
    let backHasDone = document.getElementsByClassName("btn_updatehasdone");
    let tiitle = document.getElementsByClassName("ptiitle");
    if(myRecipes[i].hasDone == true) {
        backHasDone[i].style.background = "black";
        tiitle[i].style.color = "#005800";
    } else {
        backHasDone[i].style.background = "white";
        tiitle[i].style.color = "#580000";
    }
}

function SwitchDisplayMore() {
    if(PagesShowMore.style.display == "flex") {
        PagesShowMore.style.display = "none";
    } else {
        PagesShowMore.style.display = "flex";
    }
}

function updateLocalStorage(myRecipes) {
    localStorage.setItem("recipe", JSON.stringify(myRecipes));
}

// read library from local storage on document load
window.addEventListener("load", () => {
    if (localStorage.length !== 0) {
        JSON.parse(localStorage.getItem("recipe")).forEach((cocktail) => {
            myRecipes.push(
                new Cocktail(cocktail.namec, cocktail.ingredients, cocktail.instructions, cocktail.hasDone)
            );
        });

        CreateShowCocktail();
    }
});