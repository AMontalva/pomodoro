(function() {

    var app = angular.module("pomodoro", []);

    app.controller("CountController", function($scope) {        
        // count = 1500000;
        var totalMilliseconds = 120000;
        var count = totalMilliseconds; 
        var min = 60000;
        var timer;
        var minDefault = count/min;
        $scope.minDisplay = minDefault;
        var secDefault = "00";
        $scope.secDisplay = secDefault;

        $scope.hideStart = false;
        $scope.hideStop = true;
        $scope.hideBreak = true;
        $scope.hideCancel = true;

        var breakMilliseconds = 60000;
        var breakDefault = breakMilliseconds/min;
        var breakBool = true;

        // controls which buttons will appear in view
        var hideButtons = function(startBtn, stopBtn, breakBtn, cancelBtn) {
            $scope.hideStart = startBtn;            
            $scope.hideStop = stopBtn;
            $scope.hideBreak = breakBtn;
            $scope.hideCancel = cancelBtn;
        };

        // displays minutes
        var minuteControl = function() {
            // starts off minute display
            if($scope.secDisplay == 50) {
                $scope.minDisplay = $scope.minDisplay - 1;
            }
        };

        // displays minutes
        var secondControl = function() {
            // display seconds
            $scope.secDisplay = Math.floor((count % min) / 1000)
            // if seconds are less than 0 set to 60 and if it is set to 60 restart decrement of seconds
            if($scope.secDisplay < 0) {
                $scope.secDisplay = 60;
            }
            // counts down the seconds
            if($scope.secDisplay === 60) {
                $scope.secDisplay = Math.floor((count % min) / 1000);
            }
            // add 0 to seconds less than 10
            if($scope.secDisplay < 10) {
                $scope.secDisplay = "0" + $scope.secDisplay.toString();
            } 
        };

        // cancels break
        $scope.cancel = function() {
            hideButtons(false, true, true, true);
        };

        // start break
        $scope.break = function() {
            count = breakMilliseconds;
            $scope.minDisplay = breakDefault;
            $scope.secDisplay = secDefault;
            hideButtons(true, false, true, true);
            breakBool = false;
            run();
        };

        // stop function
        $scope.stop = function() {
            hideButtons(false, true, true, true);
            clearInterval(timer);
            count = totalMilliseconds; 
            $scope.minDisplay = minDefault;
            $scope.secDisplay = secDefault;
        };

        // stops clock when it reaches 0:00
        var end = function() {
            if($scope.secDisplay == 0 && $scope.minDisplay == 0) {
                clearInterval(timer);
                if(breakBool == true) {
                    hideButtons(true, true, false, false);
                }
                else {
                    hideButtons(false, true, true, true);
                }
            }
        };

        // default start
        $scope.start = function() {
            clearInterval(timer);
            hideButtons(true, false, true, true);            
            count = totalMilliseconds; 
            $scope.minDisplay = minDefault;
            $scope.secDisplay = secDefault; 
            breakBool = true;
            run();           
        };        

        // run application
        var run = function() {
            timer = setInterval(function() {
                // decrement the total time by one second
                count = count - 10000;
                // displays seconds
                secondControl();
                // displays minutes
                minuteControl();
                // end when time is 0:00
                end();
                // update view=html
                $scope.$apply();
            },1000);
        };

    }); 
})();

