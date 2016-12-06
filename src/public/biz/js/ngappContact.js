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

app.controller('ctrlrContactCreate', function ($scope, $modalInstance) {
    $scope.contact = {
        cname: 'ddd',
        cnameHasError:false,
        nameFirstWordChr:'',
        nameFirstWordChrHasEror:false,
        nameAllWordChr:'',
        nameAllWordChrHasEror:false,
        corp:'',
        corpHasEror:false,
        mobilePhone:'',
        mobilePhoneHasEror:false,
        mail:'',
        mailHasEror:false
    };

    $scope.ok = function () {
        //$modalInstance.close('yes kxh');
        $scope.contact.nameHasError = true;
    };

    $scope.cancel = function () {
        //$modalInstance.dismiss('cancel kxh');
        $scope.contact.nameHasError = false;
    };
});

app.directive('errorMessage', ['$compile', '$log', function ($compile, $log) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            $log.info('kxh222');
            var parenNode = element.parent();
            parenNode.addClass("has-feedback");


            var subScope = scope.$new(true);
            //subScope.errorsText={
            //    required:"此项为必填",
            //    pattern:scope.title
            //}

            subScope.hasError = function () {
                var re = ngModel.$invalid && ngModel.$dirty;
                if (re) {
                    parenNode.addClass("has-error");
                } else {
                    parenNode.removeClass("has-error");
                }
                return re;
            }

            subScope.errors = function () {
                return ngModel.$error;
            }


            var errorElement = $compile(`
                <span   ng-if="hasError()"  class="glyphicon glyphicon-warning-sign form-control-feedback" ></span>
                <ul class="help-block" ng-if="hasError()">
                    <li ng-repeat="(error,wrong) in errors()" ng-bind="errorsText[error]">
                </ul>
                `)(subScope);

            element.after(errorElement)
        }
    };
}]);