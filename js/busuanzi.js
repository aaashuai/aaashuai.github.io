var bszCaller, bszTag;
(function () {
  var c, d, e, a = false, b = [];
  
  ready = function (c) {
    if (a || document.readyState === "interactive" || document.readyState === "complete") {
      return c.call(document);
    } else {
      b.push(function () {
        return c.call(this);
      });
      this;
    }
  };
  
  d = function () {
    for (var a = 0, c = b.length; c > a; a++) {
      b[a].apply(document);
    }
    b = [];
  };
  
  e = function () {
    if (!a) {
      a = true;
      d.call(window);
      if (document.removeEventListener) {
        document.removeEventListener("DOMContentLoaded", e, false);
      } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", e);
        if (window == window.top) {
          clearInterval(c);
          c = null;
        }
      }
    }
  };
  
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", e, false);
  } else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function () {
      if (/loaded|complete/.test(document.readyState)) {
        e();
      }
    });
    if (window == window.top) {
      c = setInterval(function () {
        try {
          if (!a && document.documentElement.doScroll("left")) return;
        } catch (b) {
          return;
        }
        e();
      }, 5);
    }
  }
})();

bszCaller = {
  fetch: function (url, call_func) {
    var c = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
    window[c] = this.evalCall(call_func);
    url = url.replace("=BusuanziCallback", "=" + c);
    console.log(url);
    scriptTag = document.createElement("SCRIPT");
    scriptTag.type = "text/javascript";
    scriptTag.defer = true;
    scriptTag.src = url;
    scriptTag.referrerPolicy = "no-referrer-when-downgrade";
    console.log(scriptTag);
    document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
  },
  evalCall: function (re_call) {
    return function (b) {
      ready(function () {
        try {
          console.log(b);
          re_call(b);
          scriptTag.parentElement.removeChild(scriptTag);
        } catch (c) {
          bszTag.hides();
        }
      });
    };
  }
};

bszCaller.fetch(
  "//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",
  function (a) {
    bszTag.texts(a);
    bszTag.shows();
  }
);

bszTag = {
  bszs: ["site_pv", "page_pv", "site_uv"],
  texts: function (a) {
    this.bszs.map(function (b) {
      var c = document.getElementById("busuanzi_value_" + b);
      if (c) {
        c.innerHTML = a[b];
      }
    });
  },
  hides: function () {
    this.bszs.map(function (a) {
      var b = document.getElementById("busuanzi_container_" + a);
      if (b) {
        b.style.display = "none";
      }
    });
  },
  shows: function () {
    this.bszs.map(function (a) {
      var b = document.getElementById("busuanzi_container_" + a);
      if (b) {
        b.style.display = "inline";
      }
    });
  }
};

