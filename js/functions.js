function init()
{
    generateIFrame();
}

function parseURL(url) {
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
}

function generateIFrame()
{
    deleteIFrame();

    var url = parseURL(document.getElementById("video_url").value);

    if (url.host == "www.youtube.com" || url.host == "youtube.com")
    {
        alert("Video server: " + url.host + "\n" + "Video id:     " + url.params["v"]);
        var iframe = '<iframe src="https://' + url.host + '/embed/' + url.params["v"] + '?rel=0" frameborder="0" allowfullscreen></iframe>';
        document.getElementById("embedded_container").innerHTML = iframe;
        return iframe;
    }
    else if (url.host == "www.rutube.ru" || url.host == "rutube.ru")
    {
        alert("Video server: " + url.host + "\n" + "Video id:     " + url.segments[1]);
        var iframe = '<iframe src="http://' + url.host + '/play/embed/' + url.segments[1] + '" frameborder="0" allowfullscreen></iframe>';
        document.getElementById("embedded_container").innerHTML = iframe;
        return iframe;
    }
    else if (url.host == "www.vimeo.com" || url.host == "vimeo.com")
    {
        if (url.segments[0] == "channels")
        {
            alert("Video server: " + url.host + "\n" + "Video id:     " + url.segments[2]);
            var iframe = '<iframe src="http://player.' + url.host + '/video/' + url.segments[2] + '" frameborder="0" allowfullscreen></iframe>';
            document.getElementById("embedded_container").innerHTML = iframe;
            return iframe;
        }
        else if (url.segments[0] != "channels")
        {
            alert("Video server: " + url.host + "\n" + "Video id:     " + url.segments[0]);
            var iframe = '<iframe src="http://player.' + url.host + '/video/' + url.segments[0] + '" frameborder="0" allowfullscreen></iframe>';
            document.getElementById("embedded_container").innerHTML = iframe;
            return iframe;
        }
        else
        {
            alert("Video server error: " + url.host);
            var iframe = '<div class="alert alert-danger" role="alert">Sorry, but we can not process video from ' + url.host + '. Maybee video ID is incorrect! ' + url.segments[2] + '</div>';
            document.getElementById("embedded_container").innerHTML = iframe;
            return iframe;
        }
    }
    else if (url.host == "www.dailymotion.com" || url.host == "dailymotion.com")
    {
        alert("Video server: " + url.host + "\n" + "Video id:     " + url.segments[1]);
        var iframe = '<iframe src="http://' + url.host + '/embed/video/' + url.segments[1] + '" frameborder="0" allowfullscreen></iframe>';
        document.getElementById("embedded_container").innerHTML = iframe;
        return iframe;
    }
    else if (url.host == "www.twitch.tv" || url.host == "twitch.tv")
    {
        alert("Video server: " + url.host + "\n" + "Video id:     " + url.segments[0]);
        var iframe = '<iframe src="http://' + url.host + '/widgets/live_embed_player.swf?channel=' + url.segments[0] + '" frameborder="0" scrolling="no" allowfullscreen></iframe>';
        document.getElementById("embedded_container").innerHTML = iframe;
        return iframe;
    }
    else if (url.host == "www.coub.com" || url.host == "coub.com")
    {
        alert("Video server: " + url.host + "\n" + "Video id:     " + url.segments[1]);
        var iframe = '<iframe src="http://' + url.host + '/embed/' + url.segments[1] + '" frameborder="0" allowfullscreen></iframe>';
        document.getElementById("embedded_container").innerHTML = iframe;
        return iframe;
    }
    else
    {
        alert("Video server error! ");
        var iframe = '<div class="alert alert-danger" role="alert">Sorry! But we don\'t work with video host: <h3>' + url.host + '</h3></div>';
        document.getElementById("embedded_container").innerHTML = iframe;
        return iframe;
    }
}

function deleteIFrame()
{
    document.getElementById("embedded_container").innerHTML = "<!--Place for iframe-->";
}

