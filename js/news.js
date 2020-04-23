// let jokeURI = 'https://api.icndb.com/jokes/random?limitTo=[nerdy]';

let newsAPI = "https://newsapi.org/v2/top-headlines";

// fetch information
// const getJoke = async () => {
//     try {
//         const response = await fetch(jokeURI)
//         const obj = await response.json()
//         console.log(`FETCHED. Response JSON ${obj}`)
//         const joke = obj.value.joke || 'No joke for you.'
//         return joke
//     } catch (error) { console.error(error) }
// }

// interact with DOM
// const updateWithJoke = async (event) => {
//   try {
//     document.querySelector('#result').innerHTML = ''
//     const answer = await getJoke()
//     document.querySelector('#result').innerHTML = answer
//   } catch (error) { console.error(error) }
// }


const newsApp = new Vue({
    el: '#news-app',
    data: {
        source_id: null,
        getData: true,
        loader: null,
        source_caps: null,
        newsUrl: null,
        dataArray: [],
        localStore: false,
        options: [
            { value: null, text: 'Please select the source news paper...' },
            { value: 'bbc-news', text: 'BBC News' },
            { value: 'new-york-magazine', text: 'New York Magazine' },
            { value: 'the-new-york-times', text: 'The New York Times' },
            { value: 'the-wall-street-journal', text: 'The Wall Street Journal' },
            { value: 'usa-today', text: 'USA Today' }
        ]
    },
    computed: {
        captilizeName: function () {
            let paper = localStorage.getItem("newspaper");
            if (paper && !this.source_id) {
                this.source_id = paper;
            }
            if (this.source_id) {
                this.getData = true;
                this.loader = true;
                let capsName = this.source_id.split("-");
                this.source_caps = capsName.reduce(function (a, b) {
                    return `${a} ${b}`;
                });
                this.newsUrl = `${newsAPI}?sources=${this.source_id}&apiKey=d98dfdc9606d4b62a12a255989e774f9`;
                return this.source_caps;
            }
            return null;
        }
    },
    methods: {
        getMethods: function () {
            getNews = async () => {
                try {
                    const response = await fetch(this.newsUrl);
                    const newsResponse = await response.json();
                    this.getData = false;
                    this.dataArray = newsResponse.articles;
                    if (this.source_id && this.localStore) {
                        this.saveInLocalStorage('enable');
                        this.loader = true;
                    } else {
                        this.saveInLocalStorage('disable');
                        this.loader = false;
                    }
                    return newsResponse
                } catch (error) {
                    console.error(error)
                }
            }
            if (this.getData) {
                getNews();
            }
        },

        saveInLocalStorage: function (condt) {
            if (this.source_id && condt == 'enable') {
                this.localStore = true;
                localStorage.setItem("newspaper", this.source_id);
            } else if (!this.localStore && condt == 'disable') {
                console.log('----------disabled------------');
            } else if (condt && condt == 'clear') {
                localStorage.clear();
                alert('Local storage has cleard successfully...!');
            } else {
                alert('Please select the news paper...!');
            }
        }
    }
})