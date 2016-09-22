/**
 * Created by Administrator on 2016/9/22.
 */

/* 分页
 * total 总页数
 * backFn 回调函数，获取当前第几页
 */
function pages(total,backFn) {

    var pages = document.getElementById('pages');
    pages.innerHTML = '<div class="page">'+
        '<span id="firstPage" class="pageBtn font-w pagePointer mgn-5">首页</span>'+
        '<span id="prePage" class="pageBtn font-w pagePointer mgn-5"><img src="img/pre.png"></span>'+
        '<span class="mgn-5"><span id="currentPage" class="font-b">1</span>/<span id="totalPage">8</span></span>'+
        '<span id="nextPage" class="pageBtn font-w pagePointer mgn-5"><img src="img/next.png"></span>'+
        '<span id="lastPage" class="pageBtn font-w pagePointer mgn-5">尾页</span>'+
        '<input id="numPage" class="pageNum mgn-5" type="number"/>'+
        '<span id="jumpPage" class="pageBtn font-w pagePointer mgn-5">跳转</span>'+
        '</div>';



    var cPage = document.getElementById('currentPage');
    var firstPage = document.getElementById('firstPage');
    var prePage = document.getElementById('prePage');
    var nextPage = document.getElementById('nextPage');
    var lastPage = document.getElementById('lastPage');
    var numPage = document.getElementById('numPage');
    var jumpPage = document.getElementById('jumpPage');
    var totalPage = document.getElementById('totalPage');

    totalPage.textContent = total;

    isFirstPage();
    isLastPage();

    // 首页
    firstPage.onclick = function () {
        lastPage.style.display = 'inline';
        nextPage.style.display = 'inline';
        cPage.textContent = 1;
        isFirstPage();
        // 回调方法
        backFn(cPage.textContent)
    };

    // 尾页
    lastPage.onclick = function () {
        cPage.textContent = totalPage.textContent;
        firstPage.style.display = 'inline';
        prePage.style.display = 'inline';
        isLastPage();
        // 回调方法
        backFn(cPage.textContent)
    };


    // 下一页
    nextPage.onclick = function () {
        firstPage.style.display = 'inline';
        prePage.style.display = 'inline';
        cPage.textContent = +cPage.textContent +1;
        isLastPage();

        // 回调方法
        backFn(cPage.textContent)
    };

    // 上一页
    prePage.onclick = function () {
        lastPage.style.display = 'inline';
        nextPage.style.display = 'inline';
        cPage.textContent = +cPage.textContent -1;
        isFirstPage();

        // 回调方法
        backFn(cPage.textContent)
    };

    // 跳转到第几页
    jumpPage.onclick = function () {
        // console.log(numPage.value);
        var num = +numPage.value;
        if (num >= 1 && num <= +totalPage.textContent && parseInt(num)===num) {
            cPage.textContent = num;
            lastPage.style.display = 'inline';
            nextPage.style.display = 'inline';
            firstPage.style.display = 'inline';
            prePage.style.display = 'inline';
            isFirstPage();
            isLastPage();

            // 回调方法
            backFn(cPage.textContent)
        }

    };

    // 判断是否是第一页
    function isFirstPage() {
        if (cPage.textContent === '1' ) {
            firstPage.style.display = 'none';
            prePage.style.display = 'none';
        }
    }

    // 判断是否是最后一页
    function isLastPage() {
        if (cPage.textContent === totalPage.textContent) {
            lastPage.style.display = 'none';
            nextPage.style.display = 'none';
        }

    }
}


/* 按钮倒计时
 * self 按钮对象
 * wait 时间
 * backFn 回调函数
 */
function BtnWaitTime(self,wait,backFn) {
    self.setAttribute("disabled", true);
    self.style.backgroundColor = '#888';
    var text = self.innerText;
    self.time = setInterval(function () {
        if (wait === 0) {
            if (backFn){
                backFn();
            }
            self.removeAttribute("disabled");
            self.style.backgroundColor = '#1a9bd2';
            self.innerText = text;
            clearInterval(self.time)
        }
        else {
            wait--;
            self.innerText = text+'(' + wait + ')';
        }

    }, 1000);
}


