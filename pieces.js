// RECUPERATION des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {

        // "article" équivaut à chacune des pièces en fonction de leur index
        const article = pieces[i];
        // RECUPERATION de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // CREATION d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // CREATION des balises et ajout des données depuis le fichier json
        const imageElement = document.createElement("img");
        imageElement.src = article.image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        // On RATTACHE la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On RATTACHE les différentes parties à pieceElement
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    }
}
// Premier affichage de la page
genererPieces(pieces);


// Création bouton trier ordre croissant
const boutonTrier = document.querySelector(".btn-trier");
// CREATION d'une nouvelle liste dans laquelle la fonction "sort" calcule et trie si un résultat entre 2 prix sont > = < à 0 
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page au moment du clique
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

// Création bouton trier ordre décroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix; // Changement entre a.prix et b.prix
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

// Création bouton pieces sans description
const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Création filtre pour les pièces de -35€
const boutonFiltrer = document.querySelector(".btn-filtrer");
// CREATION du filtre avec la fonction "filter"
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// CREATION tableau avec uniquement le nom des pièces via une fonction lambda
const noms = pieces.map(piece => piece.nom);
// Tri des pièces dont le prix est de plus de 35€ "dites pas abordables"
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1)
    }
}

//CREATION de la liste pour accueillir les valeurs
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(abordablesElements)

// CREATION tableaux avec uniquement le nom et uniquement le prix
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

// Boucle pour vérifier si une pièce est disponible ou non et donc l'enlever des 2 tableaux juste au dessus
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
    }
}
// Creation d'une liste 
const disponiblesElement = document.createElement('ul');
// Boucle pour faire afficher les produits disponibles et leur prix
for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement);
}
// Rattachement à la div .disponibles
document.querySelector('.disponibles').appendChild(disponiblesElement);

const inputPrixMax = document.querySelector('#inputPrixMax')
inputPrixMax.addEventListener('input', function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})