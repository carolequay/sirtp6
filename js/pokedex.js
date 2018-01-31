var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
// constante : base de données des pokemons
// aura besoin d'un modèle (= service pour angular) pour taper dans la BD et être utilisé par le controller
pokeApp.constant('POKEAPI', 'https://cors.now.sh/http://pokeapi.co');

// configuration
pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  //  $resource("http://pokeapi.co/api/v1/type/:id/");
}]);

// création du service API
pokeApp.factory('service', ['$resource', 'POKEAPI', function($resource, POKEAPI) {
  return $resource(POKEAPI+"/api/v1/pokedex");
}]);


// création du controleur
pokeApp.controller("controller", ['$scope', '$log', 'service', function($scope, $log, service){
	//nouvel objet angular liant le HTML et le javascript : objet liste de pokemons
	//objet tableau associatif clé valeur {}
	// tableau partie 1
	/*$scope.listePokemon = [
		{
			"id":175,
			"name":"togepi"
		},
		{

			"id":152,
			"name":"germignon"
		},
		{
			
			"id":131,
			"name":"lokhlass"
		},
		{
			
			"id":251,
			"name":"celebi"
		},
		{
			
			"id":241,
			"name":"écrémeuh"
		}
	];*/

	// partie 2 : stocker le JSON dans un tableau
	$scope.listePokemon = new Array;
	var res = service.get(function(){
		// variable temporaire qui contient le tableau des pokémons
		var resTemp = res["objects"] [0] ["pokemon"];
		// on parcourt le tableau pour chaque ligneS
		for(var id in resTemp){
			// attraper le numéro du pokémon, on récupère la ressource dans le Json, on split en tableau
			var pokeId = resTemp[id] ["resource_uri"].split("/");
			// le numéro est à l'emplacement taille-2 du tableau créé
			pokeId = pokeId[pokeId.length-2];
			// méthode push de la class Array qui permet de rentrer un élément à l'indice+1
			$scope.listePokemon.push({
				// parseInt sinon c'était sous forme de chaîne de caractère et le tri ne se fesait pas numériquement
				"id": parseInt(pokeId),
				// nom du pokémon associé à l'id
				"name": resTemp[id] ["name"],
				// uri sur lequel sont enregistrées les informations du pokémon
				//"uri": resTemp[id] ["resource_uri"]
			});
		}
		$log.log($scope.listePokemon);
	});


	// test console ctrl+maj+i ; hard refresh ctrl+f5
	console.log($scope.listePokemon);
	// activation de mon button
	$scope.choix = function(){
		// log natif javascript
		// console.log($scope.selection);
		// affichage du choix dresseur
		// $scope.choixDresseur = $scope.selection;
		$log.log($scope.selection);
	};
}]);
