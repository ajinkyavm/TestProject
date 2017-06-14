app.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/login');
	
	$stateProvider.state('login', {
        url: '/login',
        pageName: 'loginpage',
        templateUrl: 'templates/loginPage.html',
        controller: "loginPageController"
    }).state('themeChampion', {
        url: '/themeChampion',
        pageName: 'themeChampion',
        templateUrl: 'templates/themeChampion.html',
        controller: "themeChampionController"
				    }).state('themeChampion.setAnnualTargets', {
				        url: '/setAnnualTargets',
				        pageName: 'setAnnualTargets',
				        templateUrl: 'templates/setAnnualTargets.html',
				        controller: "themeChampionController"
									    }).state('themeChampion.setAnnualTargets.q1Goals', {
									        url: '/q1Goals',
									        pageName: 'q1Goals',
									        templateUrl: 'templates/q1Goals.html',
									        controller: "themeChampionController"
									    }).state('themeChampion.setAnnualTargets.q2Goals', {
									    	url: '/q2Goals',
									        pageName: 'q2Goals',
									        templateUrl: 'templates/q1Goals.html',
									        controller: "themeChampionController"
									    }).state('themeChampion.setAnnualTargets.q3Goals', {
									    	url: '/q3Goals',
									        pageName: 'q3Goals',
									        templateUrl: 'templates/q1Goals.html',
									        controller: "themeChampionController"
									    }).state('themeChampion.setAnnualTargets.q4Goals', {
									    	url: '/q4Goals',
									        pageName: 'q4Goals',
									        templateUrl: 'templates/q1Goals.html',
									        controller: "themeChampionController"
	}).state('themeChampion.updateMarkers', {
        url: '/updateMarkers',
        pageName: 'updateMarkers',
        templateUrl: 'templates/updateMarkers.html',
        controller: "themeChampionController"
    }).state('themeChampion.downloadReports', {
        url: '/downloadReports',
        pageName: 'downloadReports',
        templateUrl: 'templates/downloadReports.html',
        controller: "themeChampionController"
    });
});


