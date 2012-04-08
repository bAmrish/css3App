define(function(){
    return Class.extend({
        init: function(el){
            this.domNode = el;
            
            this.$el = $(this.domNode);

            this.$el.on('click', $.proxy(this.onClick, this))

            this.dim = {
                tX : 0,
                tY : 0,
                tZ : 0,
                rX : 0,
                rY : 0,
                rZ : 0,
            };

            this.select();
        },

        onClick: function(event){
            event.stopPropagation();
            this.select();
        },

        select: function() {
            $('.selected').removeClass('selected');
            this.$el.addClass('selected');            
            App.Notifier.publish('app.object.selected', [this]);            
        },

        updateTransform: function() {
            var translate = 
                 "translateX(" + this.dim.tX + "px) " +
                 "translateY(" + this.dim.tY + "px) " +
                 "translateZ(" + this.dim.tZ + "px) " ,

                rotate = 
                 "rotateX(" + this.dim.rX + "deg) " +
                 "rotateY(" + this.dim.rY + "deg) " +
                 "rotateZ(" + this.dim.rZ + "deg) " ;

            this.domNode.style.webkitTransform = translate + rotate;
  
        },

        setTranslateValues: function(x, y, z) {
            this.dim.tX = x;
            this.dim.tY = y;
            this.dim.tZ = z;
            this.updateTransform();
        },

        setRotationValues: function(x, y, z) {
            this.dim.rX = x;
            this.dim.rY = y;
            this.dim.rZ = z;
            this.updateTransform();
        },

        getTranslateValues: function() {
            return {
                x: this.dim.tX,
                y: this.dim.tY,
                z: this.dim.tZ
            }
        },

        getRotationValues: function() {
            return {
                x: this.dim.rX,
                y: this.dim.rY,
                z: this.dim.rZ
            }
        }

    });
})