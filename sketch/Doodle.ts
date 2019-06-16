class Doodle
{
    readonly FELL_OUT_OF_WINDOW = 0;

    shape : any;
    x_ : number;
    y_ : number;

    size_ : number;
    

    constructor( x : number, y : number,  size : number )
    {
        this.x_ = x;
        this.y_ = y;

        this.size_ = size;
    }

    draw()
    {
       this.shape = square(this.x_, this.y_, this.size_, 20);
    }

    fall() : number
    {
        this.y_ += 3;

        if( this.y_ + this.size_  > windowHeight)
        {   
            return this.FELL_OUT_OF_WINDOW;
        }
    }

    


}