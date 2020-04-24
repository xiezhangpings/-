//编译的构造器el，vm是vue的实例对象
function Compile (el, vm) {
    //把vm实例对象保存到$vm属性中
    //this是编译的实例对象
    this.$vm = vm;
    // // 如果'#app'是标签则存储到$el属性中,如果el是选择器'#app'那么会根据选择器来获取html中的div标签,最终存储到$el属性中
    //$el存储的是div容器对象
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    //判断div容器是否存在
    if (this.$el) {
        //创建文档碎片（虚拟dom）
        //把div容器中的所有节点放在虚拟dom中
        this.$fragment = this.node2Fragment(this.$el);
        //初始化  模板解析
        this.init();
        //把模板解析后的文档碎片对象放在div容器中，
        //页面会渲染真实数据
        this.$el.appendChild(this.$fragment);
    }
}
//编译对象Compile的原型对象
Compile.prototype = {
    constructor: Compile,
    //把div容器节点放在虚拟dom中
    node2Fragment: function (el) {
        //创建虚拟dom
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到虚拟fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        //返回fragment
        return fragment;
    },
    //模板解析 初始化的
    init: function () {
        //模版解析的操作
        this.compileElement(this.$fragment);
    },
    //模版解析的操作
    compileElement: function (el) {
        //el--是文档碎片对象,childNodes--是文档碎片对象中所有的子节点
        var childNodes = el.childNodes,
            //编译对象
            me = this;
        // 由于文档碎片对象中的所有的子节点组合成的数组是伪数组,但是需要调用数组的forEach方法进行遍历,所以,才用伪数组转真数组的方式来调用方法进行遍历
        [].slice.call(childNodes).forEach(function (node) {
            //node --- 每个子节点
            //text --- 当前子节点的文本内容
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;
            //判断当前的node节点是不是标签
            if (me.isElementNode(node)) {
                // 如果当前的node节点是标签,就会开始进行编译
                me.compile(node);
                // 判断当前的节点是不是文本节点,并且文本节点是不是和上面的正则匹配
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1.trim());
            }
            // 判断当前的节点里面还有没有其他的子节点,如果有则继续的递归遍历
            //(直到当前节点中没有任何的子节点)
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },
    // node-----获取标签节点
    compile: function (node) {
        // 获取当前节点的所有的属性 
        // nodeAttrs ---->  v-on:click="showName"
        var nodeAttrs = node.attributes,
            //当前编译的实例对象
            me = this;
        // 遍历当前节点中所有的属性  v-on:click="showName"
        [].slice.call(nodeAttrs).forEach(function (attr) {
            //得到v-on:click
            var attrName = attr.name;
            //判断得到的属性是不是一个指令
            if (me.isDirective(attrName)) {
                //exp = showName
                var exp = attr.value;
                //dir = on:click
                var dir = attrName.substring(2);
                // 判断当前的指令是不是事件指令
                if (me.isEventDirective(dir)) {
                    //进来了就是事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 当前是普通指令
                } else {
                    // compileUtil.text('p',vm,'msg')
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                //在这之前已经绑定好事件了
                //把属性全部删掉
                node.removeAttribute(attrName);
            }
        });
    },
    // 解析插值:node---{{msg}},exp---->msg
    compileText: function (node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    // 判断当前的这个属性是不是指令
    isEventDirective: function (dir) {
        // 当前的这个属性是不是v-开头
        return dir.indexOf('on') === 0;
    },
    // 判断当前的节点是不是标签,如果是标签则返回true,否则返回false
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    // 判断当前的节点是不是文本,如果是文本则返回true,否则返回false
    isTextNode: function (node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    //  node----{{msg}},vm,exp---msg
    text: function (node, vm, exp) {
        // 调用bind node----{{msg}},vm,exp---msg  'text'
        this.bind(node, vm, exp, 'text');
    },
    // v-html
    html: function (node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    // v-model指令
    model: function (node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    // v-class 指令
    class: function (node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    // node----{{msg}},vm,exp---msg  dir----->'text'
    // v-bind指令
    bind: function (node, vm, exp, dir) {
        // updater--->对象
        // updater['textUpdater']---->updater.textUpdater
        // updaterFn---->方法
        var updaterFn = updater[dir + 'Updater'];
        // 判断当前的方法是否存在,同时还要进行调用
        // node----{{msg}}  vm,exp----msg
        //  updaterFn && updaterFn('{{msg}}', '绣花枕头');
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // 监视
        new Watcher(vm, exp, function (value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    // node---button按钮,vm,exp---->showName,dir---->on:click
    eventHandler: function (node, vm, exp, dir) {
        // eventType---->click
        var eventType = dir.split(':')[1],
            // 判断methods对象是否存在,同时获取showName属性的值(该属性的值是函数)
            // fn----->showName
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断click和showName是否都存在
        if (eventType && fn) {
            // node----button按钮
            // 通过addEventListener,为button绑定click,对应的回调函数就是showName函数,
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    // 根据vm实例对象找data属性中的msg的属性值  vm._data.msg
    _getVMVal: function (vm, exp) {
        var val = vm;
        // exp--->数组----->exp.split('.')  {{obj.name}}
        //切掉了.
        exp = exp.split('.');
        // 遍历的是表达式数组,k---msg
        exp.forEach(function (k) {
            // val=val--->vm对象
            // val = vm['msg']--->val=vm.msg
            // val='绣花枕头'
            val = val[k];
        });
        // 返回的就是msg属性的值
        return val;
    },

    _setVMVal: function (vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

// 更新的对象
var updater = {
    // 插值语法的文本替换操作的方法
    // node--- '{{msg}}'  value='绣花枕头'
    // v-text指令最终会执行到这里 
    textUpdater: function (node, value) {
        // node--->{{msg}}.textContent='绣花枕头'
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    // v-html的指令最终会执行这里
    htmlUpdater: function (node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    //  v-class指令
    classUpdater: function (node, value, oldValue) {
        //获取当前节点的类样式名字
        var className = node.className;
        //类样式的名字替换为空格的方式(如果原来有类样式的名字,就把这个名字获取到)
        className = className.replace(oldValue, '').replace(/\s$/, '');
        //space最终存储一个空格(前提:是标签默认还有其他的类样式的名字,如果没有则空格也没有)
        var space = className && String(value) ? ' ' : '';
        // 最后该标签上有原来的类样式名字+空格+现在的类样式名字
        // <p class="cls1" v-class="classB"></p> classB='cls2' ----><p class="cls1 cls2"></p>
        node.className = className + space + value;
    },
    // v-model指令最终会执行这里代码
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};