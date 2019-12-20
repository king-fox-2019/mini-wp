// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"semantic/dist/components/accordion.js":[function(require,module,exports) {
/*!
 * # Semantic UI 2.4.2 - Accordion
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.accordion = function (parameters) {
    var $allModules = $(this),
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);
    },
        returnedValue;

    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.accordion.settings, parameters) : $.extend({}, $.fn.accordion.settings),
          className = settings.className,
          namespace = settings.namespace,
          selector = settings.selector,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          moduleSelector = $allModules.selector || '',
          $module = $(this),
          $title = $module.find(selector.title),
          $content = $module.find(selector.content),
          element = this,
          instance = $module.data(moduleNamespace),
          observer,
          module;
      module = {
        initialize: function initialize() {
          module.debug('Initializing', $module);
          module.bind.events();

          if (settings.observeChanges) {
            module.observeChanges();
          }

          module.instantiate();
        },
        instantiate: function instantiate() {
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.debug('Destroying previous instance', $module);
          $module.off(eventNamespace).removeData(moduleNamespace);
        },
        refresh: function refresh() {
          $title = $module.find(selector.title);
          $content = $module.find(selector.content);
        },
        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            observer = new MutationObserver(function (mutations) {
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();
            });
            observer.observe(element, {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },
        bind: {
          events: function events() {
            module.debug('Binding delegated events');
            $module.on(settings.on + eventNamespace, selector.trigger, module.event.click);
          }
        },
        event: {
          click: function click() {
            console.log('accordion clicked');
            module.toggle.call(this);
          }
        },
        toggle: function toggle(query) {
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),
              isOpen = isActive && !isAnimating,
              isOpening = !isActive && isAnimating;
          module.debug('Toggling visibility of content', $activeTitle);

          if (isOpen || isOpening) {
            if (settings.collapsible) {
              module.close.call($activeTitle);
            } else {
              module.debug('Cannot close accordion content collapsing is disabled');
            }
          } else {
            module.open.call($activeTitle);
          }
        },
        open: function open(query) {
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),
              isOpen = isActive || isAnimating;

          if (isOpen) {
            module.debug('Accordion already open, skipping', $activeContent);
            return;
          }

          module.debug('Opening accordion content', $activeTitle);
          settings.onOpening.call($activeContent);
          settings.onChanging.call($activeContent);

          if (settings.exclusive) {
            module.closeOthers.call($activeTitle);
          }

          $activeTitle.addClass(className.active);
          $activeContent.stop(true, true).addClass(className.animating);

          if (settings.animateChildren) {
            if ($.fn.transition !== undefined && $module.transition('is supported')) {
              $activeContent.children().transition({
                animation: 'fade in',
                queue: false,
                useFailSafe: true,
                debug: settings.debug,
                verbose: settings.verbose,
                duration: settings.duration
              });
            } else {
              $activeContent.children().stop(true, true).animate({
                opacity: 1
              }, settings.duration, module.resetOpacity);
            }
          }

          $activeContent.slideDown(settings.duration, settings.easing, function () {
            $activeContent.removeClass(className.animating).addClass(className.active);
            module.reset.display.call(this);
            settings.onOpen.call(this);
            settings.onChange.call(this);
          });
        },
        close: function close(query) {
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),
              isOpening = !isActive && isAnimating,
              isClosing = isActive && isAnimating;

          if ((isActive || isOpening) && !isClosing) {
            module.debug('Closing accordion content', $activeContent);
            settings.onClosing.call($activeContent);
            settings.onChanging.call($activeContent);
            $activeTitle.removeClass(className.active);
            $activeContent.stop(true, true).addClass(className.animating);

            if (settings.animateChildren) {
              if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $activeContent.children().transition({
                  animation: 'fade out',
                  queue: false,
                  useFailSafe: true,
                  debug: settings.debug,
                  verbose: settings.verbose,
                  duration: settings.duration
                });
              } else {
                $activeContent.children().stop(true, true).animate({
                  opacity: 0
                }, settings.duration, module.resetOpacity);
              }
            }

            $activeContent.slideUp(settings.duration, settings.easing, function () {
              $activeContent.removeClass(className.animating).removeClass(className.active);
              module.reset.display.call(this);
              settings.onClose.call(this);
              settings.onChange.call(this);
            });
          }
        },
        closeOthers: function closeOthers(index) {
          var $activeTitle = index !== undefined ? $title.eq(index) : $(this).closest(selector.title),
              $parentTitles = $activeTitle.parents(selector.content).prev(selector.title),
              $activeAccordion = $activeTitle.closest(selector.accordion),
              activeSelector = selector.title + '.' + className.active + ':visible',
              activeContent = selector.content + '.' + className.active + ':visible',
              $openTitles,
              $nestedTitles,
              $openContents;

          if (settings.closeNested) {
            $openTitles = $activeAccordion.find(activeSelector).not($parentTitles);
            $openContents = $openTitles.next($content);
          } else {
            $openTitles = $activeAccordion.find(activeSelector).not($parentTitles);
            $nestedTitles = $activeAccordion.find(activeContent).find(activeSelector).not($parentTitles);
            $openTitles = $openTitles.not($nestedTitles);
            $openContents = $openTitles.next($content);
          }

          if ($openTitles.length > 0) {
            module.debug('Exclusive enabled, closing other content', $openTitles);
            $openTitles.removeClass(className.active);
            $openContents.removeClass(className.animating).stop(true, true);

            if (settings.animateChildren) {
              if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $openContents.children().transition({
                  animation: 'fade out',
                  useFailSafe: true,
                  debug: settings.debug,
                  verbose: settings.verbose,
                  duration: settings.duration
                });
              } else {
                $openContents.children().stop(true, true).animate({
                  opacity: 0
                }, settings.duration, module.resetOpacity);
              }
            }

            $openContents.slideUp(settings.duration, settings.easing, function () {
              $(this).removeClass(className.active);
              module.reset.display.call(this);
            });
          }
        },
        reset: {
          display: function display() {
            module.verbose('Removing inline display from element', this);
            $(this).css('display', '');

            if ($(this).attr('style') === '') {
              $(this).attr('style', '').removeAttr('style');
            }
          },
          opacity: function opacity() {
            module.verbose('Removing inline opacity from element', this);
            $(this).css('opacity', '');

            if ($(this).attr('style') === '') {
              $(this).attr('style', '').removeAttr('style');
            }
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          module.debug('Changing internal', name, value);

          if (value !== undefined) {
            if ($.isPlainObject(name)) {
              $.extend(true, module, name);
            } else {
              module[name] = value;
            }
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.accordion.settings = {
    name: 'Accordion',
    namespace: 'accordion',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    on: 'click',
    // event on title that opens accordion
    observeChanges: true,
    // whether accordion should automatically refresh on DOM insertion
    exclusive: true,
    // whether a single accordion content panel should be open at once
    collapsible: true,
    // whether accordion content can be closed
    closeNested: false,
    // whether nested content should be closed when a panel is closed
    animateChildren: true,
    // whether children opacity should be animated
    duration: 350,
    // duration of animation
    easing: 'easeOutQuad',
    // easing equation for animation
    onOpening: function onOpening() {},
    // callback before open animation
    onClosing: function onClosing() {},
    // callback before closing animation
    onChanging: function onChanging() {},
    // callback before closing or opening animation
    onOpen: function onOpen() {},
    // callback after open animation
    onClose: function onClose() {},
    // callback after closing animation
    onChange: function onChange() {},
    // callback after closing or opening animation
    error: {
      method: 'The method you called is not defined'
    },
    className: {
      active: 'active',
      animating: 'animating'
    },
    selector: {
      accordion: '.accordion',
      title: '.title',
      trigger: '.title',
      content: '.content'
    }
  }; // Adds easing

  $.extend($.easing, {
    easeOutQuad: function easeOutQuad(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
  });
})(jQuery, window, document);
},{}],"../../../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "32991" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","semantic/dist/components/accordion.js"], null)
//# sourceMappingURL=/accordion.0eb23f0d.js.map