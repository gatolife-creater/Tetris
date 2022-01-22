class Light {
    constructor() {
        //---ゆっくりマウスについてくるポインターの変数---//
        this.x = width / 2;
        this.y = height / 2;
        this.easing = 0.1;
        //------------------------------------------------//

        //---マウスをクリックすると発生する円の変数---//
        this.circle_count = 0; //円の数
        this.circle_x = [];
        this.circle_y = [];
        this.circle_size = [];
        this.circle_speed = []; //円が大きくなるスピード
        //--------------------------------------------//

        //---上二の色---//
        this.r = 255;
        this.g = 255;
        this.b = 200;
        //--------------//
    }

    d() {
        noFill();

        for (let i = 0; i < this.circle_count; i++) {
            //---円が指定以上の大きさになったときの処理---//
            if (this.circle_size[i] > 120) {
                this.circle_count--;
                this.circle_x.shift();
                this.circle_y.shift();
                this.circle_size.shift();
                this.circle_speed.shift();
            }
            //--------------------------------------------//
            this.circle_size[i] += this.circle_speed[i]; //円のサイズが大きくなる
            stroke(this.r, this.g, this.b, 200);
            circle(this.circle_x[i], this.circle_y[i], this.circle_size[i]);
        }

        noStroke();
        this.mouse_effect(mouseX, mouseY);
    }

    mouse_effect(targetX, targetY) {
        let dx = targetX - this.x;
        this.x += dx * this.easing;

        let dy = targetY - this.y;
        this.y += dy * this.easing;

        if (!mouseIsPressed) {
            fill(this.r, this.g, this.b, 255 / 120);
            circle(this.x, this.y, (10 / 3) * 100);
            fill(this.r, this.g, this.b, 255 / 50);
            circle(this.x, this.y, (10 / 3) * 20);
            fill(this.r, this.g, this.b, 255 / 30);
            circle(this.x, this.y, (10 / 3) * 12);
            fill(this.r, this.g, this.b);
            circle(this.x, this.y, 10);
        }
        if (mouseIsPressed && !(movedX == 0 && movedY == 0)) {
            this.circle_count += 1;
            this.circle_x.push(mouseX);
            this.circle_y.push(mouseY);
            this.circle_size.push(50);
            this.circle_speed.push(3);
        }
    }

    //---引数に応じて,ポインターカラーを設定する---//
    check_color(color_) {
            switch (color_) {
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
        //---------------------------------------------//
}