/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
/*jslint unparam: true, browser: true, indent: 2 */
(function() {
	Array.prototype.filter || (Array.prototype.filter = function(e) {
		"use strict";
		if (this == null) throw new TypeError;
		var t = Object(this),
			n = t.length >>> 0;
		if (typeof e != "function") try {
			throw new TypeError
		} catch (r) {
			return
		}
		var i = [],
			s = arguments[1];
		for (var o = 0; o < n; o++) if (o in t) {
			var u = t[o];
			e && e.call(s, u, o, t) && i.push(u)
		}
		return i
	}, Function.prototype.bind || (Function.prototype.bind = function(e) {
		if (typeof this != "function") throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		var t = Array.prototype.slice.call(arguments, 1),
			n = this,
			r = function() {}, i = function() {
				return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
			};
		return r.prototype = this.prototype, i.prototype = new r, i
	})), $.fn.stop = $.fn.stop || function() {
		return this
	}
})(),
function(e, t, n) {
	"use strict";
	e.Foundation = {
		name: "Foundation",
		version: "4.0.0",
		cache: {},
		init: function(e, t, n, r, i, s) {
			var o, u = [e, n, r, i],
				a = [],
				s = s || !1;
			s && (this.nc = s), this.scope = e || this.scope;
			if (t && typeof t == "string") {
				if (/off/i.test(t)) return this.off();
				o = t.split(" ");
				if (o.length > 0) for (var f = o.length - 1; f >= 0; f--) a.push(this.init_lib(o[f], u))
			} else for (var l in this.libs) a.push(this.init_lib(l, u));
			return typeof t == "function" && u.unshift(t), this.response_obj(a, u)
		},
		response_obj: function(e, t) {
			for (var n in t) if (typeof t[n] == "function") return t[n]({
				errors: e.filter(function(e) {
					if (typeof e == "string") return e
				})
			});
			return e
		},
		init_lib: function(e, t) {
			return this.trap(function() {
				if (this.libs.hasOwnProperty(e)) return this.patch(this.libs[e]), this.libs[e].init.apply(this.libs[e], t)
			}.bind(this), e)
		},
		trap: function(e, t) {
			if (!this.nc) try {
				return e()
			} catch (n) {
				return this.error({
					name: t,
					message: "could not be initialized",
					more: n.name + " " + n.message
				})
			}
			return e()
		},
		patch: function(e) {
			this.fix_outer(e)
		},
		inherit: function(e, t) {
			var n = t.split(" ");
			for (var r = n.length - 1; r >= 0; r--) this.lib_methods.hasOwnProperty(n[r]) && (this.libs[e.name][n[r]] = this.lib_methods[n[r]])
		},
		libs: {},
		lib_methods: {
			set_data: function(e, t) {
				var n = this.name + +(new Date);
				Foundation.cache[n] = t, e.attr("data-" + this.name + "-id", n)
			},
			get_data: function(e) {
				return Foundation.cache[e.attr("data-" + this.name + "-id")]
			},
			remove_data: function(e) {
				e ? (delete Foundation.cache[e.attr("data-" + this.name + "-id")], e.attr("data-" + this.name + "-id", "")) : $("[data-" + this.name + "-id]")
					.each(function() {
					delete Foundation.cache[$(this)
						.attr("data-" + this.name + "-id")], $(this)
						.attr("data-" + this.name + "-id", "")
				})
			},
			throttle: function(e, t) {
				var n = null;
				return function() {
					var r = this,
						i = arguments;
					clearTimeout(n), n = setTimeout(function() {
						e.apply(r, i)
					}, t)
				}
			},
			data_options: function(e) {
				function o(e) {
					return typeof e == "string" ? $.trim(e) : e
				}
				var t = {}, n, r, i = (e.attr("data-options") || ":")
					.split(";"),
					s = i.length;
				for (n = s - 1; n >= 0; n--) r = i[n].split(":"), /true/i.test(r[1]) && (r[1] = !0), /false/i.test(r[1]) && (r[1] = !1), r.length === 2 && (t[o(r[0])] = o(r[1]));
				return t
			},
			delay: function(e, t) {
				return setTimeout(e, t)
			},
			scrollTo: function(t, n, r) {
				if (r < 0) return;
				var i = n - $(e)
					.scrollTop(),
					s = i / r * 10;
				this.scrollToTimerCache = setTimeout(function() {
					isNaN(parseInt(s, 10)) || (e.scrollTo(0, $(e)
						.scrollTop() + s), this.scrollTo(t, n, r - 10))
				}.bind(this), 10)
			},
			scrollLeft: function(e) {
				if (!e.length) return;
				return "scrollLeft" in e[0] ? e[0].scrollLeft : e[0].pageXOffset
			},
			empty: function(e) {
				if (e.length && e.length > 0) return !1;
				if (e.length && e.length === 0) return !0;
				for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
				return !0
			}
		},
		fix_outer: function(e) {
			e.outerHeight = function(e, t) {
				return typeof Zepto == "function" ? e.height() : typeof t != "undefined" ? e.outerHeight(t) : e.outerHeight()
			}, e.outerWidth = function(e) {
				return typeof Zepto == "function" ? e.width() : typeof bool != "undefined" ? e.outerWidth(bool) : e.outerWidth()
			}
		},
		error: function(e) {
			return e.name + " " + e.message + "; " + e.more
		},
		off: function() {
			return $(this.scope)
				.off(".fndtn"), $(e)
				.off(".fndtn"), !0
		},
		zj: function() {
			try {
				return Zepto
			} catch (e) {
				return jQuery
			}
		}()
	}, $.fn.foundation = function() {
		var e = Array.prototype.slice.call(arguments, 0);
		return this.each(function() {
			return Foundation.init.apply(Foundation, [this].concat(e)), this
		})
	}
}(this, this.document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.dropdown = {
		name: "dropdown",
		version: "4.0.0",
		settings: {
			activeClass: "open"
		},
		init: function(t, n, r) {
			return this.scope = t || this.scope, Foundation.inherit(this, "throttle"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
		},
		events: function() {
			var n = this;
			e(this.scope)
				.on("click.fndtn.dropdown", "[data-dropdown]", function(t) {
				t.preventDefault(), t.stopPropagation(), n.toggle(e(this))
			}), e("*, html, body")
				.on("click.fndtn.dropdown", function(t) {
				e(t.target)
					.data("dropdown") || e("[data-dropdown-content]")
					.css("left", "-99999px")
					.removeClass(n.settings.activeClass)
			}), e("[data-dropdown-content]")
				.on("click.fndtn.dropdown", function(e) {
				e.stopPropagation()
			}), e(t)
				.on("resize.fndtn.dropdown", n.throttle(function() {
				n.resize.call(n)
			}, 50))
				.trigger("resize"), this.settings.init = !0
		},
		toggle: function(t, n) {
			var r = e("#" + t.data("dropdown"));
			e("[data-dropdown-content]")
				.not(r)
				.css("left", "-99999px"), r.hasClass(this.settings.activeClass) ? r.css("left", "-99999px")
				.removeClass(this.settings.activeClass) : this.css(r.addClass(this.settings.activeClass), t)
		},
		resize: function() {
			var t = e("[data-dropdown-content].open"),
				n = e("[data-dropdown='" + t.attr("id") + "']");
			t.length && n.length && this.css(t, n)
		},
		css: function(e, t) {
			var n = t.offset();
			return this.small() ? e.css({
				position: "absolute",
				width: "95%",
				left: "2.5%",
				"max-width": "none",
				top: n.top + this.outerHeight(t)
			}) : e.attr("style", "")
				.css({
				position: "absolute",
				top: n.top + this.outerHeight(t),
				left: n.left
			}), e
		},
		small: function() {
			return e(t)
				.width() < 768 || e("html")
				.hasClass("lt-ie9")
		},
		off: function() {
			e(this.scope)
				.off(".fndtn.dropdown"), e("html, body")
				.off(".fndtn.dropdown"), e(t)
				.off(".fndtn.dropdown"), e("[data-dropdown-content]")
				.off(".fndtn.dropdown"), this.settings.init = !1
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.alerts = {
		name: "alerts",
		version: "4.0.0",
		settings: {
			speed: 300,
			callback: function() {}
		},
		init: function(t, n, r) {
			return this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
		},
		events: function() {
			var t = this;
			e(this.scope)
				.on("click.fndtn.alerts", "[data-alert] a.close", function(n) {
				n.preventDefault(), e(this)
					.closest("[data-alert]")
					.fadeOut(t.speed, function() {
					e(this)
						.remove(), t.settings.callback()
				})
			}), this.settings.init = !0
		},
		off: function() {
			e(this.scope)
				.off(".fndtn.alerts")
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.clearing = {
		name: "clearing",
		version: "4.0.0",
		settings: {
			templates: {
				viewing: '<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-left"><span></span></a><a href="#" class="clearing-main-right"><span></span></a></div>'
			},
			close_selectors: ".clearing-close",
			init: !1,
			locked: !1
		},
		init: function(t, n, r) {
			return this.scope = this.scope || t, Foundation.inherit(this, "set_data get_data remove_data throttle"), typeof n == "object" && (r = e.extend(!0, this.settings, n)), typeof n != "string" ? (e(this.scope)
				.find("ul[data-clearing]")
				.each(function() {
				var t = Foundation.libs.clearing,
					n = e(this),
					r = r || {}, i = t.get_data(n);
				i || (r.$parent = n.parent(), t.set_data(n, e.extend(!0, t.settings, r)), t.assemble(n.find("li")), t.settings.init || t.events()
					.swipe_events())
			}), this.settings.init) : this[n].call(this, r)
		},
		events: function() {
			var n = this;
			return e(this.scope)
				.on("click.fndtn.clearing", "ul[data-clearing] li", function(t, r, i) {
				var r = r || e(this),
					i = i || r,
					s = n.get_data(r.parent());
				t.preventDefault(), s || n.init(), n.open(e(t.target), r, i), n.update_paddles(i)
			})
				.on("click.fndtn.clearing", ".clearing-main-right", function(e) {
				this.nav(e, "next")
			}.bind(this))
				.on("click.fndtn.clearing", ".clearing-main-left", function(e) {
				this.nav(e, "prev")
			}.bind(this))
				.on("click.fndtn.clearing", this.settings.close_selectors, function(e) {
				Foundation.libs.clearing.close(e, this)
			})
				.on("keydown.fndtn.clearing", function(e) {
				this.keydown(e)
			}.bind(this)), e(t)
				.on("resize.fndtn.clearing", function(e) {
				this.resize()
			}.bind(this)), this.settings.init = !0, this
		},
		swipe_events: function() {
			var t = this;
			e(this.scope)
				.on("touchstart.fndtn.clearing", ".visible-img", function(t) {
				var n = {
					start_page_x: t.touches[0].pageX,
					start_page_y: t.touches[0].pageY,
					start_time: (new Date)
						.getTime(),
					delta_x: 0,
					is_scrolling: r
				};
				e(this)
					.data("swipe-transition", n), t.stopPropagation()
			})
				.on("touchmove.fndtn.clearing", ".visible-img", function(n) {
				if (n.touches.length > 1 || n.scale && n.scale !== 1) return;
				var r = e(this)
					.data("swipe-transition");
				typeof r == "undefined" && (r = {}), r.delta_x = n.touches[0].pageX - r.start_page_x, typeof r.is_scrolling == "undefined" && (r.is_scrolling = !! (r.is_scrolling || Math.abs(r.delta_x) < Math.abs(n.touches[0].pageY - r.start_page_y)));
				if (!r.is_scrolling && !r.active) {
					n.preventDefault();
					var i = r.delta_x < 0 ? "next" : "prev";
					r.active = !0, t.nav(n, i)
				}
			})
				.on("touchend.fndtn.clearing", ".visible-img", function(t) {
				e(this)
					.data("swipe-transition", {}), t.stopPropagation()
			})
		},
		assemble: function(e) {
			var t = e.parent(),
				n = this.get_data(t),
				r = t.detach(),
				i = {
					grid: '<div class="carousel">' + this.outerHTML(r[0]) + "</div>",
					viewing: n.templates.viewing
				}, s = '<div class="clearing-assembled"><div>' + i.viewing + i.grid + "</div></div>";
			return n.$parent.append(s)
		},
		open: function(e, t, n) {
			var r = n.closest(".clearing-assembled"),
				i = r.find("div")
					.first(),
				s = i.find(".visible-img"),
				o = s.find("img")
					.not(e);
			this.locked() || (o.attr("src", this.load(e)), this.loaded(o, function() {
				r.addClass("clearing-blackout"), i.addClass("clearing-container"), s.show(), this.fix_height(n)
					.caption(s.find(".clearing-caption"), e)
					.center(o)
					.shift(t, n, function() {
					n.siblings()
						.removeClass("visible"), n.addClass("visible")
				})
			}.bind(this)))
		},
		close: function(t, n) {
			t.preventDefault();
			var r = function(e) {
				return /blackout/.test(e.selector) ? e : e.closest(".clearing-blackout")
			}(e(n)),
				i, s;
			return n === t.target && r && (i = r.find("div")
				.first(), s = i.find(".visible-img"), this.settings.prev_index = 0, r.find("ul[data-clearing]")
				.attr("style", "")
				.closest(".clearing-blackout")
				.removeClass("clearing-blackout"), i.removeClass("clearing-container"), s.hide()), !1
		},
		keydown: function(t) {
			var n = e(".clearing-blackout")
				.find("ul[data-clearing]");
			t.which === 39 && this.go(n, "next"), t.which === 37 && this.go(n, "prev"), t.which === 27 && e("a.clearing-close")
				.trigger("click")
		},
		nav: function(t, n) {
			var r = e(".clearing-blackout")
				.find("ul[data-clearing]");
			t.preventDefault(), this.go(r, n)
		},
		resize: function() {
			var t = e(".clearing-blackout .visible-img")
				.find("img");
			t.length && this.center(t)
		},
		fix_height: function(t) {
			var n = t.parent()
				.children(),
				r = this;
			return n.each(function() {
				var t = e(this),
					n = t.find("img");
				t.height() > r.outerHeight(n) && t.addClass("fix-height")
			})
				.closest("ul")
				.width(n.length * 100 + "%"), this
		},
		update_paddles: function(e) {
			var t = e.closest(".carousel")
				.siblings(".visible-img");
			e.next()
				.length ? t.find(".clearing-main-right")
				.removeClass("disabled") : t.find(".clearing-main-right")
				.addClass("disabled"), e.prev()
				.length ? t.find(".clearing-main-left")
				.removeClass("disabled") : t.find(".clearing-main-left")
				.addClass("disabled")
		},
		center: function(e) {
			return e.css({
				marginLeft: -(this.outerWidth(e) / 2),
				marginTop: -(this.outerHeight(e) / 2)
			}), this
		},
		load: function(e) {
			var t = e.parent()
				.attr("href");
			return this.preload(e), t ? t : e.attr("src")
		},
		preload: function(e) {
			this.img(e.closest("li")
				.next())
				.img(e.closest("li")
				.prev())
		},
		loaded: function(e, t) {
			function n() {
				t()
			}
			function r() {
				this.one("load", n);
				if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
					var e = this.attr("src"),
						t = e.match(/\?/) ? "&" : "?";
					t += "random=" + (new Date)
						.getTime(), this.attr("src", e + t)
				}
			}
			if (!e.attr("src")) {
				n();
				return
			}
			this.complete || this.readyState === 4 ? n() : r.call(e)
		},
		img: function(e) {
			if (e.length) {
				var t = new Image,
					n = e.find("a");
				n.length ? t.src = n.attr("href") : t.src = e.find("img")
					.attr("src")
			}
			return this
		},
		caption: function(e, t) {
			var n = t.data("caption");
			return n ? e.text(n)
				.show() : e.text("")
				.hide(), this
		},
		go: function(e, t) {
			var n = e.find(".visible"),
				r = n[t]();
			r.length && r.find("img")
				.trigger("click", [n, r])
		},
		shift: function(e, t, n) {
			var r = t.parent(),
				i = this.settings.prev_index || t.index(),
				s = this.direction(r, e, t),
				o = parseInt(r.css("left"), 10),
				u = this.outerWidth(t),
				a;
			t.index() !== i && !/skip/.test(s) ? /left/.test(s) ? (this.lock(), r.animate({
				left: o + u
			}, 300, this.unlock())) : /right/.test(s) && (this.lock(), r.animate({
				left: o - u
			}, 300, this.unlock())) : /skip/.test(s) && (a = t.index() - this.settings.up_count, this.lock(), a > 0 ? r.animate({
				left: -(a * u)
			}, 300, this.unlock()) : r.animate({
				left: 0
			}, 300, this.unlock())), n()
		},
		direction: function(t, n, r) {
			var i = t.find("li"),
				s = this.outerWidth(i) + this.outerWidth(i) / 4,
				o = Math.floor(this.outerWidth(e(".clearing-container")) / s) - 1,
				u = i.index(r),
				a;
			return this.settings.up_count = o, this.adjacent(this.settings.prev_index, u) ? u > o && u > this.settings.prev_index ? a = "right" : u > o - 1 && u <= this.settings.prev_index ? a = "left" : a = !1 : a = "skip", this.settings.prev_index = u, a
		},
		adjacent: function(e, t) {
			for (var n = t + 1; n >= t - 1; n--) if (n === e) return !0;
			return !1
		},
		lock: function() {
			this.settings.locked = !0
		},
		unlock: function() {
			this.settings.locked = !1
		},
		locked: function() {
			return this.settings.locked
		},
		outerHTML: function(e) {
			return e.outerHTML || (new XMLSerializer)
				.serializeToString(e)
		},
		off: function() {
			e(this.scope)
				.off(".fndtn.clearing"), e(t)
				.off(".fndtn.clearing"), this.remove_data(), this.settings.init = !1
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n) {
	function f(e) {
		var t = {}, r = /^jQuery\d+$/;
		return n.each(e.attributes, function(e, n) {
			n.specified && !r.test(n.name) && (t[n.name] = n.value)
		}), t
	}
	function l(e, r) {
		var i = this,
			s = n(i);
		if (i.value == s.attr("placeholder") && s.hasClass("placeholder")) if (s.data("placeholder-password")) {
			s = s.hide()
				.next()
				.show()
				.attr("id", s.removeAttr("id")
				.data("placeholder-id"));
			if (e === !0) return s[0].value = r;
			s.focus()
		} else i.value = "", s.removeClass("placeholder"), i == t.activeElement && i.select()
	}
	function c() {
		var e, t = this,
			r = n(t),
			i = r,
			s = this.id;
		if (t.value == "") {
			if (t.type == "password") {
				if (!r.data("placeholder-textinput")) {
					try {
						e = r.clone()
							.attr({
							type: "text"
						})
					} catch (o) {
						e = n("<input>")
							.attr(n.extend(f(this), {
							type: "text"
						}))
					}
					e.removeAttr("name")
						.data({
						"placeholder-password": !0,
						"placeholder-id": s
					})
						.bind("focus.placeholder", l), r.data({
						"placeholder-textinput": e,
						"placeholder-id": s
					})
						.before(e)
				}
				r = r.removeAttr("id")
					.hide()
					.prev()
					.attr("id", s)
					.show()
			}
			r.addClass("placeholder"), r[0].value = r.attr("placeholder")
		} else r.removeClass("placeholder")
	}
	var r = "placeholder" in t.createElement("input"),
		i = "placeholder" in t.createElement("textarea"),
		s = n.fn,
		o = n.valHooks,
		u, a;
	r && i ? (a = s.placeholder = function() {
		return this
	}, a.input = a.textarea = !0) : (a = s.placeholder = function() {
		var e = this;
		return e.filter((r ? "textarea" : ":input") + "[placeholder]")
			.not(".placeholder")
			.bind({
			"focus.placeholder": l,
			"blur.placeholder": c
		})
			.data("placeholder-enabled", !0)
			.trigger("blur.placeholder"), e
	}, a.input = r, a.textarea = i, u = {
		get: function(e) {
			var t = n(e);
			return t.data("placeholder-enabled") && t.hasClass("placeholder") ? "" : e.value
		},
		set: function(e, r) {
			var i = n(e);
			return i.data("placeholder-enabled") ? (r == "" ? (e.value = r, e != t.activeElement && c.call(e)) : i.hasClass("placeholder") ? l.call(e, !0, r) || (e.value = r) : e.value = r, i) : e.value = r
		}
	}, r || (o.input = u), i || (o.textarea = u), n(function() {
		n(t)
			.delegate("form", "submit.placeholder", function() {
			var e = n(".placeholder", this)
				.each(l);
			setTimeout(function() {
				e.each(c)
			}, 10)
		})
	}), n(e)
		.bind("beforeunload.placeholder", function() {
		n(".placeholder")
			.each(function() {
			this.value = ""
		})
	}))
}(this, document, Foundation.zj),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.forms = {
		name: "forms",
		version: "4.0.4",
		settings: {
			disable_class: "no-custom"
		},
		init: function(t, n, r) {
			return this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.assemble(), this.settings.init) : this[n].call(this, r)
		},
		assemble: function() {
			e('form.custom input[type="radio"]')
				.not('[data-customforms="disabled"]')
				.each(this.append_custom_markup), e('form.custom input[type="checkbox"]')
				.not('[data-customforms="disabled"]')
				.each(this.append_custom_markup), e("form.custom select")
				.not('[data-customforms="disabled"]')
				.each(this.append_custom_select)
		},
		events: function() {
			var t = this;
			e(this.scope)
				.on("click.fndtn.forms", "form.custom span.custom.checkbox", function(n) {
				n.preventDefault(), n.stopPropagation(), t.toggle_checkbox(e(this))
			})
				.on("click.fndtn.forms", "form.custom span.custom.radio", function(n) {
				n.preventDefault(), n.stopPropagation(), t.toggle_radio(e(this))
			})
				.on("change.fndtn.forms", 'form.custom select:not([data-customforms="disabled"])', function(n) {
				t.refresh_custom_select(e(this))
			})
				.on("click.fndtn.forms", "form.custom label", function(n) {
				var r = e("#" + t.escape(e(this)
					.attr("for")) + ':not([data-customforms="disabled"])'),
					i, s;
				r.length !== 0 && (r.attr("type") === "checkbox" ? (n.preventDefault(), i = e(this)
					.find("span.custom.checkbox"), i.length == 0 && (i = e(this)
					.next("span.custom.checkbox")), i.length == 0 && (i = e(this)
					.prev("span.custom.checkbox")), t.toggle_checkbox(i)) : r.attr("type") === "radio" && (n.preventDefault(), s = e(this)
					.find("span.custom.radio"), s.length == 0 && (s = e(this)
					.next("span.custom.radio")), s.length == 0 && (s = e(this)
					.prev("span.custom.radio")), t.toggle_radio(s)))
			})
				.on("click.fndtn.forms", "form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector", function(n) {
				var r = e(this),
					i = r.closest("div.custom.dropdown"),
					s = i.prev();
				i.hasClass("open") || e(t.scope)
					.trigger("click"), n.preventDefault();
				if (!1 === s.is(":disabled")) return i.toggleClass("open"), i.hasClass("open") ? e(t.scope)
					.on("click.fndtn.forms.customdropdown", function() {
					i.removeClass("open"), e(t.scope)
						.off(".fndtn.forms.customdropdown")
				}) : e(t.scope)
					.on(".fndtn.forms.customdropdown"), !1
			})
				.on("click.fndtn.forms touchend.fndtn.forms", "form.custom div.custom.dropdown li", function(t) {
				var n = e(this),
					r = n.closest("div.custom.dropdown"),
					i = r.prev(),
					s = 0;
				t.preventDefault(), t.stopPropagation();
				if (!e(this)
					.hasClass("disabled")) {
					e("div.dropdown")
						.not(r)
						.removeClass("open");
					var o = n.closest("ul")
						.find("li.selected");
					o.removeClass("selected"), n.addClass("selected"), r.removeClass("open")
						.find("a.current")
						.html(n.html()), n.closest("ul")
						.find("li")
						.each(function(e) {
						n[0] == this && (s = e)
					}), i[0].selectedIndex = s, i.data("prevalue", o.html()), i.trigger("change")
				}
			}), this.settings.init = !0
		},
		append_custom_markup: function(t, n) {
			var r = e(n)
				.hide(),
				i = r.attr("type"),
				s = r.next("span.custom." + i);
			s.length === 0 && (s = e('<span class="custom ' + i + '"></span>')
				.insertAfter(r)), s.toggleClass("checked", r.is(":checked")), s.toggleClass("disabled", r.is(":disabled"))
		},
		append_custom_select: function(t, n) {
			var r = Foundation.libs.forms,
				i = e(n),
				s = i.next("div.custom.dropdown"),
				o = s.find("ul"),
				u = s.find(".current"),
				a = s.find(".selector"),
				f = i.find("option"),
				l = f.filter(":selected"),
				c = 0,
				h = "",
				p, d = !1;
			if (i.hasClass(r.settings.disable_class)) return;
			if (s.length === 0) {
				var v = i.hasClass("small") ? "small" : i.hasClass("medium") ? "medium" : i.hasClass("large") ? "large" : i.hasClass("expand") ? "expand" : "";
				s = e('<div class="' + ["custom", "dropdown", v].join(" ") + '"><a href="#" class="selector"></a><ul /></div>'), a = s.find(".selector"), o = s.find("ul"), h = f.map(function() {
					return "<li>" + e(this)
						.html() + "</li>"
				})
					.get()
					.join(""), o.append(h), d = s.prepend('<a href="#" class="current">' + l.html() + "</a>")
					.find(".current"), i.after(s)
					.hide()
			} else h = f.map(function() {
				return "<li>" + e(this)
					.html() + "</li>"
			})
				.get()
				.join(""), o.html("")
				.append(h);
			s.toggleClass("disabled", i.is(":disabled")), p = o.find("li"), f.each(function(t) {
				this.selected && (p.eq(t)
					.addClass("selected"), d && d.html(e(this)
					.html())), e(this)
					.is(":disabled") && p.eq(t)
					.addClass("disabled")
			});
			if (!s.is(".small, .medium, .large, .expand")) {
				s.addClass("open");
				var r = Foundation.libs.forms;
				r.hidden_fix.adjust(o), c = r.outerWidth(p) > c ? r.outerWidth(p) : c, Foundation.libs.forms.hidden_fix.reset(), s.removeClass("open")
			}
		},
		refresh_custom_select: function(t) {
			var n = this,
				r = 0,
				i = t.next(),
				s = t.find("option");
			i.find("ul")
				.html(""), s.each(function() {
				var t = e("<li>" + e(this)
					.html() + "</li>");
				i.find("ul")
					.append(t)
			}), s.each(function(t) {
				this.selected && (i.find("li")
					.eq(t)
					.addClass("selected"), i.find(".current")
					.html(e(this)
					.html())), e(this)
					.is(":disabled") && i.find("li")
					.eq(t)
					.addClass("disabled")
			}), i.removeAttr("style")
				.find("ul")
				.removeAttr("style"), i.find("li")
				.each(function() {
				i.addClass("open"), n.outerWidth(e(this)) > r && (r = n.outerWidth(e(this))), i.removeClass("open")
			})
		},
		toggle_checkbox: function(e) {
			var t = e.prev(),
				n = t[0];
			!1 === t.is(":disabled") && (n.checked = n.checked ? !1 : !0, e.toggleClass("checked"), t.trigger("change"))
		},
		toggle_radio: function(e) {
			var t = e.prev(),
				n = t.closest("form.custom"),
				r = t[0];
			!1 === t.is(":disabled") && (n.find('input[type="radio"][name="' + this.escape(t.attr("name")) + '"]')
				.next()
				.not(e)
				.removeClass("checked"), e.hasClass("checked") || e.toggleClass("checked"), r.checked = e.hasClass("checked"), t.trigger("change"))
		},
		escape: function(e) {
			return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
		},
		hidden_fix: {
			tmp: [],
			hidden: null,
			adjust: function(t) {
				var n = this;
				n.hidden = t.parents()
					.andSelf()
					.filter(":hidden"), n.hidden.each(function() {
					var t = e(this);
					n.tmp.push(t.attr("style")), t.css({
						visibility: "hidden",
						display: "block"
					})
				})
			},
			reset: function() {
				var t = this;
				t.hidden.each(function(n) {
					var i = e(this),
						s = t.tmp[n];
					s === r ? i.removeAttr("style") : i.attr("style", s)
				}), t.tmp = [], t.hidden = null
			}
		},
		off: function() {
			e(this.scope)
				.off(".fndtn.forms")
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n) {
	function i(e) {
		return e
	}
	function s(e) {
		return decodeURIComponent(e.replace(r, " "))
	}
	var r = /\+/g,
		o = e.cookie = function(r, u, a) {
			if (u !== n) {
				a = e.extend({}, o.defaults, a), u === null && (a.expires = -1);
				if (typeof a.expires == "number") {
					var f = a.expires,
						l = a.expires = new Date;
					l.setDate(l.getDate() + f)
				}
				return u = o.json ? JSON.stringify(u) : String(u), t.cookie = [encodeURIComponent(r), "=", o.raw ? u : encodeURIComponent(u), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
			}
			var c = o.raw ? i : s,
				h = t.cookie.split("; ");
			for (var p = 0, d = h.length; p < d; p++) {
				var v = h[p].split("=");
				if (c(v.shift()) === r) {
					var m = c(v.join("="));
					return o.json ? JSON.parse(m) : m
				}
			}
			return null
		};
	o.defaults = {}, e.removeCookie = function(t, n) {
		return e.cookie(t) !== null ? (e.cookie(t, null, n), !0) : !1
	}
}(Foundation.zj, document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.joyride = {
		name: "joyride",
		version: "4.0.0",
		defaults: {
			tipLocation: "bottom",
			nubPosition: "auto",
			scrollSpeed: 300,
			timer: 0,
			startTimerOnClick: !0,
			startOffset: 0,
			nextButton: !0,
			tipAnimation: "fade",
			pauseAfter: [],
			tipAnimationFadeSpeed: 300,
			cookieMonster: !1,
			cookieName: "joyride",
			cookieDomain: !1,
			cookieExpires: 365,
			tipContainer: "body",
			postRideCallback: function() {},
			postStepCallback: function() {},
			template: {
				link: '<a href="#close" class="joyride-close-tip">&times;</a>',
				timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
				tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
				wrapper: '<div class="joyride-content-wrapper"></div>',
				button: '<a href="#" class="small button joyride-next-tip"></a>'
			}
		},
		settings: {},
		init: function(t, n, r) {
			return this.scope = t || this.scope, Foundation.inherit(this, "throttle data_options scrollTo scrollLeft delay"), typeof n == "object" ? e.extend(!0, this.settings, this.defaults, n) : e.extend(!0, this.settings, this.defaults, r), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
		},
		events: function() {
			var n = this;
			e(this.scope)
				.on("click.joyride", ".joyride-next-tip, .joyride-modal-bg", function(e) {
				e.preventDefault(), this.settings.$li.next()
					.length < 1 ? this.end() : this.settings.timer > 0 ? (clearTimeout(this.settings.automate), this.hide(), this.show(), this.startTimer()) : (this.hide(), this.show())
			}.bind(this))
				.on("click.joyride", ".joyride-close-tip", function(e) {
				e.preventDefault(), this.end()
			}.bind(this)), e(t)
				.on("resize.fndtn.joyride", n.throttle(function() {
				e("[data-joyride]")
					.length > 0 && n.settings.$next_tip && (n.is_phone() ? n.pos_phone() : n.pos_default())
			}, 100)), this.settings.init = !0
		},
		start: function() {
			var t = this,
				n = e(this.scope)
					.find("[data-joyride]"),
				r = ["timer", "scrollSpeed", "startOffset", "tipAnimationFadeSpeed", "cookieExpires"],
				i = r.length;
			this.settings.init || this.init(), e.extend(!0, this.settings, this.data_options(n)), this.settings.$content_el = n, this.settings.body_offset = e(this.settings.tipContainer)
				.position(), this.settings.$tip_content = this.settings.$content_el.find("> li"), this.settings.paused = !1, this.settings.attempts = 0;
			for (var s = i - 1; s >= 0; s--) this.settings[r[s]] = parseInt(this.settings[r[s]], 10);
			this.settings.tipLocationPatterns = {
				top: ["bottom"],
				bottom: [],
				left: ["right", "top", "bottom"],
				right: ["left", "top", "bottom"]
			}, typeof e.cookie != "function" && (this.settings.cookieMonster = !1);
			if (!this.settings.cookieMonster || this.settings.cookieMonster && e.cookie(this.settings.cookieName) === null) this.settings.$tip_content.each(function(n) {
				t.create({
					$li: e(this),
					index: n
				})
			}), !this.settings.startTimerOnClick && this.settings.timer > 0 ? (this.show("init"), this.startTimer()) : this.show("init")
		},
		resume: function() {
			this.set_li(), this.show()
		},
		tip_template: function(t) {
			var n, r;
			return t.tip_class = t.tip_class || "", n = e(this.settings.template.tip)
				.addClass(t.tip_class), r = e.trim(e(t.li)
				.html()) + this.button_text(t.button_text) + this.settings.template.link + this.timer_instance(t.index), n.append(e(this.settings.template.wrapper)), n.first()
				.attr("data-index", t.index), e(".joyride-content-wrapper", n)
				.append(r), n[0]
		},
		timer_instance: function(t) {
			var n;
			return t === 0 && this.settings.startTimerOnClick && this.settings.timer > 0 || this.settings.timer === 0 ? n = "" : n = this.outerHTML(e(this.settings.template.timer)[0]), n
		},
		button_text: function(t) {
			return this.settings.nextButton ? (t = e.trim(t) || "Next", t = this.outerHTML(e(this.settings.template.button)
				.append(t)[0])) : t = "", t
		},
		create: function(t) {
			var n = t.$li.attr("data-button") || t.$li.attr("data-text"),
				r = t.$li.attr("class"),
				i = e(this.tip_template({
					tip_class: r,
					index: t.index,
					button_text: n,
					li: t.$li
				}));
			e(this.settings.tipContainer)
				.append(i)
		},
		show: function(t) {
			var n = null;
			this.settings.$li === r || e.inArray(this.settings.$li.index(), this.settings.pauseAfter) === -1 ? (this.settings.paused ? this.settings.paused = !1 : this.set_li(t), this.settings.attempts = 0, this.settings.$li.length && this.settings.$target.length > 0 ? (this.settings.tipSettings = e.extend(!0, this.settings, this.data_options(this.settings.$li)), this.settings.timer = parseInt(this.settings.timer, 10), this.settings.tipSettings.tipLocationPattern = this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation], /body/i.test(this.settings.$target.selector) || this.scroll_to(), this.is_phone() ? this.pos_phone(!0) : this.pos_default(!0), n = this.settings.$next_tip.find(".joyride-timer-indicator"), /pop/i.test(this.settings.tipAnimation) ? (n.width(0), thsi.settings.timer > 0 ? (this.settings.$next_tip.show(), this.delay(function() {
				n.animate({
					width: n.parent()
						.width()
				}, this.settings.timer, "linear")
			}.bind(this), this.settings.tipAnimationFadeSpeed)) : this.settings.$next_tip.show()) : /fade/i.test(this.settings.tipAnimation) && (n.width(0), this.settings.timer > 0 ? (this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)
				.show(), this.delay(function() {
				n.animate({
					width: n.parent()
						.width()
				}, this.settings.timer, "linear")
			}.bind(this), this.settings.tipAnimationFadeSpeed)) : this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)), this.settings.$current_tip = this.settings.$next_tip) : this.settings.$li && this.settings.$target.length < 1 ? this.show() : this.end()) : this.settings.paused = !0
		},
		is_phone: function() {
			return Modernizr ? Modernizr.mq("only screen and (max-width: 767px)") || e(".lt-ie9")
				.length > 0 : this.settings.$window.width() < 767 ? !0 : !1
		},
		hide: function() {
			this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip), e(".joyride-modal-bg")
				.hide(), this.settings.$current_tip.hide()
		},
		set_li: function(e) {
			e ? (this.settings.$li = this.settings.$tip_content.eq(this.settings.startOffset), this.set_next_tip(), this.settings.$current_tip = this.settings.$next_tip) : (this.settings.$li = this.settings.$li.next(), this.set_next_tip()), this.set_target()
		},
		set_next_tip: function() {
			this.settings.$next_tip = e(".joyride-tip-guide[data-index='" + this.settings.$li.index() + "']")
		},
		set_target: function() {
			var t = this.settings.$li.attr("data-class"),
				r = this.settings.$li.attr("data-id"),
				i = function() {
					return r ? e(n.getElementById(r)) : t ? e("." + t)
						.first() : e("body")
				};
			this.settings.$target = i()
		},
		scroll_to: function() {
			var n, r;
			n = e(t)
				.height() / 2, r = Math.ceil(this.settings.$target.offset()
				.top - n + this.outerHeight(this.settings.$next_tip)), r > 0 && this.scrollTo(e("html, body"), r, this.settings.scrollSpeed)
		},
		paused: function() {
			return e.inArray(this.settings.$li.index() + 1, this.settings.pauseAfter) === -1 ? !0 : !1
		},
		restart: function() {
			this.hide(), this.settings.$li = r, this.show("init")
		},
		pos_default: function(n) {
			var r = Math.ceil(e(t)
				.height() / 2),
				i = this.settings.$next_tip.offset(),
				s = this.settings.$next_tip.find(".joyride-nub"),
				o = Math.ceil(this.outerHeight(s) / 2),
				u = n || !1;
			u && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), /body/i.test(this.settings.$target.selector) ? this.settings.$li.length && this.pos_modal(s) : (this.bottom() ? (this.settings.$next_tip.css({
				top: this.settings.$target.offset()
					.top + o + this.outerHeight(this.settings.$target),
				left: this.settings.$target.offset()
					.left
			}), this.nub_position(s, this.settings.tipSettings.nubPosition, "top")) : this.top() ? (this.settings.$next_tip.css({
				top: this.settings.$target.offset()
					.top - this.outerHeight(this.settings.$next_tip) - o,
				left: this.settings.$target.offset()
					.left
			}), this.nub_position(s, this.settings.tipSettings.nubPosition, "bottom")) : this.right() ? (this.settings.$next_tip.css({
				top: this.settings.$target.offset()
					.top,
				left: this.outerWidth(this.settings.$target) + this.settings.$target.offset()
					.left
			}), this.nub_position(s, this.settings.tipSettings.nubPosition, "left")) : this.left() && (this.settings.$next_tip.css({
				top: this.settings.$target.offset()
					.top,
				left: this.settings.$target.offset()
					.left - this.outerWidth(this.settings.$next_tip) - o
			}), this.nub_position(s, this.settings.tipSettings.nubPosition, "right")), !this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tipSettings.tipLocationPattern.length && (s.removeClass("bottom")
				.removeClass("top")
				.removeClass("right")
				.removeClass("left"), this.settings.tipSettings.tipLocation = this.settings.tipSettings.tipLocationPattern[this.settings.attempts], this.settings.attempts++, this.pos_default(!0))), u && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"))
		},
		pos_phone: function(t) {
			var n = this.outerHeight(this.settings.$next_tip),
				r = this.settings.$next_tip.offset(),
				i = this.outerHeight(this.settings.$target),
				s = e(".joyride-nub", this.settings.$next_tip),
				o = Math.ceil(this.outerHeight(s) / 2),
				u = t || !1;
			s.removeClass("bottom")
				.removeClass("top")
				.removeClass("right")
				.removeClass("left"), u && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), /body/i.test(this.settings.$target.selector) ? this.settings.$li.length && this.pos_modal(s) : this.top() ? (this.settings.$next_tip.offset({
				top: this.settings.$target.offset()
					.top - n - o
			}), s.addClass("bottom")) : (this.settings.$next_tip.offset({
				top: this.settings.$target.offset()
					.top + i + o
			}), s.addClass("top")), u && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"))
		},
		pos_modal: function(t) {
			this.center(), t.hide(), e(".joyride-modal-bg")
				.length < 1 && e("body")
				.append('<div class="joyride-modal-bg">')
				.show(), /pop/i.test(this.settings.tipAnimation) ? e(".joyride-modal-bg")
				.show() : e(".joyride-modal-bg")
				.fadeIn(this.settings.tipAnimationFadeSpeed)
		},
		center: function() {
			var n = e(t);
			return this.settings.$next_tip.css({
				top: (n.height() - this.outerHeight(this.settings.$next_tip)) / 2 + n.scrollTop(),
				left: (n.width() - this.outerWidth(this.settings.$next_tip)) / 2 + this.scrollLeft(n)
			}), !0
		},
		bottom: function() {
			return /bottom/i.test(this.settings.tipSettings.tipLocation)
		},
		top: function() {
			return /top/i.test(this.settings.tipSettings.tipLocation)
		},
		right: function() {
			return /right/i.test(this.settings.tipSettings.tipLocation)
		},
		left: function() {
			return /left/i.test(this.settings.tipSettings.tipLocation)
		},
		corners: function(n) {
			var r = e(t),
				i = r.width() + this.scrollLeft(r),
				s = r.width() + r.scrollTop();
			return [n.offset()
				.top <= r.scrollTop(), i <= n.offset()
				.left + this.outerWidth(n), s <= n.offset()
				.top + this.outerHeight(n), this.scrollLeft(r) >= n.offset()
				.left]
		},
		visible: function(e) {
			var t = e.length;
			while (t--) if (e[t]) return !1;
			return !0
		},
		nub_position: function(e, t, n) {
			t === "auto" ? e.addClass(n) : e.addClass(t)
		},
		startTimer: function() {
			this.settings.$li.length ? this.settings.automate = setTimeout(function() {
				this.hide(), this.show(), this.startTimer()
			}.bind(this), this.settings.timer) : clearTimeout(this.settings.automate)
		},
		end: function() {
			this.settings.cookieMonster && e.cookie(this.settings.cookieName, "ridden", {
				expires: this.settings.cookieExpires,
				domain: this.settings.cookieDomain
			}), this.settings.timer > 0 && clearTimeout(this.settings.automate), e(".joyride-modal-bg")
				.hide(), this.settings.$current_tip.hide(), this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip), this.settings.postRideCallback(this.settings.$li.index(), this.settings.$current_tip)
		},
		outerHTML: function(e) {
			return e.outerHTML || (new XMLSerializer)
				.serializeToString(e)
		},
		off: function() {
			e(this.scope)
				.off(".joyride"), e(t)
				.off(".joyride"), e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg")
				.off(".joyride"), e(".joyride-tip-guide, .joyride-modal-bg")
				.remove(), clearTimeout(this.settings.automate), this.settings = {}
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.magellan = {
		name: "magellan",
		version: "4.0.0",
		settings: {
			activeClass: "active"
		},
		init: function(t, n, r) {
			return this.scope = t || this.scope, Foundation.inherit(this, "data_options"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || (this.fixed_magellan = e("[data-magellan-expedition]"), this.set_threshold(), this.last_destination = e("[data-magellan-destination]")
				.last(), this.events()), this.settings.init) : this[n].call(this, r)
		},
		events: function() {
			var n = this;
			e(this.scope)
				.on("arrival.fndtn.magellan", "[data-magellan-arrival]", function(t) {
				var r = e(this),
					i = r.closest("[data-magellan-expedition]"),
					s = i.attr("data-magellan-active-class") || n.settings.activeClass;
				r.closest("[data-magellan-expedition]")
					.find("[data-magellan-arrival]")
					.not(r)
					.removeClass(s), r.addClass(s)
			}), this.fixed_magellan.on("update-position.fndtn.magellan", function() {
				var t = e(this)
			})
				.trigger("update-position"), e(t)
				.on("resize.fndtn.magellan", function() {
				this.fixed_magellan.trigger("update-position")
			}.bind(this))
				.on("scroll.fndtn.magellan", function() {
				var r = e(t)
					.scrollTop();
				n.fixed_magellan.each(function() {
					var t = e(this);
					typeof t.data("magellan-top-offset") == "undefined" && t.data("magellan-top-offset", t.offset()
						.top), typeof t.data("magellan-fixed-position") == "undefined" && t.data("magellan-fixed-position", !1);
					var i = r + n.settings.threshold > t.data("magellan-top-offset"),
						s = t.attr("data-magellan-top-offset");
					t.data("magellan-fixed-position") != i && (t.data("magellan-fixed-position", i), i ? t.css({
						position: "fixed",
						top: 0
					}) : t.css({
						position: "",
						top: ""
					}), i && typeof s != "undefined" && s != 0 && t.css({
						position: "fixed",
						top: s + "px"
					}))
				})
			}), this.last_destination.length > 0 && e(t)
				.on("scroll.fndtn.magellan", function(r) {
				var i = e(t)
					.scrollTop(),
					s = i + e(t)
						.height(),
					o = Math.ceil(n.last_destination.offset()
						.top);
				e("[data-magellan-destination]")
					.each(function() {
					var t = e(this),
						r = t.attr("data-magellan-destination"),
						u = t.offset()
							.top - i;
					u <= n.settings.threshold && e("[data-magellan-arrival='" + r + "']")
						.trigger("arrival"), s >= e(n.scope)
						.height() && o > i && o < s && e("[data-magellan-arrival]")
						.last()
						.trigger("arrival")
				})
			}), this.settings.init = !0
		},
		set_threshold: function() {
			this.settings.threshold || (this.settings.threshold = this.fixed_magellan.length > 0 ? this.outerHeight(this.fixed_magellan, !0) : 0)
		},
		off: function() {
			e(this.scope)
				.off(".fndtn.magellan")
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs = Foundation.libs || {}, Foundation.libs.orbit = {
		version: "4.0.0",
		settings: {
			timer_speed: 1e4,
			animation_speed: 500,
			bullets: !0,
			stack_on_small: !0,
			container_class: "orbit-container",
			stack_on_small_class: "orbit-stack-on-small",
			next_class: "orbit-next",
			prev_class: "orbit-prev",
			timer_container_class: "orbit-timer",
			timer_paused_class: "paused",
			timer_progress_class: "orbit-progress",
			slides_container_class: "orbit-slides-container",
			bullets_container_class: "orbit-bullets",
			bullets_active_class: "active",
			slide_number_class: "orbit-slide-number",
			caption_class: "orbit-caption",
			active_slide_class: "active",
			orbit_transition_class: "orbit-transitioning"
		},
		init: function(t, n, r) {
			var i = this;
			typeof n == "object" && e.extend(!0, i.settings, n), e("[data-orbit]", t)
				.each(e.proxy(i._init, i))
		},
		_container_html: function() {
			var e = this;
			return '<div class="' + e.settings.container_class + '"></div>'
		},
		_bullets_container_html: function(t) {
			var n = this,
				r = e('<ol class="' + n.settings.bullets_container_class + '"></ol>');
			return t.each(function(t, i) {
				var s = e('<li data-orbit-slide-number="' + (t + 1) + '" class=""></li>');
				t === 0 && s.addClass(n.settings.bullets_active_class), r.append(s)
			}), r
		},
		_slide_number_html: function(t, n) {
			var r = this,
				i = e('<div class="' + r.settings.slide_number_class + '"></div>');
			return i.append("<span>" + t + "</span> of <span>" + n + "</span>"), i
		},
		_timer_html: function() {
			var e = this;
			return typeof e.settings.timer_speed == "number" && e.settings.timer_speed > 0 ? '<div class="' + e.settings.timer_container_class + '"><span></span><div class="' + e.settings.timer_progress_class + '"></div></div>' : ""
		},
		_next_html: function() {
			var e = this;
			return '<a href="#" class="' + e.settings.next_class + '">Next <span></span></a>'
		},
		_prev_html: function() {
			var e = this;
			return '<a href="#" class="' + e.settings.prev_class + '">Prev <span></span></a>'
		},
		_init: function(t, n) {
			var r = this,
				i = e(n),
				s = i.wrap(r._container_html())
					.parent(),
				o = i.children();
			s.append(r._prev_html()), s.append(r._next_html()), i.addClass(r.settings.slides_container_class), r.settings.stack_on_small && s.addClass(r.settings.stack_on_small_class), s.append(r._slide_number_html(1, o.length)), s.append(r._timer_html()), r.settings.bullets && s.after(r._bullets_container_html(o)), i.append(o.first()
				.clone()
				.attr("data-orbit-slide", "")), i.prepend(o.last()
				.clone()
				.attr("data-orbit-slide", "")), i.css("marginLeft", "-100%"), o.first()
				.addClass(r.settings.active_slide_class), r._init_events(i), r._init_dimensions(i), r._start_timer(i)
		},
		_init_events: function(i) {
			var s = this,
				o = i.parent();
			e(t)
				.on("load.fndtn.orbit", function() {
				i.height(""), i.height(i.height(o.height())), i.trigger("orbit:ready")
			})
				.on("resize.fndtn.orbit", function() {
				i.height(""), i.height(i.height(o.height()))
			}), e(n)
				.on("click.fndtn.orbit", "[data-orbit-link]", function(t) {
				t.preventDefault();
				var n = e(t.currentTarget)
					.attr("data-orbit-link"),
					r = i.find("[data-orbit-slide=" + n + "]")
						.first();
				r.length === 1 && (s._reset_timer(i, !0), s.goto(i, r.index(), function() {}))
			}), o.siblings("." + s.settings.bullets_container_class)
				.on("click.fndtn.orbit", "[data-orbit-slide-number]", function(t) {
				t.preventDefault(), s._reset_timer(i, !0), s.goto(i, e(t.currentTarget)
					.data("orbit-slide-number"), function() {})
			}), o.on("orbit:after-slide-change.fndtn.orbit", function(e, t) {
				var n = o.find("." + s.settings.slide_number_class);
				n.length === 1 && n.replaceWith(s._slide_number_html(t.slide_number, t.total_slides))
			})
				.on("orbit:next-slide.fndtn.orbit click.fndtn.orbit", "." + s.settings.next_class, function(e) {
				e.preventDefault(), s._reset_timer(i, !0), s.goto(i, "next", function() {})
			})
				.on("orbit:prev-slide.fndtn.orbit click.fndtn.orbit", "." + s.settings.prev_class, function(e) {
				e.preventDefault(), s._reset_timer(i, !0), s.goto(i, "prev", function() {})
			})
				.on("orbit:toggle-play-pause.fndtn.orbit click.fndtn.orbit touchstart.fndtn.orbit", "." + s.settings.timer_container_class, function(t) {
				t.preventDefault();
				var n = e(t.currentTarget)
					.toggleClass(s.settings.timer_paused_class),
					r = n.closest("." + s.settings.container_class)
						.find("." + s.settings.slides_container_class);
				n.hasClass(s.settings.timer_paused_class) ? s._stop_timer(r) : s._start_timer(r)
			})
				.on("touchstart.fndtn.orbit", function(e) {
				var t = {
					start_page_x: e.touches[0].pageX,
					start_page_y: e.touches[0].pageY,
					start_time: (new Date)
						.getTime(),
					delta_x: 0,
					is_scrolling: r
				};
				o.data("swipe-transition", t), e.stopPropagation()
			})
				.on("touchmove.fndtn.orbit", function(e) {
				if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
				var t = o.data("swipe-transition");
				typeof t == "undefined" && (t = {}), t.delta_x = e.touches[0].pageX - t.start_page_x, typeof t.is_scrolling == "undefined" && (t.is_scrolling = !! (t.is_scrolling || Math.abs(t.delta_x) < Math.abs(e.touches[0].pageY - t.start_page_y)));
				if (!t.is_scrolling && !t.active) {
					e.preventDefault(), s._stop_timer(i);
					var n = t.delta_x < 0 ? "next" : "prev";
					t.active = !0, s.goto(i, n, function() {})
				}
			})
				.on("touchend.fndtn.orbit", function(e) {
				o.data("swipe-transition", {}), e.stopPropagation()
			})
		},
		_init_dimensions: function(e) {
			var t = e.parent(),
				n = e.children();
			e.css("width", n.length * 100 + "%"), n.css("width", 100 / n.length + "%"), e.height(t.height()), e.css("width", n.length * 100 + "%")
		},
		_start_timer: function(e) {
			var t = this,
				n = e.parent(),
				r = function() {
					t._reset_timer(e, !1), t.goto(e, "next", function() {
						t._start_timer(e)
					})
				}, i = n.find("." + t.settings.timer_container_class),
				s = i.find("." + t.settings.timer_progress_class),
				o = s.width() / i.width(),
				u = t.settings.timer_speed - o * t.settings.timer_speed;
			s.animate({
				width: "100%"
			}, u, "linear", r)
				.data("is-original", "beans?"), e.trigger("orbit:timer-started")
		},
		_stop_timer: function(e) {
			var t = this,
				n = e.parent(),
				r = n.find("." + t.settings.timer_container_class),
				i = r.find("." + t.settings.timer_progress_class),
				s = i.width() / r.width();
			t._rebuild_timer(n, s * 100 + "%"), e.trigger("orbit:timer-stopped"), r = n.find("." + t.settings.timer_container_class), r.addClass(t.settings.timer_paused_class)
		},
		_reset_timer: function(e, t) {
			var n = this,
				r = e.parent();
			n._rebuild_timer(r, "0%");
			if (typeof t == "boolean" && t) {
				var i = r.find("." + n.settings.timer_container_class);
				i.addClass(n.settings.timer_paused_class)
			}
		},
		_rebuild_timer: function(t, n) {
			var r = this,
				i = t.find("." + r.settings.timer_container_class),
				s = e(r._timer_html()),
				o = s.find("." + r.settings.timer_progress_class);
			if (typeof Zepto == "function") i.remove(), t.append(s), o.css("width", n);
			else if (typeof jQuery == "function") {
				var u = i.find("." + r.settings.timer_progress_class);
				u.css("width", n), u.stop()
			}
		},
		"goto": function(t, n, r) {
			var i = this,
				s = t.parent(),
				o = t.children(),
				u = t.find("." + i.settings.active_slide_class),
				a = u.index();
			if (s.hasClass(i.settings.orbit_transition_class)) return !1;
			n === "prev" ? a === 0 ? a = o.length - 1 : a-- : n === "next" ? a = (a + 1) % o.length : typeof n == "number" && (a = n % o.length), a === o.length - 1 && n === "next" ? (t.css("marginLeft", "0%"), a = 1) : a === 0 && n === "prev" && (t.css("marginLeft", "-" + (o.length - 1) * 100 + "%"), a = o.length - 2), s.addClass(i.settings.orbit_transition_class), u.removeClass(i.settings.active_slide_class), e(o[a])
				.addClass(i.settings.active_slide_class);
			var f = s.siblings("." + i.settings.bullets_container_class);
			f.length === 1 && (f.children()
				.removeClass(i.settings.bullets_active_class), e(f.children()[a - 1])
				.addClass(i.settings.bullets_active_class));
			var l = "-" + a * 100 + "%";
			t.trigger("orbit:before-slide-change"), t.css("marginLeft") === l ? (s.removeClass(i.settings.orbit_transition_class), t.trigger("orbit:after-slide-change", [{
				slide_number: a,
				total_slides: t.children()
					.length - 2
			}]), r()) : t.animate({
				marginLeft: l
			}, i.settings.animation_speed, "linear", function() {
				s.removeClass(i.settings.orbit_transition_class), t.trigger("orbit:after-slide-change", [{
					slide_number: a,
					total_slides: t.children()
						.length - 2
				}]), r()
			})
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.reveal = {
		name: "reveal",
		version: "4.0.4",
		locked: !1,
		settings: {
			animation: "fadeAndPop",
			animationSpeed: 250,
			closeOnBackgroundClick: !0,
			dismissModalClass: "close-reveal-modal",
			bgClass: "reveal-modal-bg",
			open: function() {},
			opened: function() {},
			close: function() {},
			closed: function() {},
			bg: e(".reveal-modal-bg"),
			css: {
				open: {
					opacity: 0,
					visibility: "visible",
					display: "block"
				},
				close: {
					opacity: 1,
					visibility: "hidden",
					display: "none"
				}
			}
		},
		init: function(t, n, r) {
			return this.scope = t || this.scope, Foundation.inherit(this, "data_options delay"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
		},
		events: function() {
			var t = this;
			e(this.scope)
				.on("click.fndtn.reveal", "[data-reveal-id]", function(n) {
				n.preventDefault(), t.locked || (t.locked = !0, t.open.call(t, e(this)))
			})
				.on("click.fndtn.reveal touchend.click.fndtn.reveal", this.close_targets(), function(n) {
				t.locked || (t.locked = !0, t.close.call(t, e(this)
					.closest(".reveal-modal")))
			})
				.on("open.fndtn.reveal", ".reveal-modal", this.settings.open)
				.on("opened.fndtn.reveal", ".reveal-modal", this.settings.opened)
				.on("opened.fndtn.reveal", ".reveal-modal", this.open_video)
				.on("close.fndtn.reveal", ".reveal-modal", this.settings.close)
				.on("closed.fndtn.reveal", ".reveal-modal", this.settings.closed)
				.on("closed.fndtn.reveal", ".reveal-modal", this.close_video)
		},
		open: function(t) {
			if (t) var n = e("#" + t.data("reveal-id"));
			else var n = e(this.scope);
			var r = e(".reveal-modal.open");
			n.data("css-top") || n.data("css-top", parseInt(n.css("top"), 10))
				.data("offset", this.cache_offset(n)), n.trigger("open"), r.length < 1 && this.toggle_bg(n), this.toggle_modals(r, n)
		},
		close: function(t) {
			var t = t || e(this.scope);
			this.locked = !0;
			var n = e(".reveal-modal.open")
				.not(t);
			t.trigger("close"), this.toggle_bg(t), this.toggle_modals(n, t)
		},
		close_targets: function() {
			var e = "." + this.settings.dismissModalClass;
			return this.settings.closeOnBackgroundClick ? e + ", ." + this.settings.bgClass : e
		},
		toggle_modals: function(e, t) {
			e.length > 0 && this.hide(e, this.settings.css.close), t.filter(":visible")
				.length > 0 ? this.hide(t, this.settings.css.close) : this.show(t, this.settings.css.open)
		},
		toggle_bg: function(t) {
			this.settings.bg.length === 0 && (this.settings.bg = e("<div />", {
				"class": this.settings.bgClass
			})
				.insertAfter(t)), this.settings.bg.filter(":visible")
				.length > 0 ? this.hide(this.settings.bg) : this.show(this.settings.bg)
		},
		show: function(n, r) {
			if (r) {
				if (/pop/i.test(this.settings.animation)) {
					r.top = e(t)
						.scrollTop() - n.data("offset") + "px";
					var i = {
						top: e(t)
							.scrollTop() + n.data("css-top") + "px",
						opacity: 1
					};
					return this.delay(function() {
						return n.css(r)
							.animate(i, this.settings.animationSpeed, "linear", function() {
							this.locked = !1, n.trigger("opened")
						}.bind(this))
							.addClass("open")
					}.bind(this), this.settings.animationSpeed / 2)
				}
				if (/fade/i.test(this.settings.animation)) {
					var i = {
						opacity: 1
					};
					return this.delay(function() {
						return n.css(r)
							.animate(i, this.settings.animationSpeed, "linear", function() {
							this.locked = !1, n.trigger("opened")
						}.bind(this))
							.addClass("open")
					}.bind(this), this.settings.animationSpeed / 2)
				}
				return n.css(r)
					.show()
					.css({
					opacity: 1
				})
					.addClass("open")
					.trigger("opened")
			}
			return /fade/i.test(this.settings.animation) ? n.fadeIn(this.settings.animationSpeed / 2) : n.show()
		},
		hide: function(n, r) {
			if (r) {
				if (/pop/i.test(this.settings.animation)) {
					var i = {
						top: -e(t)
							.scrollTop() - n.data("offset") + "px",
						opacity: 0
					};
					return this.delay(function() {
						return n.animate(i, this.settings.animationSpeed, "linear", function() {
							this.locked = !1, n.css(r)
								.trigger("closed")
						}.bind(this))
							.removeClass("open")
					}.bind(this), this.settings.animationSpeed / 2)
				}
				if (/fade/i.test(this.settings.animation)) {
					var i = {
						opacity: 0
					};
					return this.delay(function() {
						return n.animate(i, this.settings.animationSpeed, "linear", function() {
							this.locked = !1, n.css(r)
								.trigger("closed")
						}.bind(this))
							.removeClass("open")
					}.bind(this), this.settings.animationSpeed / 2)
				}
				return n.hide()
					.css(r)
					.removeClass("open")
					.trigger("closed")
			}
			return /fade/i.test(this.settings.animation) ? n.fadeOut(this.settings.animationSpeed / 2) : n.hide()
		},
		close_video: function(t) {
			var n = e(this)
				.find(".flex-video"),
				r = n.find("iframe");
			r.length > 0 && (r.attr("data-src", r[0].src), r.attr("src", "about:blank"), n.fadeOut(100)
				.hide())
		},
		open_video: function(t) {
			var n = e(this)
				.find(".flex-video"),
				r = n.find("iframe");
			if (r.length > 0) {
				var i = r.attr("data-src");
				typeof i == "string" && (r[0].src = r.attr("data-src")), n.show()
					.fadeIn(100)
			}
		},
		cache_offset: function(e) {
			var t = e.show()
				.height() + parseInt(e.css("top"), 10);
			return e.hide(), t
		},
		off: function() {
			e(this.scope)
				.off(".fndtn.reveal")
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.tooltips = {
		name: "tooltips",
		version: "4.0.2",
		settings: {
			selector: ".has-tip",
			additionalInheritableClasses: [],
			tooltipClass: ".tooltip",
			tipTemplate: function(e, t) {
				return '<span data-selector="' + e + '" class="' + Foundation.libs.tooltips.settings.tooltipClass.substring(1) + '">' + t + '<span class="nub"></span></span>'
			}
		},
		cache: {},
		init: function(t, n, r) {
			var i = this;
			this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n);
			if (typeof n == "string") return this[n].call(this, r);
			Modernizr.touch ? e(this.scope)
				.on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip", "[data-tooltip]", function(t) {
				t.preventDefault(), e(i.settings.tooltipClass)
					.hide(), i.showOrCreateTip(e(this))
			})
				.on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip", this.settings.tooltipClass, function(t) {
				t.preventDefault(), e(this)
					.fadeOut(150)
			}) : e(this.scope)
				.on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip", "[data-tooltip]", function(t) {
				var n = e(this);
				t.type === "mouseover" || t.type === "mouseenter" ? i.showOrCreateTip(n) : (t.type === "mouseout" || t.type === "mouseleave") && i.hide(n)
			})
		},
		showOrCreateTip: function(e) {
			var t = this.getTip(e);
			return t && t.length > 0 ? this.show(e) : this.create(e)
		},
		getTip: function(t) {
			var n = this.selector(t),
				r = null;
			return n && (r = e("span[data-selector=" + n + "]" + this.settings.tooltipClass)), typeof r == "object" ? r : !1
		},
		selector: function(e) {
			var t = e.attr("id"),
				n = e.attr("data-tooltip") || e.attr("data-selector");
			return (t && t.length < 1 || !t) && typeof n != "string" && (n = "tooltip" + Math.random()
				.toString(36)
				.substring(7), e.attr("data-selector", n)), t && t.length > 0 ? t : n
		},
		create: function(t) {
			var n = e(this.settings.tipTemplate(this.selector(t), e("<div>")
				.html(t.attr("title"))
				.html())),
				r = this.inheritable_classes(t);
			n.addClass(r)
				.appendTo("body"), Modernizr.touch && n.append('<span class="tap-to-close">tap to close </span>'), t.removeAttr("title")
				.attr("title", ""), this.show(t)
		},
		reposition: function(n, r, i) {
			var s, o, u, a, f, l;
			r.css("visibility", "hidden")
				.show(), s = n.data("width"), o = r.children(".nub"), u = this.outerHeight(o), a = this.outerHeight(o), l = function(e, t, n, r, i, s) {
				return e.css({
					top: t ? t : "auto",
					bottom: r ? r : "auto",
					left: i ? i : "auto",
					right: n ? n : "auto",
					width: s ? s : "auto"
				})
					.end()
			}, l(r, n.offset()
				.top + this.outerHeight(n) + 10, "auto", "auto", n.offset()
				.left, s), e(t)
				.width() < 767 ? (l(r, n.offset()
				.top + this.outerHeight(n) + 10, "auto", "auto", 12.5, e(this.scope)
				.width()), r.addClass("tip-override"), l(o, - u, "auto", "auto", n.offset()
				.left)) : (l(r, n.offset()
				.top + this.outerHeight(n) + 10, "auto", "auto", n.offset()
				.left, s), r.removeClass("tip-override"), i && i.indexOf("tip-top") > -1 ? l(r, n.offset()
				.top - this.outerHeight(r), "auto", "auto", n.offset()
				.left, s)
				.removeClass("tip-override") : i && i.indexOf("tip-left") > -1 ? l(r, n.offset()
				.top + this.outerHeight(n) / 2 - u * 2.5, "auto", "auto", n.offset()
				.left - this.outerWidth(r) - u, s)
				.removeClass("tip-override") : i && i.indexOf("tip-right") > -1 && l(r, n.offset()
				.top + this.outerHeight(n) / 2 - u * 2.5, "auto", "auto", n.offset()
				.left + this.outerWidth(n) + u, s)
				.removeClass("tip-override")), r.css("visibility", "visible")
				.hide()
		},
		inheritable_classes: function(t) {
			var n = ["tip-top", "tip-left", "tip-bottom", "tip-right", "noradius"].concat(this.settings.additionalInheritableClasses),
				r = t.attr("class"),
				i = r ? e.map(r.split(" "), function(t, r) {
					if (e.inArray(t, n) !== -1) return t
				})
					.join(" ") : "";
			return e.trim(i)
		},
		show: function(e) {
			var t = this.getTip(e);
			this.reposition(e, t, e.attr("class")), t.fadeIn(150)
		},
		hide: function(e) {
			var t = this.getTip(e);
			t.fadeOut(150)
		},
		reload: function() {
			var t = e(this);
			return t.data("fndtn-tooltips") ? t.foundationTooltips("destroy")
				.foundationTooltips("init") : t.foundationTooltips("init")
		},
		off: function() {
			e(this.scope)
				.off(".fndtn.tooltip"), e(this.settings.tooltipClass)
				.each(function(t) {
				e("[data-tooltip]")
					.get(t)
					.attr("title", e(this)
					.text())
			})
				.remove()
		}
	}
}(Foundation.zj, this, this.document),
function(e, t, n, r) {
	"use strict";
	Foundation.libs.topbar = {
		name: "topbar",
		version: "4.0.0",
		settings: {
			index: 0,
			stickyClass: "sticky",
			back_text: "&laquo; Back",
			init: !1
		},
		init: function(n, r, i) {
			var s = this;
			return this.scope = n || this.scope, typeof r == "object" && e.extend(!0, this.settings, r), typeof r != "string" ? (e("nav.top-bar")
				.each(function() {
				s.settings.$w = e(t), s.settings.$topbar = e(this), s.settings.$section = s.settings.$topbar.find("section"), s.settings.$titlebar = s.settings.$topbar.children("ul")
					.first(), s.settings.$topbar.data("index", 0);
				var n = e("<div class='top-bar-js-breakpoint'/>")
					.insertAfter(s.settings.$topbar);
				s.settings.breakPoint = n.width(), n.remove(), s.assemble(), s.settings.$topbar.parent()
					.hasClass("fixed") && e("body")
					.css("padding-top", s.outerHeight(s.settings.$topbar))
			}), s.settings.init || this.events(), this.settings.init) : this[r].call(this, i)
		},
		events: function() {
			var n = this;
			e(this.scope)
				.on("click.fndtn.topbar", ".top-bar .toggle-topbar", function(t) {
				var r = e(this)
					.closest(".top-bar"),
					i = r.find("section, .section"),
					s = r.children("ul")
						.first();
				n.settings.$topbar.data("height") || n.largestUL(), t.preventDefault(), n.breakpoint() && r.toggleClass("expanded")
					.css("min-height", ""), r.hasClass("expanded") || (i.css({
					left: "0%"
				}), i.find(">.name")
					.css({
					left: "100%"
				}), i.find("li.moved")
					.removeClass("moved"), r.data("index", 0))
			})
				.on("click.fndtn.topbar", ".top-bar .has-dropdown>a", function(t) {
				var r = e(this)
					.closest(".top-bar"),
					i = r.find("section, .section"),
					s = r.children("ul")
						.first();
				(Modernizr.touch || n.breakpoint()) && t.preventDefault();
				if (n.breakpoint()) {
					var o = e(this),
						u = o.closest("li");
					r.data("index", r.data("index") + 1), u.addClass("moved"), i.css({
						left: -(100 * r.data("index")) + "%"
					}), i.find(">.name")
						.css({
						left: 100 * r.data("index") + "%"
					}), o.siblings("ul")
						.height(r.data("height") + n.outerHeight(s, !0)), r.css("min-height", r.data("height") + n.outerHeight(s, !0) * 2)
				}
			}), e(t)
				.on("resize.fndtn.topbar", function() {
				this.breakpoint() || e(".top-bar")
					.css("min-height", "")
			}.bind(this)), e(this.scope)
				.on("click.fndtn", ".top-bar .has-dropdown .back", function(t) {
				t.preventDefault();
				var n = e(this),
					r = n.closest(".top-bar"),
					i = r.find("section, .section"),
					s = n.closest("li.moved"),
					o = s.parent();
				r.data("index", r.data("index") - 1), i.css({
					left: -(100 * r.data("index")) + "%"
				}), i.find(">.name")
					.css({
					left: 100 * r.data("index") + "%"
				}), r.data("index") === 0 && r.css("min-height", 0), setTimeout(function() {
					s.removeClass("moved")
				}, 300)
			})
		},
		breakpoint: function() {
			return e(t)
				.width() <= this.settings.breakPoint || e("html")
				.hasClass("lt-ie9")
		},
		assemble: function() {
			var t = this;
			this.settings.$section.detach(), this.settings.$section.find(".has-dropdown>a")
				.each(function() {
				var n = e(this),
					r = n.siblings(".dropdown"),
					i = e('<li class="title back js-generated"><h5><a href="#">' + t.settings.back_text + "</a></h5></li>");
				r.prepend(i)
			}), this.settings.$section.appendTo(this.settings.$topbar), this.sticky()
		},
		largestUL: function() {
			var t = this.settings.$topbar.find("section ul ul"),
				n = t.first(),
				r = 0,
				i = this;
			t.each(function() {
				e(this)
					.children("li")
					.length > n.children("li")
					.length && (n = e(this))
			}), n.children("li")
				.each(function() {
				r += i.outerHeight(e(this), !0)
			}), this.settings.$topbar.data("height", r)
		},
		sticky: function() {
			var n = "." + this.settings.stickyClass;
			if (e(n)
				.length > 0) {
				var r = e(n)
					.length ? e(n)
					.offset()
					.top : 0,
					i = e(t),
					s = this.outerHeight(e("nav.top-bar")) + 20;
				i.scroll(function() {
					i.scrollTop() >= r ? (e(n)
						.addClass("fixed"), e("body")
						.css("padding-top", s)) : i.scrollTop() < r && (e(n)
						.removeClass("fixed"), e("body")
						.css("padding-top", "0"))
				})
			}
		},
		off: function() {
			e(this.scope)
				.off(".fndtn.topbar"), e(t)
				.off(".fndtn.topbar")
		}
	}
}(Foundation.zj, this, this.document);

//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function(undefined){
  if (String.prototype.trim === undefined) // fix for iOS 3.2
    String.prototype.trim = function(){ return this.replace(/^\s+/, '').replace(/\s+$/, '') }

  // For iOS 3.x
  // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
  if (Array.prototype.reduce === undefined)
    Array.prototype.reduce = function(fun){
      if(this === void 0 || this === null) throw new TypeError()
      var t = Object(this), len = t.length >>> 0, k = 0, accumulator
      if(typeof fun != 'function') throw new TypeError()
      if(len == 0 && arguments.length == 1) throw new TypeError()

      if(arguments.length >= 2)
       accumulator = arguments[1]
      else
        do{
          if(k in t){
            accumulator = t[k++]
            break
          }
          if(++k >= len) throw new TypeError()
        } while (true)

      while (k < len){
        if(k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
        k++
      }
      return accumulator
    }

})();

var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    getComputedStyle = document.defaultView.getComputedStyle,
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    classSelectorRE = /^\.([\w-]+)$/,
    idSelectorRE = /^#([\w-]*)$/,
    tagSelectorRE = /^[\w-]+$/,
    toString = {}.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div')

  zepto.matches = function(element, selector) {
    if (!element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function isFunction(value) { return toString.call(value) == "[object Function]" }
  function isObject(value) { return value instanceof Object }
  function isPlainObject(value) {
    return isObject(value) && value != window && value.__proto__ == Object.prototype
  }
  function isArray(value) { return value instanceof Array }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'

    var nodes, dom, container = containers[name]
    container.innerHTML = '' + html
    dom = $.each(slice.call(container.childNodes), function(){
      container.removeChild(this)
    })
    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }
    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = arguments.callee.prototype
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, juts return it
    else if (zepto.isZ(selector)) return selector
    else {
      var dom
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes. If a plain object is given, duplicate it.
      else if (isObject(selector))
        dom = [isPlainObject(selector) ? $.extend({}, selector) : selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector)
    }
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && isPlainObject(source[key])) {
        if (!isPlainObject(target[key])) target[key] = {}
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found
    return (element === document && idSelectorRE.test(selector)) ?
      ( (found = element.getElementById(RegExp.$1)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
        tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
        element.querySelectorAll(selector)
      )
  }

  function filtered(nodes, selector) {
    return selector === undefined ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = function(parent, node) {
    return parent !== node && parent.contains(node)
  }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className,
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    var num
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          !isNaN(num = Number(value)) ? num :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.isFunction = isFunction
  $.isObject = isObject
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) { return str.trim() }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      if (readyRE.test(document.readyState)) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result
      if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0]
      while (node && !zepto.matches(node, selector))
        node = node !== context && node !== document && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = null)
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return html === undefined ?
        (this.length > 0 ? this[0].innerHTML : null) :
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        })
    },
    text: function(text){
      return text === undefined ?
        (this.length > 0 ? this[0].textContent : null) :
        this.each(function(){ this.textContent = text })
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && value === undefined) ?
        (this.length == 0 || this[0].nodeType !== 1 ? undefined :
          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
    },
    prop: function(name, value){
      return (value === undefined) ?
        (this[0] && this[0][name]) :
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        })
    },
    data: function(name, value){
      var data = this.attr('data-' + dasherize(name), value)
      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return (value === undefined) ?
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(o){ return this.selected }).pluck('value') :
           this[0].value)
        ) :
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (this.length==0) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: obj.width,
        height: obj.height
      }
    },
    css: function(property, value){
      if (arguments.length < 2 && typeof property == 'string')
        return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))

      var css = ''
      for (key in property)
        if (!property[key] && property[key] !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(key)) })
        else
          css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'

      if (typeof property == 'string')
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      return this.each(function(idx){
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(){
      if (!this.length) return
      return ('scrollTop' in this[0]) ? this[0].scrollTop : this[0].scrollY
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    $.fn[dimension] = function(value){
      var offset, Dimension = dimension.replace(/./, function(m){ return m[0].toUpperCase() })
      if (value === undefined) return this[0] == window ? window['inner' + Dimension] :
        this[0] == document ? document.documentElement['offset' + Dimension] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        var el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var nodes = $.map(arguments, function(n){ return isObject(n) ? n : zepto.fragment(n) }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          traverseNode(parent.insertBefore(node, target), function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

// If `$` is not yet defined, point it to `Zepto`
window.Zepto = Zepto
'$' in window || (window.$ = Zepto);

//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var $$ = $.zepto.qsa, handlers = {}, _zid = 1, specialEvents={},
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eachEvent(events, fn, iterator){
    if ($.isObject(events)) $.each(events, iterator)
    else events.split(/\s/).forEach(function(type){ iterator(type, fn) })
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (handler.e == 'focus' || handler.e == 'blur') ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || type
  }

  function add(element, events, fn, selector, getDelegate, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    eachEvent(events, fn, function(event, fn){
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = getDelegate && getDelegate(fn, event)
      var callback  = handler.del || fn
      handler.proxy = function (e) {
        var result = callback.apply(element, [e].concat(e.data))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    eachEvent(events || '', fn, function(event, fn){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    if ($.isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (typeof context == 'string') {
      return $.proxy(fn[context], fn)
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, callback){
    return this.each(function(){
      add(this, event, callback)
    })
  }
  $.fn.unbind = function(event, callback){
    return this.each(function(){
      remove(this, event, callback)
    })
  }
  $.fn.one = function(event, callback){
    return this.each(function(i, element){
      add(this, event, callback, null, function(fn, type){
        return function(){
          var result = fn.apply(element, arguments)
          remove(element, type, fn)
          return result
        }
      })
    })
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }
  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    $.each(eventMethods, function(name, predicate) {
      proxy[name] = function(){
        this[predicate] = returnTrue
        return event[name].apply(event, arguments)
      }
      proxy[predicate] = returnFalse
    })
    return proxy
  }

  // emulates the 'defaultPrevented' property for browsers that have none
  function fix(event) {
    if (!('defaultPrevented' in event)) {
      event.defaultPrevented = false
      var prevent = event.preventDefault
      event.preventDefault = function() {
        this.defaultPrevented = true
        prevent.call(this)
      }
    }
  }

  $.fn.delegate = function(selector, event, callback){
    return this.each(function(i, element){
      add(element, event, callback, selector, function(fn){
        return function(e){
          var evt, match = $(e.target).closest(selector, element).get(0)
          if (match) {
            evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
            return fn.apply(match, [evt].concat([].slice.call(arguments, 1)))
          }
        }
      })
    })
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, callback){
    return !selector || $.isFunction(selector) ?
      this.bind(event, selector || callback) : this.delegate(selector, event, callback)
  }
  $.fn.off = function(event, selector, callback){
    return !selector || $.isFunction(selector) ?
      this.unbind(event, selector || callback) : this.undelegate(selector, event, callback)
  }

  $.fn.trigger = function(event, data){
    if (typeof event == 'string' || $.isPlainObject(event)) event = $.Event(event)
    fix(event)
    event.data = data
    return this.each(function(){
      // items in the collection might not be DOM elements
      // (todo: possibly support events on plain old objects)
      if('dispatchEvent' in this) this.dispatchEvent(event)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, data){
    var e, result
    this.each(function(i, element){
      e = createProxy(typeof event == 'string' ? $.Event(event) : event)
      e.data = data
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return callback ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  ;['focus', 'blur'].forEach(function(name) {
    $.fn[name] = function(callback) {
      if (callback) this.bind(name, callback)
      else this.each(function(){
        try { this[name]() }
        catch(e) {}
      })
      return this
    }
  })

  $.Event = function(type, props) {
    if (typeof type != 'string') props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null)
    event.isDefaultPrevented = function(){ return this.defaultPrevented }
    return event
  }

})(Zepto);

//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  function detect(ua){
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/WebKit\/([\d.]+)/),
      android = ua.match(/(Android)\s+([\d.]+)/),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      chrome  = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)

    // todo clean this up with a better OS/browser
    // separation. we need to discern between multiple
    // browsers on android, and decide if kindle fire in
    // silk mode is android or not

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
  }

  detect.call($, navigator.userAgent)
  // make available to unit tests
  $.__detect = detect

})(Zepto);


//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($, undefined){
  var prefix = '', eventPrefix, endEventName, endAnimationName,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' },
    document = window.document, testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming,
    animationName, animationDuration, animationTiming,
    cssReset = {}

  function dasherize(str) { return downcase(str.replace(/([a-z])([A-Z])/, '$1-$2')) }
  function downcase(str) { return str.toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : downcase(name) }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + downcase(vendor) + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
  cssReset[animationName      = prefix + 'animation-name'] =
  cssReset[animationDuration  = prefix + 'animation-duration'] =
  cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback){
    if ($.isObject(duration))
      ease = duration.easing, callback = duration.complete, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    return this.anim(properties, duration, ease, callback)
  }

  $.fn.anim = function(properties, duration, ease, callback){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd

    if (duration === undefined) duration = 0.4
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, arguments.callee)
      }
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0) this.bind(endEvent, wrappedCallback)

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto);


//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var jsonpID = 0,
      isObject = $.isObject,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.defaultPrevented
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options){
    if (!('type' in options)) return $.ajax(options)

    var callbackName = 'jsonp' + (++jsonpID),
      script = document.createElement('script'),
      abort = function(){
        $(script).remove()
        if (callbackName in window) window[callbackName] = empty
        ajaxComplete('abort', xhr, options)
      },
      xhr = { abort: abort }, abortTimeout

    if (options.error) script.onerror = function() {
      xhr.abort()
      options.error()
    }

    window[callbackName] = function(data){
      clearTimeout(abortTimeout)
      $(script).remove()
      delete window[callbackName]
      ajaxSuccess(data, xhr, options)
    }

    serializeData(options)
    script.src = options.url.replace(/=\?/, '=' + callbackName)
    $('head').append(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.abort()
        ajaxComplete('timeout', xhr, options)
      }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    accepts: {
      script: 'text/javascript, application/javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true
  }

  function mimeToDataType(mime) {
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && isObject(options.data))
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data)
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {})
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host

    var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url)
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
      return $.ajaxJSONP(settings)
    }

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)

    var mime = settings.accepts[dataType],
        baseHeaders = { },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(), abortTimeout

    if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest'
    if (mime) {
      baseHeaders['Accept'] = mime
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      baseHeaders['Content-Type'] = (settings.contentType || 'application/x-www-form-urlencoded')
    settings.headers = $.extend(baseHeaders, settings.headers || {})

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty;
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings)
          else ajaxSuccess(result, xhr, settings)
        } else {
          ajaxError(null, xhr.status ? 'error' : 'abort', xhr, settings)
        }
      }
    }

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async)

    for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      return false
    }

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  $.get = function(url, success){ return $.ajax({ url: url, success: success }) }

  $.post = function(url, data, success, dataType){
    if ($.isFunction(data)) dataType = dataType || success, success = data, data = null
    return $.ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType })
  }

  $.getJSON = function(url, success){
    return $.ajax({ url: url, success: success, dataType: 'json' })
  }

  $.fn.load = function(url, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector
    if (parts.length > 1) url = parts[0], selector = parts[1]
    $.get(url, function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      success && success.apply(self, arguments)
    })
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var array = $.isArray(obj)
    $.each(obj, function(key, value) {
      if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (traditional ? $.isArray(value) : isObject(value))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto);


//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function ($) {
  $.fn.serializeArray = function () {
    var result = [], el
    $( Array.prototype.slice.call(this.get(0).elements) ).each(function () {
      el = $(this)
      var type = el.attr('type')
      if (this.nodeName.toLowerCase() != 'fieldset' &&
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked))
        result.push({
          name: el.attr('name'),
          value: el.val()
        })
    })
    return result
  }

  $.fn.serialize = function () {
    var result = []
    this.serializeArray().forEach(function (elm) {
      result.push( encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value) )
    })
    return result.join('&')
  }

  $.fn.submit = function (callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.defaultPrevented) this.get(0).submit()
    }
    return this
  }

})(Zepto);


