
angular.module("ValidationSummaryModule", []);

/*
	validation-summary displays a unordered list of visible validation messages

	output example:
	<ul>
		<li>Email is required</li>
		<li>Email is not valid</li>
	</ul>
*/
angular.module("ValidationSummaryModule").directive("validationSummary", function() {
	return {
		restrict: "A",
		require: "^form",
		template: "<ul><li ng-repeat='(expression,message) in validationMessages'>{{message}}</li></ul>",
		link: function(scope, element, attributes, controller) {

			scope.validationMessages = {};

			// Hooks up a watch using [ng-show] expression
			controller.watchValidation = function(expression, message) {

				// watch the return value from the scope.$eval(expression)
				scope.$watch(function() { return scope.$eval(expression); }, function(isVisible) {

					// check if the validation message exists
					var containsMessage = scope.validationMessages.hasOwnProperty(expression);

					// if the validation message doesn't exist and it should be visible, add it to the list
					if(!containsMessage && isVisible)
						scope.validationMessages[expression] = message;

					// if the validation message does exist and it shouldn't be visible, delete it
					if(containsMessage && !isVisible)
						delete scope.validationMessages[expression];
				});

			};

		}
	};
});

/*
	validation-message directive is used to mark validation message elements to be added to the validation-summary directive.
	validation-message directive assumes that a ng-show directive expression is used to express the message visibility

	Usage:
	<[tagName] validation-message ng-show="[formName].[fieldName].$error.[validationErrorKey]">Validation message is here</[tagName]>

	Example:
	<li validation-message ng-show="sample.email.$error.required">Email is required</li>
*/
angular.module("ValidationSummaryModule").directive("validationMessage", function() {
	return {
		restrict: "A",
		require: "^form",
		link: function(scope, element, attributes, controller) {

			// the ng-show expression used to determine message visibility
			var visibilityExpression = attributes.ngShow;

			// the validation message
			var message = element.text();

			// adds a watch to the validation message using the expression from the ng-show attribute
			controller.watchValidation(visibilityExpression, message);
		}
	};
});
