/**
 * Created by Administrator on 2016/9/19.
 */

$(function () {

    $.extend({
        showModal:function (msg) {
            $("#msg").text(msg);
            $("#msgModal").fadeToggle('slow',function () {
                console.log('1');
                $("#msgModal").fadeToggle('slow')
            })
        }
    });

    $.showModal('111111')

});