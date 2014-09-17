/**
 *  This script process a direct link of video from video hosting:
 *      YouTube, RuTube, Vimeo, DailyMotion, Twitch, HitBox, Coub ...
 *  And generate iframe for including video into your website.
**/


var VideoParser = function(iframe_id){
    return this.init(iframe_id);
}
VideoParser.prototype = {
    frame:null,
    init:function(iframe_id){
     this.frame = document.getElementById("embedded_container");


    },
    parseURL:function (url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    },
    deleteIFrame:function() {
        this.frame.innerHTML = "<!--Place for iframe-->";
    },
    incorrectID:function(url) {
        var iframe = '<div class="alert alert-danger" role="alert">Sorry! But we can not process this video from <strong>' + url.host + '</strong> Maybee video\'s ID is incorrect! </div>';
        this.frame.innerHTML = iframe;
        return iframe;
    },
    handler:{
        "youtube.com" : function(url){
            if (url.params["v"] == undefined)
            {
                return this.incorrectID(url);
            }
            else
            {
                var iframe = '<iframe src="https://' + url.host + '/embed/' + url.params["v"] + '?rel=0" frameborder="0" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
        },
        "rutube.ru":function(url){
            if (url.segments[0] != "video")
            {
                return this.incorrectID(url);
            }
            else
            {
                var iframe = '<iframe src="http://' + url.host + '/play/embed/' + url.segments[1] + '" frameborder="0" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
        },
        "vimeo.com":function(url){
            if (url.segments[0] == "channels")
            {
                var iframe = '<iframe src="http://player.' + url.host + '/video/' + url.segments[2] + '" frameborder="0" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
            else if (url.segments[0] != "channels")
            {
                var iframe = '<iframe src="http://player.' + url.host + '/video/' + url.segments[0] + '" frameborder="0" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
        },
        "dailymotion.com":function(url){
            if (url.segments[0] != "video")
            {
                return this.incorrectID(url);
            }
            else
            {
                var iframe = '<iframe src="http://' + url.host + '/embed/video/' + url.segments[1] + '" frameborder="0" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
        },
        "twitch.tv":function(url){
            if (url.segments[0] == "directory" || url.segments[0] == "jobs" || url.segments[0] == "p" || url.segments[0] == "user")
            {
                return this.incorrectID(url);
            }
            else
            {
                var iframe = '<iframe src="http://' + url.host + '/widgets/live_embed_player.swf?channel=' + url.segments[0] + '" frameborder="0" scrolling="no" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
        },
        "hitbox.tv":function(url){
            if (url.segments[0] == "video")
            {
                var iframe = '<iframe src="http://' + url.host + '/#!/embedvideo/' + url.segments[1] + '" frameborder="0" scrolling="no" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
            else
            {
                var iframe = '<iframe src="http://' + url.host + '/#!/embed/' + url.segments[0] + '" frameborder="0" scrolling="no" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
        },
        "coub.com":function(url){
            if (url.segments[0] != "view")
            {
                return this.incorrectID(url);
            }
            else
            {
                var iframe = '<iframe src="http://' + url.host + '/embed/' + url.segments[1] + '" frameborder="0" allowfullscreen></iframe>';
                this.frame.innerHTML = iframe;
                return iframe;
            }
        }
    },
    generateIFrame:function() {
        this.deleteIFrame();
var self = this;
        var url = this.parseURL(document.getElementById("video_url").value);
        /**YouTube**/
        if (this.handler[url.host.replace('www.','')])
        {
            this.handler[url.host.replace('www.','')].call(self,url);
        } else
        {
            alert("Video server error! ");
            var iframe = '<div class="alert alert-danger" role="alert">Sorry! But we don\'t work with video host: <h3>' + url.host + '</h3></div>';
            this.frame.innerHTML = iframe;
            return iframe;
        }
    }


}








