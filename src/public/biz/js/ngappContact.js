var app = angular.module('ngappContact', ['ui.bootstrap']);

app.factory('contactCreationOrEditFactory', function () {
    var service = {
        scope: null,
        setScope: function (scope) {
            this.scope = scope;
        },
        getScope: function () {
            return this.scope;
        },
        id: {
            content: '',
            hasError: function () {
                return false;
            }
        },
        name: {
            content: '',
            isBeforeSavingHasError: false,
            hasError: function () {
                this.isBeforeSavingHasError = false;
                return service.getScope().contactForm.name.$dirty && (
                    service.getScope().contactForm.name.$error.required ||
                    service.getScope().contactForm.name.$error.pattern ||
                    service.getScope().contactForm.name.$error.minlength ||
                    service.getScope().contactForm.name.$error.maxlength);
            },
            beforeSavingHasError: function () {
                this.isBeforeSavingHasError = service.getScope().contactForm.name.$error.required ||
                    service.getScope().contactForm.name.$error.pattern ||
                    service.getScope().contactForm.name.$error.minlength ||
                    service.getScope().contactForm.name.$error.maxlength;
                return this.isBeforeSavingHasError;
            }
        },
        nameFirstWordChr: {
            content: '',
            hasError: function () {
                return service.getScope().contactForm.nameFirstWordChr.$dirty && (
                    service.getScope().contactForm.nameFirstWordChr.$error.required ||
                    service.getScope().contactForm.nameFirstWordChr.$error.minlength ||
                    service.getScope().contactForm.nameFirstWordChr.$error.maxlength);
            },
            beforeSavingHasError: function () {
                return service.getScope().contactForm.nameFirstWordChr.$error.required ||
                    service.getScope().contactForm.nameFirstWordChr.$error.minlength ||
                    service.getScope().contactForm.nameFirstWordChr.$error.maxlength;
            }
        },
        nameAllWordChr: {
            content: '',
            hasError: function () {
                return service.getScope().contactForm.nameAllWordChr.$dirty && (
                    service.getScope().contactForm.nameAllWordChr.$error.required ||
                    service.getScope().contactForm.nameAllWordChr.$error.minlength ||
                    service.getScope().contactForm.nameAllWordChr.$error.maxlength);
            },
            beforeSavingHasError: function () {
                return service.getScope().contactForm.nameAllWordChr.$error.required ||
                    service.getScope().contactForm.nameAllWordChr.$error.minlength ||
                    service.getScope().contactForm.nameAllWordChr.$error.maxlength;
            }
        },
        corp: {
            content: '',
            hasError: function () {
                return false;
            },
            beforeSavingHasError: function () {
                return false;
            }
        },
        mobilePhone: {
            content: '',
            isBeforeSavingHasError: false,
            hasError: function () {
                return service.getScope().contactForm.mobilePhone.$dirty && (
                    service.getScope().contactForm.mobilePhone.$error.required ||
                    service.getScope().contactForm.mobilePhone.$error.minlength ||
                    service.getScope().contactForm.mobilePhone.$error.maxlength);
            },
            beforeSavingHasError: function () {
                return service.getScope().contactForm.mobilePhone.$error.required ||
                    service.getScope().contactForm.mobilePhone.$error.minlength ||
                    service.getScope().contactForm.mobilePhone.$error.maxlength;
            }
        },
        mail: {
            content: '',
            hasError: function () {
                return false;
            },
            beforeSavingHasError: function () {
                return false;
            }
        },
        beforeSavingInputIsInvalid: function () {
            return this.name.beforeSavingHasError() ||
                this.nameFirstWordChr.beforeSavingHasError() ||
                this.nameAllWordChr.beforeSavingHasError() ||
                this.mobilePhone.beforeSavingHasError() ||
                this.mail.beforeSavingHasError();
        }
    };

    return service;
});

