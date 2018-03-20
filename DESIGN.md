# Langages utilisés

* HTML
* CSS
* JavaScript


# Framework utilisé

* AngularJS


# Points clés


## Le mots-clé

AngularJS dispose de mots-clés. Ceux-ci sont utilisés dans l'HTML afin de dire quelles actions doivent être procédées. Par exemple :
* ng-repeat
	* va agir comme une boucle for
	* par exemple : ng-repeat="i in tableau" va donner les indices des cases du tableau
* ng-if
	* va agir comme une boucle if
	* par exemple : ng-if="variable == 3" va afficher ce qu'il y a dans la balise si et seulement si la variable $scope.variable est égale à 3
* ng-model
	* va binder la variable avec la valeur de la balise
	* pa rexemple : ng-model="variable" va lier la variable $scope.variable à la valeur de la balise dans laquelle le mot-clé se situe

	
## Le binding

Le binding consiste à lier une variable à la valeur d'une balise. Cela permet une plus grande flexibilité dans le code et une meilleure maintenabilité.

Grâce à cela, il est possible d'agir plus facilement sur les valeurs des champs HTML avec du JavaScript.


## La factory

Une factory n'est instanciée qu'une seule fois. Par exemple, si on a 5 factories dans notre application, chacune ne sera instanciée qu'une fois : au début.

Une factory permet de créer des objets constants, complexes et réutilisables tels que dans l'application : des appels XMLHttpRequest sur plusieurs pages.

La liste des factories de mon application est la suivante :

* service
* recherche
* description


## Le service

Un service n'est instancié qu'une seule fois dans l'application, comme pour les factories.

Un service permet de créer des objets simples et constants. Ils sont le plus souvent utilisés comme dans mon application : pour faire des passerelles entre les controlleurs.

Le service qui est dans mon application est :

* passerelle


## Le $watch

Le $scope.$watch() prend deux arguments :

* La fonction permettant de retourner un élément censé pouvoir changer au cours du programme
* La fonction à exécuter lorsque le résultat de la fonction précédente a changé

Il permet de définir une suite d'actions à effectuer lorsqu'une valeur change.

Ici, j'ai choisi d'exécuter la recherche des différentes informations d'un pokémon lorsque l'id stocké dans le service ```passerelle``` change. Le seul moment où l'id du pokémon peut changer est lorsque l'utilisateur clique sur le bouton [Go!]


## La directive

La directive permet au développeur de créer ses propres balises, comme par exemple <pokedex></pokedex> dans le cas de ce TP.