var app = angular.module('ngappContact', []);
app.controller('ctrlrContactShow', function($scope, $http) {
    $scope.contactBlocks = {
        a:[],
        b:[],
        c:[],
        d:[],
        e:[],
        f:[],
        g:[],
        h:[],
        i:[],
        j:[],
        k:[],
        l:[],
        m:[],
        n:[],
        o:[],
        p:[],
        q:[],
        r:[],
        s:[],
        t:[],
        u:[],
        v:[],
        w:[],
        x:[],
        y:[],
        z:[],
    };


    $http.get('/contact/data').success(function(data, status, headers, config) {
        for(var i= 0,c;c=data[i++];){
            $scope.contactBlocks[c.nameFirstWordChr].push(c);
        }
    });
});

app.controller('ctrlrContactCreate', function($scope, $http) {
    $scope.contact = {
        name:''
    };
});

app.directive('errorMessage',['$compile',function($compile){

}]) ;