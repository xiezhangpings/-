//下面创建的  data---
function Observer(data) {
    //把传入的data属性存储到了vm 的data对象数据
    // 把vm中的data对象数据存储到了当前的劫持对象的data属性中
    this.data = data;
    // 开始执行---开始劫持数据,并且创建dep对象
    //(依赖关系---->创建依赖关系),传入vm中的data数据对象
    this.walk(data);
}
//原型对象
Observer.prototype = {
    constructor: Observer,
    //walk方法创建dep对象
    walk: function(data) {
         // me---劫持对象
        var me = this;
         // 获取data数据对象中的所有属性并且遍历,key===='msg1'
        Object.keys(data).forEach(function(key) {
            //转换key-'msg1',data[key]--data['msg1']
            me.convert(key, data[key]);
        });
    },
    // 转换数据的方法:key----'msg',val---'真香'
    convert: function(key, val) {
        // 定义数据(转换数据,并且定义)
        // 为当前的劫持对象中的data重新定义数据
        // key--'msg'   value--'真香'  劫持对象.data
        this.defineReactive(this.data, key, val);
    },
    // 定义数据的同时进行数据转换
    // data---劫持对象.data  key---'msg'   value===='真香'
    defineReactive: function(data, key, val) {
         // 遍历数据后 创建dep对象(id,subs数组(消息订阅))
        var dep = new Dep();
        // observe('真香')---如果当前的这个data对象中的属性的值不是一个对象
        // 如果val是一个对象的情况下,那么我就继续的创建dep对象
        var childObj = observe(val);
         // data----当前的劫持对象的data  key====='msg'
        // 一开始的时候劫持对象中的data---->指向了vm中的data了(两个对象的指向是相同了)
        // 重写,我要重新的把vm中的data的属性添加到劫持对象的data对象中()
        // 把vm中的data中的属性一个一个的添加到当前的劫持对象的data中
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};
//劫持数据的方法，vlaue -- data对象，vm--是vue的实例对象
function observe(value, vm) {
    //判断vlaue是否有数据或者是不是obj
    if (!value || typeof value !== 'object') {
        return;
    }
    //vlaue是一个非空对象
    //此时创建Observer实例对象 ，传入vlaue（data对象）
    return new Observer(value);
};


var uid = 0;
// Dep 的构造函数(要产生依赖关系的)
function Dep() {
      // dep的id标识
    this.id = uid++;
    //// 创建一个消息订阅的数组里面存放watcher
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;