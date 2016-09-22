/**
 * Created by Administrator on 2016/9/22.
 */
function waitTime(self,wait,backFn) {
    self.setAttribute("disabled", true);
    self.style.backgroundColor = '#888';
    self.time = setInterval(function () {
        if (wait === 0) {
            if (backFn){
                backFn();
            }
            self.removeAttribute("disabled");
            self.style.backgroundColor = '#1a9bd2';
            self.innerText = '下线';
            clearInterval(self.time)
        }
        else {
            wait--;
            self.innerText = '下线(' + wait + ')';
        }

    }, 1000);
}
