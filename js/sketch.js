let canvas;

// ---ローカルストレージから背景色、エフェクトカラー、曲番号を取得---//
let col = localStorage.getItem("back_color");
let effect_col = localStorage.getItem("effect_color");
let music = localStorage.getItem("music");
//-------------------------------------------------------------------//

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style("z-index", "-1");
    angleMode(DEGREES);

    //---エフェクト、曲、背景、ポインター、ビジュアライザーのクラスの宣言---//
    effect = new Effect();
    back = new Back();
    light = new Light();
    //----------------------------------------------------------------------//

    //---引数に応じて、背景色、ポインターカラー、エフェクトカラーを設定---//
    back.check_color(col);
    light.check_color(col);
    effect.check_color(effect_col);
    //--------------------------------------------------------------------//
}

function draw() {
    //---残像用。fillの第二引数が小さいほど、残像が長く残る---//
    fill(0, 15);
    rect(0, 0, width, height);
    //--------------------------------------------------------//

    effect.d();
    back.d();
    light.d();

    //---モーダルウィンドウが開いているか否かでテトリスを停止したり、再開したりする---//
    if ($("body").hasClass("modal-open")) {
        modal_opend = true;
    } else {
        modal_opend = false;
    }
    //--------------------------------------------------------------------------------//
}

function windowResized() {
    //---カンバスサイズを変更し、背景の星を再度描画する---//
    canvas = resizeCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 3e2; i++) {
        back.x[i] = random(0, width);
        back.y[i] = random(0, height);
    }
    //----------------------------------------------------//  
}

function mousePressed() {
    //---クリックした際に円を追加する---//
    light.circle_count += 1;
    light.circle_x.push(mouseX);
    light.circle_y.push(mouseY);
    light.circle_size.push(50);
    light.circle_speed.push(3);
    //----------------------------------//
}