(function(jquery){
    var vmContactManagement;
    var vmConctactCreation;

    function buildConctactManagementVm(){
        return new Vue({
            el: '#vueContactManagement',

            data:{
                contactBlocks : {
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
                },
                contacts : {}
            },

            created: function(){
                this.fetchContacts();
            },

            methods:{
                fetchContacts: function(){
                    var self = this;
                    $.get('/contact/data').done(function(data){
                        console.log('fetch cotnacts result: %s', JSON.stringify(data,null,2));

                        if(!data){
                            return;
                        }                                                                      k

                        for (var i = 0, c; c = data[i++];) {
                            self.contactBlocks[c.nameFirstWordChr].push(c);
                            self.contacts[c._id] = c;
                        }
                    }).fail(function(err){
                        console.log('fetch cotnacts error: %s', err);
                    });
                },
                openCreateDialog: function(){
                    jquery('#vueContactModificationModal').modal('show');

                    jquery('#vueContactModificationModal').on('shown.bs.modal', function () {
                        vmConctactCreation = buildConctactCreationVm();
                    });

                    jquery('#vueContactModificationModal').on('hidden.bs.modal', function () {
                        vmConctactCreation = null;
                    });
                }
            }
        });
    }

    function buildConctactCreationVm(){
        return new Vue({
            el:'#vueContactModificationModal',
            data:{
                kxh11: '121'
            }
        });
    }

    vmContactManagement   = buildConctactManagementVm();
})($);


