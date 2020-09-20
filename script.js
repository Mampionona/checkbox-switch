$(function () {
    $.fn.switch = function (options) {
        /**
         * Options :
         * color [String] default ""
         * onChange [Function] default null
         */
        return this.each(function () {
            if (this.type !== "checkbox") {
                return;
            }

            var defaults = {};
            var textOn = $(this).data("text-on");
            var textOff = $(this).data("text-off");

            $(this).removeAttr("data-text-on data-text-off");
            $(this).wrap("<div><label class=\"cxp-switch\"></label></div>");

            defaults.onChange = null;
            defaults.color = "";

            options = $.extend(defaults, options);

            var container = $(this).closest("div");
            var slider = $("<span/>");
            var labelClassName = "cxp-switch-label";
            var labelOn = $("<span/>").addClass(labelClassName + " cxp-switch-on-label");
            var labelOff = $("<span/>").addClass(labelClassName + " cxp-switch-off-label");
            var sliderClassNames = ["slider", "round"];
            var checkedClassName = "is-checked";

            if (options.color === "blue") {
                sliderClassNames.push("slider-" + options.color);
            }

            slider.addClass(sliderClassNames.join(" "));
            slider.insertAfter($(this));
            container.addClass("cxp-switch-container");
            labelOn.text(textOn).prependTo(container);
            labelOff.text(textOff).appendTo(container);

            function addContainerClass() {
                container.addClass(checkedClassName);
            };

            this.checked && addContainerClass();

            $(document).on("change", this, function (e) {
                if (e.target.checked) {
                    addContainerClass();
                } else {
                    container.removeClass(checkedClassName);
                }

                if (typeof options.onChange === "function") {
                    options.onChange(e);
                }
            });
        });
    };

    $(":checkbox").switch({
        // color: "blue",
        onChange: function (e) {
            console.log(e);
        }
    });
});
