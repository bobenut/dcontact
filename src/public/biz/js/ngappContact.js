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

app.controller('ctrlrContactCreate', function ($scope, $modalInstance, $http, $log) {

    $scope.contact = {
        name: {
            content: '',
            hasError: function () {
                return $scope.contactForm.name.$dirty && (
                    $scope.contactForm.name.$error.required ||
                    $scope.contactForm.name.$error.pattern ||
                    $scope.contactForm.name.$error.minlength ||
                    $scope.contactForm.name.$error.maxlength);
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

    function inputIsInvalid() {
        return $scope.contact.name.hasError() ||
            $scope.contact.nameFirstWordChr.hasError() ||
            $scope.contact.nameAllWordChr.hasError() ||
            $scope.contact.corp.hasError() ||
            $scope.contact.mobilePhone.hasError() ||
            $scope.contact.mail.hasError();
    }

    $scope.save = function () {
        if (inputIsInvalid()) {
            return;
        }

        var contactSaveData = {
            name: $scope.contact.name.content,
            nameFirstWordChr: $scope.contact.nameFirstWordChr.content,
            nameAllWordChr: $scope.contact.nameAllWordChr.content,
            corp: $scope.contact.corp.content,
            mobilePhone: $scope.contact.mobilePhone.content,
            mail: $scope.contact.mail.content,
        };

        $http.post('/contact/data', contactSaveData).then(
            function (res) {
                $log.info('save ok: ' + res);
                alert('save ok');
            }, function (res) {
                $log.info('save failed: ' + res);
                alert('save failed');
            });

        $modalInstance.close('done');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
