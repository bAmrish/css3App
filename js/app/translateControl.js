
define([
    'app/ui/controlBox',
    'app/ui/slider'
], function(ControlBox, Slider) {


    return {
        __commonOptions: {
            min: 0,
            max: 500,
            value: 0
        },

        __selectedObject: null,

        init: function(containerDom) {
            this.controlBox = new ControlBox({
                id: 'translate-controls',
                label: 'Translate'
            })

            this.xSlider = new Slider($.extend({
                id : 'x-translate-holder',
                label: 'X - axis',
                onChangeHandler: $.proxy(this.onSliderChange, this)
            }, this.__commonOptions));

            this.ySlider = new Slider($.extend({
                id : 'y-translate-holder',
                label: 'Y - axis',
                onChangeHandler: $.proxy(this.onSliderChange, this)
            }, this.__commonOptions));

            this.zSlider = new Slider($.extend({
                id : 'z-translate-holder',
                label: 'Z - axis',
                onChangeHandler: $.proxy(this.onSliderChange, this)
            }, this.__commonOptions));

            this.controlBox.addControl(this.xSlider.domNode);
            this.controlBox.addControl(this.ySlider.domNode);
            this.controlBox.addControl(this.zSlider.domNode);

            if(containerDom){
                this.$containerDom = $(containerDom);
                this.$containerDom.append(this.controlBox.domNode);
            }

            App.Notifier.subscribe('app.object.selected', $.proxy(this.setSelectedObject, this));
        },

        onSliderChange: function(event, value) {
                var x = this.xSlider.getValue();
                    y = this.ySlider.getValue();
                    z = this.zSlider.getValue();

            if(this.__selectedObject){
                this.__selectedObject.setTranslateValues(x, y, z);
            }        
        },        

        setSelectedObject: function(selectedObject) {
            this.__selectedObject = selectedObject;
            this.setSliderValue();
        },

        setSliderValue: function() {
            var t = this.__selectedObject.getTranslateValues();

            this.xSlider.setValue(t.x);
            this.ySlider.setValue(t.y);
            this.zSlider.setValue(t.z);
        }
    }
});