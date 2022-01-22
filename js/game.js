// 一時停止
let modal_opend = false; //modal用
let pause = false; //Pボタン用
// スコア
let score = 0;
if (localStorage.getItem("best_score")) {
    var best_score = localStorage.getItem("best_score");
} else if (!localStorage.getItem("best_score")) {
    var best_score = 0;
}

//落ちるスピード
const GAME_SPEED = 500;

//フィールドサイズ
const FIELD_COL = 10;
const FIELD_ROW = 20;

//ブロック一つのサイズ(ピクセル)
const BLOCK_SIZE = 30;

//スクリーンサイズ
const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

//テトロミノのサイズ
const TETRO_SIZE = 4;

const TETRO_COLORS = [
    "rgb(0,0,0,0)", //0空
    "rgb(0,180,255)", //1水色
    "rgb(255,125,0)", //2オレンジ
    "rgb(0,125,255)", //3青
    "rgb(200,0,255)", //4紫
    "rgb(255,255,0)", //5黄色
    "rgb(255,50,0)", //6赤
    "rgb(0,255,125)", //7緑
];

const TETRO_TYPES = [
    [], // 0.空っぽ
    [
        // 1.I
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        // 2.L
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        // 3.J
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        // 4.T
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        // 5.O
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        // 6.Z
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        // 7.S
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
    ],
];

//初期位置
const START_X = FIELD_COL / 2 - TETRO_SIZE / 2;
const START_Y = 0;

//テトロミノ本体
let tetro;
//テトロミノの形
let tetro_t;

//テトロミノの座標
let tetro_x = START_X;
let tetro_y = START_Y;

//フィールド本体
let field = [];

//ゲームオーバーフラグ
let over = false;

let can = document.getElementById("can");
let con = can.getContext("2d");

can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border = "8px solid #333333";



init();

//初期化
function init() {
    //フィールドのクリア
    for (let y = 0; y < FIELD_ROW; y++) {
        field[y] = [];
        for (let x = 0; x < FIELD_COL; x++) {
            field[y][x] = 0;
        }
    }

    //   最初のテトロのためのネクスト
    tetro_n = Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1;

    setTetro();
    drawAll();
    setInterval(dropTetro, GAME_SPEED);
}

function setTetro() {
    tetro_t = tetro_n;
    tetro = TETRO_TYPES[tetro_t];
    tetro_n = Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1;
    tetro_x = START_X;
    tetro_y = START_Y;
}

//ブロック一つを描画する
function drawBlock(x, y, c, r) {
    let px = x * BLOCK_SIZE;
    let py = y * BLOCK_SIZE;

    con.fillStyle = TETRO_COLORS[c];
    con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    con.strokeStyle = "rgb(100,100,100)";
    con.lineWidth = 2;
    con.strokeRect(px, py, BLOCK_SIZE - r, BLOCK_SIZE - r);
}

//全部描画する
function drawAll() {
    // setTetro();

    con.clearRect(0, 0, SCREEN_W, SCREEN_H);
    con.font = "40px 'ＭＳ ゴシック'";
    con.fillStyle = "white";

    $("#current_score").text("SCORE:" + score);
    $("#best_score").text("BEST:" + best_score);

    for (let y = 0; y < FIELD_ROW; y++) {
        for (let x = 0; x < FIELD_COL; x++) {
            if (field[y][x]) {
                drawBlock(x, y, field[y][x], 0);
            }
        }
    }

    let plus = 0;
    while (checkMove(0, plus + 1)) plus++;

    for (let y = 0; y < TETRO_SIZE; y++) {
        for (let x = 0; x < TETRO_SIZE; x++) {
            if (tetro[y][x]) {
                //         着地点
                drawBlock(tetro_x + x + 0.03, tetro_y + y + 0.03 + plus, 0, 3);

                //         テトロ本体
                drawBlock(tetro_x + x, tetro_y + y, tetro_t, 0);
            }
        }
    }

    if (over) {
        let s = "GAME OVER";
        con.font = "40px 'Georgia'";
        let w = con.measureText(s).width;
        let x = SCREEN_W / 2 - w / 2;
        let y = SCREEN_H / 2 - 20;
        con.lineWidth = 4;
        con.strokeText(s, x, y);
        con.fillStyle = "white";
        con.fillText(s, x, y);
    }
    if (best_score <= score) {
        best_score = score;
        localStorage.setItem("best_score", best_score);
    }
}

