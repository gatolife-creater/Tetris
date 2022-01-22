$(function() {
    //---曲の選択を変更したら、曲番号をローカルストレージに保存して新しい曲を再生する---//
    $('input[name="music"]').change(function() {
        let music_deta = $(this).val();
        localStorage.setItem("music", music_deta);
        music_deta = music_deta.replace("music_", ""); //音楽番号の抽出
        console.log(music_deta);
        for (let i = 0; i < 4; i++) {
            let music = document.querySelector(`#m${i}`);
            music.pause();
        }
        let music = document.querySelector(`#m${music_deta}`);
        music.currentTime = 0;
        music.play();
    });
    //----------------------------------------------------------------------------------//

    //---背景色の選択を変更したら、背景色をローカルストレージに保存し新しい背景色に変更する---//
    $('input[name="color"]').change(function() {
        let color_deta = $(this).val();
        back.check_color(color_deta);
        light.check_color(color_deta);

        localStorage.setItem("back_color", color_deta);
    });
    //----------------------------------------------------------------------------------------//

    //---エフェクトカラーの選択を変更したら、エフェクトカラーをローカルストレージに保存し
    //---新しいエフェクトカラーに変更する---------------------------------------------------//
    $('input[name="effect_color"]').change(function() {
        let color_deta = $(this).val();
        effect.check_color(color_deta);
        localStorage.setItem("effect_color", color_deta);
    });
    //--------------------------------------------------------------------------------------//
});