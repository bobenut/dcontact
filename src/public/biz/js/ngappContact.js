var app = angular.module('ngappContact', ['ui.bootstrap']);


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

    $scope.openEditDialog = function (contactId,size) {
        var editableContact = $scope.contacts[contactId];

        var modalInstance = $modal.open({
            templateUrl: 'contactDialog.html',
            controller: 'ctrlrContactEdit',
            size: size,
            resolve:{
                editableContact: function(){
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

app.controller('ctrlrContactEdit', function ($scope, $modalInstance, $http, $log,editableContact) {

    $scope.contact = {
        id:{
            content: editableContact._id,
            hasError: function () {
                return false;
            }
        },
        name: {
            content: editableContact.name,
            hasError: function () {
                return $scope.contactForm.name.$dirty && (
                    $scope.contactForm.name.$error.required ||
                    $scope.contactForm.name.$error.pattern ||
                    $scope.contactForm.name.$error.minlength ||
                    $scope.contactForm.name.$error.maxlength);
            }
        },
        nameFirstWordChr: {
            content: editableContact.nameFirstWordChr,
            hasError: function () {
                return $scope.contactForm.nameFirstWordChr.$dirty && (
                    $scope.contactForm.nameFirstWordChr.$error.required ||
                    $scope.contactForm.nameFirstWordChr.$error.minlength ||
                    $scope.contactForm.nameFirstWordChr.$error.maxlength);

            }
        },
        nameAllWordChr: {
            content: editableContact.nameAllWordChr,
            hasError: function () {
                return $scope.contactForm.nameAllWordChr.$dirty && (
                    $scope.contactForm.nameAllWordChr.$error.required ||
                    $scope.contactForm.nameAllWordChr.$error.minlength ||
                    $scope.contactForm.nameAllWordChr.$error.maxlength);
            }
        },
        corp: {
            content: editableContact.corp,
            hasError: function () {
                return false;
            }
        },
        mobilePhone: {
            content: editableContact.mobilePhone,
            hasError: function () {
                return $scope.contactForm.mobilePhone.$dirty && (
                    $scope.contactForm.mobilePhone.$error.required ||
                    $scope.contactForm.mobilePhone.$error.minlength ||
                    $scope.contactForm.mobilePhone.$error.maxlength);
            }
        },
        mail: {
            content: editableContact.mail,
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
            id: $scope.contact.id.content,
            name: $scope.contact.name.content,
            nameFirstWordChr: $scope.contact.nameFirstWordChr.content,
            nameAllWordChr: $scope.contact.nameAllWordChr.content,
            corp: $scope.contact.corp.content,
            mobilePhone: $scope.contact.mobilePhone.content,
            mail: $scope.contact.mail.content,
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
