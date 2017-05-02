$.get("/ajax/index", (res) => {
    var windowWidth = $(window).width();
    var winHeight=$(window).height()-45;
    windowWidth = windowWidth < 320 ? 320 : windowWidth;
    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    var index_header_tab_width = offset.width;
    new Vue({
        el: '#app',
        data() {
            return {
                screen_width: windowWidth,
                screen_height:winHeight,
                double_screen_width: windowWidth * 2,
                banner: res.items[0].data.data,
                hot: res.items[1].data.data,
                hotTit:res.items[1].ad_name,
                recommend: res.items[2].data.data,
                recommendTit:res.items[2].ad_name,
                female: res.items[3].data.data,
                femaleTit:res.items[3].ad_name,
                male: res.items[4].data.data,
                maleTit:res.items[4].ad_name,
                free: res.items[5].data.data,
                freeTit:res.items[5].ad_name,
                topic: res.items[6].data.data,
                topicTit: res.items[6].ad_name,                
                duration: 0,
                position: 0,
                index_header_tab_width: index_header_tab_width,
                header_position: 0,
                header_duration: 0,
                tab_1_class: 'Swipe-tab__on',
                tab_2_class: ''
            }
        },
        methods: {
            tabSwitch(pos) {
                this.duration = 0.5;
                this.header_duration = 0.5;
                if (pos === 0) {
                    this.position = 0;
                    this.header_position = 0;
                    this.tab_1_class = 'Swipe-tab__on';
                    this.tab_2_class = '';
                } else {
                    this.position = -(windowWidth);
                    this.header_position = index_header_tab_width;
                    this.tab_1_class = '';
                    this.tab_2_class = 'Swipe-tab__on';
                }
            }
        }
    })
}, 'json')