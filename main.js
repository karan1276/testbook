var app = angular.module('testbook',[]);



app.config(function($logProvider){
    $logProvider.debugEnabled(true);
});

app.controller('main_controller',['$scope',function($scope){

	$scope.name = "testbook";
}]).directive('checkWebsite',['$interval','$http',function($interval,$http){

	function link(scope, element, attrs) {
		var count=1;

		//make ajax calls to the website here and update the DOM
		function updateStatus(){

			//this should ideally check 3 times
			$http.get(attrs.websiteurl).
			  then(function(response) {
			    element.html("<p>Website is live</p>");
			  }, function(response) {
			    element.html("<p>Website is down</p>");
			  });
		}

		//check the status of website after every attrs.rectime seconds
		$interval(function() {
      updateStatus();
    }, parseInt(attrs.rectime));
	}
	return {
		scope:{
			websiteurl: '@',
			rectime: '@'
		},
		template: '<p>Website URL: {{websiteurl}}, Reccuring Time: {{rectime}}</p>',
		link:link
	};
}]);
