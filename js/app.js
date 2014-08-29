(function() {

    var app = angular.module("pomodoro", []);

    app.controller("CountController", function($scope) {

        // $scope.count = 1500000;
        $scope.totalMilliseconds = 120000;
        $scope.count = $scope.totalMilliseconds; 
        $scope.min = 60000;
        $scope.timer;
        $scope.minDefault = $scope.count/$scope.min;
        $scope.minDisplay = $scope.minDefault;
        $scope.secDisplay = "00";

        $scope.hideStop = true;
        $scope.hideStart = false;
        $scope.hideBreak = true;
        $scope.hideCancel = true;

        $scope.breakMilliseconds = 60000;
        $scope.minBreak = $scope.breakMilliseconds/$scope.min;
        $scope.breakBool = true;




        // displays minutes
        $scope.minuteControl = function() {
            // starts off minute display
            if($scope.secDisplay == 50) {
                $scope.minDisplay = $scope.minDisplay - 1;
            }
        };

        // displays minutes
        $scope.secondControl = function() {
            // display seconds
            $scope.secDisplay = Math.floor(($scope.count % $scope.min) / 1000)
            // if seconds are less than 0 set to 60 and if it is set to 60 restart decrement of seconds
            if($scope.secDisplay < 0) {
                $scope.secDisplay = 60;
            }
            // counts down the seconds
            if($scope.secDisplay === 60) {
                $scope.secDisplay = Math.floor(($scope.count % $scope.min) / 1000);
            }
            // add 0 to seconds less than 10
            if($scope.secDisplay < 10) {
                $scope.secDisplay = "0" + $scope.secDisplay.toString();
            } 
        };

        // cancels break
        $scope.cancel = function() {
            $scope.hideStart = false;
            $scope.hideBreak = true;
            $scope.hideCancel = true;
        };


        // start break
        $scope.break = function() {
            $scope.count = $scope.breakMilliseconds;
            $scope.minDisplay = $scope.minBreak;
            $scope.secDisplay = "00";
            $scope.hideStart = true;
            $scope.hideStop = false;
            $scope.hideBreak = true;
            $scope.hideCancel = true;
            $scope.breakBool = false;
            $scope.run();
        };


        // stop function
        $scope.stop = function() {
            $scope.hideStart = false;
            $scope.hideStop = true;
            clearInterval($scope.timer);
            $scope.count = $scope.totalMilliseconds; 
            $scope.minDisplay = $scope.minDefault;
            $scope.secDisplay = "00";
        };

        // stops clock when it reaches 0:00
        $scope.end = function() {
            if($scope.secDisplay == 0 && $scope.minDisplay == 0) {
                $scope.hideStop = true;
                clearInterval($scope.timer);
                if($scope.breakBool == true) {
                    $scope.hideBreak = false;
                    $scope.hideCancel = false;                    
                }
                else {
                    $scope.hideStart = false;
                }
            }
        };

        // default start
        $scope.start = function() {
            clearInterval($scope.timer);
            $scope.hideStop = false;
            $scope.hideStart = true;
            $scope.count = $scope.totalMilliseconds; 
            $scope.minDisplay = $scope.minDefault;
            $scope.secDisplay = "00"; 
            $scope.breakBool = true;
            $scope.run();           
        };        

        // run application
        $scope.run = function() {
            $scope.timer = setInterval(function() {
                // decrement the total time by one second
                $scope.count = $scope.count - 10000;
                // displays seconds
                $scope.secondControl();
                // displays minutes
                $scope.minuteControl();
                // end when time is 0:00
                $scope.end();
                // update view=html
                $scope.$apply();
            },1000);
        };

    }); 

})();