//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var cache = [], timeout

  $.fn.remove = function(){
    return this.each(function(){
      if(this.parentNode){
        if(this.tagName === 'IMG'){
          cache.push(this)
          this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
          if (timeout) clearTimeout(timeout)
          timeout = setTimeout(function(){ cache = [] }, 60000)
        }
        this.parentNode.removeChild(this)
      }
    })
  }
})(Zepto);


//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

// The following code is heavily inspired by jQuery's $.fn.data()

;(function($) {
  var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
    exp = $.expando = 'Zepto' + (+new Date())

  // Get value from node:
  // 1. first try key as given,
  // 2. then try camelized key,
  // 3. fall back to reading "data-*" attribute.
  function getData(node, name) {
    var id = node[exp], store = id && data[id]
    if (name === undefined) return store || setData(node)
    else {
      if (store) {
        if (name in store) return store[name]
        var camelName = camelize(name)
        if (camelName in store) return store[camelName]
      }
      return dataAttr.call($(node), name)
    }
  }

  // Store value under camelized key on node
  function setData(node, name, value) {
    var id = node[exp] || (node[exp] = ++$.uuid),
      store = data[id] || (data[id] = attributeData(node))
    if (name !== undefined) store[camelize(name)] = value
    return store
  }

  // Read all "data-*" attributes from a node
  function attributeData(node) {
    var store = {}
    $.each(node.attributes, function(i, attr){
      if (attr.name.indexOf('data-') == 0)
        store[camelize(attr.name.replace('data-', ''))] =
          $.zepto.deserializeValue(attr.value)
    })
    return store
  }

  $.fn.data = function(name, value) {
    return value === undefined ?
      // set multiple values via object
      $.isPlainObject(name) ?
        this.each(function(i, node){
          $.each(name, function(key, value){ setData(node, key, value) })
        }) :
        // get value from first element
        this.length == 0 ? undefined : getData(this[0], name) :
      // set value on all elements
      this.each(function(){ setData(this, name, value) })
  }

  $.fn.removeData = function(names) {
    if (typeof names == 'string') names = names.split(/\s+/)
    return this.each(function(){
      var id = this[exp], store = id && data[id]
      if (store) $.each(names, function(){ delete store[camelize(this)] })
    })
  }
})(Zepto);


