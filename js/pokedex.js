var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
// constante : base de données des pokemons
// aura besoin d'un modèle (= service pour angular) pour taper dans la BD et être utilisé par le controller
pokeApp.constant('POKEAPI', 'https://pokeapi.co');

// configuration
pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  //  $resource("http://pokeapi.co/api/v1/type/:id/");
}]);

// création du service API
pokeApp.factory('service', ['$resource', 'POKEAPI', function($resource, POKEAPI) {
  return $resource(POKEAPI+"/api/v1/pokedex");
}]);

// création de la recherche des informations du pokemon
pokeApp.factory('recherche', ['$resource', 'POKEAPI', function($resource, POKEAPI) {
  return $resource(POKEAPI+"/api/v2/pokemon/:id");
}]);

// création de la recherche de la description
pokeApp.factory('description', ['$resource', 'POKEAPI', function($resource, POKEAPI) {
  return $resource(POKEAPI+"/api/v2/pokemon-species/:id");
}]);

// service contenant au moins le nom et le prénom du pokémon
pokeApp.service('passerelle', ['$resource', function($resource){
	this.idPokemon = 0;
	this.nomPokemon = '';
	
	this.enleverEspaces = function(mot){
		var res = "";
		var continuer = true;
		
		for(var i in mot){
			if(mot[i] != " "){
				res += mot[i] + "";
			}
		}
		
		return res;
	}
}]);

// la directive permettant d'afficher le pokédex
pokeApp.directive('pokedex', function(){
	return {
		templateUrl: 'pokedex.html'
	};
});

// création du controleur
pokeApp.controller("controller", ['$scope', '$log', 'service', 'passerelle', function($scope, $log, service, passerelle){
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
		try{
			$scope.choixDresseur = $scope.selection.split(" - ");
			
			// recherche des informations du pokemon
			passerelle.idPokemon = passerelle.enleverEspaces($scope.choixDresseur[0]);
			passerelle.nomPokemon = passerelle.enleverEspaces($scope.choixDresseur[1]);
			
			$log.log(passerelle.idPokemon + " " + passerelle.nomPokemon);
		} catch(e){}
	};
}]);

pokeApp.controller("informations", ['$scope', '$log', 'recherche', 'description', 'passerelle', function($scope, $log, recherche, description, passerelle){
	$scope.nom = "Sélectionnez un pokémon et cliquez sur 'GO!'";
	$scope.habilites = [];
	$scope.types = [];
	$scope.attaques = [];
	$scope.description = "";
	$scope.image = "https://i.imgur.com/vG64e6a.png";
	
	$scope.$watch(
		function(){
			return passerelle.idPokemon;
		}, function(){
			// si l'id est égal à zéro, ça veut dire qu'on vient juste de charger la page. On peut donc quitter la fonction
			if(passerelle.idPokemon == 0){
				return;
			}
			
			$scope.image = "pokeball_wait.gif";
			
			// sinon on cherche les informations
			$log.log(passerelle.idPokemon);
			var informations = recherche.get({id : passerelle.idPokemon}, function(){
				$log.log(informations);
				// le nom
				$scope.nom = informations["name"];
				
				// l'image
				$scope.image = informations["sprites"]["front_default"];
				
				// les abilités
				$scope.habilites = [];
				for(var a in informations["abilities"]){
					$scope.habilites.push(informations["abilities"][a]["ability"]["name"]);
				}
				
				// le(s) type(s)
				$scope.types = [];
				for(var a in informations["types"]){
					$scope.types.push(informations["types"][a]["type"]["name"]);
				}
				
				// les attaques
				$scope.attaques = [];
				for(var a in informations["moves"]){
					$scope.attaques.push(informations["moves"][a]["move"]["name"]);
				}
			});
			
			// la description
			var desc = description.get({id : passerelle.idPokemon}, function(){
				$log.log(desc);
				var trouve = false;
				
				// on cherche la description en français
				for(var i in desc["flavor_text_entries"]){
					if(desc["flavor_text_entries"][i]["language"]["name"] == "fr"){
						$scope.description = desc["flavor_text_entries"][i]["flavor_text"];
						trouve = true;
						break;
					}
				}
				
				if(!trouve){
					$scope.description = "Pas de description en français";
				}
				
				// fait parler la description
				var voix = new SpeechSynthesisUtterance($scope.description);
				voix.default = false;
				voix.lang = "fr-FR";
				window.speechSynthesis.speak(voix);
			});
		}
	);
}]);