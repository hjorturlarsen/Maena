/*
$(window).load(function ()
{
    $('.loader').fadeOut();
    $('.page-loader').delay(10).fadeOut('slow');
});
*/

$(document).ready(function ()
{

    //Global variables
    var WIDTH = 320; 		//The chosen background width
    var ARTICLES = {}; 		//Object array of articles
    var ISMOBILE = false;	//Check if site is viewed on mobile device

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            ISMOBILE = true;
    }

    //Use:  getData()
    //Pre:  Nothing
    //Post: Connection to local json database has been made
    $.get('json/maena.json', function (data)
    {
        createArticleObjects(data);
    });

    //Use:  createArticleObjects(x)
    //Pre:  x is a list of json formatted  Mæna articles
    //Post: Article objects have been created
    function createArticleObjects(data)
    {
        //Creates Article Objects, so that the objects can be
        //accessed based on their number. for example: ARTICLES['1']
        //which represents the first article
        $.each(data, function (index, object)
        {
            var key = object.idx;
            ARTICLES[key] = new Article(object);
        });
    }

    //Constructor for article objects
    function Article(data)
    {
        this.idx = data.idx;
        this.raw_title = data.raw_title || '';
        this.title1 = data.title1 || '';
        this.title2 = data.title2 || '';
        this.article = data.article || '';
        this.footnotes = data.footnotes || '';
        this.author = 'image/author/' + data.idx + '.png' || '';
        this.thumb = 'image/thumb/' + data.idx + '.png' || '';
        this.bg = this.setBackground() || '';
    }

    //Use:  x.setBackgroundWidth()
    //Pre:  x is an article object 
    //Post: x has a new background width
    Article.prototype.setBackground = function ()
    {
        return this.bg = 'image/background/' + WIDTH + '/' + this.idx + '.jpg';
    }

    //Use:  x = getWindowWidth()
    //Pre:  Nothing
    //Post: x is the pixel width of the window
    function getWindowWidth()
    {
        return $(window).width();
    }

    //Use:  getBackgroundWidth()
    //Pre:  Nothing
    //Post: WIDTH is the chosen background width
    function getBackgroundWidth()
    {
        var widths = [320, 480, 640, 960, 1025, 1920];
        var win_w = getWindowWidth();
        var i = 0;
        while (widths[i] < win_w && i < widhts[widhts.length - 1])
        {
            i++;
        }
        return widths[i];
    }

    //Update background width for all article objects
    function setBackgrounds()
    {
        $.each(ARTICLES, function (index, object)
        {
            //Test if works
            this.bg = this.setBackground();
        });
    }

    $(document).ajaxComplete(function() {
    	console.log(ARTICLES);
    });

    $(window).resize(function ()
    {
        WIDTH = getBackgroundWidth();
        setBackgrounds();
    });
});
