(function(){
    var Land = window.Land = function(){
        this.image = game.R.land;
        this.y = game.canvas.height*0.78;
        this.x = 0;
        this.w = 336
    }
    //更新
    Land.prototype.update = function(){
        this.x-=2;
        if(this.x<-this.w){
            this.x=0;
        }
    }
    Land.prototype.render = function(){
        game.ctx.drawImage(this.image,this.x,this.y);
        game.ctx.drawImage(this.image,this.x+336,this.y);
        game.ctx.drawImage(this.image,this.x+336+336,this.y);
        //猫腻矩形
        game.ctx.fillStyle = "#DED895";
        game.ctx.fillRect(0,this.y+112,game.canvas.width,game.canvas.height-this.y-112);
    }
})();