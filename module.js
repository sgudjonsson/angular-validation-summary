
	angular
		.module("app", ["ValidationSummaryModule"])
		.controller("MainController", ["$scope", function($scope) {
			$scope.showValidation = false;
			$scope.toggleValidationSummary = function() {
				$scope.showValidation = !$scope.showValidation;
			};
		}]);