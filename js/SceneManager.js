(function(){
    var SceneManager = window.SceneManager = function(){
        //1表示欢迎屏幕，2表示教程，3表示游戏内容，4表示GameOver
        this.sceneNumber = 1;
        //场景管理器负责实例化东西
        game.bg = new Background();
        game.bird = new Bird();
        game.land = new Land();

        this.logoY = -48;
        this.button_playX = game.canvas.width/2-58;
        this.button_playY = game.canvas.height;
        //添加监听
        this.bindEvent();
    }
    SceneManager.prototype.update = function(){
        switch(this.sceneNumber){
            case 1:
                if(this.logoY <120){
                    this.logoY+=10;
                }
                if(this.button_playY>280){
                    this.button_playY-=16;
                }
                break;
            case 2:
                game.bird.wing();
                //改变透明度
                this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.03:0.03;
                if(this.tutorialOpacity<0.1 || this.tutorialOpacity>1){
                    this.tutorialOpacityIsDown = ! this.tutorialOpacityIsDown;
                }
                break;
            case 3:
                game.bird.update();
                game.bg.update();
                game.land.update();
                game.fno % 150 == 0 && (new Pipe());
                for(var i=0; i<game.pipeArr.length; i++){
                    game.pipeArr[i].update();
                }
                break;
            case 4:
                if(game.bird.y>game.canvas.height*0.78 - 24){
                    this.isBirdLand = true;
                }
                this.birdfno++;
                if(!this.isBirdLand){
                    game.bird.y +=1.4+this.birdfno;
                }
                break;
        }
        
    }
    SceneManager.prototype.render = function(){
        //根据当前是第几个场景，来决定做什么
        switch(this.sceneNumber){
            case 1:
                game.bg.render();
                game.land.render();
                game.bird.render();
                game.bird.x = game.canvas.width/2;
                game.bird.y = 240;
                game.ctx.drawImage(game.R["logo"],game.canvas.width/2-89,this.logoY);
                game.ctx.drawImage(game.R["button_play"],this.button_playX,this.button_playY);
                break;
            case 2:
                game.bg.render();
                game.land.render();
                game.bird.render();
                game.bird.y = 150
                game.ctx.save();
                game.ctx.globalAlpha = this.tutorialOpacity;
                game.ctx.drawImage(game.R["tutorial"],game.canvas.width/2-57,220);
                game.ctx.restore();
                break;
            case 3:
                game.bg.render();
                game.land.render();
                game.bird.render();
                for(var i=0; i<game.pipeArr.length; i++){
                    game.pipeArr[i].render();
                }
                //打印份数
                var socreLength = game.score.toString().length;
                for(var i=0; i<socreLength; i++){
                    game.ctx.drawImage(game.R["shuzi"+game.score.toString().charAt(i)],game.canvas.width/2-34*socreLength/2+34*i,100);
                }
                break;
            case 4:
                game.bg.render();
                game.land.render();
                game.bird.render();
                for(var i=0; i<game.pipeArr.length; i++){
                    game.pipeArr[i].render();
                }
                //打印份数
                var socreLength = game.score.toString().length;
                for(var i=0; i<socreLength; i++){
                    game.ctx.drawImage(game.R["shuzi"+game.score.toString().charAt(i)],game.canvas.width/2-34*socreLength/2+34*i,100);
                }
                //渲染重新再来
                game.ctx.drawImage(game.R["text_game_over"],game.canvas.width/2-102,200);
                break;

        }
    }
    //进入某个场景
    SceneManager.prototype.enter = function(number){
        this.sceneNumber = number;
        switch(this.sceneNumber){
            case 1:
                //进入1号场景这一瞬间要做的事情
                this.logoY = -48;
                this.button_playY = game.canvas.height;
                game.score = 0;
                game.bird = new Bird();
                break;
            case 2:
                game.bird.y = 150;
                this.tutorialOpacity = 1;
                this.tutorialOpacityIsDown = true;
                break;
            case 3:
                game.pipeArr = new Array();
                break;
            case 4:
                //小鸟是否已经触地
                this.isBirdLand = false;
                //小帧编号
                this.birdfno = 0;
                break;
        }

    }
    SceneManager.prototype.bindEvent = function(number){
        var self = this;
        game.canvas.onclick = function(event){
            clickHandler(event.clientX,event.clientY);
        }
        game.canvas.addEventListener("touchstart",function(event){
            var finger = event.touches[0];
            clickHandler(finger.clientX,finger.clientY);
        },true);

        function clickHandler(mousex,mousey){
            switch(self.sceneNumber){
                case 1:
                    if(mousex>self.button_playX && mousex<self.button_playX+116 && mousey>self.button_playY && mousey<self.button_playY+70){
                        self.enter(2);
                    }
                    break;
                case 2:
                    self.enter(3);
                    break;
                case 3:
                    game.bird.fly();
                    break;
                case 4:
                    self.enter(1);
                    break;
            }
        }
    }
})();