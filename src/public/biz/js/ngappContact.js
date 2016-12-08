var app = angular.module('ngappContact', ['ui.bootstrap']);
app.controller('ctrlrContactShow', function ($scope, $http, $modal, $log) {
    $scope.contactBlocks = {
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: [],
        g: [],
        h: [],
        i: [],
        j: [],
        k: [],
        l: [],
        m: [],
        n: [],
        o: [],
        p: [],
        q: [],
        r: [],
        s: [],
        t: [],
        u: [],
        v: [],
        w: [],
        x: [],
        y: [],
        z: [],
    };


    $http.get('/contact/data').success(function (data, status, headers, config) {
        for (var i = 0, c; c = data[i++];) {
            $scope.contactBlocks[c.nameFirstWordChr].push(c);
        }
    });

    $scope.openCreateDialog = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'contactDialog.html',
            controller: 'ctrlrContactCreate',
            size: size
        });

        modalInstance.result.then(function (ret) {
            $log.info('Modal ok at: ' + ret);
        }, function (ret) {
            $log.info('Modal dismissed at: ' + ret);
        });
    };

});

app.controller('ctrlrContactCreate', function ($scope, $modalInstance, $log) {

    $scope.contact = {
        cname: {
            content: '',
            hasError: function () {
                return $scope.contactForm.cname.$dirty && (
                    $scope.contactForm.cname.$error.required ||
                    $scope.contactForm.cname.$error.pattern ||
                    $scope.contactForm.cname.$error.minlength ||
                    $scope.contactForm.cname.$error.maxlength);
            }
        },
        nameFirstWordChr: {
            content: '',
            hasError: function () {
                return $scope.contactForm.nameFirstWordChr.$dirty && (
                    $scope.contactForm.nameFirstWordChr.$error.required ||
                    $scope.contactForm.nameFirstWordChr.$error.minlength ||
                    $scope.contactForm.nameFirstWordChr.$error.maxlength);

            }
        },
        nameAllWordChr: {
            content: '',
            hasError: function () {
                return $scope.contactForm.nameAllWordChr.$dirty && (
                    $scope.contactForm.nameAllWordChr.$error.required ||
                    $scope.contactForm.nameAllWordChr.$error.minlength ||
                    $scope.contactForm.nameAllWordChr.$error.maxlength);
            }
        },
        corp: {
            content: '',
            hasError: function () {
                return false;
            }
        },
        mobilePhone: {
            content: '',
            hasError: function () {
                return $scope.contactForm.mobilePhone.$dirty && (
                    $scope.contactForm.mobilePhone.$error.required ||
                    $scope.contactForm.mobilePhone.$error.minlength ||
                    $scope.contactForm.mobilePhone.$error.maxlength);
            }
        },
        mail: {
            content: '',
            hasError: function () {
                return false;
            }
        }
    };

    $scope.ok = function () {

        $scope.contact.nameHasError = true;
    };

    $scope.cancel = function () {
        //$modalInstance.dismiss('cancel kxh');
        $log.info($scope.contact.cnameHasError());
        $scope.contact.nameHasError = false;
    };
});
