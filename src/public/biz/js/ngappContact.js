var app = angular.module('ngappContact', ['ui.bootstrap']);

app.factory('contactCreationOrEditFactory', function () {
    var service = {
        _scope: null,
        setScope: function (scope) {
            this._scope = scope;
        },
        getScope: function () {
            return this._scope;
        },
        _isDidSaveing: false,
        didSaveing: function () {
            this._isDidSaveing = true;
        },
        isDidSaveing: function () {
            return this._isDidSaveing;
        },
        resetDidSaveing: function () {
            this._isDidSaveing= false;
        },
        id: {
            content: '',
            resetContent:function(){
                this.content = '';
            },
            hasError: function () {
                return false;
            }
        },
        name: {
            content: '',
            resetContent:function(){
                this.content = '';
            },
            hasError: function () {
                var result = false;

                var isDirty = service.getScope().contactForm.name.$dirty;
                var isInvalid = service.getScope().contactForm.name.$error.required ||
                    service.getScope().contactForm.name.$error.pattern ||
                    service.getScope().contactForm.name.$error.minlength ||
                    service.getScope().contactForm.name.$error.maxlength;

                if (service.isDidSaveing()) {
                    result = isInvalid;
                }
                else {
                    result = isDirty & isInvalid;
                }

                return result;
            },
        },
        nameFirstWordChr: {
            content: '',
            resetContent:function(){
                this.content = '';
            },
            hasError: function () {
                var result = false;

                var isDirty = service.getScope().contactForm.nameFirstWordChr.$dirty;
                var isInvalid = service.getScope().contactForm.nameFirstWordChr.$error.required ||
                    service.getScope().contactForm.nameFirstWordChr.$error.minlength ||
                    service.getScope().contactForm.nameFirstWordChr.$error.maxlength;

                if (service.isDidSaveing()) {
                    result = isInvalid;
                }
                else {
                    result = isDirty & isInvalid;
                }

                return result;
            }
        },
        nameAllWordChr: {
            content: '',
            resetContent:function(){
                this.content = '';
            },
            hasError: function () {
                var result;

                var isDirty = service.getScope().contactForm.nameAllWordChr.$dirty;
                var isInvalid = service.getScope().contactForm.nameAllWordChr.$error.required ||
                    service.getScope().contactForm.nameAllWordChr.$error.minlength ||
                    service.getScope().contactForm.nameAllWordChr.$error.maxlength;

                if (service.isDidSaveing()) {
                    result = isInvalid;
                }
                else {
                    result = isDirty & isInvalid;
                }

                return result;
            },
        },
        corp: {
            content: '',
            resetContent:function(){
                this.content = '';
            },
            hasError: function () {
                return false;
            },
            beforeSavingHasError: function () {
                return false;
            }
        },
        mobilePhone: {
            content: '',
            resetContent:function(){
                this.content = '';
            },
            isBeforeSavingHasError: false,
            hasError: function () {
                var result;

                var isDirty = service.getScope().contactForm.mobilePhone.$dirty;
                var isInvalid = service.getScope().contactForm.mobilePhone.$error.required ||
                    service.getScope().contactForm.mobilePhone.$error.minlength ||
                    service.getScope().contactForm.mobilePhone.$error.maxlength;

                if (service.isDidSaveing()) {
                    result = isInvalid;
                }
                else {
                    result = isDirty & isInvalid;
                }

                return result;
            },
        },
        mail: {
            content: '',
            resetContent:function(){
                this.content = '';
            },
            hasError: function () {
                return false;
            },
        },
        beforeSavingInputIsInvalid: function () {
            return this.name.hasError() ||
                this.nameFirstWordChr.hasError() ||
                this.nameAllWordChr.hasError() ||
                this.mobilePhone.hasError() ||
                this.mail.hasError();
        },
        reset:function(){
            this.id.resetContent();
            this.name.resetContent();
            this.nameFirstWordChr.resetContent();
            this.nameAllWordChr.resetContent();
            this.mobilePhone.resetContent();
            this.mail.resetContent();
            this.resetDidSaveing();
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
    $scope.contactCreationOrEditFactory.reset();

    $scope.save = function () {
        $scope.contactCreationOrEditFactory.didSaveing();
        if ($scope.contactCreationOrEditFactory.beforeSavingInputIsInvalid()) {
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
    $scope.contactCreationOrEditFactory.reset();

    $scope.contactCreationOrEditFactory.id.content = editableContact._id;
    $scope.contactCreationOrEditFactory.name.content = editableContact.name;
    $scope.contactCreationOrEditFactory.nameFirstWordChr.content = editableContact.nameFirstWordChr;
    $scope.contactCreationOrEditFactory.nameAllWordChr.content = editableContact.nameAllWordChr;
    $scope.contactCreationOrEditFactory.corp.content = editableContact.corp;
    $scope.contactCreationOrEditFactory.mobilePhone.content = editableContact.mobilePhone;
    $scope.contactCreationOrEditFactory.mail.content = editableContact.mail;

    $scope.save = function () {
        $scope.contactCreationOrEditFactory.didSaveing();
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
