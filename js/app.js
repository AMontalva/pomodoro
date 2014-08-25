(function() {

    var app = angular.module("pomodoro", []);

    app.controller("CountController", function($scope) {

        // $scope.count = 1500000;
        $scope.count = 120000; 

        $scope.min = 60000;

        $scope.minuteDisplay = 2;

        $scope.secondDisplay;

        $scope.increment = function() {
            setInterval(function() {
                $scope.count = $scope.count - 1000;
                

                if($scope.count % $scope.min === 0) {
                    $scope.minuteDisplay = $scope.count / $scope.min;
                }

                $scope.secondDisplay = Math.floor(($scope.count % $scope.min) / 1000);

                if($scope.secondDisplay < 0) {
                    $scope.secondDisplay = 60;
                }
                if($scope.secondDisplay === 60) {
                    $scope.secondDisplay = Math.floor(($scope.count % $scope.min) / 1000);
                }

                $scope.$apply();

                console.log("Milliseconds: " + $scope.count);
                console.log("Minutes: " + $scope.minuteDisplay);
                console.log("Seconds: " + $scope.secondDisplay);
            },1000);
        };

    }); 

})();