// ブロックの衝突判定
function checkMove(mx, my, ntetro) {
    if (ntetro == undefined) {
        ntetro = tetro;
    }

    for (let y = 0; y < TETRO_SIZE; y++) {
        for (let x = 0; x < TETRO_SIZE; x++) {
            if (ntetro[y][x]) {
                let nx = tetro_x + mx + x;
                let ny = tetro_y + my + y;

                if (
                    ny < 0 ||
                    nx < 0 ||
                    ny >= FIELD_ROW ||
                    nx >= FIELD_COL ||
                    field[ny][nx]
                ) {
                    return false;
                }
            }
        }
    }

    return true;
}

// テトロの回転
function rotate_t() {
    let ntetro = [];

    for (let y = 0; y < TETRO_SIZE; y++) {
        ntetro[y] = [];
        for (let x = 0; x < TETRO_SIZE; x++) {
            ntetro[y][x] = tetro[TETRO_SIZE - x - 1][y];
        }
    }

    return ntetro;
}

//テトロを固定する
function fixTetro() {
    for (let y = 0; y < TETRO_SIZE; y++) {
        for (let x = 0; x < TETRO_SIZE; x++) {
            if (tetro[y][x]) {
                field[tetro_y + y][tetro_x + x] = tetro_t;
            }
        }
    }
}

//ラインが揃ったかチェックして消す
function checkLine() {
    let linec = 0;
    for (let y = 0; y < FIELD_ROW; y++) {
        let flag = true;

        for (let x = 0; x < FIELD_COL; x++) {
            if (!field[y][x]) {
                flag = false;
                break;
            }
        }

        if (flag) {
            //ここで実際にブロックを消している？
            linec++;

            for (let ny = y; ny > 0; ny--) {
                for (let nx = 0; nx < FIELD_COL; nx++) {
                    field[ny][nx] = field[ny - 1][nx];
                }
            }
            score += 20;
            effect.push_deta();
            effect.radius_count += 1;
            if (effect.radius_count > 10) {
                effect.radius_count = 2;
            }
        }
    }
}

// ブロックの落ちる処理
function dropTetro() {
    if (modal_opend == false && pause == false) {
        if (over) {
            return;
        }

        if (checkMove(0, 1)) {
            tetro_y++;
        } else {
            fixTetro();
            checkLine();
            tetro_t = Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1;
            tetro = TETRO_TYPES[tetro_t];
            tetro_x = START_X;
            tetro_y = START_Y;

            if (!checkMove(0, 0)) {
                over = true;
            }
        }
        score++;
        drawAll();
    }
}

function keyPressed() {
    if (keyCode == 13 || (keyCode == 75 && modal_opend == false && pause == false)) {
        while (checkMove(0, 1)) {
            tetro_y += 1;
        }
        score += 90;
    }
}
//キーボードが押された時の処理
document.onkeydown = function(e) {
    if (over) {
        return;
    }

    switch (e.keyCode) {
        case 80:
            if (modal_opend == true || pause == true) {
                modal_opend = false;
                pause = false;
            } else if (modal_opend == false && pause == false) {
                modal_opend = true;
                pause = true;
            }
            break;
        case 74:
        case 37: // 左
            if (modal_opend == false && pause == false) {
                if (checkMove(-1, 0)) tetro_x--;
            }
            break;
        case 76:
        case 39: // 右
            if (modal_opend == false && pause == false) {
                if (checkMove(1, 0)) tetro_x++;
            }
            break;
        case 68:
        case 40: // 下
            if (modal_opend == false && pause == false) {
                if (checkMove(0, 1)) tetro_y++;
                score += 2;
            }
            break;
        case 32:
        case 70: // スペース
            if (modal_opend == false && pause == false) {
                let ntetro = rotate_t();
                if (checkMove(0, 0, ntetro)) {
                    tetro = ntetro;
                }
            }
            break;
        case 82:
            document.location.reload();
            break;
    }

    drawAll();
};

function toggle() {
    if (modal_opend == false) {
        // $("#modal_opend").attr("src", "lib/一時停止ボタン.png");
        // $(".toggle").text("一時停止");
        modal_opend = true;
    } else if (modal_opend == true) {
        // $("#modal_opend").attr("src", "lib/再生ボタン.png");
        // $(".toggle").text("再開");
        modal_opend = false;
    }
}
$("#current_score").text("SCORE:" + score);
$("#best_score").text("BEST:" + best_score);