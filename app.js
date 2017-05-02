const koa = require("koa");
const route = require("koa-route");
const app = koa();

//这是一个用来渲染模板的库，为了实现服务器渲染，利于seo
//而render是它生成的实例
const views = require("co-views");
const render = views('./view', {
    map: {
        html: 'ejs'
    }
})

//配置一个静态文件服务,主要还是用来修改一些静态文件的路径
const koa_static = require("koa-static-server");
app.use(koa_static({
    rootDir: './static/', //被修改的原本路径
    rootPath: '/static/', //修改后的使用路径
    maxage: 0 //该项为缓存
}))
//引入服务文件
const service = require("./service/webAppService");
// const test_service=require("./service/test/test");

// app.use(route.get('/',function*(){
//     this.set('Cache-Control', 'no-cache');
//     this.body="测试通过";
// }))

app.use(route.get('/test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test', {
        title: '测试标题'
    })
}))

app.use(route.get('/api_test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_test_data();
}))

app.use(route.get('/', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index');
}))

app.use(route.get('/ajax/index', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}))

app.use(route.get('/ajax/rank', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}))

app.use(route.get('/ajax/male', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data();
}))

app.use(route.get('/ajax/female', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data();
}))

app.use(route.get('/ajax/category', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

var querystring = require('querystring');
app.use(route.get('/ajax/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_book_data(id);
}));

app.use(route.get('/ajax/chapter', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));

app.use(route.get('/ajax/chapter_data', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_chapter_content_data(id);
}));

app.use(route.get('/ajax/search', function* () {
    this.set('Cache-Control', 'no-cache');
    var _this = this;
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
}));

var querystring = require('querystring')
app.use(route.get('/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book', {
        nav: '书籍详情',
        bookId: bookId
    });
}));

app.use(route.get("/search", function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', {
        nav: '搜索'
    });
}))

app.use(route.get("/male", function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male', {
        nav: '男生频道'
    });
}))

app.use(route.get("/female", function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('female', {
        nav: '女生频道'
    });
}))

app.use(route.get("/category", function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('category', {
        nav: '分类'
    });
}))

app.use(route.get("/rank", function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('rank', {
        nav: '排行'
    });
}))

app.use(route.get("/usercenter", function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('user-center', {
        nav: '用户中心'
    });
}))

app.use(route.get("/reader",function*(){
    this.set('Cache-Control','no-cache');
    this.body=yield render('reader');
}))


app.listen(10086);