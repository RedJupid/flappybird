(function(){
    //背景类
    var Background = window.Background = function(){
        //自己的背景
        this.image = game.R.bg_day;
        //自己的y
        this.y = 0.75*game.canvas.height - 396;
        this.w = 288;
        this.h = 512;
        this.x =0;
        //速度
        this.speed =1;
    }
    //更新背景
    Background.prototype.update = function(){
        this.x-=this.speed;
        if(this.x<-this.w){
            this.x = 0;
        }
    }
    Background.prototype.render = function(){
        //渲染图片
        game.ctx.drawImage(this.image,this.x,this.y);
        game.ctx.drawImage(this.image,this.x+this.w,this.y);
        game.ctx.drawImage(this.image,this.x+this.w*2,this.y);
        //渲染天空的猫腻矩形
        game.ctx.fillStyle = "#4EC0CA";
        game.ctx.fillRect(0,0,game.canvas.width,this.y);
    }
})();