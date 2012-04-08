(function(){
    var doc = document,
        scriptName = 'bootstrap.js',
        
        getBaseUrl = function(scriptName){
            var scripts = doc.getElementsByTagName('script'),
                l = scripts.length, i = 0, script, src, index;

            for(; i < l; i++){
                script = scripts[i];
                src = script.getAttribute('src');
                index = src.indexOf(scriptName);
                if(index != -1){
                    index = src.lastIndexOf('/');
                    return src.substr(0, index+1);
                }
            }
            return null;
        },

        baseUrl = getBaseUrl(scriptName),

        thirdPartyScripts = [
            baseUrl + 'thirdparty/require.js', 
            baseUrl + 'thirdparty/jquery-1.7.2.js', 
            baseUrl + 'thirdparty/class.js'
        ],

        loadScript = function(scriptName, callback){
            var script = doc.createElement('script'),
                head = doc.getElementsByTagName('head')[0];

            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', scriptName);

            if(script.readyState){
                script.onreadystatechange = function(){
                    if (this.readyState === 'loaded' || this.readyState === 'complete') {
                        this.onreadystatechange = null; // prevent function from running twice
                        console.log(this.src + ' loaded');
                        callback();                    
                    }
                }
            }else{
                script.onload = function(){
                    console.log(this.src + ' loaded');
                    callback();
                }
            }
            
            head.appendChild(script);
        },

        loadScripts = function(scripts, callback){
            var totalScripts = scripts.length, i = 0, script, completedScripts = 0,

                afterScriptLoad = function(){
                    completedScripts++;
                    if(completedScripts < totalScripts){
                        loadScript(scripts[completedScripts], afterScriptLoad)
                    }else{
                        callback();
                    }
                };

            loadScript(scripts[completedScripts], afterScriptLoad);
        },

        initApplication = function () {
            window.App = {};
            App.baseUrl = baseUrl;

            config = {
                paths: {
                    'app' : baseUrl + 'app',
                    'thirdparty': baseUrl + 'thirdparty'
                }
            }

            require(config, ['app/main'], function(App){
                if(App){
                    console.log("Application Initialised.");
                }
            })
        };

        loadScripts(thirdPartyScripts, initApplication);
})(window);