/* 无按钮提示框
 * isLost 类型Boolean true为成功样式 false为失败样式
 * text 提示文本
 */
function msg(isLost,text) {
    var model = document.getElementById('msgModel');
    var msgIcon = document.getElementById('msgIcon');
    model.style.opacity = '0';
    model.style.display = 'none';
    clearInterval(model.timer);
    clearTimeout(model.outT);

    document.getElementById('msgText').innerText = text;
    if (isLost) {
        msgIcon.src = 'img/success.png';
        model.style.color = '#56c6d4';
        model.style.boxShadow = '0 0 4px 4px #b0e4eb';
        model.style.border = '1px solid #56c6d4';
    }
    else {
        msgIcon.src = 'img/lost.png';
        model.style.color = '#fe998b';
        model.style.boxShadow = '0 0 4px 4px #ffd5cf';
        model.style.border = '1px solid #fe998b';
    }

    outIn(model,0.1,function () {
        // console.log('消失');

        outIn(model,-0.1,function () {
            model.style.display = 'none';

        });

    });

    function outIn(self,n,fn) {
        self.style.display = 'block';
        self.timer = setInterval(function () {
            self.style.opacity = +self.style.opacity+ n;
            if (+self.style.opacity === 1 || +self.style.opacity === 0) {
                clearInterval(self.timer);
                // console.log(self.style.opacity);
                if (fn) {
                    self.outT = setTimeout(function () {
                        fn();
                    },1000)
                }
            }
        },50);
    }
}

// 渲染界面
(function () {
    // 无按钮提示框html
    var msg = document.createElement('div');
    msg.id = 'msgModel';
    msg.innerHTML = '<img id="msgIcon" src="img/lost.png"/> <span id="msgText"></span>';
    // var html = '<div id="msgModel"> <img id="msgIcon" src="img/lost.png"/> <span id="msgText"></span> </div>';
    document.body.appendChild(msg);

    var model = document.getElementById('msgModel');
    var msgIcon = document.getElementById('msgIcon');

    model.style.position = 'absolute';
    model.style.left = '50%';
    model.style.top = '50%';
    model.style.transform = 'translate(-50%,-50%)';
    model.style.padding = '30px 37px';
    model.style.borderRadius = '8px';
    model.style.textAlign = 'center';
    model.style.fontSize = '20px';
    model.style.opacity = '0';
    model.style.display = 'none';
    model.style.zIndex = '99999';
    msgIcon.style.verticalAlign = 'bottom';


    // 带按钮提示框html
    var btnMsg = document.createElement('div');
    btnMsg.id = 'btnMsg-mask';
    btnMsg.innerHTML = '<div id="btnMsg-box">'+
                            '<div id="btnMsg-title">你确定要解锁该账户？</div>'+
                                '<div style="padding: 25px 0; text-align: center">'+
                                    '<button id="btnMsg-btn1">确定</button>'+
                                    '<button id="btnMsg-btn2">取消</button>'+
                                '</div>'+
                         '</div>';

    document.body.appendChild(btnMsg);
})();


/* 按钮摸态框
 * msg 提示信息
 * fn 点击确定的回调函数
 * --基于jq
 */
function btnMsg_Show(msg,fn) {
    var btnMsg_mask = $('#btnMsg-mask');
    btnMsg_mask.show();
    $('#btnMsg-title').html(msg);
    $('#btnMsg-btn2').click(btnMsg_close);
    $('#btnMsg-btn1').click(fn);
}

$('#btnMsg-mask').click(function () {
    btnMsg_close()
});

$('#btnMsg-box').click(function () {
    return false;
});

// 关闭摸态框
function btnMsg_close() {
    var btnMsg_mask = $('#btnMsg-mask');
    btnMsg_mask.hide();
}

