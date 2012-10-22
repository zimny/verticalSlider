/**
 * User: Zimny
 * URL: http://github.com/zimny/verticalSlider/
 * Date: 21.10.12
 * Time: 18:16
 */
(function ($, window, undefined) {
    $.fn.vs = function () {
        var pThrow = function (msg) {
            throw new Error(msg);
        }

        if ((typeof this === "undefined" || !(this instanceof jQuery) || this.length == 0)) {
            pThrow("Invalid slider");
        }

        if (Array.prototype.slice.call(arguments).length > 2) {
            pThrow("Too many arguments");
        }

        var _slider = this;
        var _boxBottom = arguments[0];
        var _ANIMATE_SPEED = arguments[1] || 10;
        var originalOffsetTop = _slider.offset().top;

        var _sliderConfig = {
            REL_OFFSET_TOP:_slider.position().top,
            ABS_OFFSET_TOP:_slider.offset().top,
            height:_slider.height(),
            offsetLeft:_slider.position().left,
            scrollTop:$(window).scrollTop()
        }
        var _boxBottomConfig = {
            ABS_OFFSET_TOP:_boxBottom.length !== 0 ? _boxBottom.offset().top - _boxBottom.css("margin-top").replace("px", "") : $(document).height()
        }
        var updatePosition = function () {
            if (_sliderConfig.scrollTop >= _sliderConfig.REL_OFFSET_TOP &&
                _sliderConfig.scrollTop + _sliderConfig.height + _sliderConfig.ABS_OFFSET_TOP <= _boxBottomConfig.ABS_OFFSET_TOP) {
                _slider.animate({"top":_sliderConfig.scrollTop}, _ANIMATE_SPEED);
            }
            else if ((_sliderConfig.scrollTop + _sliderConfig.height > _boxBottomConfig.ABS_OFFSET_TOP)) {
                _slider.animate({"top":_boxBottomConfig.OFFSET_TOP - _sliderConfig.height + _sliderConfig.ABS_OFFSET_TOP}, _ANIMATE_SPEED);
            }
        }

        var updateConfig = function () {
            _sliderConfig.scrollTop = $(window).scrollTop() - _sliderConfig.ABS_OFFSET_TOP;
            _sliderConfig.height = _slider.height();
        }

        var bindEvents = function () {
            $(window).scroll(function () {
                updateConfig();
                updatePosition();
            });
            $(window).resize(function () {
                _sliderConfig.offsetLeft = _slider.position().left;
            });
        }

        this.init = function () {
            this.css({"position":"absolute"});
            this.css({"left":_sliderConfig.offsetLeft});
            bindEvents();
            return this;
        }
        return this.init();
    };
})(jQuery, window);