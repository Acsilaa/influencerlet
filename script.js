function rnd(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function rndfloat(min, max){
    return (Math.random() * (max - min)) + min;
}
async function wait(t) {
    return new Promise(res => setTimeout(res, t));
}
function contains(arr, item){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == item) return true;
    }
    return false;
}
function removedFromList(arr, item){
    res = [];
    for(let i=0; i < arr.length; i++){
        if(arr[i] != item) {
            res.push(arr[i]);
            continue;
        }
    }
    return res;
}
class D{
    static Ds = [];
    static dying = [];
    static lastID = -1;

    ID = 0;

    color;
    side;
    b_rad;
    OBJ;
    alpha = .3;
    
    x = 0;
    y = 0;
    r = 0;
    
    mspeed = 1;
    myspeed = 1;
    rspeed = 1;
    
    mdir = 1;
    rdir = 1;
    
    life = 1
    
    constructor(){
        let colors = ['orange', 'brown', 'red', '#B7B8B970'];
        this.color = colors[rnd(0, colors.length)];
        this.side = rnd(10,40) + "px";
        this.b_rad = rnd(20,50) + "%";
        this.x = rnd(-300, 300);
        this.r = rnd(-30, 30);
        this.mdir = rndfloat(-.6, .6);
        this.rdir = rndfloat(-1, 1);
        this.mxspeed = rndfloat(0, 4);
        this.myspeed = rndfloat(0, 4);
        this.rspeed = rndfloat(0, 4);
        this.life = rndfloat(4, 8);
        this.ID = D.lastID+1;
        this.OBJ = document.createElement('div');

        D.lastID = this.ID;

        $(this.OBJ).addClass('div' + D.lastID);
        $(this.OBJ).css('border-radius', this.b_rad);
        $(this.OBJ).css('background-color', this.color);
        $(this.OBJ).css('width', this.side);
        $(this.OBJ).css('height', this.side);
        $(this.OBJ).css('opacity', this.alpha);
        $(this.OBJ).css('position', 'absolute');
        $(this.OBJ).css('left', 'calc(50vw +' + this.side/2 + 'px)');
        $(this.OBJ).css('bottom', `20px`);
        $(this.OBJ).css('pointer-events', 'none');
        $(this.OBJ).appendTo($('body'));

        D.Ds.push(this);
        this.transformUpdate();
    }
    transformUpdate(){
        $(this.OBJ).css('transform', `translateX(${this.x}px) translateY(${-this.y}px) rotateZ(${this.r}deg)`)
        if(this.life <= 0 && !contains(D.dying, this.ID)) {
            $(this.OBJ).addClass("die");
            D.dying.push(this.ID);
        }

        for(let i=0; i < D.Ds.length; i++){
            if(D.Ds[i].life > -1) continue;
            let e = D.Ds[i];
            D.dying = removedFromList(D.dying, e.ID)
            D.Ds = removedFromList(D.Ds, e)
            $(e.OBJ).remove();
        }

    }
    static move(){
        for(let i = 0; i < D.Ds.length; i++){
            D.Ds[i].x += D.Ds[i].mxspeed * D.Ds[i].mdir;
            D.Ds[i].y += D.Ds[i].myspeed;
            D.Ds[i].r += D.Ds[i].rspeed * D.Ds[i].rdir;
            D.Ds[i].life -= .01;
            D.Ds[i].transformUpdate();
        }
    }
}

async function life_move() {
    while (true){
        await wait(10);
        D.move();
    }
}
async function life_birth() {
    while (true){
        await wait(150);
        new D();
    }
}
life_move()
life_birth()