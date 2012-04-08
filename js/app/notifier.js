define(function(){
    var registeredListenrs = {}, listenerId = 0;

    return {
        publish : function(topic, data) {
            var args = [],
                listeners = registeredListenrs[topic];
    
            if(!listeners){
                return;
            }          

            if(data){
                if($.isArray(data)){
                    args = data;
                }                
            }else{
                args = [data];
            }

            $.each(listeners, function(index, listener){
                listener.callback.apply(listener.context || null, args);
            });
        },

        subscribe : function(topic, callback, context){
            var registeredTopic = registeredListenrs[topic], currentId = ++listenerId;
            
            if(!registeredTopic){
                registeredTopic = registeredListenrs[topic] = [];
            }
            
            listerner = {
                'id' : currentId,
                'callback': callback,
                'context': context
            }

            registeredTopic.push(listerner);

            return currentId;
        },

        unsubscribe: function(id){
            if(!id){
                return;
            }

            //Loop through all the topics
            $.each(registeredListenrs, function(topic, listeners) {
                
                var  found = false;

                //loop through all the listeners for a topic.
                $.each(listeners, function(index, listener) {
                    //compare to see if we find the id we are interested in.
                    if(listener.id === id){
                        //if we found the listener with the right id, we remove it and break;
                        listeners.splice(index);
                        found = true;
                        return false;
                    }
                })

                if(found){                    
                    // if we removed the last listeners, we delete the empty topic.
                    if(!listeners.length){
                        delete registeredListenrs[topic]
                    }
                    return false;
                }
            })
        },

        _getAllListeners: function(){
            return registeredListenrs;
        },

        _getCurrentId: function() {
            return listenerId;
        }
    }
});