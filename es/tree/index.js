/**
 * xlui-template v0.1.0
 * (c) 2020-2022 君惜
 * Released under the ISC License.
 */
function broadcast (componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

var Emitter = {
  methods: {
    dispatch: function dispatch (componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast$1 (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};

// 由一个组件，向上找到最近的指定组件
function findComponentUpward (context, componentName) {
  var parent = context.$parent;
  var name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) { name = parent.$options.name; }
  }
  return parent
}

function typeOf (obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)]
}

// deepCopy
function deepCopy (data) {
  var t = typeOf(data);
  var o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data
  }

  if (t === 'array') {
    for (var i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (var i$1 in data) {
      o[i$1] = deepCopy(data[i$1]);
    }
  }
  return o
}

//

var script$2 = {
  name: 'xlCheckbox',
  mixins: [Emitter],
  props: {
    disabled: { type: Boolean, default: false },
    label: { type: [String, Number, Boolean] },
    value: { type: [String, Number, Boolean], default: false },
    trueValue: { type: [String, Number, Boolean], default: true },
    falseValue: { type: [String, Number, Boolean], default: false },
    showSlot: { type: Boolean, default: true }
  },
  data: function data () {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null
    }
  },
  mounted: function mounted () {
    this.parent = findComponentUpward(this, 'xlCheckboxGroup');

    if (this.parent) {
      this.group = true;
    }

    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  methods: {
    onChange: function onChange (event) {
      if (this.disabled) { return false }
      var checked = event.target.checked;
      this.currentValue = checked;
      var value = checked ? this.trueValue : this.falseValue;
      this.$emit('input', value);
      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit('on-change', value);
        this.dispatch('xlFormItem', 'on-form-change', value);
      }
    },
    updateModel: function updateModel () {
      this.currentValue = this.value === this.trueValue;
    }
  },
  watch: {
    value: function value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw 'Value should be trueValue or falseValue.'
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "label",
    [
      _c("span", [
        _vm.group
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.model,
                  expression: "model"
                }
              ],
              attrs: { type: "checkbox", disabled: _vm.disabled },
              domProps: {
                value: _vm.label,
                checked: _vm.currentValue,
                checked: Array.isArray(_vm.model)
                  ? _vm._i(_vm.model, _vm.label) > -1
                  : _vm.model
              },
              on: {
                change: [
                  function($event) {
                    var $$a = _vm.model,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false;
                    if (Array.isArray($$a)) {
                      var $$v = _vm.label,
                        $$i = _vm._i($$a, $$v);
                      if ($$el.checked) {
                        $$i < 0 && (_vm.model = $$a.concat([$$v]));
                      } else {
                        $$i > -1 &&
                          (_vm.model = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)));
                      }
                    } else {
                      _vm.model = $$c;
                    }
                  },
                  _vm.onChange
                ]
              }
            })
          : _c("input", {
              attrs: { type: "checkbox", disabled: _vm.disabled },
              domProps: { checked: _vm.currentValue },
              on: { change: _vm.onChange }
            })
      ]),
      _vm._v(" "),
      _vm._t("default", [
        _vm.showSlot ? _c("span", [_vm._v(_vm._s(_vm.label))]) : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-55631b34_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Checkbox.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-55631b34";
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$1 = {
  name: 'TreeNode',
  components: { Checkbox: __vue_component__$2 },
  props: {
    data: { type: Object, default: function () {} },
    showCheckbox: { type: Boolean, default: false }
  },
  data: function data() {
    return {
      tree: findComponentUpward(this, 'Tree')
    }
  },
  methods: {
    handleExpand: function handleExpand () {
      this.$set(this.data, 'expand', !this.data.expand);

      if (this.tree) {
        this.tree.emitEvent('on-toggle-expand', this.data);
      }
    },
    handleCheck: function handleCheck (checked) {
      this.updateTreeDown(this.data, checked);

      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.data);
      }
    },
    updateTreeDown: function updateTreeDown (data, checked) {
      var this$1 = this;

      this.$set(data, 'checked', checked);

      if (data.children && data.children.length) {
        data.children.forEach(function (item) {
          this$1.updateTreeDown(item, checked);
        });
      }
    }
  },
  watch: {
    'data.children': {
      handler: function handler (data) {
        if (data) {
          var checkedAll = data.every(function (item) { return item.checked; });
          this.$set(this.data, 'checked', checkedAll);
        }
      },
      deep: true
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("ul", { staticClass: "xl-tree-ul" }, [
    _c(
      "li",
      { staticClass: "xl-tree-li" },
      [
        _c(
          "span",
          { staticClass: "xl-tree-expand", on: { click: _vm.handleExpand } },
          [
            _vm.data.children && _vm.data.children.length && !_vm.data.expand
              ? _c("span", [_vm._v("+")])
              : _vm._e(),
            _vm._v(" "),
            _vm.data.children && _vm.data.children.length && _vm.data.expand
              ? _c("span", [_vm._v("-")])
              : _vm._e()
          ]
        ),
        _vm._v(" "),
        _vm.showCheckbox
          ? _c("Checkbox", {
              attrs: { value: _vm.data.checked, showSlot: false },
              on: { input: _vm.handleCheck }
            })
          : _vm._e(),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.data.title))]),
        _vm._v(" "),
        _vm.data.expand
          ? _vm._l(_vm.data.children, function(item, index) {
              return _c("TreeNode", {
                key: index,
                attrs: { data: item, "show-checkbox": _vm.showCheckbox }
              })
            })
          : _vm._e()
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-0505e6da_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Node.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-0505e6da";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script = {
  name: 'xlTree',
  components: { TreeNode: __vue_component__$1 },
  props: {
    data: {
      type: Array,
      default: function default$1 () {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data: function data () {
    return {
      cloneData: []
    }
  },
  created: function created () {
    this.rebuildData();
  },
  watch: {
    data: function data () {
      this.rebuildData();
    }
  },
  methods: {
    rebuildData: function rebuildData () {
      this.cloneData = deepCopy(this.data);
    },
    emitEvent: function emitEvent (eventName, data) {
      this.$emit(eventName, data, this.cloneData);
    }
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._l(_vm.cloneData, function(item, index) {
      return _c("tree-node", {
        key: index,
        attrs: { data: item, "show-checkbox": _vm.showCheckbox }
      })
    }),
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

__vue_component__.install = function(Vue) {
  Vue.component('Tree', __vue_component__);
};

export default __vue_component__;
