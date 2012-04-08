define(function(){
    return {
        getUUID: function() {
            var parts = ['Date', 'Month', 'Year', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'],
                    d = new Date,
                    hex = function(input) {
                        return (input * 100).toString(16);
                    },
                    id = '',
                    i, l;

            for (i = 0,l = parts.length; i < l; i++) {
                id += hex(d['get' + parts[i]]());
            }

            return id;
        }
    }
});
