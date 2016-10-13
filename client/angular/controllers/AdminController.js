(function() {

    angular.module("TwitterWallApp").controller("AdminController", AdminController);

    AdminController.$inject = [
        "$scope",
        "adminDashDataService",
        "$sce",
        "$routeParams",
        "$interval",
    ];

    function AdminController(
        $scope, adminDashDataService, $sce, $routeParams, $interval
    ) {
        var vm = this;
        $scope.speakers = [];
        $scope.loggedIn = false;
        $scope.adminView = false;
        $scope.ctrl = {};
        $scope.errorMessage = "In order to access the dash board for this Twitter Wall you must be authorised";
        $scope.blockedUsers = [];

        $scope.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        $scope.ctrl.swiped = {};
        $scope.onTweetSwiped = function(tweet, showDelete) {
            $scope.ctrl.swiped[tweet.id_str] = showDelete;
        };

        $scope.setDeletedStatus = function(id, deleted) {
            adminDashDataService.setDeletedStatus(id, deleted);
            $scope.ctrl.swiped[id] = false;
        };
        $scope.setPinnedStatus = adminDashDataService.setPinnedStatus;

        $scope.addSpeaker = addSpeaker;
        $scope.removeSpeaker = removeSpeaker;

        $scope.displayBlockedTweet = adminDashDataService.displayBlockedTweet;

        $scope.setRetweetDisplayStatus = adminDashDataService.setRetweetDisplayStatus;

        $scope.getBlockedUsers = function() {
            adminDashDataService.blockedUsers().then(function(users) {
                $scope.blockedUsers = users;
            });
        };

        $scope.removeBlockedUser = function(user) {
            adminDashDataService.removeBlockedUser(user).then(function(result) {
                adminDashDataService.blockedUsers().then(function(users) {
                    $scope.blockedUsers = users;
                });
            });
        };

        $scope.addBlockedUser = function(name, screen_name) {
            adminDashDataService.addBlockedUser(name, screen_name).then(function(result) {
                adminDashDataService.blockedUsers().then(function(users) {
                    $scope.blockedUsers = users;
                });
            });
        };

        $scope.toggleBlocked = function(name, screen_name, blocked) {
            if (blocked) {
                var user = {
                    name: name,
                    screen_name: screen_name
                };
                $scope.removeBlockedUser(user);
            } else {
                $scope.addBlockedUser(name, screen_name);
            }
        };

        $scope.logOut = function() {
            adminDashDataService.logOut().then(function() {
                adminDashDataService.getAuthUri().then(function(uri) {
                    $scope.loginUri = uri;
                    $scope.loggedIn = false;
                });
            });
        };

        activate();

        function activate() {
            adminDashDataService.authenticate().then(function() {
                adminDashDataService.getSpeakers().then(function(speakers) {
                    $scope.speakers = speakers;
                }).catch(function(err) {
                    console.log("Could not get list of speakers:" + err);
                });
                $scope.loggedIn = true;
                $scope.adminView = true;
            }).catch(function() {
                adminDashDataService.getAuthUri().then(function(uri) {
                    if ($routeParams.status === "unauthorised") {
                        $scope.errorMessage = "This account is not authorised, please log in with an authorised account";
                    }
                    $scope.loginUri = uri;
                });
            });
        }

        function addSpeaker() {
            adminDashDataService.addSpeaker($scope.ctrl.speaker).then(function(result) {
                $scope.ctrl.speaker = "";
                return adminDashDataService.getSpeakers();
            }).then(function(speakers) {
                $scope.speakers = speakers;
            });
        }

        function removeSpeaker(speaker) {
            adminDashDataService.removeSpeaker(speaker).then(function(result) {
                return adminDashDataService.getSpeakers();
            }).then(function(speakers) {
                $scope.speakers = speakers;
            });
        }
    }

})();
