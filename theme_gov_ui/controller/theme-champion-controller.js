app.controller("themeChampionController", ["$scope", "$state", "$sessionStorage", function($scope, $state, $sessionStorage){
	$scope.username = $sessionStorage.userProfile.username;
}]);