(function() {

    var app = angular.module("pomodoro", []);

    app.controller("CountController", function($scope) {

        // $scope.count = 1500000;
        $scope.count = 60000; 

        $scope.min = 60000;

        $scope.minDefault = $scope.count/$scope.min;

        $scope.secDisplay = "00";

        $scope.timer;

        $scope.minDisplay = $scope.minDefault;

        // stops clock when it reaches 0:00
        $scope.end = function() {
            clearInterval($scope.timer);
        };

        // start function
        $scope.start = function() {

            $scope.timer = setInterval(function() {

                // decrement the total time by one second
                $scope.count = $scope.count - 10000;

                // starts off minute display
                if($scope.minDisplay == $scope.minDefault) {
                    $scope.minDisplay = $scope.minDisplay - 1;
                }

                // display minute
                if($scope.count % $scope.min === 0) {
                    $scope.minDisplay = $scope.count / $scope.min;
                }

                // display seconds
                $scope.secDisplay = Math.floor(($scope.count % $scope.min) / 1000);

                // if seconds are less than 0 set to 60 and if it is set to 60 restart decrement of seconds
                if($scope.secDisplay < 0) {
                    $scope.secDisplay = 60;
                }
                if($scope.secDisplay === 60) {
                    $scope.secDisplay = Math.floor(($scope.count % $scope.min) / 1000);
                }

                // add 0 to seconds less than 10
                if($scope.secDisplay < 10) {
                    $scope.secDisplay = "0" + $scope.secDisplay.toString();
                } 

                if($scope.secDisplay == 0 && $scope.minDisplay == 0) {
                    $scope.end();
                }

                // update view
                $scope.$apply();

                // show data in console
                console.log("Milliseconds: " + $scope.count);
                console.log("Minutes: " + $scope.minDisplay);
                console.log("Seconds: " + $scope.secDisplay);
            },1000);
        };

        // stop function
        $scope.stop = function() {
            clearInterval($scope.timer);
            $scope.count = 120000; 
            $scope.minDisplay = $scope.minDefault;
            $scope.secDisplay = "00";
        };

    }); 

})();

