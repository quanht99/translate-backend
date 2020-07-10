const rp = require("request-promise");
let url = "https://stword.com/api/categories/slug/hoc-tu-vung";
let index = 1;
const db = require("../model/index");

async function crawl(){
    try{
        let result = await rp({
            uri: url + `?page=${index}`,
            method: "GET",
            json: true
        })
        console.log(result);
        while(index <= result.data.last_page){
            url = result.data.next_page_url;
            index++;
            for(let e of result.data.items){
                let topic = await db.Topic.create({
                    content: e.title
                })
                let pos = 1;
                let words = await rp({
                    uri: "https://stword.com/api/posts/slug/" + e.slug + `?page=${pos}`,
                    method: "GET"
                })
                words = JSON.parse(words);
                while(pos <= words.data.words.last_page){
                    pos++;
                    for(let f of words.data.words.items){
                        await db.Word.create({
                            content: f.content,
                            pronunciation_us: f.pronunciation,
                            pronunciation_uk: f.pronunciation_uk,
                            mean: f.description,
                            word_examples: JSON.stringify(f.word_examples),
                            id_topic: topic.dataValues.id_topic
                        })
                    }
                    words = await rp({
                        uri: "https://stword.com/api/posts/slug/" + e.slug + `?page=${pos}`,
                        method: "GET"
                    })
                    words = JSON.parse(words);
                }
            }
            console.log("Crawl 1 topic")
            result = await rp({
                uri: url,
                method: "GET",
                json: true
            })
            await sleep(30000)
        }
    }
    catch(e){
        console.error(e.message)
    }
}

function sleep(time){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

crawl();