app.controller('ctrlrContactShow', function ($scope, $http, $modal, $log) {

    $scope.fetchContacts = function () {
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
            z: []
        };

        $scope.contacts = {};

        $http.get('/contact/data').success(function (data, header, config, status) {
            for (var i = 0, c; c = data[i++];) {
                $scope.contactBlocks[c.nameFirstWordChr].push(c);
                $scope.contacts[c._id] = c;
            }
        });
    };

    $scope.delContact = function (id) {
        var confirmResult = confirm('delete this contactor?');
        if (!confirmResult) {
            $log.info('confirm false.');
            return;
        }

        var data = {contactId: id};
        $http({
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'DELETE',
            url: '/contact/data',
            data: data
        }).success(function (data, header, config, status) {
            //alert('Delete success: ' + data);
            $scope.fetchContacts();
        }).error(function (data, header, config, status) {
            $log.info('delete contactor error: ' + JSON.stringify(data, null, 2));
            //alert('Delete failed!');
        });
    };

    $scope.openCreateDialog = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'contactDialog.html',
            controller: 'ctrlrContactCreate',
            size: size
        });

        modalInstance.result.then(function (ret) {
            $scope.fetchContacts();
            //$log.info('Modal ok at: ' + ret);
        }, function (ret) {
            //$log.info('Modal dismissed at: ' + ret);
        });
    };

    $scope.openEditDialog = function (contactId, size) {
        var editableContact = $scope.contacts[contactId];

        var modalInstance = $modal.open({
            templateUrl: 'contactDialog.html',
            controller: 'ctrlrContactEdit',
            size: size,
            resolve: {
                editableContact: function () {
                    return editableContact;
                }
            }
        });

        modalInstance.result.then(function (ret) {
            $scope.fetchContacts();
            //$log.info('Modal ok at: ' + ret);
        }, function (ret) {
            //$log.info('Modal dismissed at: ' + ret);
        });
    };

    $scope.fetchContacts();

});

app.controller('ctrlrContactCreate', function ($scope, $modalInstance, $http, $log, contactCreationOrEditFactory) {

    $scope.contactCreationOrEditFactory = contactCreationOrEditFactory;
    $scope.contactCreationOrEditFactory.setScope($scope);

    $scope.save = function () {

        if ($scope.contactCreationOrEditFactory.beforeSavingInputIsInvalid()) {
            alert('input error');
            return;
        }

        var contactSaveData = {
            name: $scope.contactCreationOrEditFactory.name.content,
            nameFirstWordChr: $scope.contactCreationOrEditFactory.nameFirstWordChr.content,
            nameAllWordChr: $scope.contactCreationOrEditFactory.nameAllWordChr.content,
            corp: $scope.contactCreationOrEditFactory.corp.content,
            mobilePhone: $scope.contactCreationOrEditFactory.mobilePhone.content,
            mail: $scope.contactCreationOrEditFactory.mail.content,
        };

        $http.post('/contact/data', contactSaveData).then(
            function (res) {
                $log.info('save ok: ' + res);
                alert('save ok');
                $modalInstance.close('done');
            }, function (res) {
                $log.info('save failed: ' + res);
                alert('save failed');
                $modalInstance.close('done');
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('ctrlrContactEdit', function ($scope, $modalInstance, $http, $log, contactCreationOrEditFactory, editableContact) {

    $scope.contactCreationOrEditFactory = contactCreationOrEditFactory;
    $scope.contactCreationOrEditFactory.setScope($scope);

    $scope.contactCreationOrEditFactory.id.content = editableContact._id;
    $scope.contactCreationOrEditFactory.name.content = editableContact.name;
    $scope.contactCreationOrEditFactory.nameFirstWordChr.content = editableContact.nameFirstWordChr;
    $scope.contactCreationOrEditFactory.nameAllWordChr.content = editableContact.nameAllWordChr;
    $scope.contactCreationOrEditFactory.corp.content = editableContact.corp;
    $scope.contactCreationOrEditFactory.mobilePhone.content = editableContact.mobilePhone;
    $scope.contactCreationOrEditFactory.mail.content = editableContact.mail;

    $scope.save = function () {

        if ($scope.contactCreationOrEditFactory.beforeSavingInputIsInvalid()) {
            return;
        }

        var contactSaveData = {
            id: $scope.contactCreationOrEditFactory.id.content,
            name: $scope.contactCreationOrEditFactory.name.content,
            nameFirstWordChr: $scope.contactCreationOrEditFactory.nameFirstWordChr.content,
            nameAllWordChr: $scope.contactCreationOrEditFactory.nameAllWordChr.content,
            corp: $scope.contactCreationOrEditFactory.corp.content,
            mobilePhone: $scope.contactCreationOrEditFactory.mobilePhone.content,
            mail: $scope.contactCreationOrEditFactory.mail.content,
        };

        $http.put('/contact/data', contactSaveData).then(
            function (res) {
                $log.info('save ok: ' + res);
                alert('save ok');
                $modalInstance.close('done');
            }, function (res) {
                $log.info('save failed: ' + res);
                alert('save failed');
                $modalInstance.close('done');
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
