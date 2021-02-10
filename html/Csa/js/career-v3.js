(function() {
  var maxCharactersForUrlPost = 2000;
  if (window.PU && window.PU.extend) {
    return;
  }
  var emptyFn = function() {},
    getElementsByClassName;
  if (document.getElementsByClassName) {
    getElementsByClassName = function(classname, parent) {
      return (parent || document).getElementsByClassName(classname);
    };
  } else {
    getElementsByClassName = function(theClass, parent) {
      parent = parent || document;
      var els =
        typeof parent.all != "undefined"
          ? parent.all
          : parent.getElementsByTagName("*");
      var matchedArray = [],
        pattern = new RegExp("(^| )" + theClass + "( |$)");
      PU.forEach(els, function(el) {
        if (pattern.test(el.className)) {
          matchedArray.push(el);
        }
      });
      return matchedArray;
    };
  }
  var PU = (window.PU = {
    extend: function(b, a) {
      for (var p in a || {}) {
        b[p] = a[p];
      }
      return b;
    },
    forEach: function(items, fn) {
      for (var i = items.length - 1; i >= 0; i--) {
        fn(items[i]);
      }
    },
    forEachElement: function(els, fn) {
      if (!els) {
        return;
      }
      els = els.nodeName ? [els] : els;
      PU.forEach(els, function(el) {
        if (el) {
          fn(el);
        }
      });
    },
    toArray: function(items) {
      var results = [];
      PU.forEach(items, function(item) {
        results.push(item);
      });
      return results;
    },
    getParameterByName: function(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regexS = "[\\?&]" + name + "=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.href);
      if (results == null) {
        return "";
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    },
    stripQueryStringFromUrl: function(url) {
      return url.split("?")[0];
    },
    getQueryStringFromUrl: function(url) {
      var parts = url.split("?");
      return parts.length > 1 ? parts[1] : "";
    },
    isNumber: function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    parseDotNetDate: function(date) {
      return new Date(parseInt(date.substr(6)));
    },
    formatDate: function(date) {
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return (
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear()
      );
    },
    formatTime: function(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    formatDateTime: function(date) {
      return PU.formatDate(date) + " " + PU.formatTime(date);
    },
    formatVanillaDateTime: function(date) {
      return date.toString();
    },
    validEmail: function(value) {
      return /^\S+@\S+\.\S+$/.test(value);
    },
    ie: (function() {
      var undef,
        v = 3,
        div = document.createElement("div"),
        all = div.getElementsByTagName("i");
      while (
        ((div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->"),
        all[0])
      ) {}
      return v > 4 ? v : undef;
    })(),
    $: function(input) {
      var match = input.substring(1, input.length),
        first = input.charAt(0);
      if (first == "#") {
        return document.getElementById(match);
      } else {
        if (first == ".") {
          return getElementsByClassName(match);
        } else {
          return document.getElementsByTagName(input);
        }
      }
    },
    getElementsByClassName: getElementsByClassName,
    _beforeAppendHTML: function(el) {},
    _afterAppendHTML: function(el) {},
    appendChildren: function(parent, children) {
      PU.forEach(children, function(child) {
        parent.appendChild(child);
      });
    },
    parseHTML: function(html) {
      var el, tag;
      html = html.trim();
      tag = html.substr(html.indexOf("<") + 1, html.indexOf(">") - 1);
      if (tag == "tr") {
        el = document.createElement("div");
        el.innerHTML = "<table><tbody>" + html + "</tbody></table>";
        el = el.childNodes[0].childNodes[0];
      } else {
        if (tag == "li") {
          el = document.createElement("ul");
          el.innerHTML = html;
        } else {
          el = document.createElement("div");
          el.innerHTML = html;
        }
      }
      return el;
    },
    appendHTML: function(parent, html) {
      var children;
      var el = PU.parseHTML(html);
      PU._beforeAppendHTML(el);
      children = PU.toArray(el.childNodes);
      PU.appendChildren(parent, children);
      PU._afterAppendHTML(el, parent);
    },
    hasClassName: function(el, theClass) {
      var regex = RegExp("(^| )" + theClass + "( |$)");
      return regex.test(el.className);
    },
    addClassName: function(els, theClass) {
      PU.forEachElement(els, function(el) {
        if (!PU.hasClassName(el, theClass)) {
          el.className =
            el.className == "" ? theClass : el.className + " " + theClass;
        }
      });
    },
    removeClassName: function(els, theClass) {
      var regex = RegExp("(^| )" + theClass + "( |$)");
      PU.forEachElement(els, function(el) {
        el.className = el.className.replace(regex, "$1").replace(/ $/, "");
      });
    },
    toggleClassName: function(els, theClass) {
      PU.forEachElement(els, function(el) {
        if (PU.hasClassName(el, theClass)) {
          PU.removeClassName(el, theClass);
        } else {
          PU.addClassName(el, theClass);
        }
      });
    },
    show: function(els) {
      PU.forEachElement(els, function(el) {
        el.style.display = "block";
      });
    },
    hide: function(els) {
      PU.forEachElement(els, function(el) {
        el.style.display = "none";
        PU.addClassName(el, "rs_skip");
      });
    },
    getPosition: function(el) {
      var x = 0,
        y = 0;
      for (var current = el; current != null; current = current.offsetParent) {
        x += current.offsetLeft;
        y += current.offsetTop;
      }
      return {
        x: x,
        y: y
      };
    },
    clickedElementId: "",
    serialize: function(els) {
      var value;
      var values = [];
      var allFiltersJustChecked = false;
      PU.forEach(els, function(input) {
        if (input.tagName == "SELECT" && input.multiple) {
          PU.forEach(input.options, function(option) {
            if (option.selected) {
              values.push(input.name + "=" + PU.cleanFilterName(option.value));
            }
          });
        } else {
          if (input.tagName == "A" && input.name != "" && input.name != null) {
            if (input.id == PU.clickedElementId) {
              value = input.getAttribute("data-value");
              if (value != "" && value != null) {
                values.push(input.name + "=" + PU.cleanFilterName(value));
                PU.clickedElementId = "";
              }
            }
          } else {
            if (
              !(/checkbox|radio/.test(input.type) && !input.checked) &&
              input.type != "submit" &&
              input.type != "button"
            ) {
              if (input.type == "checkbox") {
                if (input.value == "" && PU.clickedElementId == input.id) {
                  values.push(
                    input.name + "=" + PU.cleanFilterName(input.value)
                  );
                  allFiltersJustChecked = true;
                  PU.clickedElementId = "";
                } else {
                  if (allFiltersJustChecked) {
                    input.checked = false;
                  } else {
                    values.push(
                      input.name + "=" + PU.cleanFilterName(input.value)
                    );
                  }
                }
              } else {
                if (input.name == "search-keyword") {
                  if (input.value == input.getAttribute("placeholder")) {
                    input.value = "";
                  }
                  value = PU.cleanKeywordName(input.value);
                } else {
                  value = PU.cleanFilterName(input.value);
                }
                values.push(input.name + "=" + value);
              }
            }
          }
        }
      });
      return values.join("&");
    },
    cleanKeywordName: function(str) {
      return encodeURIComponent(str.replace("&amp;", "&"));
    },
    cleanFilterName: function(str) {
      return PU.cleanKeywordName(str).toLowerCase();
    },
    errorHandlerUrl: "/Error/Javascript",
    errorHandler: function(msg, url, lineNumber) {
      try {
        if (
          (!url || url === "undefined") &&
          (!lineNumber ||
            lineNumber === "0" ||
            lineNumber === "1" ||
            lineNumber === 0 ||
            lineNumber === 1)
        ) {
          return false;
        }
        if (
          PU != null &&
          PU.Jobs != null &&
          PU.Jobs.source != null &&
          PU.Jobs.source.dynamicTemplate
        ) {
          return false;
        }
        var stacktrace;
        try {
          stacktrace = printStackTrace();
        } catch (ex) {
          stacktrace = "Not available";
        }
        if (stacktrace.indexOf("chrome-extension://") >= 0) {
          return false;
        }
        new PU.ajax(PU.errorHandlerUrl, {
          type: "post",
          parameters: {
            InstId: PU.Jobs.source.instId,
            SourcePointer: PU.Jobs.source.sourcePointer,
            ErrorMessage: msg,
            AffectedPage: location.pathname,
            QueryString: location.search,
            JavaScriptFile: url,
            LineNumber: lineNumber,
            StackTrace: stacktrace.join("\n at ")
          }
        });
      } catch (ex) {}
      return false;
    }
  });
  if (PU.ie) {
    PU.emptyHTML = function(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    };
  } else {
    PU.emptyHTML = function(el) {
      el.innerHTML = "";
    };
  }
  if (window.addEventListener) {
    PU.extend(PU, {
      addEvent: function(el, type, fn) {
        el.addEventListener(type, fn, false);
      },
      removeEvent: function(el, type, fn) {
        el.removeEventListener(type, fn, false);
      },
      stopEvent: function(event) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  } else {
    PU.extend(PU, {
      addEvent: function(el, type, fn) {
        el["e" + type + fn] = fn;
        el[type + fn] = function() {
          el["e" + type + fn](window.event);
        };
        el.attachEvent("on" + type, el[type + fn]);
      },
      removeEvent: function(obj, type, fn) {
        obj.detachEvent("on" + type, obj[type + fn]);
        obj[type + fn] = null;
      },
      stopEvent: function(event) {
        event.returnValue = false;
        event.cancelBubble = true;
      }
    });
  }
  PU.DomReady = {
    init: function() {
      PU.addEvent(document, "DOMContentLoaded", this.fire);
      if (PU.ie <= 8) {
        if (window.top === window.self) {
          this.iePollTimer = window.setInterval(this.iePoll, 10);
          PU.addEvent(window, "beforeunload", function() {
            window.clearInterval(PU.DomReady.iePollTimer);
          });
        }
      }
      PU.addEvent(window, "load", this.fire);
      PU.addEvent(window, "beforeunload", function() {
        PU.DomReady.disable();
      });
    },
    handlers: [],
    fired: false,
    fire: function() {
      if (PU.DomReady.fired) {
        return;
      }
      PU.DomReady.fired = true;
      PU.forEach(PU.DomReady.handlers, function(handler) {
        try {
          handler.fn.call(handler.thisArg);
        } catch (ex) {
          PU.errorHandler("Error while firing DomReady: " + ex.message || ex);
        }
      });
    },
    add: function(fn, thisArg) {
      if (PU.DomReady.fired) {
        fn.call(thisArg);
      } else {
        PU.DomReady.handlers.push({
          fn: fn,
          thisArg: thisArg
        });
      }
    },
    disable: function() {
      PU.DomReady.fire = PU.DomReady.add = PU.addDomReady = function() {};
      PU.DomReady.fired = true;
    },
    iePollTimer: null,
    iePoll: function() {
      try {
        document.documentElement.doScroll("left");
        window.clearInterval(PU.DomReady.iePollTimer);
        PU.DomReady.fire();
      } catch (e) {
        return;
      }
    }
  };
  PU.DomReady.init();
  PU.addDomReady = PU.DomReady.add;
  var EventDelegation = (PU.EventDelegation = {
    clickEvents: {},
    init: function() {
      PU.addEvent(document.body, "click", EventDelegation.click);
    },
    addClick: function(className, fn) {
      if (!EventDelegation.clickEvents[className]) {
        EventDelegation.clickEvents[className] = [];
      }
      EventDelegation.clickEvents[className].push(fn);
    },
    click: function(event) {
      var el = event.target || event.srcElement;
      if (!el) {
        return;
      }
      while (el && el.nodeName != "A") {
        el = el.parentNode;
      }
      if (!el) {
        return;
      }
      var classes = el.className.split(" ");
      PU.forEach(classes, function(className) {
        var events = EventDelegation.clickEvents[className];
        if (events) {
          PU.forEach(events, function(eventFn) {
            eventFn.call(el, event);
          });
        }
      });
    }
  });
  var getXHR = function() {
    return false;
  };
  if (window.XMLHttpRequest) {
    getXHR = function() {
      return new XMLHttpRequest();
    };
  } else {
    if (window.ActiveXObject) {
      getXHR = function() {
        try {
          return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            return new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {}
        }
      };
    }
  }
  if (window.JSON && JSON.parse) {
    PU.decodeJSON = JSON.parse;
  } else {
    PU.decodeJSON = function(text) {
      return eval("(" + text + ")");
    };
  }
  var ajax = (PU.ajax = function(url, options) {
    if (ajax._xhr) {
      ajax._xhr.onreadystatechange = emptyFn;
      ajax._xhr.abort();
    }
    options = PU.extend(
      {
        type: "post",
        responseType: "text",
        noCache: true,
        onSuccess: emptyFn,
        onFailure: emptyFn,
        onComplete: emptyFn
      },
      options
    );
    var xhr = getXHR();
    var data = null;
    if (!xhr) {
      return;
    }
    if (options.noCache) {
      if (url.indexOf("?") == -1) {
        if (!url.endsWith("/")) {
          url += "/";
        }
        url += "?ts=" + new Date().getTime();
      } else {
        url += "&ts=" + new Date().getTime();
      }
    }
    if (options.type == "post") {
      if (options.parameters) {
        var values = [];
        for (var key in options.parameters || {}) {
          values.push(key + "=" + encodeURI(options.parameters[key]));
        }
        data = values.join("&");
      }
    }
    var formPost;
    var queryString;
    if (url) {
      if (url.length > maxCharactersForUrlPost) {
        formPost = true;
      }
    }
    if (formPost) {
      queryString = url.substring(url.indexOf("?") + 1);
      url = url.substring(0, url.indexOf("?"));
    }
    xhr.open(options.type, url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (options.responseType == "json") {
            var result = PU.decodeJSON(xhr.responseText);
          } else {
            var result = xhr.responseText;
          }
          options.onSuccess(xhr, result);
          options.onComplete(xhr, result);
        } else {
          options.onFailure(xhr);
        }
      }
    };
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (options.type == "post") {
      if (formPost) {
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        data = queryString;
      } else {
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
      }
    }
    try {
      xhr.send(data);
      ajax._xhr = xhr;
    } catch (e) {}
  });
  PU.load = function(el, url, options) {
    PU.addClassName(el, "loading");
    PU.addClassName(document.body, "bodyLoading");
    options = PU.extend(
      {
        onSuccess: function(xhr) {
          PU.removeClassName(el, "loading");
          PU.removeClassName(document.body, "bodyLoading");
        },
        onFailure: function(xhr) {
          window.location = url;
        }
      },
      options
    );
    ajax(url, options);
  };
  PU.Animate = {
    getScroll: function() {
      return window.scrollY || document.documentElement.scrollTop || 0;
    },
    setScroll: function(to) {
      window.scrollTo(0, to);
    },
    easeInOut: function(progress) {
      return -Math.cos(progress * Math.PI) / 2 + 0.5;
    },
    scrollTo: function(to) {
      var from = PU.Animate.getScroll(),
        lastTime = new Date().getTime(),
        progress = 0;
      var timer = setInterval(function() {
        var now = new Date().getTime();
        var timePassed = now - lastTime;
        var movement = timePassed / 300;
        lastTime = now;
        progress += movement;
        if (progress < 1) {
          var value = PU.Animate.easeInOut(progress);
          value = Number(from + (to - from) * value).toFixed(0);
          PU.Animate.setScroll(value);
        } else {
          PU.Animate.setScroll(to);
          clearInterval(timer);
        }
      }, 10);
    }
  };
  PU.Callback = {
    callbacks: {},
    add: function(section, name, fn, thisArg) {
      var sectionName = section + "_" + name;
      if (!this.callbacks[sectionName]) {
        this.callbacks[sectionName] = [];
      }
      this.callbacks[sectionName].push({
        fn: fn,
        thisArg: thisArg
      });
    },
    fire: function(section, name) {
      var sectionName = section + "_" + name;
      if (!this.callbacks[sectionName]) {
        return;
      }
      var args = Array.prototype.splice.call(arguments, 2);
      PU.forEach(this.callbacks[sectionName], function(callback) {
        try {
          callback.fn.apply(callback.thisArg, args);
        } catch (ex) {
          alert("Error while firing callback: " + ex.message || ex);
        }
      });
    }
  };
  PU.Controls = {};
  PU.Controls.Expand = function(el, togglerEl, options) {
    this.el = el;
    this.togglerEl = togglerEl;
    this.options = PU.extend(
      {
        collapseByDefault: false
      },
      options
    );
    this.el.style.overflow = "hidden";
    this.originalHeight = this.el.offsetHeight + "px";
    PU.addEvent(togglerEl, "click", this.toggle.bind(this));
    if (this.options.collapseByDefault) {
      this.el.style.height = "0px";
    }
  };
  PU.Controls.Expand.prototype = {
    toggle: function(e) {
      var newHeight =
        this.el.style.height == "0px" ? this.originalHeight : "0px";
      this.el.style.height = newHeight;
      PU.stopEvent(e);
    }
  };
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };
  }
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(thisArg) {
      var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
          return fToBind.apply(
            this instanceof fNOP ? this : thisArg || window,
            aArgs.concat(Array.prototype.slice.call(arguments))
          );
        };
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    };
  }
})();
window.onerror = PU.errorHandler;
(function(a, e) {
  var d = (PU.Widgets = {
    jobListingInstances: {},
    searchInstances: {},
    jobMailInstances: {},
    callbacks: {},
    filterMapping: {
      Keyword: "search-keyword",
      WorkTypes: "work-type",
      Categories: "category",
      CategoryGroups: "category-group",
      Locations: "location",
      LocationGroups: "location-group",
      Location: "location",
      Brands: "brand",
      Departments: "department",
      SubDepartments: "sub-department",
      PayScales: "pay-scale",
      PayScaleAreas: "pay-scale-area",
      JobSectors: "job-sector",
      JobSystemTypes: "system-type",
      JobSystemType: "system-type"
    },
    jobListing: function(f, j, i, g, h) {
      d.jobListingInstances[f] = new b(f, h);
      d.jobListingInstances[f].init(j, i, g);
      return d.jobListingInstances[f];
    },
    search: function(f, j, i, g, h) {
      d.searchInstances[f] = new c(f, h, c.prototype.MODE_SEARCH);
      d.searchInstances[f].init(j, i, g);
      return d.searchInstances[f];
    },
    jobMail: function(f, j, i, g, h) {
      d.jobMailInstances[f] = new c(f, h, c.prototype.MODE_JOBMAIL);
      d.jobMailInstances[f].init(j, i, g);
      return d.jobMailInstances[f];
    },
    movePage: function(f) {
      var g = this.id.split("_");
      d.jobListingInstances[g[0]].movePage(g[1]);
    },
    getBaseUrl: function(g) {
      var f = g;
      if (g.substr(0, 7) != "http://" && g.substr(0, 8) != "https://") {
        f = "http://" + f;
      }
      if (g.charAt(g.length - 1) != "/") {
        f += "/";
      }
      return f;
    },
    getBaseDomain: function(f) {
      var g = f.split("/");
      if (PU.isNumber(g[g.length - 2])) {
        return f.replace(g[g.length - 2] + "/", "");
      }
      return f;
    },
    getPageUpFooter: function() {
      var h = document.createElement("a");
      var f = document.createTextNode("Powered by PageUp");
	  h.setAttribute("class", "rs_skip");
      h.setAttribute("target", "_top");
      h.appendChild(f);
      h.href = "https://www.pageuppeople.com/powered-by-pageup/";
      var g = document.createElement("p");
      g.setAttribute("id", "PageUpPeopleLink");
      g.appendChild(h);
      return g;
    }
  });
  var c = (PU.Widgets.SearchBase = function(f, g, h) {
    this.id = f;
    this.options = g;
    this.widgetMode = h;
    this.dataUrl = "";
    this.jsonData = "";
    this.baseDomain = "";
    this.subscribeUrl = "";
    this.maxFilterId = 0;
    this.element = document.getElementById(f);
    if (!this.element) {
      throw new Error("No container with id '" + f + "'");
    }
  });
  c.prototype = {
    NO_GROUP_KEY: "AAAAAA_NO_GROUP",
    TYPE_CHECKBOX: "checkbox",
    TYPE_DROPDOWN: "dropdown",
    MODE_SEARCH: "searchWidget",
    MODE_JOBMAIL: "jobMailWidget",
    init: function(h, g, f) {
      this.buildUrls(h, g, f);
      this.options = PU.extend(
        {
          filters: {
            Keyword: "Search",
            WorkTypes: "Work type",
            Categories: "Category",
            Brands: "Brand",
            Departments: "Department",
            Locations: "Location"
          },
          subscribeButtonText: "Subscribe",
          emailText: "Email",
          allText: "All",
          successText: "You have been successfully subscribed to job alerts",
          errorText:
            "Error subscribing to job alerts. Please check your email address, and try again",
          selectText: "Select",
          submitButtonText: "Search",
          useListingWidget: null,
          filterType: this.TYPE_DROPDOWN,
          displayCounts: false,
          autoSearch: false
        },
        this.options
      );
      this.includeData();
      if (this.widgetMode == this.MODE_JOBMAIL) {
        this.options.filterType = this.TYPE_CHECKBOX;
      }
      if (
        this.options.useListingWidget &&
        this.widgetMode == this.MODE_SEARCH
      ) {
        this.jobListingWidget =
          d.jobListingInstances[this.options.useListingWidget];
        if (!this.jobListingWidget) {
          throw new Error(
            "Search widget " +
              this.id +
              ': No job listing widget with ID "' +
              this.options.useListingWidget +
              '" found'
          );
        }
      }
    },
    buildUrls: function(i, h, g) {
      var f = d.getBaseUrl(i);
      this.baseDomain = d.getBaseDomain(f);
      f += h + "/" + g + "/";
      if (this.widgetMode == this.MODE_SEARCH) {
        this.dataUrl =
          f +
          'searchfilter.json?callback=PU.Widgets.searchInstances["' +
          this.id +
          '"].setData';
        this.postUrl = f + "filter/";
      } else {
        this.dataUrl =
          f +
          'jobmail.json?callback=PU.Widgets.jobMailInstances["' +
          this.id +
          '"].setData';
        this.subscribeUrl =
          f +
          'subscribe.json?callback=PU.Widgets.jobMailInstances["' +
          this.id +
          '"].setSuccess';
        this.postUrl = f + "subscribe/";
      }
    },
    setSuccess: function(i) {
      PU.Callback.fire(this.widgetMode, "loaded", this.id);
      var j = document.getElementById(this.id);
      var g = PU.getElementsByClassName("message-wrapper", j)[0];
      var h = PU.getElementsByClassName("submit-wrapper", j)[0];
      var f = document.createElement("p");
      if (i) {
        PU.emptyHTML(h);
        PU.addClassName(f, "success");
        f.innerHTML = this.options.successText;
      } else {
        PU.addClassName(f, "error");
        f.innerHTML = this.options.errorText;
      }
      PU.emptyHTML(g);
      g.appendChild(f);
    },
    draw: function() {
      PU.Callback.fire(this.widgetMode, "loaded", this.id);
      PU.emptyHTML(this.element);
      if (this.element && this.jsonData) {
        var f = this.getContent();
        this.element.appendChild(f);
      }
    },
    getContent: function() {
      var A = document.createElement("div");
      if (this.widgetMode == this.MODE_SEARCH) {
        PU.addClassName(A, "search-wrapper");
      } else {
        PU.addClassName(A, "job-mail-wrapper");
        var j = document.createElement("div");
        PU.addClassName(j, "field-wrapper");
        j.appendChild(this.getFieldTitle(this.options.emailText));
        j.appendChild(this.getTextField("job-mail-subscribe-email"));
        var v = document.createElement("input");
        v.setAttribute("type", "hidden");
        v.setAttribute("name", "job-mail-subscribe-privacy");
        v.setAttribute("value", "true");
        j.appendChild(v);
        A.appendChild(j);
      }
      for (var m in this.options.filters) {
        if (!this.options.filters.hasOwnProperty(m)) {
          continue;
        }
        var g = 0,
          l = document.createElement("div"),
          o = this.getFormName(m),
          p = this.id + "_" + o,
          k;
        PU.addClassName(l, "field-wrapper");
        if (this.options.filterType == this.TYPE_DROPDOWN) {
          k = document.createElement(this.options.legacy ? "div" : "label");
          k.setAttribute("for", p);
          PU.addClassName(k, "field-title");
          k.innerHTML = this.options.filters[m];
          l.appendChild(k);
        } else {
          if (this.options.filterType == this.TYPE_CHECKBOX) {
            l.appendChild(this.getFieldTitle(this.options.filters[m]));
          }
        }
        if (m == "Keyword") {
          l.appendChild(this.getTextField(m));
          g++;
        } else {
          var n = this.jsonData[m];
          if (n) {
            var h = new Array();
            for (var w in n) {
              var y = w.split("|");
              var u = this.NO_GROUP_KEY;
              var s = y[0];
              if (y.length > 1) {
                u = y[0];
                s = y[1];
              }
              if (!h[u]) {
                h[u] = new Array();
              }
              var q = s;
              var f = s
                .replace(new RegExp(",", "g"), "")
                .trim()
                .toLowerCase();
              if (
                this.widgetMode == this.MODE_SEARCH &&
                this.options.displayCounts
              ) {
                q += " (" + n[w] + ")";
              }
              h[u].push({
                filterLabel: q,
                filterValue: f
              });
            }
            h.sort();
            var r = this.buildFilterList(h, m, p, o);
            var i = r.dropDown;
            g += r.count;
            l.appendChild(i);
          }
        }
        if (g > 0) {
          A.appendChild(l);
        }
      }
      if (A.childNodes.length > 0) {
        var z = document.createElement("div");
        PU.addClassName(z, "submit-wrapper");
        if (this.widgetMode == this.MODE_SEARCH) {
          z.appendChild(this.getSubmitButton(this.options.submitButtonText));
        } else {
          var x = document.createElement("div");
          PU.addClassName(x, "message-wrapper");
          A.appendChild(x);
          z.appendChild(this.getSubmitButton(this.options.subscribeButtonText));
        }
        A.appendChild(z);
        if (
          this.widgetMode == this.MODE_JOBMAIL &&
          document.getElementById("PageUpPeopleLink") == null
        ) {
          A.appendChild(d.getPageUpFooter());
        }
      }
      var t = this.getForm();
      t.appendChild(A);
      return t;
    },
    compareFilters: function(f, g) {
      if (f.filterLabel < g.filterLabel) {
        return -1;
      }
      if (f.filterLabel > g.filterLabel) {
        return 1;
      }
      return 0;
    },
    buildFilterList: function(g, j, l, k) {
      var f = 0;
      var h = this.getDropdown(j, l, k);
      if (this.widgetMode == this.MODE_JOBMAIL) {
        h.appendChild(
          this.getOption(
            {
              filterLabel: this.options.allText
            },
            k,
            j
          )
        );
      }
      for (var n in g) {
        if (!g.hasOwnProperty(n)) {
          continue;
        }
        if (g[n].sort) {
          g[n].sort(this.compareFilters);
        }
        if (n == this.NO_GROUP_KEY) {
          for (var m in g[n]) {
            if (!g[n].hasOwnProperty(m)) {
              continue;
            }
            h.appendChild(this.getOption(g[n][m], k, j));
            f++;
          }
        } else {
          var o = this.getOptionGroup(n);
          for (var m in g[n]) {
            if (!g[n].hasOwnProperty(m)) {
              continue;
            }
            o.inner.appendChild(this.getOption(g[n][m], k, j));
            f++;
          }
          h.appendChild(o.outer);
        }
      }
      return {
        dropDown: h,
        count: f
      };
    },
    getFormName: function(f) {
      var g = d.filterMapping[f];
      if (!g || g == "") {
        return f;
      }
      return g;
    },
    getForm: function() {
      var f = document.createElement("form");
      f.setAttribute("method", "GET");
      f.setAttribute("action", this.postUrl);
      PU.addEvent(f, "submit", this.handleSubmit.bind(this));
      return f;
    },
    getFieldTitle: function(f) {
      var g = document.createElement("h3");
      PU.addClassName(g, "field-title");
      g.innerHTML = f;
      return g;
    },
    getSubmitButton: function(g) {
      var f = document.createElement("input");
      f.setAttribute("type", "submit");
      f.setAttribute("value", g);
      PU.addClassName(f, "submit-button");
      return f;
    },
    getTextField: function(f) {
      var g = document.createElement("input");
      g.setAttribute("type", "text");
      g.setAttribute("name", this.getFormName(f));
      PU.addClassName(g, f);
      return g;
    },
    getDropdown: function(g, i, h) {
      var f;
      if (this.options.filterType == this.TYPE_CHECKBOX) {
        dropDown = document.createElement("ul");
      } else {
        if (this.options.filterType == this.TYPE_DROPDOWN) {
          dropDown = document.createElement("select");
          dropDown.setAttribute("name", h);
          if (this.options.autoSearch) {
            PU.addEvent(dropDown, "change", this.onFilterChange.bind(this));
          }
        }
      }
      PU.addClassName(dropDown, g);
      dropDown.setAttribute("id", i);
      dropDown.setAttribute("data-filter-name", g);
      if (
        this.options.selectText.length > 0 &&
        this.options.filterType == this.TYPE_DROPDOWN
      ) {
        dropDown.appendChild(this.getSelectOption(this.options.selectText));
      }
      return dropDown;
    },
    getSelectOption: function(g) {
      var f = document.createElement("option");
      f.innerHTML = g;
      f.setAttribute("value", "");
      return f;
    },
    getOption: function(k, h, g) {
      if (this.options.filterType == this.TYPE_DROPDOWN) {
        var j = document.createElement("option");
        j.innerHTML = k.filterLabel;
        j.setAttribute("value", k.filterValue);
        return j;
      } else {
        if (this.options.filterType == this.TYPE_CHECKBOX) {
          var j = document.createElement("li"),
            i = this.id + "_filter_" + this.maxFilterId++;
          var f = document.createElement("input");
          f.type = "checkbox";
          f.name = h;
          f.value = k.filterValue;
          f.setAttribute("data-filter-name", g);
          f.id = i;
          if (this.widgetMode == this.MODE_JOBMAIL) {
            if (k.filterLabel == this.options.allText) {
              f.value = "";
              f.checked = true;
              f.defaultChecked = true;
              PU.addClassName(j, "all");
            } else {
              f.value = k.filterValue;
            }
            PU.addEvent(f, "change", this.onFilterChange);
            if (PU.ie) {
              PU.addEvent(f, "click", function() {
                try {
                  this.blur();
                  this.focus();
                } catch (m) {}
              });
            }
          }
          if (this.options.autoSearch) {
            PU.addEvent(f, "click", this.onFilterChange.bind(this));
          }
          var l = document.createElement("label");
          l.setAttribute("for", i);
          l.innerHTML = k.filterLabel;
          j.appendChild(f);
          j.appendChild(l);
          return j;
        }
      }
    },
    getOptionGroup: function(f) {
      if (this.options.filterType == this.TYPE_DROPDOWN) {
        var h = document.createElement("optgroup");
        h.setAttribute("label", f);
        return {
          inner: h,
          outer: h
        };
      } else {
        if (this.options.filterType == this.TYPE_CHECKBOX) {
          var g = document.createElement("li");
          var i = document.createElement("ul");
          var j = document.createElement("h4");
          j.innerHTML = f;
          g.appendChild(j);
          g.appendChild(i);
          return {
            inner: i,
            outer: g
          };
        }
      }
    },
    includeData: function() {
      var f = document.getElementsByTagName("head")[0];
      var g = document.createElement("script");
      g.type = "text/javascript";
      g.src = this.dataUrl;
      f.appendChild(g);
      PU.Callback.fire(this.widgetMode, "loading", this.id);
    },
    setData: function(f) {
      this.jsonData = f;
      this.draw();
    },
    onFilterChange: function(g) {
      PU.clickedElementId = this.id;
      if (this.jobListingWidget) {
        if (PU.getParameterByName("job").length > 0 && e.history.pushState) {
          this.jobListingWidget.setUrl();
        }
        this.jobListingWidget.updateFilters(this.getFilters());
      }
      if (this.widgetMode == this.MODE_JOBMAIL) {
        var j = this;
        while (!PU.hasClassName(j, "field-wrapper")) {
          j = j.parentNode;
          if (j == null) {
            break;
          }
        }
        var f = PU.getElementsByClassName("all", j);
        if (f.length > 0) {
          var i = f[0].getElementsByTagName("input");
          if (i.length > 0) {
            if (PU.clickedElementId == i[0].id) {
              var h = j.getElementsByTagName("input");
              PU.forEach(h, function(k) {
                if (k.id != i[0].id) {
                  k.checked = false;
                }
              });
            } else {
              i[0].checked = false;
            }
          }
        }
        PU.stopEvent(g);
      }
    },
    handleSubmit: function(f) {
      if (this.jobListingWidget) {
        this.onFilterChange();
        PU.stopEvent(f);
      }
      if (this.widgetMode == this.MODE_JOBMAIL) {
        var i = document.getElementById("job-mail-poster");
        if (i != null) {
          i.parentNode.removeChild(i);
        }
        var g = document.getElementsByTagName("head")[0];
        var h = document.createElement("script");
        h.id = "job-mail-poster";
        h.type = "text/javascript";
        h.src = this.serializeForm();
        g.appendChild(h);
        PU.Callback.fire(this.widgetMode, "loading", this.id);
        PU.stopEvent(f);
      }
    },
    serializeForm: function() {
      var h = document.getElementById(this.id);
      var f = h.getElementsByTagName("form")[0];
      var g = f.getElementsByTagName("input");
      return this.subscribeUrl + "&" + PU.serialize(g);
    },
    getFilters: function() {
      var g = {};
      if (this.options.filterType === this.TYPE_DROPDOWN) {
        var f = this.element.getElementsByTagName("select");
        PU.forEachElement(f, function(i) {
          if (i.value) {
            g[i.getAttribute("data-filter-name")] = i.value;
          }
        });
      } else {
        if (this.options.filterType === this.TYPE_CHECKBOX) {
          var f = this.element.getElementsByTagName("input");
          PU.forEachElement(f, function(i) {
            if (i.type == "checkbox" && i.checked) {
              if (g[i.getAttribute("data-filter-name")]) {
                g[i.getAttribute("data-filter-name")] += "," + i.value;
              } else {
                g[i.getAttribute("data-filter-name")] = i.value;
              }
            }
          });
        }
      }
      var h = PU.getElementsByClassName("Keyword", this.element);
      if (h && h.length > 0 && h[0].value) {
        g.Keyword = h[0].value;
      }
      return g;
    }
  };
  var b = (PU.Widgets.JobListing = function(f, g) {
    this.id = f;
    this.page = 0;
    this.options = g;
    this.baseDomain = "";
    this.dataUrl = "";
    this.jobDetailBaseUrl = "";
    this.jsonData = null;
    this.cleanLoad = true;
    this.element = document.getElementById(f);
    if (!this.element) {
      throw new Error("No container with id '" + f + "'");
    }
  });
  b.prototype = {
    TYPE_TABLE: "table",
    init: function(i, h, g) {
      this.buildUrls(i, h, g);
      var f = {
        template: "",
        emptyResultText: "No jobs found",
        jobNotFoundText:
          "Sorry, we can't provide additional information about this job right now.",
        paging: false,
        jobsPerPage: 5,
        numberOfPages: 20,
        pageAutoMove: false,
        pageMoveTime: 10,
        jobDetailsTemplate:
          '[Overview]<p><a href="[ApplyUrl]">Apply</a> | <a href="#" class="back-link">Back</a></p>',
        loadDetailsInline: false,
        scrollOnReturn: true,
        listingType: "ul",
        dateFormatter: PU.formatDate
      };
      if (this.options && this.options.listingType === this.TYPE_TABLE) {
        f.template =
          '<td><a href="[JobDetailUrl]">[Title]</a></td><td>[Brand]</td><td>[ClosingDateUtc]</td>';
        f.headerTemplate =
          "<table><thead><tr><th>Job</th><th>Brand</th><th>Closing Date</th></tr></thead><tbody>";
        f.footerTemplate = "</tbody></table>";
      } else {
        f.template =
          '<a href="[JobDetailUrl]">[Title]</a><br /><p>[Summary]</p>';
        f.headerTemplate = '<ul class="jobs-listing">';
        f.footerTemplate = "</ul>";
      }
      this.options = PU.extend(f, this.options);
      this.includeData();
    },
    buildUrls: function(i, h, g) {
      var f = d.getBaseUrl(i);
      this.baseDomain = d.getBaseDomain(f);
      f += h + "/" + g + "/";
      this.dataUrl =
        f +
        'jobs.json?callback=PU.Widgets.jobListingInstances["' +
        this.id +
        '"].setData';
      this.jobDetailBaseUrl = f + "job/";
      PU.addEvent(e, "popstate", this.backClick.bind(this));
    },
    buildFilteredDataUrl: function(h) {
      var f = this.dataUrl + "&dt=" + +new Date();
      if (!this.options.filters) {
        return f;
      }
      for (var g in this.options.filters) {
        if (d.filterMapping[g]) {
          var i = this.options.filters[g].split(",");
          PU.forEach(i, function(j) {
            f += "&" + d.filterMapping[g] + "=" + encodeURIComponent(j.trim());
          });
        }
      }
      return f;
    },
    draw: function() {
      PU.Callback.fire("listingWidget", "loaded", this.id);
      PU.emptyHTML(this.element);
      this.contentWrapper = null;
      if (this.element && this.jsonData) {
        var f = (this.contentWrapper = this.getContent());
        this.element.appendChild(f);
        if (this.options.pageAutoMove) {
          this.moveNext();
        }
        if (
          this.options.loadDetailsInline &&
          this.cleanLoad &&
          PU.getParameterByName("job").length > 0
        ) {
          var g = this.getJob(PU.getParameterByName("job"));
          this.cleanLoad = false;
          if (g != null) {
            this.renderJobDetails(g);
          } else {
            f.innerHTML = this.options.jobNotFoundText;
          }
        }
      }
    },
    backClick: function(f) {
      PU.stopEvent(f);
      this.cleanLoad = true;
      this.draw();
    },
    getContent: function() {
      var l = document.createElement("div");
      PU.addClassName(l, "job-listing-wrapper");
      if (this.jsonData.length == 0) {
        this.options.pageAutoMove = false;
        l.innerHTML = this.options.emptyResultText;
        return l;
      }
      var k = this.page * this.options.jobsPerPage;
      var f = k + this.options.jobsPerPage;
      this.currentPageCount = this.jsonData.length / this.options.jobsPerPage;
      if (this.jsonData.length < f) {
        f = this.jsonData.length;
      }
      if (this.currentPageCount > this.options.numberOfPages) {
        this.currentPageCount = this.options.numberOfPages;
      }
      var i = this.getJobsList(k, f);
      if (this.options.loadDetailsInline) {
        var g = this.jobClick.bind(this),
          h = PU.getElementsByClassName("job-link", i);
        PU.forEachElement(h, function(m) {
          PU.addEvent(m, "click", g);
        });
      }
      l.appendChild(i);
      if (this.options.paging) {
        var j = this.getPagingControl(
          this.options.jobsPerPage,
          this.currentPageCount,
          this.jsonData.length,
          this.page
        );
        if (j) {
          l.appendChild(j);
        } else {
          this.options.pageAutoMove = false;
        }
      }
      if (document.getElementById("PageUpPeopleLink") == null) {
        l.appendChild(d.getPageUpFooter());
      }
      return l;
    },
    moveNext: function() {
      this.movePage(this.page);
      if (this.page < this.currentPageCount - 1) {
        this.page++;
      } else {
        this.page = 0;
      }
      this.startMoving();
    },
    startMoving: function() {
      var f = this;
      this.pageTimer = setTimeout(function() {
        f.moveNext(f.page);
      }, this.options.pageMoveTime * 1000);
    },
    stopMoving: function() {
      clearTimeout(this.pageTimer);
      this.pageTimer = null;
    },
    getJobsList: function(l, g) {
      var h = [];
      h.push(this.options.headerTemplate);
      for (var j = l; j < g; j++) {
        var k = this.mergeJob(this.jsonData[j], this.options.template);
        if (this.options.listingType == this.TYPE_TABLE) {
          h.push("<tr>");
          h.push(k);
          h.push("</tr>");
        } else {
          h.push('<li class="jobs-item">');
          h.push(k);
          h.push("</li>");
        }
      }
      h.push(this.options.footerTemplate);
      var f = PU.parseHTML(h.join(""));
      if (!f || !f.childNodes[0]) {
        throw new Error("Could not parse job listing HTML");
      }
      return f.childNodes[0];
    },
    mergeJob: function(g, j) {
      var l = [],
        m = /\[([^\]]+)\]/g,
        f;
      var j = j.replace(
          '<a href="[JobDetailUrl]"',
          '<a href="[JobDetailUrl]" class="job-link" data-job-id="[Id]"'
        ),
        k = j,
        n;

      j = j.replace(
        '<a href="[JobDetailUrl]" class="job-link" data-job-id="[Id]">[Title]</a>',
        "x"
      );
      j = j.replace(
        "[ClosingDateUtc]",
        '<a href="[JobDetailUrl]" class="job-link" data-job-id="[Id]">[Title]</a>'
      );
      j = j.replace("x", "[ClosingDateUtc]");
      k = j;

      while ((f = m.exec(j))) {
        n = g[f[1]];
        if (f[0] == "[JobDetailUrl]") {
          n = this.getJobDetailUrl(g);
        } else {
          if (f[0].indexOf("DateUtc") > -1) {
            var h = g[f[1]],
              i = h ? this.options.dateFormatter(PU.parseDotNetDate(h)) : "";
            n = i;
          }
        }
        k = k.replace(f[0], n);
      }
      return k;
    },
    getJobDetailUrl: function(g) {
      var f = g.Title.trim()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      if (this.options.loadDetailsInline) {
        return this.cleanUrl(g.Id);
      } else {
        return this.jobDetailBaseUrl + g.Id + "/" + f;
      }
    },
    getPagingControl: function(g, h, o, k) {
      if (o < g) {
        return null;
      }
      var n = document.createElement("div");
      PU.addClassName(n, "paging-wrapper");
      var m = document.createElement("ul");
      PU.addClassName(m, "paging-list");
      for (var f = 0; f < h; f++) {
        var j = document.createElement("li");
        PU.addClassName(j, "paging-item");
        var l = document.createElement("a");
        l.setAttribute("id", this.id + "_" + f);
        PU.addEvent(l, "click", d.movePage);
        if (k == f) {
          PU.addClassName(l, "active-page");
        } else {
          PU.addClassName(l, "inactive-page");
        }
        l.innerHTML = f + 1;
        j.appendChild(l);
        m.appendChild(j);
      }
      n.appendChild(m);
      return n;
    },
    movePage: function(g) {
      this.page = g;
      PU.emptyHTML(this.element);
      if (this.element && this.jsonData) {
        var f = (this.contentWrapper = this.getContent());
        this.element.appendChild(f);
      }
    },
    includeData: function() {
      var f = document.getElementsByTagName("head")[0];
      var g = document.createElement("script");
      g.type = "text/javascript";
      g.src = this.buildFilteredDataUrl();
      f.appendChild(g);
      PU.Callback.fire("listingWidget", "loading", this.id);
    },
    setData: function(f) {
      this.jsonData = f;
      this.draw();
    },
    updateFilters: function(f) {
      PU.emptyHTML(this.element);
      this.element.innerHTML = "Loading...";
      this.options.filters = f;
      this.includeData();
      this.stopMoving();
      this.page = 0;
    },
    getJob: function(h) {
      for (var g = 0, f = this.jsonData.length; g < f; g++) {
        if (this.jsonData[g].Id == h) {
          return this.jsonData[g];
        }
      }
    },
    jobClick: function(f) {
      var i = f.target || f.srcElement,
        g = i.getAttribute("data-job-id"),
        h = this.getJob(g);
      if (!h) {
        return;
      }
      this.stopMoving();
      this.renderJobDetails(h);
      if (this.options.loadDetailsInline) {
        this.setUrl(g);
      }
      PU.stopEvent(f);
      return false;
    },
    cleanUrl: function(f) {
      var g = e.location.href
        .replace(/\?job=(\d+-?)+\d+/g, "")
        .replace(/\&job=(\d+-?)+\d+/g, "")
        .replace("#", "");
      if (f != null && f.length > 0) {
        g += g.indexOf("?") == -1 ? "?job=" + f : "&job=" + f;
      }
      return g;
    },
    renderJobDetails: function(h) {
      this.oldScroll = PU.Animate.getScroll();
      var i = (this.jobDetailsEl = document.createElement("div"));
      i.id = this.id + "_details";
      i.setAttribute("data-job-id", h.Id);
      PU.addClassName(i, "job-details");
      PU.addClassName(i, "template_" + h.DesignTemplateCode);
      i.innerHTML = this.mergeJob(h, this.options.jobDetailsTemplate);
      var g = false;
      if (this.options.loadDetailsInline) {
        g = this.cleanUrl();
      }
      var f = this.backToListing.bind(this);
      PU.forEachElement(PU.getElementsByClassName("back-link", i), function(j) {
        PU.addEvent(j, "click", f);
        if (g) {
          j.href = g;
        }
      });
      PU.hide(this.contentWrapper);
      this.element.appendChild(i);
      e.scrollTo(0, 0);
      PU.Callback.fire("listingWidget", "jobOpened", this.id, h.Id);
    },
    backToListing: function(f) {
      if (this.jobDetailsEl) {
        this.jobDetailsEl.parentNode.removeChild(this.jobDetailsEl);
        PU.Callback.fire(
          "listingWidget",
          "jobClosed",
          this.id,
          this.jobDetailsEl.getAttribute("data-job-id")
        );
        if (this.options.loadDetailsInline) {
          this.setUrl();
        }
      }
      PU.show(this.contentWrapper);
      if (this.options.scrollOnReturn) {
        PU.Animate.scrollTo(this.oldScroll);
      }
      if (this.options.pageAutoMove) {
        this.startMoving();
      }
      PU.stopEvent(f);
      return false;
    },
    setUrl: function(f) {
      if (e.history.pushState) {
        e.history.pushState(
          {
            job: f
          },
          "",
          this.cleanUrl(f)
        );
      }
    }
  };
  b.stopAll = function() {
    for (var f in d.jobListingInstances) {
      if (!d.jobListingInstances.hasOwnProperty(f)) {
        continue;
      }
      d.jobListingInstances[f].stopMoving();
    }
  };
  if (!e.Careers) {
    e.Careers = {
      jobListingInstances: d.jobListingInstances,
      searchInstances: d.searchInstances,
      filterMapping: d.filterMapping,
      setListingData: d.setListingData,
      setFilterData: d.setFilterData,
      movePage: d.movePage,
      getBaseUrl: d.getBaseUrl,
      getBaseDomain: d.getBaseDomain,
      search: function(f, j, i, g, h) {
        h.legacy = true;
        return d.search(f, j, i, g, h);
      },
      jobListing: function(f, j, i, g, h) {
        h.legacy = true;
        return d.jobListing(f, j, i, g, h);
      }
    };
  }
  if (!e.CareersSearch) {
    e.CareersSearch = c;
  }
  if (!e.JobListing) {
    e.JobListing = b;
  }
})(window.PU.$, window);