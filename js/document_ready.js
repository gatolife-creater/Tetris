//---ローカルストレージから背景色、エフェクトカラー、曲番号を取得したものを-----//
//---ドキュメントが読み込まれたのちに、背景色、エフェクトカラー、曲番号を判別---//
//---ローカルストレージから読み込むプログラムは sketch.js を参照-----------------//
$(document).ready(function() {
    //---背景色を判別したのち、該当するラジオボタンにチェックを入れる---//
    switch (col) {
        case "red":
            $("#red_back").attr("checked", "checked");
            break;
        case "green":
            $("#green_back").attr("checked", "checked");
            break;
        case "blue":
            $("#blue_back").attr("checked", "checked");
            break;
        case "white":
            $("#white_back").attr("checked", "checked");
            break;
        case "aqua":
            $("#aqua_back").attr("checked", "checked");
            break;
        case "lavender":
            $("#lavender_back").attr("checked", "checked");
            break;
        default:
            $("#blue_back").attr("checked", "checked");
            break;
    }
    //------------------------------------------------------------------//

    //---エフェクトカラーを判別したのち、該当するラジオボタンにチェックを入れる---//
    switch (effect_col) {
        case "red_effect":
            $("#red_effect").attr("checked", "checked");
            break;
        case "green_effect":
            $("#green_effect").attr("checked", "checked");
            break;
        case "blue_effect":
            $("#blue_effect").attr("checked", "checked");
            break;
        case "white_effect":
            $("#white_effect").attr("checked", "checked");
            break;
        case "aqua_effect":
            $("#aqua_effect").attr("checked", "checked");
            break;
        case "lavender_effect":
            $("#lavender_effect").attr("checked", "checked");
            break;
        default:
            $("#aqua_effect").attr("checked", "checked");
            break;
    }
    //----------------------------------------------------------------------------//

    //---曲番号を判別したのち、該当するラジオボタンにチェック、---//
    //---曲の自動再生をする属性を audioタグに追加-----------------//
    switch (music) {
        case "music_0":
            $("#music_0").attr("checked", "checked");
            $("#m0").attr("autoplay", "");
            break;
        case "music_1":
            $("#music_1").attr("checked", "checked");
            $("#m1").attr("autoplay", "");
            break;
        case "music_2":
            $("#music_2").attr("checked", "checked");
            $("#m2").attr("autoplay", "");
            break;
        case "music_3":
            $("#music_3").attr("checked", "checked");
            $("#m3").attr("autoplay", "");
            break;

        case "no_music":
            $("#no_music").attr("checked", "checked");
            break;
        default:
            $("#music_0").attr("checked", "checked");
            $("#m0").attr("autoplay", "");
            break;
    }
    //------------------------------------------------------------//
});
//------------------------------------------------------------------------------//