(function () {
    if (!$.fn.addTapEvent) {
        $.fn.addTapEvent = function (callback, isStopPropagation) {
            var tapStartTime = 0,
                tapEndTime = 0,
                tapTime = 500, //tap等待时间，在此事件下松开可触发方法
                tapStartClientX = 0,
                tapStartClientY = 0,
                tapEndClientX = 0,
                tapEndClientY = 0,
                tapScollHeight = 15, //水平或垂直方向移动超过15px测判定为取消（根据chrome浏览器默认的判断取消点击的移动量)
                cancleClick = false;
            $(this).on('touchstart', function () {
                tapStartTime = event.timeStamp;
                var touch = event.changedTouches[0];
                tapStartClientX = touch.clientX;
                tapStartClientY = touch.clientY;
                cancleClick = false;
            })
            $(this).on('touchmove', function (event) {
                var touch = event.changedTouches[0];
                tapEndClientX = touch.clientX;
                tapEndClientY = touch.clientY;
                if ((Math.abs(tapEndClientX - tapStartClientX) > tapScollHeight) || (Math.abs(tapEndClientY - tapStartClientY) > tapScollHeight)) {
                    cancleClick = true;
                }
            })
            $(this).on('touchend', function (event) {
                if (isStopPropagation) {
                    event.stopPropagation();
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
                tapEndTime = event.timeStamp;
                if (!cancleClick && (tapEndTime - tapStartTime) <= tapTime) {
                    callback.call($(this));
                }
            })
        }
    }
})()