;(function($){
  var zepto = $.zepto, oldQsa = zepto.qsa, oldMatches = zepto.matches

  function visible(elem){
    elem = $(elem)
    return !!(elem.width() || elem.height()) && elem.css("display") !== "none"
  }

  // Implements a subset from:
  // http://api.jquery.com/category/selectors/jquery-selector-extensions/
  //
  // Each filter function receives the current index, all nodes in the
  // considered set, and a value if there were parentheses. The value
  // of `this` is the node currently being considered. The function returns the
  // resulting node(s), null, or undefined.
  //
  // Complex selectors are not supported:
  //   li:has(label:contains("foo")) + li:has(label:contains("bar"))
  //   ul.inner:first > li
  var filters = $.expr[':'] = {
    visible:  function(){ if (visible(this)) return this },
    hidden:   function(){ if (!visible(this)) return this },
    selected: function(){ if (this.selected) return this },
    checked:  function(){ if (this.checked) return this },
    parent:   function(){ return this.parentNode },
    first:    function(idx){ if (idx === 0) return this },
    last:     function(idx, nodes){ if (idx === nodes.length - 1) return this },
    eq:       function(idx, _, value){ if (idx === value) return this },
    contains: function(idx, _, text){ if ($(this).text().indexOf(text) > -1) return this },
    has:      function(idx, _, sel){ if (zepto.qsa(this, sel).length) return this }
  }

  var filterRe = new RegExp('(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*'),
      childRe  = /^\s*>/,
      classTag = 'Zepto' + (+new Date())

  function process(sel, fn) {
    // quote the hash in `a[href^=#]` expression
    sel = sel.replace(/=#\]/g, '="#"]')
    var filter, arg, match = filterRe.exec(sel)
    if (match && match[2] in filters) {
      var filter = filters[match[2]], arg = match[3]
      sel = match[1]
      if (arg) {
        var num = Number(arg)
        if (isNaN(num)) arg = arg.replace(/^["']|["']$/g, '')
        else arg = num
      }
    }
    return fn(sel, filter, arg)
  }

  zepto.qsa = function(node, selector) {
    return process(selector, function(sel, filter, arg){
      try {
        var taggedParent
        if (!sel && filter) sel = '*'
        else if (childRe.test(sel))
          // support "> *" child queries by tagging the parent node with a
          // unique class and prepending that classname onto the selector
          taggedParent = $(node).addClass(classTag), sel = '.'+classTag+' '+sel

        var nodes = oldQsa(node, sel)
      } catch(e) {
        console.error('error performing selector: %o', selector)
        throw e
      } finally {
        if (taggedParent) taggedParent.removeClass(classTag)
      }
      return !filter ? nodes :
        zepto.uniq($.map(nodes, function(n, i){ return filter.call(n, i, nodes, arg) }))
    })
  }

  zepto.matches = function(node, selector){
    return process(selector, function(sel, filter, arg){
      return (!sel || oldMatches(node, sel)) &&
        (!filter || filter.call(node, null, arg) === node)
    })
  }
})(Zepto);


//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  $.fn.end = function(){
    return this.prevObject || $()
  }

  $.fn.andSelf = function(){
    return this.add(this.prevObject || $())
  }

  'filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings'.split(',').forEach(function(property){
    var fn = $.fn[property]
    $.fn[property] = function(){
      var ret = fn.apply(this, arguments)
      ret.prevObject = this
      return ret
    }
  })
})(Zepto);

