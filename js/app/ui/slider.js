define(function() {
    return Class.extend({
        
        options: {
            id:  null,   
            min: 0,
            max: 1,
            label: 'Slider',
            value: 0,
            cssClass: '',
            onChangeHandler: null
        },

        init: function(options) {
            $.extend(this.options, options);
            this.min = this.options.min;
            this.max = this.options.max;
            this.label = this.options.label;
            this.id = this.options.id || App.Util.getUUID();         
            this.value = this.options.value;            
            this.cssClass = this.options.cssClass;
            this.changeHandler = this.options.onChangeHandler;
            this.render();
        },

        render: function() {
            //We create a clone of options object so that we can apply
            //those options directly to the range input.
            var sliderOptions = $.extend(true, {}, this.options);
            //we delete the id property from the options because
            // we are going to apply id to the container domNode
            // insted of the slider
            delete sliderOptions['id'];

            delete sliderOptions['onChangeHandler'];
            
            //create the container node
            this.$el = $('<div/>').addClass('slider');            
            this.domNode = this.$el[0];
            this.$el.attr('id', this.options.id);

            if(this.options.cssClass){
                this.$el.addClass(this.options.cssClass);
            }


            //Create label for the slider
            this.$label = $('<label/>').text(this.label).addClass('slider-label');
            this.$el.append(this.$label);

            //Create range input element for the slider.

            this.$range = $('<input>').attr('type', 'range').attr(sliderOptions).addClass('slider-range');
            this.$el.append(this.$range);

            //create text input element to hold value of the slider.
            this.$text = $('<input>').attr('type', 'number').attr('value', this.value).addClass('slider-text');
            this.$el.append(this.$text);

            this.$range.on('change', $.proxy(this.onChange, this));
            this.$text.on('keyup blur click', $.proxy(this.onChange, this));
        },

        onChange: function(event){
            var value = parseFloat($(event.target).attr('value')),
                handler = this.changeHandler;
            
            this.setValue(value);      

            if(handler && $.isFunction(handler)){
                handler.apply(null, [event, this.value]);    
            }             
        },

        setValue: function(val) {
            
            var value = parseFloat(val);

            if(isNaN(value)){
                value = this.value;
            }   

            if(value > this.max){
                value = this.value = this.max;
            }else if (value < this.min){
                value = this.value = this.min;
            }else{
                this.value = value;
            }



            this.$range.attr('value', value); 
            this.$text.attr('value', value); 
        },

        getValue: function() {
            return this.value;
        }
    });
});