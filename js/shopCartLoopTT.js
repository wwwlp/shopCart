new Vue({
    el: ' #app',
    data: {
        //购物车中的数据
        shopListArr: [],
        //是否全选
        isSelectedAll:false,
        totalPrice: 0
    },
    //组件已经加载完毕, 请求网络数据, 业务处理
    mounted() {
        //请求本地数据
        this.getLocalData();

    },
    filters: {
        //格式化价格
        moneyFormat(money) {
            //  保留两位小数 
            return "￥" + money.toFixed(2);
        }
    },
    methods: {
        //1.请求本地数据
        getLocalData() {
            var txt = 
                '[{"shopId":"1001","shopName":"360智能摄像机云台版 全景监控 360全景云台1080P","shopPrice":299.00, "shopNumber":1,"shopImage":"images/img_01.jpg"},' +
                '{ "shopId":"1002","shopName":"尼康（Nikon） D610 单反机身", "shopPrice":7199.00,"shopNumber":1,"shopImage":"images/img_02.jpg"},' +
                '{ "shopId":"1003", "shopName":"荣耀 畅玩6X 4GB 32GB 全网通4G手机 高配版 冰河银", "shopPrice":1299.00, "shopNumber":1,"shopImage":"images/img_03.jpg" }]';
            this.shopListArr = JSON.parse(txt);
        },
        //2.单个商品的加减
        singerShopPrice(shop, flag) {
            if (flag) {
                shop.shopNumber += 1;
            } else {
                if (shop.shopNumber <= 1) {
                    shop.shopNumber = 1;
                    return;
                } 
                shop.shopNumber -= 1;
            }

             //计算总价格
             this.getAllShopPrice();
        },

        //3.选中所有的商品
        selectedAll(flag){
            //总控制
            this.isSelectedAll = !flag;
            //遍历所有的商品数据
            this.shopListArr.forEach((value, index)=>{
                if(typeof value.checked === 'undefined'){
                    this.$set(value, 'checked', !flag);
                }else {
                    value.checked = !flag;
                }
            });
            //计算总价格
            this.getAllShopPrice();
        },

        //4.计算所有商品总价
        getAllShopPrice(){
            let allPrice = 0;
             //遍历所有的商品
             this.shopListArr.forEach((value,index) => {
                 //判断商品是否被选中
                 if (value.checked === true) {
                    allPrice = allPrice + value.shopNumber * value.shopPrice
                 }
             });
             this.totalPrice = allPrice;
        },

        //5.单个商品的点击
        singerShopSelected(shop){
            if(typeof shop.checked === 'undefined'){
                this.$set(shop, 'checked', true);
            }else {
                shop.checked = !shop.checked;
            }
            //计算总价格
            this.getAllShopPrice();
            //判断是否全选
            this.hasSelectedAll();
        },

        //6.判断是否全选
        hasSelectedAll(){
            let flag = true;
            this.shopListArr.forEach((value, index) => {
                if (!value.checked) {
                    flag = false;
                }
            });
            this.isSelectedAll = flag;
        }
    },
})