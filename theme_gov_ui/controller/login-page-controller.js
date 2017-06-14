app.controller("loginPageController", ["$scope", "$state", "$sessionStorage", function($scope, $state, $sessionStorage){
	$scope.login = function(){
		$sessionStorage.userProfile = {
			'userid' : 'aj249628',
			'username' : 'Ajinkya Mahagaonkar',
			'usermailid' : 'ajinkya.mahagaonkar@wipro.com'
		}
		$state.go('themeChampion');
	};
}]);