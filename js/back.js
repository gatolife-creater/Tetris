class Back {
    constructor() {
        this.count = 1e2;
        this.x = [];
        this.y = [];
        this.size = [];
        this.speed = [];
        this.r = 255;
        this.g = 255;
        this.b = 200;
        this.alpha = [];
        this.alpha_speed = [];
        for (let i = 0; i < this.count; i++) {
            this.x[i] = random(0, width);
            this.y[i] = random(0, height);
            this.size[i] = random(1, 6);
            this.speed[i] = random(0.1, 0.5);
            this.alpha[i] = random(0, 255);
            this.alpha_speed[i] = random(3, 5);
        }
    }


    //---複数の星が点滅する-------------------------------------//
    d() {
            for (let i = 0; i < this.count; i++) {
                this.alpha[i] -= this.alpha_speed[i];
                if (this.alpha[i] < -50 || this.alpha[i] > 300) {
                    this.alpha_speed[i] *= -1;
                }
                if (this.y[i] < 0) {
                    this.x[i] = random(width);
                    this.y[i] = random(height);
                }
                if (this.y[i] > height) {
                    this.x[i] = random(width);
                    this.y[i] = random(height);
                }
                noStroke();

                fill(this.r, this.g, this.b, this.alpha[i] / 90);
                circle(this.x[i], this.y[i], (this.size[i] / 3) * 20);

                fill(this.r, this.g, this.b, this.alpha[i] / 60);
                circle(this.x[i], this.y[i], (this.size[i] / 3) * 12);

                fill(this.r, this.g, this.b, this.alpha[i]);
                circle(this.x[i], this.y[i], this.size[i]);
            }
        }
        //----------------------------------------------------------//


    //---引数に応じて,背景色を設定する---//
    check_color(color_deta) {
            switch (color_deta) {
                case "red":
                    this.r = 255;
                    this.g = 0;
                    this.b = 200;
                    break;
                case "green":
                    this.r = 0;
                    this.g = 255;
                    this.b = 125;
                    break;

                case "blue":
                    this.r = 0;
                    this.g = 125;
                    this.b = 255;
                    break;

                case "white":
                    this.r = 255;
                    this.g = 255;
                    this.b = 200;
                    break;
                case "aqua":
                    this.r = 0;
                    this.g = 255;
                    this.b = 255;
                    break;

                case "lavender":
                    this.r = 204;
                    this.g = 204;
                    this.b = 255;
                    break;
            }
        }
        //-----------------------------------//
}