//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($, undefined){
  var document = window.document, docElem = document.documentElement,
    origShow = $.fn.show, origHide = $.fn.hide, origToggle = $.fn.toggle

  function anim(el, speed, opacity, scale, callback) {
    if (typeof speed == 'function' && !callback) callback = speed, speed = undefined
    var props = { opacity: opacity }
    if (scale) {
      props.scale = scale
      el.css($.fx.cssPrefix + 'transform-origin', '0 0')
    }
    return el.animate(props, speed, null, callback)
  }

  function hide(el, speed, scale, callback) {
    return anim(el, speed, 0, scale, function(){
      origHide.call($(this))
      callback && callback.call(this)
    })
  }

  $.fn.show = function(speed, callback) {
    origShow.call(this)
    if (speed === undefined) speed = 0
    else this.css('opacity', 0)
    return anim(this, speed, 1, '1,1', callback)
  }

  $.fn.hide = function(speed, callback) {
    if (speed === undefined) return origHide.call(this)
    else return hide(this, speed, '0,0', callback)
  }

  $.fn.toggle = function(speed, callback) {
    if (speed === undefined || typeof speed == 'boolean')
      return origToggle.call(this, speed)
    else return this.each(function(){
      var el = $(this)
      el[el.css('display') == 'none' ? 'show' : 'hide'](speed, callback)
    })
  }

  $.fn.fadeTo = function(speed, opacity, callback) {
    return anim(this, speed, opacity, null, callback)
  }

  $.fn.fadeIn = function(speed, callback) {
    var target = this.css('opacity')
    if (target > 0) this.css('opacity', 0)
    else target = 1
    return origShow.call(this).fadeTo(speed, target, callback)
  }

  $.fn.fadeOut = function(speed, callback) {
    return hide(this, speed, null, callback)
  }

  $.fn.fadeToggle = function(speed, callback) {
    return this.each(function(){
      var el = $(this)
      el[
        (el.css('opacity') == 0 || el.css('display') == 'none') ? 'fadeIn' : 'fadeOut'
      ](speed, callback)
    })
  }

})(Zepto);

