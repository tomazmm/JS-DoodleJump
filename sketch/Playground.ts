class Playground
{

    doodle : Doodle;

    setup() 
    {

        background(200);

        this.doodle = new Doodle( 
            windowWidth / 2, 
            windowHeight /2,
            55 );


        
    }

    draw()
    {
        clear();
        background(200);

        if(this.doodle.fall() == this.doodle.FELL_OUT_OF_WINDOW)
        {
            this.gameOver();
        }
        
        this.doodle.draw();

    }

    gameOver()
    {
        console.log("Stop looping")
        noLoop();
        // delete this.doodle;
        

    }

   
}