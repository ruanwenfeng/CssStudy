/**
 * Created by Administrator on 2017/6/15.
 */
window.DATA = [
    {'name':'淤青','singer':'刘昊霖','time':'03:32'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'},
    {'name':'歌曲名称','singer':'演唱者','time':'03:25'}
];
function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!==null) offset+=getTop(e.offsetParent);
    return offset;
}
function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!==null) offset+=getLeft(e.offsetParent);
    return offset;
}
(function () {
    window.App = function (id) {
        this.wrap = document.getElementById(id);
        this.status = false;
        if(this.wrap){
            this.footerTitle = this.wrap.getElementsByClassName('footer-right-title')[0];
            this.footerBody = this.wrap.getElementsByClassName('footer-right-body')[0];
            this.lisBody = this.wrap.getElementsByClassName('body')[0];
            if(this.lisBody){
                this.lisData = this.lisBody.getElementsByTagName('ul')[0];
            }
        }
        this.voice = 40;
    };
    window.App.prototype = {
        init:function (data) {
            this.loadlist(data);
            this.bindEvent();
        },
        loadlist:function (data) {
            var footerTitle = this.footerTitle;
            var lisData = this.lisData;
            var _this = this;
            lisData && _.chain(data).map(function (item , index/*, source*/) {
                var li = _this.getItemDom(item,index);
                li.addEventListener('click',function () {
                    var active = lisData.getElementsByClassName('active')[0];
                    active && active.classList.remove('active');
                    this.classList.add('active');
                    if(footerTitle){
                        var p = footerTitle.getElementsByTagName('p');
                        if(p.length !== 3 ){
                            console.error('Something wrong');
                            return;
                        }
                        var index = this.dataset['index'];
                        var data = window.DATA[index];
                        _this.activeData = {data:data,index:index};
                        p[0].innerText = data['name'];
                        p[1].innerText = data['singer'];
                        p[2].innerText = data['time'];
                    }
                });
                lisData.appendChild(li);
            }).value();
        },
        getItemDom:function (item,index) {
            var li = document.createElement('li');
            li.dataset['index'] = index;
            //歌曲名称
            var strong = document.createElement('strong');
            strong.innerText = item['name'];
            li.appendChild(strong);
            //演唱者
            strong = document.createElement('strong');
            strong.innerText = item['singer'];
            li.appendChild(strong);
            //时间
            strong = document.createElement('strong');
            strong.innerText = item['time'];
            li.appendChild(strong);
            return li;
        },
        play:function (data) {
            if(typeof data === 'object'){
                
            }else if(typeof data === 'number'){

            }
        },
        bindEvent:function () {
            var _this = this;
            if(this.footerBody){
                var control = this.footerBody.getElementsByTagName('span');
                this.controls = control;
                if(control && control.length >= 3){
                    control[0].addEventListener('click',function () {

                    });
                    control[1].addEventListener('click',function () {
                        if(_this.status){
                            this.classList.remove('icon-pause');
                            this.classList.add('icon-play');
                        }else{
                            this.classList.remove('icon-play');
                            this.classList.add('icon-pause');
                        }
                        _this.status = !_this.status;
                    });
                    control[2].addEventListener('click',function () {

                    });
                    control[3].addEventListener('click',function () {
                        if(_.indexOf(this.classList, 'icon-volume-off')>-1){
                            _this.setVoice(_this.voice,false);
                        }else{
                            _this.setVoice(0,false);
                        }
                    });
                    control[4].addEventListener('click',function (event) {
                        _this.setVoice(event.offsetX,true);
                    });
                    control[6].addEventListener('click',function (event) {
                       event.stopPropagation();
                    });
                    control[6].addEventListener('mousedown',function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                        if(event.button === 0 ){
                            document.onmousemove = function (event) {
                                event.preventDefault();
                                var left=(event.clientX).toFixed(0) -(getLeft(control[4])-200);
                                _this.setVoice(left,true);
                            };
                        }
                    });
                }
            }
        },
        setVoice:function (X,flag) {
            if(typeof X !== 'number')
                return;
            var control = this.controls;
            control[5].style.width = X + 'px';
            control[6].style.left = X + 'px';
            if(X<=0){
                control[5].style.width = 0;
                control[6].style.left = 0;
                control[3].classList.remove('icon-volume-up');
                control[3].classList.remove('icon-volume-down');
                control[3].classList.add('icon-volume-off');
                flag && (this.voice = 0);
            }else{
                control[3].classList.remove('icon-volume-off');
                flag && (this.voice = X);
                if(X<=50){
                    control[3].classList.remove('icon-volume-up');
                    control[3].classList.add('icon-volume-down');

                }else{
                    control[3].classList.remove('icon-volume-down');
                    control[3].classList.add('icon-volume-up');
                    if(X>=94){
                        control[5].style.width = 100 + 'px';
                        control[6].style.left = 94 +'px';
                        flag && (this.voice = 100);
                    }
                }
            }
        }
    }
})();
(function () {
    //移动
//        document.addEventListener('dragover',function (event) {
//            event.preventDefault();
//        });
//        var wrap = document.getElementById('content-wrap');
//        var oldOffset  = null;
//        wrap.addEventListener('dragstart',function (event) {
//            oldOffset = {X:event.offsetX,Y:event.offsetY};
//        });
//        wrap.addEventListener('dragend',function (event) {
//            this.style.top = this.offsetTop + (event.offsetY - oldOffset.Y) + 'px';
//            this.style.left = this.offsetLeft + (event.offsetX - oldOffset.X) + 'px';
//        });
    //移动
    var wrap = document.getElementById('content-wrap');
    var drag = document.getElementById('drag-area');
    drag.addEventListener('mousedown',function (event) {
        var oldOffset = {X:event.offsetX,Y:event.offsetY};
        if(event.button === 0){
            this.style.cursor = 'move';
            drag.onmousemove = function (event) {
                wrap.style.top = wrap.offsetTop + (event.offsetY - oldOffset.Y) + 'px';
                wrap.style.left = wrap.offsetLeft + (event.offsetX - oldOffset.X) + 'px';
            }
        }
    });
    drag.addEventListener('mouseup',function () {
        drag.onmousemove = null;
        drag.style.cursor = 'default';
    });
    document.addEventListener('mouseup',function () {
        document.onmousemove = null;
    });
    var app = new window.App('content-wrap');
    app.init(window.DATA);
    window.a =app;
})();

