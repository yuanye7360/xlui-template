/**
 * xlui-template v0.1.0
 * (c) 2020-2022 君惜
 * Released under the ISC License.
 */
import AsyncValidator from 'async-validator';

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

var script = {
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

      var validator = new AsyncValidator(descriptor);
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
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
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
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-49b7de6c_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"FormItem.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-49b7de6c";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
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
    createInjector,
    undefined,
    undefined
  );

__vue_component__.install = function(Vue) {
  Vue.component('FormItem', __vue_component__);
};

export default __vue_component__;
