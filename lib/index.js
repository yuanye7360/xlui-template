/**
 * xlui-template v0.1.0
 * (c) 2020-2022 君惜
 * Released under the ISC License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var AsyncValidator = require('async-validator');
var Vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var AsyncValidator__default = /*#__PURE__*/_interopDefaultLegacy(AsyncValidator);
var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

//
//
//
//
//
//

var script$8 = {
  name: 'xlForm',
  props: {
    model: { type: Object, default: function () {} },
    rules: { type: Object, default: function () {} }
  },
  provide: function provide () {
    return { FormInstance: this }
  },
  data: function data () {
    return {
      fields: []
    }
  },
  created: function created () {
    var this$1 = this;

    this.$on('on-form-item-add', function (field) {
      if (field) { this$1.fields.push(field); }
    });
    this.$on('on-form-item-remove', function (field) {
      if (field.prop) { this$1.fields.splice(this$1.fields.indexOf(field), 1); }
    });
  },
  methods: {
    validate: function validate (callback) {
      var this$1 = this;

      return new Promise(function (resolve) {
        var valid = true;
        var count = 0;
        this$1.fields.forEach(function (field) {
          field.validate('', function (errors) {
            if (errors) {
              valid = false;
            }
            if (++count === this$1.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      })
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
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("form", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  var __vue_inject_styles__$8 = function (inject) {
    if (!inject) { return }
    inject("data-v-4c8a40e6_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Form.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$8 = "data-v-4c8a40e6";
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__$8.install = function(Vue) {
  Vue.component('Form', __vue_component__$8);
};

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

//

var script$7 = {
  name: 'xlFormItem',
  mixins: [Emitter],
  props: {
    label: { type: String, default: '' },
    prop: { type: String, default: '' }
  },
  inject: ['FormInstance'],
  data: function data () {
    return {
      isRequired: false,  // 是否为必填
      validateState: '',  // 校验状态
      validateMessage: ''  // 校验不通过时的提示信息
    }
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue: function fieldValue () {
      return this.FormInstance.model[this.prop]
    }
  },
  // 组件渲染时，将实例缓存在 Form 中
  mounted: function mounted () {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    if (this.prop) {
      this.initialValue = this.fieldValue;
      this.dispatch('xlForm', 'on-form-item-add', this);
      this.setRules();
    }
  },
  // 组件销毁前，将实例从 Form 的缓存中移除
  beforeDestroy: function beforeDestroy () {
    this.dispatch('xlForm', 'on-form-item-remove', this);
  },
  methods: {
    setRules: function setRules () {
      var this$1 = this;

      var rules = this.getRules();
      if (rules.length && this.required) {
        return
      } else if (rules.length) {
        rules.every(function (rule) {
          this$1.isRequired = rule.required;
        });
      } else if (this.required) {
        this.isRequired = this.required;
      }
      this.$off('on-form-blur', this.onFieldBlur);
      this.$off('on-form-change', this.onFieldChange);
      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
    getRules: function getRules () {
      var formRules = this.FormInstance.rules;
      var selfRules = this.rules;

      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(selfRules || formRules || [])
    },
    getFilteredRule: function getFilteredRule (trigger) {
      var rules = this.getRules();
      return rules.filter(function (rule) { return !rule.trigger || rule.trigger.indexOf(trigger) !== -1; })
    },
    validate: function validate (trigger, callback) {
      var this$1 = this;
      if ( callback === void 0 ) callback = function () {};

      var rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        if (!this.required) {
          callback();
          return true
        } else {
          rules = [{ required: true }];
        }
      }

      this.validateState = 'validating';

      // 以下为 async-validator 库的调用方法
      var descriptor = {};
      descriptor[this.prop] = rules;

      var validator = new AsyncValidator__default['default'](descriptor);
      var model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, function (errors) {
        this$1.validateState = !errors ? 'success' : 'error';
        this$1.validateMessage = errors ? errors[0].message : '';

        callback(this$1.validateMessage);

        this$1.FormInstance && this$1.FormInstance.$emit('on-validate', this$1.prop, !errors, this$1.validateMessage || null);
      });
      this.validateDisabled = false;
    },
    onFieldBlur: function onFieldBlur () {
      this.validate('blur');
    },
    onFieldChange: function onFieldChange () {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return
      }
      this.validate('change');
    },
    resetField: function resetField () {
      this.validateState = '';
      this.validateMessage = '';

      this.form.model[this.prop] = this.initialValue;
    }
  }
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [
    _vm.label
      ? _c(
          "label",
          { class: { "xl-form-item-label-required": _vm.isRequired } },
          [_vm._v(_vm._s(_vm.label))]
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      [
        _vm._t("default"),
        _vm._v(" "),
        _vm.validateState === "error"
          ? _c("div", { staticClass: "xl-form-item-message" }, [
              _vm._v(_vm._s(_vm.validateMessage))
            ])
          : _vm._e()
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-49b7de6c_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"FormItem.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = "data-v-49b7de6c";
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__$7.install = function(Vue) {
  Vue.component('FormItem', __vue_component__$7);
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

// 由一个组件，向下找到所有指定的组件
function findComponentsDownward (context, componentName) {
  return context.$children.reduce(function (components, child) {
    if (child.$options.name === componentName) { components.push(child); }
    var foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds)
  }, [])
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

var script$6 = {
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

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
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
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-55631b34_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Checkbox.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = "data-v-55631b34";
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__$6.install = function(Vue) {
  Vue.component('Checkbox', __vue_component__$6);
};

//

var script$5 = {
  name: 'xlCheckboxGroup',
  mixins: [Emitter],
  props: {
    value: { type: Array, default: function () { return []; } }
  },
  data: function data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  mounted: function mounted () {
    this.updateModel(true);
  },
  methods: {
    updateModel: function updateModel (update) {
      this.childrens = findComponentsDownward(this, 'xlCheckbox');
      if (this.childrens) {
        var ref = this;
        var value = ref.value;
        this.childrens.forEach(function (child) {
          child.model = value;

          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change: function change (data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('on-change', data);
      this.dispatch('xlFormItem', 'on-form-change', data);
    }
  },
  watch: {
    value: function value () {
      this.updateModel(true);
    }
  }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-cf583280_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"CheckboxGroup.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = "data-v-cf583280";
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__$5.install = function(Vue) {
  Vue.component('CheckboxGroup', __vue_component__$5);
};

//
//
//
//
//
//
//
//

var seed = 0;
function getUuid() {
  return 'alert_' + (seed++)
}

var script$4 = {
  name: 'xlAlert',
  data: function data() {
    return {
      notices: []
    }
  },
  methods: {
    add: function add (notice) {
      var this$1 = this;

      var name = getUuid();

      var _notice = Object.assign({
        name: name
      }, notice);

      this.notices.push(_notice);

      // 定时移除，单位：秒
      var duration = notice.duration;
      setTimeout(function () {
        this$1.remove(name);
      }, duration * 2000);
    },
    remove: function remove (name) {
      var notices = this.notices;

      for (var i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break
        }
      }
    }
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "transition-group",
    { staticClass: "alert", attrs: { name: "list", tag: "div" } },
    _vm._l(_vm.notices, function(item) {
      return _c("div", { key: item.name, staticClass: "alert-main" }, [
        _c("div", { staticClass: "alert-content" }, [
          _vm._v(_vm._s(item.content))
        ])
      ])
    }),
    0
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-3d8c0aa7_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Alert.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = "data-v-3d8c0aa7";
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__$4.newInstance = function (props) {
  var _props = props || {};

  var Instance = new Vue__default['default']({
    render: function render (h) {
      return h(__vue_component__$4, {
        props: _props
      })
    }
  });

  var component = Instance.$mount();
  document.body.appendChild(component.$el);

  var alert = Instance.$children[0];

  return {
    add: function add (noticeProps) {
      alert.add(noticeProps);
    },
    remove: function remove (name) {
      alert.remove(name);
    }
  }
};

var messageInstance;

function getMessageInstance () {
  messageInstance = messageInstance || __vue_component__$4.newInstance();
  return messageInstance
}

function notice(ref) {
  var duration = ref.duration; if ( duration === void 0 ) duration = 2;
  var content = ref.content; if ( content === void 0 ) content = '';

  var instance = getMessageInstance();

  instance.add({
    content: content,
    duration: duration
  });
}

var notification = {
  info: function info (options) {
    var _options;
    if (typeof options === 'string') {
      _options = { content: options };
    } else {
      _options = options;
    }
    return notice(_options)
  }
};

var Render = {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function
  },
  render: function (h, ctx) {
    var params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    };
    return ctx.props.render(h, params)
  }
};

var SlotScope = {
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: Object,
    column: Object,
    index: Number
  },
  render: function (h, ctx) {
    return h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    }))
  }
};

//

var script$3 = {
  name: 'xlTable',
  components: { Render: Render, SlotScope: SlotScope },
  provide: function provide () {
    return {
      tableRoot: this
    }
  },
  props: {
    columns: { type: Array, default: function () { return []; } },
    data: { type: Array, default: function () { return []; } },
    index: { type: Number },
    render: { type: Function }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("table", { staticClass: "xl-table" }, [
    _c("thead", [
      _c(
        "tr",
        _vm._l(_vm.columns, function(col, index) {
          return _c("th", { key: index }, [_vm._v(_vm._s(col.title))])
        }),
        0
      )
    ]),
    _vm._v(" "),
    _c(
      "tbody",
      _vm._l(_vm.data, function(row, rowIndex) {
        return _c(
          "tr",
          { key: rowIndex },
          _vm._l(_vm.columns, function(col, index) {
            return _c(
              "td",
              { key: index },
              [
                "render" in col
                  ? [
                      _c("Render", {
                        attrs: {
                          row: row,
                          column: col,
                          index: rowIndex,
                          render: col.render
                        }
                      })
                    ]
                  : "slot" in col
                  ? [
                      _c("SlotScope", {
                        attrs: { row: row, column: col, index: rowIndex }
                      })
                    ]
                  : [_vm._v(_vm._s(row[col.key]))]
              ],
              2
            )
          }),
          0
        )
      }),
      0
    )
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-244f4766_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Table.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-244f4766";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__$3.install = function (Vue) {
  Vue.component('Table', __vue_component__$3);
};

//

var script$2 = {
  name: 'TreeNode',
  components: { Checkbox: __vue_component__$6 },
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
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
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
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-0505e6da_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Node.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-0505e6da";
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
  name: 'xlTree',
  components: { TreeNode: __vue_component__$2 },
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
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
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
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

__vue_component__$1.install = function(Vue) {
  Vue.component('Tree', __vue_component__$1);
};

//

var script = {
  name: 'xlInput',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data: function data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value: function value (val) {
      alert(val);
      this.currentValue = val;
    }
  },
  methods: {
    handleInput: function handleInput (event) {
      var value = event.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('xlFormItem', 'on-form-change', value);
    },
    handleBlur: function handleBlur () {
      this.dispatch('xlFormItem', 'on-form-blur', this.currentValue);
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
  return _c("input", {
    staticClass: "xl-input",
    attrs: { type: "text" },
    domProps: { value: _vm.currentValue },
    on: { input: _vm.handleInput, blur: _vm.handleBlur }
  })
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
  Vue.component('Input', __vue_component__);
};

var components = {
  Form: __vue_component__$8,
  FormItem: __vue_component__$7,
  Checkbox: __vue_component__$6,
  CheckboxGroup: __vue_component__$5,
  Table: __vue_component__$3,
  Tree: __vue_component__$1,
  Input: __vue_component__
};

// eslint-disable-next-line no-unused-vars
var install = function (Vue, opts) {

  if (install.installed) { return }
  // locale.use(opts.locale)
  // locale.i18n(opts.i18n)

  Object.keys(components).forEach(function (key) {
    Vue.component(key, components[key]);
    // Vue.use(components[key])
  });

  Vue.prototype.$notification = notification;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var index = {
  version: process.env.VERSION,
  install: install
};

exports.Checkbox = __vue_component__$6;
exports.CheckboxGroup = __vue_component__$5;
exports.Form = __vue_component__$8;
exports.FormItem = __vue_component__$7;
exports.Input = __vue_component__;
exports.Table = __vue_component__$3;
exports.Tree = __vue_component__$1;
exports.default = index;
