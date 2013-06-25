angular
	.module("app")
	.directive("validateOnlyHelloWorld", function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(scope, element, attributes, controller) {
				// dom -> model
				controller.$parsers.unshift(function(value) {
					var isValid = angular.isString(value) && value.toString().toLowerCase() === "hello world";
					controller.$setValidity("validateOnlyHelloWorld", isValid);

					return isValid ? value : undefined;
				});

				// model -> dom
				controller.$formatters.unshift(function(value) {
					var isValid = angular.isString(value) && value.toString().toLowerCase() === "hello world";
					controller.$setValidity("validateOnlyHelloWorld", isValid);
					
					return value;
				});
			}
		}
	});