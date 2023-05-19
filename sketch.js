class field
{
  constructor(num, px, py, dim, showing, bomb, nearby, col)
  {
    this.num = num;
    this.px = px;
    this.py = py;
    this.dim = dim;
    this.showing = showing;
    this.bomb = bomb;
    this.nearby = nearby;
    this.col = col;
  }
  show()
  {
    if(this.showing==true)
    {
      noStroke();
      fill(145);
      rect(this.px, this.py, this.dim);
      if(this.bomb==true)
      {
        fill("red");
        circle(this.px+28, this.py+28, this.dim-10);
      }
      if(this.nearby>0)
      {
        fill("black");
        textSize(30)
        textAlign(CENTER);
        text(this.nearby, this.px+27, this.py+39);
      }
    }
    else
    {
      noStroke();
      fill(this.col);
      rect(this.px, this.py, this.dim);
    }
  }
}

let fields = [], px = 10, py = 10, dim = 55, bomb = false, bombs = 0, i;
let bomb_list = [], num = 0, yes = 0, first = 0, loose = 0;

function setup()
{
  createCanvas(400, 400);
  generuj();
  for(i = 36;i>0;i--)
  {
    for(let b of bomb_list)
    {
      if(num==b)
      {
        bomb = true;
      }
    }
    fields.push(new field(num, px, py, dim, false, bomb, 0, 75));
    px = px + dim + 10;
    bomb = false;
    num++;
    if(px>(dim+10)*6)
    {
      px = 10;
      py = py + dim + 10;
    }
  }
  for(let f of fields)
  {
    if(f.bomb==false)
    {
      if(f.num!==5 && f.num!==11 && f.num!==17 && f.num!==23 && f.num!==29 && f.num!==35)
      {
        let b = fields[f.num+1].bomb;
        if(b==true)
        {
          f.nearby++;
        }
      }
      if(f.num!==0 && f.num!==6 && f.num!==12 && f.num!==18 && f.num!==24 && f.num!==30)
      {
        let b = fields[f.num-1].bomb;
        if(b==true)
        {
          f.nearby++;
        }
      }
      if(f.num!==0 && f.num!==1 && f.num!==2 && f.num!==3 && f.num!==4 && f.num!==5 && f.num!==11 && f.num!==17 && f.num!==23 && f.num!==28 && f.num!==35)
      {
        let b = fields[f.num-5].bomb;
        if(b==true)
        {
          f.nearby++;
        }
      }
      if(f.num!==0 && f.num!==1 && f.num!==2 && f.num!==3 && f.num!==4 && f.num!==5)
      {
        let b = fields[f.num-6].bomb;
        if(b==true)
        {
          f.nearby++;
        }
      }
      if(f.num!==0 && f.num!==1 && f.num!==2 && f.num!==3 && f.num!==4 && f.num!==5 && f.num!==6 && f.num!==12 && f.num!==18 && f.num!==24 && f.num!==30)
      {
        let b = fields[f.num-7].bomb;
        if(b==true)
        {
          f.nearby++;
        }
      }
      if(f.num!==30 && f.num!==31 && f.num!==32 && f.num!==33 && f.num!==34 && f.num!==35 && f.num!==0 && f.num!==6 && f.num!==12 && f.num!==18 && f.num!==24 && f.num!==30)
      {
        let b = fields[f.num+5].bomb;
        if(b==true)
        {
          f.nearby++;
        }
      }
      if(f.num!==30 && f.num!==31 && f.num!==32 && f.num!==33 && f.num!==34 && f.num!==35)
      {
        let b = fields[f.num+6].bomb;
        if(b==true)
        {
          f.nearby++;
        }
      }
      if(f.num!==30 && f.num!==31 && f.num!==32 && f.num!==33 && f.num!==34 && f.num!==35 && f.num!==5 && f.num!==11 && f.num!==17 && f.num!==23 && f.num!==29 && f.num!==35)
      {
        let b = fields[f.num+7].bomb;
        if(b==true)
        {
          f.nearby++;
        }
      }
    }
  }
}

function generuj()
{
  let l = 0;
  bomb_list = [];
  for(i = 7;i>0;i--)
  {
    let rand = floor(random(0, 36));
    for(let b of bomb_list)
    {
      if(b==rand)
      {
        generuj();
      }
    }
    bomb_list.push(rand);
  }
  for(let b of bomb_list)
  {
    l++;
  }
  if(l!==7)
  {
    generuj();
  }
}

function mouseClicked()
{
  for(let f of fields)
  {
    if(mouseX>f.px && mouseX<f.px+f.dim && mouseY>f.py && mouseY<f.py+f.dim && loose==0)
    {
      if(f.bomb==true && first==0)
      {
        return;
      }
      first = 1;
      if(f.bomb==true)
      {
        loose = 1;
      }
      f.showing = true;
    }
  }
}

function draw()
{
  background(100);
  for(let f of fields)
  {
    if(mouseX>f.px && mouseX<f.px+f.dim && mouseY>f.py && mouseY<f.py+f.dim && f.showing==false && loose==0)
    {
      f.col = 90;
    }
    else
    {
      f.col = 75;
    }
    f.show();
  }
}