define(function() {
    var selectedObject = null;
    return {
        setSelectedObject: function(object) {
            selectedObject = object;
        },

        getSelectedObject: function() {
            return selectedObject;
        }
    }
});