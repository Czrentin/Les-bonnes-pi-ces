// RECUPERATION des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // RECUPERATION de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // CREATION d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // CREATION des balises 
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
    // On RATTACHE l’image à pieceElement (la balise article dans laquelle vont tous nos éléments créés)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

}

// RECUPERATION bouton trier
const boutonTrier = document.querySelector(".btn-trier");
// CREATION d'une nouvelle liste dans laquelle la fonction "sort" calcule et trie si un résultat entre 2 prix sont > = < à 0 
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
     console.log(piecesOrdonnees);
});

// RECUPERATION bouton filtre
const boutonFiltrer = document.querySelector(".btn-filtrer");
// CREATION du filtre avec la fonction "filter"
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
   console.log(piecesFiltrees)
});

// CREATION nouvel tableau avec uniquement le nom des pièces
const noms = pieces.map(piece => piece.nom);
// Tri des pièces dont le prix est de plus de 35€ "dites pas abordables"
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}
console.log(noms)
//CREATION de la liste pour accueillir les valeurs
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
   .appendChild(abordablesElements)