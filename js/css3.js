(function(){
    var selectedElement,
        selectables = document.querySelectorAll(".selectable"),
        
    rotate = function(axis){
        var slider = document.getElementById(axis + '-rotation-slider');
        var input = document.getElementById(axis + '-rotation-value');
        input.value = slider.value;
        selectedElement.style.webkitTransform = removeRotation(selectedElement, axis) 
                    + 'rotate' + axis.toUpperCase() + '(' + slider.value + 'deg)';
    },

    removeRotation = function(element, axis){

        var transformString = element.style.webkitTransform,
            transforms = transformString.split(" "), 
            i = 0, 
            l = transforms.length, 
            transforms;

        if(!transformString){
            return "";
        }
        if(l > 1){
            for(; i < l; i++){
                transform = transforms[i];
                if(transform.indexOf("rotate" + axis.toUpperCase()) != -1)  {
                    transforms.splice(i, 1);
                    return transforms.join(" ");
                }                        
            }

            return transformString;
        }else{
            transform = transforms[0];
            if(transform.indexOf("rotate" + axis.toUpperCase()) != -1){
                return "";
            }else{
                return transformString
            }

        }
    },

    

    sliders = document.querySelectorAll('input[type=range][axis]'), 

    l = sliders.length, i = 0, slider, selectable;

    /**
        ---------------------------------------------------------------------------
    **/
    for(; i< l; i++){
        slider = sliders[i];
        slider.addEventListener('change', function(event){
            axis = this.getAttribute('axis');
            rotate(axis);
        }, false);
    }

    i = 0; l = selectables.length;

    for(; i < l; i++){
        selectable = selectables[i];
        selectable.addEventListener('click', function(event){
            event.stopPropagation();
            event.preventDefault();
            var currentSelection = document.querySelector('.selected');
            
            if(currentSelection){
                removeClass(currentSelection, 'selected');
            }
            selectedElement = this;
            addClass(this, 'selected');

        }, false);
    }

    selectedElement = document.querySelector('.selected');

    rotate('x');
    rotate('z');
    rotate('y');


})();

