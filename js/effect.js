class Effect {
    constructor() {
        this.count = 0;
        this.radius_count = 1;
        this.x = 0;
        this.y = 0;
        this.size = [];
        this.color = color(0, 255, 125);
        this.color_code = 0;
    }

    //---画面の中央から、多角形のエフェクトを描画。サイズが横幅を超えたらエフェクトを削除---//
    d() {
            push();
            translate(width / 2, height / 2);
            for (let i = 0; i < this.count; i++) {
                this.size[i] += 20;
                this.polygon(this.x, this.y, this.size[i], this.radius_count);
                if (this.size[i] > width) {
                    this.shift_deta();
                }
            }
            pop();
        }
        //--------------------------------------------------------------------------------------//

    //---多角形を追加する---//
    push_deta() {
            this.count += 1;
            this.size.push(10);
        }
        //----------------------//

    //---多角形を削除する---//
    shift_deta() {
            this.count -= 1;
            this.size.shift();
        }
        //----------------------//

    //---多角形を描く。x座標、y座標、サイズ、頂点の数を引数にとる。vertexは頂点を意味する--//
    polygon(x, y, r, vertexNum) {
            push();
            translate(x, y);
            noFill();
            strokeWeight(2);
            stroke(this.color);
            beginShape();
            for (let i = 0; i < vertexNum; i++) {
                vertex(r * cos((360 * i) / vertexNum), r * sin((360 * i) / vertexNum));
            }
            endShape(CLOSE);

            pop();
        }
        //-------------------------------------------------------------------------------------//

    //---引数に応じて,エフェクトカラーを設定する---//
    check_color(color_deta) {
            switch (color_deta) {
                case "red_effect":
                    this.color = color(255, 0, 200);
                    break;
                case "green_effect":
                    this.color = color(0, 255, 125);
                    break;

                case "blue_effect":
                    this.color = color(0, 125, 255);
                    break;

                case "white_effect":
                    this.color = color(255, 255, 200);
                    break;
                case "aqua_effect":
                    this.color = color(0, 255, 255);
                    break;

                case "lavender_effect":
                    this.color = color(204, 204, 255);
                    break;
            }
        }
        //---------------------------------------------//
}