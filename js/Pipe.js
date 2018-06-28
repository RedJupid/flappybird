(function(){
    var Pipe = window.Pipe = function(){
        this.imageup = game.R.pipe_up;
        this.imagedown = game.R.pipe_down;

        this.allheight = game.canvas.height * 0.78;
        //空隙
        this.interspace = 140;
        //图片高度
        this.pipeheight = 320;
        //随机上管子的高度
        this.height1 = 150+parseInt(Math.random() * (this.pipeheight-150));
        //下管子的高度
        this.height2 = this.allheight - this.height1 - this.interspace;

        //自己的位置
        this.x = game.canvas.width;
        //是否已经被加过分
        this.alreadyPass = false;
        //将自己推入管子数组
        game.pipeArr.push(this);
    }
    Pipe.prototype.update = function(){
        this.x -=2;
        var self = this;
        if(this.x<-52){
            game.pipeArr.shift();
            self = null;
        }
        //碰撞检测，检查自己有没有碰撞到小鸟
        if(game.bird.R > this.x && game.bird.L < this.x+52){
            if(game.bird.T < this.height1 || game.bird.B > this.height1 + this.interspace){
                //clearInterval(game.timer);
                game.sm.enter(4);
            }
        }
        //加分
        if(!this.alreadyPass && game.bird.R > this.x + 52){
            game.score ++;
            this.alreadyPass = true;
        }
    }
    Pipe.prototype.render = function(){
        game.ctx.drawImage(this.imagedown,0,this.pipeheight-this.height1,52,this.height1,this.x,0,52,this.height1);
        game.ctx.drawImage(this.imageup,0,0,52,this.height2,this.x,this.height1+this.interspace,52,this.height2);
    }
})();