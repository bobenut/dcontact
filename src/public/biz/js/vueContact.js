new Vue({
    el: '#vuecontact',

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
                }

                for (var i = 0, c; c = data[i++];) {
                    self.contactBlocks[c.nameFirstWordChr].push(c);
                    self.contacts[c._id] = c;
                }
            }).fail(function(err){
                console.log('fetch cotnacts error: %s', err);
            });
        }
    }
});

