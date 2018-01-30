var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
// constante : base de données des pokemons
// aura besoin d'un modèle (= service pour angular) pour taper dans la BD et être utilisé par le controller
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

// configuration
pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
// création du controleur
pokeApp.controller("controller", ['$scope', '$log', function($scope, $log){
	//nouvel objet angular liant le HTML et le javascript : objet liste de pokemons
	//objet tableau associatif clé valeur {}
	$scope.listePokemon = [
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
	];
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
