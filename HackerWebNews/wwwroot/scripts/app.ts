namespace app {

    /**
     * Base URL to Hacker News API
     * */
    const baseUri: string = "https://hacker-news.firebaseio.com/v0/";


    /**
     * Public function used to initialize the JavaScript for the main app page
     * */
    export function initNameSpace() {
        getTopStories();
    };


    /**
     * Get a list of the Top Stories from Hacker News API
     * */
    function getTopStories(): void { 
        $.ajax({
            url: baseUri + "topstories.json?print=pretty",
            async: false,
            success: function (data: number[]) {
                buildUnorderedList(data);
            }
        });
    };


    /**
     *  Gets the full item from Hacker News API and adds items to the list
     * @param topStories
     */
    function buildUnorderedList(topStories: number[]): void {

        let stories = topStories.sort(x => x).reverse().slice(0, 20);

        let newsItems: item[] = [];
        for (let i = 0; i < stories.length; i++) {

            $.ajax({
                url: baseUri + "item/" + stories[i].toString() + ".json?print=pretty",
                async: false,
                success: function (data) {
                    if (data.time !== undefined) {
                        data.date = new Date(data.time * 1000);
                    }
                    newsItems.push(data);
                }
            });
        }
        newsItems.sort((a, b) => a.date.getTime() - b.date.getTime()).reverse();
        newsItems.forEach(x => addListItem(x));

    };

    /**
     * Adds list items to the current html
     * @param data
     */
    function addListItem(data: item) {
        let ul = document.getElementById("storylist");
        let li = document.createElement("li");

        let titleH = document.createElement("h3");
        titleH.innerHTML = '<a href="' + data.url + '" + title="Click this link to view the full story">' + data.title + '</a>';
        titleH.classList.add('listItem');
        li.appendChild(titleH);

        if (data.by != undefined) {
            let byP = document.createElement("p");
            byP.innerHTML = "<b>posted by:</b> " + data.by + " <b>on:</b> " + getTimeString(data.time);
            li.appendChild(byP);
        }
        ul.appendChild(li);
    };

    /**
     * Get time string to display in format WeekDay Month Day Year Time
     * @param unixTimeStamp
     */
    function getTimeString(unixTimeStamp: number): string {

        let date = new Date(unixTimeStamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();

        let formattedTime = date.toDateString() + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }


    /**
     * Class model to represent items coming from hacker web api
     * */
    class item {
        id: number
        deleted: boolean
        type: string
        by: string
        time: number
        text: string
        dead: boolean
        parent: number
        poll: number
        kids: number[]
        url: string
        score: number
        title: string
        parts: number[]
        descendants: number
        // Properties below don't come from the API, these are set here
        date: Date
    }
}
