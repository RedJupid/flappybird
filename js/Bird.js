(function(){
    var Bird = window.Bird = function(){
        this.color = parseInt(Math.random()*3);
        this.imageArr = [
            game.R["bird"+this.color+"_0"],
            game.R["bird"+this.color+"_1"],
            game.R["bird"+this.color+"_2"],
        ];
        //翅膀状态
        this.wingStep = 0;
        //小鸟的位置
        this.x = game.canvas.width *(1-0.618) -24;
        this.y = 100;
        //鸟自己的帧，用于下落，上升算法
        this.fno = 0;
        //角度
        this.d = 0;
        //是否拥有能量
        this.hasEnergy = false;
    }
    Bird.prototype.update = function(){
        //计算自己的四个碰撞检测值
        this.T = parseInt(this.y -15);//12是图片上面的空隙
        this.R = parseInt(this.x +15);//
        this.B = parseInt(this.y +15);
        this.L = parseInt(this.x -15);


        this.wing();
        

        //算法要掉落
        if(!this.hasEnergy){
            this.y += this.fno * 0.3;    
        }else{
            this.y -= (15-this.fno) * 0.6;
            if(this.fno>15){
                this.hasEnergy = false;
            }
        }
        this.d += 0.04;
        this.fno++;
        //验证是否落地
        if(this.B>game.canvas.height*0.78 -24){
            //clearInterval(game.timer);
            game.sm.enter(4);
        }
    }
    Bird.prototype.render = function(){
        game.ctx.save();
        game.ctx.translate(this.x,this.y);
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingStep],-24,-24);
        game.ctx.restore();
    }
    //飞
    Bird.prototype.fly = function(){
        this.hasEnergy = true;
        this.d = -0.6;
        this.fno =0;
    }
    //扑打翅膀
    Bird.prototype.wing = function(){
        game.fno %20 == 0 && (this.wingStep++);
        if(this.wingStep > 2){
            this.wingStep = 0;
        }
    }
})();