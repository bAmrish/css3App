define([
    'app/controller',
    'app/Util',
    'app/notifier',     
    'app/selectable',
    'app/rotationControl',
    'app/translateControl'
    ], function(Controller, Util, Notifier, Selectable, RotationControl, TranslateControl){
    
    App.Notifier = Notifier;
    
    App.Controller = Controller;
    
    App.Util = Util;

    App.Notifier.subscribe('app.object.selected', function(selectedObject) {
        App.Controller.setSelectedObject(selectedObject);
    }, this)

    App.RotationControl = RotationControl;
    RotationControl.init($('#controls')[0]);
    
    App.TranslateControl = TranslateControl;
    TranslateControl.init($('#controls')[0]);

    $('.selectable').each(function(index) {
        new Selectable(this)
    });

});