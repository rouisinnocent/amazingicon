AmazingIcon = function (elem) {
            var amazingIcon = new AmazingIconObject(elem);
            return amazingIcon;
        }

        AmazingIcon.icons = [];

        AmazingIcon.parseDocument = function () {
            var pseudoIcons = document.querySelectorAll(".amazingIcon");
            for (var i = 0; i < pseudoIcons.length; i++) {
                var pseudoIcon = pseudoIcons[i];
                var amazing = new AmazingIconObject(pseudoIcon);
            }
        }

        AmazingIcon.add = function (icon) {
            this.icons.push(icon);
        }

        AmazingIcon.remove = function (icon) {
            var index = this.icons.indexOf(icon);
            this.icons.splice(index, 1);
        }

        AmazingIcon.get = function (index) {
            return this.icons[index];
        }

        AmazingIcon.getByLabel = function (label) {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                var iconLabel = icon.label.toLowerCase();
                var label = label.toLowerCase();
                if ( iconLabel == label )
                    return icon;
            }
            return null;
        }

        AmazingIcon.getByOrigin = function (originalLabel) {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                var iconOriginalLabel = icon.originalLabel.toLowerCase();
                var originalLabel = originalLabel.toLowerCase();
                if ( originalLabel == originalLabel )
                    return icon;
            }
            return null;
        }

        AmazingIcon.getByLabelID = function (labelID) {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                var iconLabelID = icon.label.split(" ").join("").toLowerCase();
                var labelID = labelID.toLowerCase();
                if (iconLabelID == labelID)
                    return icon;
            }
            return null;
        }

        AmazingIcon.hover = function (func) {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                icon.hover(func);
            }
        }

        AmazingIcon.unhover = function (func) {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                icon.unhover(func);
            }
        }

        AmazingIcon.click = function (func) {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                icon.click(func);
            }
        }

        function AmazingIconObject(anchor) {
            AmazingIcon.add(this);
            this.anchor = document.createElement("a");
            this.img = new Image();
            this.img.src = anchor.dataset.src;
            this.originalSrc = anchor.dataset.src;
            this.class = "amazingIconObject";
            this.label = anchor.innerHTML;
            this.originalLabel = this.label;
            this.width = this.img.width + "px";
            this.height = this.img.height + "px";
            this.href = anchor.href;
            this.originalHref = this.href;
            this.events = {};

            this.replace(anchor, this.anchor);
            this.fillElement();
        }


        AmazingIconObject.prototype.replace = function (node1, node2) {
            var parent = node1.parentNode;
            var next = node1.nextSibling;
            parent.removeChild(node1);
            if (next)
                parent.insertBefore(node2, next);
            else
                parent.appendChild(node2);
        }

        AmazingIconObject.prototype.fillElement = function () {
            var labelElement = this.labelElement = document.createElement("div");
            labelElement.innerHTML = this.label;
            var anchor = this.anchor;
            anchor.innerHTML = "";
            anchor.setAttribute("href", this.href);
            anchor.className = this.class;
            anchor.appendChild(this.img);
            anchor.appendChild(this.labelElement);
        }

        AmazingIconObject.prototype.setHref = function (url) {
            this.href = url;
            this.anchor.setAttribute("href", url);
        }

        AmazingIconObject.prototype.resetHref = function () {
            this.setHref(this.originalHref);
        }

        AmazingIconObject.prototype.setLabel = function (text) {
            this.label = text;
            this.labelElement.innerHTML = text;
            return this;
        }

        AmazingIconObject.prototype.resetLabel = function () {
            this.setLabel(this.originalLabel);
        }

        AmazingIconObject.prototype.setColor = function (inputColor) {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.setAttribute("width", this.img.width); //We use setAttribute because canvas.width doesn't work (canvas is not attached).
            canvas.setAttribute("height", this.img.height);
            context.drawImage(this.img, 0, 0);
            var dataObject = context.getImageData(0, 0, canvas.width, canvas.height);
            var data = dataObject.data;
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i],
                    g = data[i + 1],
                    b = data[i + 2],
                    a = data[i + 3];
                var notTransparent = a != 0;
                if (notTransparent) {

                    var color = tinycolor({
                        r: r,
                        g: g,
                        b: b
                    });

                    var input = tinycolor(inputColor);
                    var rgb = input.toRgb();
                    data[i] = rgb.r;
                    data[i + 1] = rgb.g;
                    data[i + 2] = rgb.b;
                    data[i + 3] = a;
                }
            }
            context.putImageData(dataObject, 0, 0);
            this.img.src = canvas.toDataURL();
            return this;
        }

        AmazingIconObject.prototype.resetColor = function () {
            this.setColor(this.color);
        }

        AmazingIconObject.prototype.setEvent = function (evName, func) {
            this.delEvent(evName);
            var evFunc = function (ev) {
                this.reset();
                func(this, ev);
            }.bind(this);
            this.events[evName] = evFunc;
            this.anchor.addEventListener(evName, evFunc);
        }

        AmazingIconObject.prototype.delEvent = function (evName) {
            var ev = this.events[evName];
            if (ev) {
                this.anchor.removeEventListener(evName, ev);
                delete this.events[evName];
                return true;
            } else
                return false;
        }

        AmazingIconObject.prototype.resetSrc = function () {
            this.img.src = this.originalSrc;
        }

        AmazingIconObject.prototype.reset = function () {
            this.resetLabel();
            this.resetSrc();
            this.resetHref();
        }

        AmazingIconObject.prototype.del = function () {
            var anchor = this.anchor;
            anchor.parentNode.removeChild(anchor);
            AmazingIcon.remove(this);
        }

        AmazingIconObject.prototype.hover = function (func) {
            var reset = this.reset.bind(this);
            if (func == "reset")
                var func = reset;
            this.setEvent("mouseover", func);
        }

        AmazingIconObject.prototype.unhover = function (func) {
            var reset = this.reset.bind(this);
            if (func == "reset")
                var func = reset;
            this.setEvent("mouseleave", func);
        }

        AmazingIconObject.prototype.click = function (func) {
            var reset = this.reset.bind(this);
            if (func == "reset")
                var func = reset;
            this.setEvent("mousedown", func);
            this.setEvent("mouseup", function (icon, ev) {
                if (this.events.mouseover)
                    this.events.mouseover(icon, ev);
            }.bind(this));
        }
