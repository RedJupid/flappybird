(function(){

    var Game = window.Game = function(params){

        // 得到画布
        this.canvas = document.querySelector(params.id);
        //上下文
        this.ctx = this.canvas.getContext("2d");
        //资源文件地址
        this.Rjsonurl = params.Rjsonurl;
        //帧编号
        this.fno = 0;
        //设置画布的宽度和高度
        this.init();
        var self = this;

        this.score = 0;
        //读取资源
        this.loadAllResource(function(){
            //这里表示资源全部加载完毕
            self.start();

            //绑定监听
            // self.bindEvent();
        });

    }

    Game.prototype.init = function(){
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        if(windowW > 414){
            windowW = 414;
        }else if(windowW<320){
            windowW = 320;
        }
        if(windowH > 736){
            windowH = 736;
        }else if(windowH < 568){
            windowH = 568;
        }
        this.canvas.width = windowW;
        this.canvas.height = windowH
    }

    //读取资源
    Game.prototype.loadAllResource = function(callback){
        //准备一个R对象
        this.R = {};
        var self = this;
        //计数器
        var alreadyDoneNumber = 0;
        //发出请求，请求JSON文件
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var Robj = JSON.parse(xhr.responseText);
                //遍历数组
                for(var i=0; i<Robj.images.length; i++){
                    self.R[Robj.images[i].name] = new Image();
                    self.R[Robj.images[i].name].src = Robj.images[i].url;
                    self.R[Robj.images[i].name].onload = function(){
                        alreadyDoneNumber++;
                        //清屏
                        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                        //提示文字
                        var txt = "正在加载" + alreadyDoneNumber + "/" + Robj.images.length + "请稍后";
                        //放置居中的位置
                        self.ctx.textAlign = "center";
                        self.ctx.font = "20px simsun";
                        self.ctx.fillText(txt,self.canvas.width/2,self.canvas.height*(1-0.618));
                        //判断是否已经全部加载完毕
                        if(alreadyDoneNumber == Robj.images.length){
                            callback();
                        }
                    }
                }
            }
        }
        xhr.open("get",this.Rjsonurl,true);
        xhr.send(null);
    }
    //开始游戏
    Game.prototype.start = function(){
        //实例化背景
        // this.background = new Background();
        // //实例化大地
        // this.land = new Land();
        // //管子数组
        // this.pipeArr = [];
        // //小鸟的实例
        // this.bird = new Bird();
        this.sm = new SceneManager();
        var self = this;
        //设置定时器
        this.timer = setInterval(function(){
            //清屏
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            // //更新背景
            // self.background.update();
            // //渲染背景
            // self.background.render();
            // //更新大地
            // self.land.update();
            // //渲染大地
            // self.land.render();
            //更新渲染所有的管子
            // for(var i=0; i<self.pipeArr.length; i++){
            //     self.pipeArr[i].update();
            //     self.pipeArr[i].render();
            // }
            //每多少帧实例化管子
            // self.fno % 120 == 0 && (new Pipe());
            // //更新和渲染小鸟
            // self.bird.update();
            // self.bird.render();

            //打印份数
            // var socreLength = self.score.toString().length;
            // for(var i=0; i<socreLength; i++){
            //     self.ctx.drawImage(self.R["shuzi"+self.score.toString().charAt(i)],game.canvas.width/2-34*socreLength/2+34*i,100);
            // }

            //场景管理器的更新和渲染
            self.sm.update();
            self.sm.render();

            //帧编号
            self.fno++;
            self.ctx.font = "16px consolas";
            self.ctx.textAlign ="left";
            self.ctx.fillText("FNO:"+self.fno,10,20);
            self.ctx.fillText("场景号:"+self.sm.sceneNumber,10,40);
            
        },20);
    }
    // Game.prototype.bindEvent = function(){
    //     var self = this;
    //     this.canvas.onclick = function(){
    //         self.bird.fly();
    //     }
    // }
})();