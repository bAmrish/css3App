define(function() {
    return Class.extend({
        
        options: {
            id:  null,   
            label: 'Control - Box',
            cssClass: ''
        },

        __controls: null,

        init: function(options) {
            $.extend(this.options, options);
            this.id = this.options.id || App.Util.getUUID();         
            this.label = this.options.label;
            this.render();
            this.__controls = [];
        },

        render: function() {
            //create the container node for the contorl box
            this.$el = $('<div/>').addClass('control-box');            
            this.domNode = this.$el[0];
            this.$el.attr('id', this.options.id);
            
            if(this.options.cssClass){
                this.$el.addClass(this.options.cssClass);
            }

            //Create label for the control box
            this.$label = $('<div/>')
                .text('[ ' + this.label + ' ]')
                .addClass('control-box-label');
            this.$el.append(this.$label);

            //Create a container for contorl box.
            this.$container = $('<div/>').addClass('control-box-container');
            this.$el.append(this.$container);
        },

        addControl: function(control){
            this.__controls.push(control);
            this.$container.append(control);
        }
    });
});