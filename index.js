const NewsFeedModule = {
    _articles: [],
    _isBusy: false,

    
//----------------------------------------------------Method init
/* Implement initialization of the object */
/* Check that news array is not empty and all articles have title and content */
    init: function (news) {
        if ( !Array.isArray(news) ||
             !news.length) {
            return false;
        };

        top:
        {
            let length = news.length
            for (let i = 0; i < length; i++) {
                if (!news[i].hasOwnProperty('title') ||
                    !news[i].hasOwnProperty('content') ||
                    typeof(news[i].title) === 'undefined' ||
                    typeof(news[i].content) === 'undefined'||
                    !/\S/.test(news[i].title) ||
                    !/\S/.test(news[i].content) ) {

                    return false;
                    break top;
                };
            };
            this._articles = news;
        };
    }, 


//-------------------------------------------------Method addArticle
/* Check that article is valid and callbackFunction exists */ 
/* Push new article into this._articles array */  
    addArticle: function (article, callbackFunction) {
        if (this._isBusy ||
            typeof article === 'undefined' ||
            typeof callbackFunction !== 'function') {

            return false;
        };
        this._isBusy = true;

        setTimeout(() => {
            if (article.hasOwnProperty('title') &&
                article.hasOwnProperty('content') &&
                typeof(article.title) !== 'undefined' &&
                typeof(article.content) !== 'undefined'&&
                article.title !== '' &&
                article.content !== '') {

                this._articles.push(article);
                this._isBusy = false;
                callbackFunction();
            } else {
                this._isBusy = false;
                callbackFunction();
            };
        });
    }, 


//-------------------------------------------------Method removeArticle
/* Metod removes first appropriate article */
/* Check that article is valid and callbackFunction exists */ 
    removeArticle: function (article, callbackFunction) {
        if (this._isBusy ||
            typeof article === 'undefined' ||
            typeof callbackFunction !== 'function' ||
            !article.hasOwnProperty('title') ||
            !article.hasOwnProperty('content') ||
            article.title === '' ||
            article.content === '') {

            return false;
        };
        this._isBusy = true;

        setTimeout(() => {
            top:
            {
                let length = this._articles.length;
                for (let i = 0; i < length; i++) {
                    if (this._articles[i] === article) {
                        
                        this._articles.splice(i, 1);
                        this._isBusy = false;
                        callbackFunction(article);
                        break top;
                    };
                };
                this._isBusy = false;
                callbackFunction(null);
            };
        });
    },         


//--------------------------------------------------------Method find
/* Pass found article into callback, stop on first match */
    find: function (functor, callbackFunction) {
        if (this._isBusy ||
            typeof functor !== 'function' ||
            typeof callbackFunction !== 'function') {

            return false;
        };
        this._isBusy = true;

        setTimeout(() => {
            top:
            {
                let length = this._articles.length;
                for (let i = 0; i < length; i++) {
                    if (functor(this._articles[i]) &&
                        this._articles[i].hasOwnProperty('title') &&
                        this._articles[i].hasOwnProperty('content')) {

                        this._isBusy = false;
                        callbackFunction(this._articles[i]);
                        break top;
                    }
                };
                this._isBusy = false;
                callbackFunction(null);
            };
        });

    },

//----------------------------------------------------Method query
/* Return found sorted articles  */
/* Range found articles according to number of coincidental keywords */
    query: function (queryString) {
        if (this._isBusy ||
            typeof queryString === 'undefined' ||
            queryString === '') {

            return false;
        };
        this._isBusy = true;

        var spacer = /\s+/g; 

        let arrOfArticles = [],
            arrOfSortedArticles = [],
            queryWords = queryString.toLowerCase().split(spacer),
            uniqueQueryWords = getUnique(queryWords); 

        /* set strings as object property names */
        /* identical words turn in to one object property name */
        /* and due to square brackets strange symbols in names are possible) */
        function getUnique(arr) {
            let obj = {},
                length = arr.length
            for (let i = 0; i < length; i++) {
              let str = arr[i];
              obj[str] = true; 
            }
            return Object.keys(obj); // it will not work with IE8 without polyfill
          };
         
        let length = this._articles.length;
        for (let i = 0; i < length; i++) {
           
            if (this._articles[i].hasOwnProperty('title') &&
                this._articles[i].hasOwnProperty('content')) {

            let title = this._articles[i].title.toLowerCase().split(spacer),
                content = this._articles[i].content.toLowerCase().split(spacer),
                currrentString = title.concat(content),
                hitsCounter = 0;

                for (let j = 0; j < uniqueQueryWords.length; j++) {
                    for (let k = 0; k < currrentString.length; k++) {
                        if ( currrentString[k] === uniqueQueryWords[j] ) {
                            hitsCounter += 1;
                        };
                    };
                };
                if (hitsCounter) {
                /* use hitsCounter as index for arrOfArticles elements  */    
                    arrOfArticles[hitsCounter] = this._articles[i];
                }; 
            };
        };
        
        arrOfArticles.reverse();   
        arrOfSortedArticles = arrOfArticles.filter(function(item) {
            return item !== undefined 
        });
        
        return arrOfSortedArticles;
        this._isBusy = false;   
    },

//-------------------------------------------------Method getInstance
    getInstance: function ()  {
        let instance;

        const singlton = (function () {
            if (!instance) {
                instance = NewsFeedModule;
            };    
        })();
        return instance;       
    }
 };

//---------------------------------------------------result export
module.exports = {
    firstName: 'andrei',
    lastName: 'zuikov',
    task: NewsFeedModule   
}

