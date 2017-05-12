

(function (jquery) {
    var vmContactManagement;
    var vmConctactCreation;

    function buildConctactManagementVm() {
        return new Vue({
            el: '#vueContactManagement',

            data: {
                contactBlocks: {
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
                contacts: {},
                showModal:false
            },

            created: function () {
                this.fetchContacts();
            },

            methods: {
                fetchContacts: function () {
                    var self = this;
                    jquery.get('/contact/data')
                        .done(function (data) {
                            console.log('fetch cotnacts result: %s', JSON.stringify(data, null, 2));

                            if (!data) {
                                return;
                            }

                            for (var i = 0, c; c = data[i++];) {
                                self.contactBlocks[c.nameFirstWordChr].push(c);
                                self.contacts[c._id] = c;
                            }
                        })
                        .fail(function (err) {
                            console.log('fetch cotnacts error: %s', err);
                        });
                },
                openCreateDialog: function () {
                    // jquery('#vueContactModificationModal').modal('show');

                    // jquery('#vueContactModificationModal').on('shown.bs.modal', function () {
                    //     console.log('shown.bs.modal');
                    //     vmConctactCreation = buildConctactCreationVm();
                    // });

                    // jquery('#vueContactModificationModal').on('hidden.bs.modal', function () {
                    //     vmConctactCreation = null;
                    //     console.log('hidden.bs.modal');
                    // });
                },
                showDialogTest: function(){
                    this.showModal = true;

                    alert('test: ' + this.showModal);
                }
            },

            components: {
                'modal': VueStrap.modal
            }
        });
    }

    function buildConctactCreationVm() {
        return new Vue({
            el: '#vueContactModificationModalContainer',

            data: {
                name: '',
                nameFirstWordChr: '',
                nameAllWordChr: '',
                corp: '',
                mobilePhone: '',
                mail: ''
            },

            methods: {
                save: function () {
                    var self = this;
                    var contactSaveData = {
                        name: self.name,
                        nameFirstWordChr: self.nameFirstWordChr,
                        nameAllWordChr: self.nameAllWordChr,
                        corp: self.corp,
                        mobilePhone: self.mobilePhone,
                        mail: self.mail,
                    };

                    jquery.post('/contact/data', contactSaveData)
                        .done(function (data) {
                            $log.info('save ok: ' + data);
                            alert('save ok');

                        })
                        .fail(function (res) {
                            $log.info('save failed: ' + res);
                            alert('save failed');

                        });
                },
                closeDialog: function () {
                    Vue.nextTick(function () {
                        console.log('closeDialog');
                        jquery('#vueContactModificationModal').modal('hide');

                    });

                }

            }
        });
    }

    vmContactManagement = buildConctactManagementVm();
})($);


