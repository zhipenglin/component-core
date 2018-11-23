## ic-form

描述：用于表单校验的组件

创建人：admin

创建时间：2018年06月21日 11:12

仓库地址: git@gitlab.zhinanzhen.wiki:frontend/component-core.git
-----------

### 功能

ic-form 是一个表单校验框架，可以帮助你将校验逻辑从业务代码里面分离出去。

· 实现了字段的按规则串联校验，字段远程校验
· UI和校验逻辑完全分离
· 实现了默认校验规则，预设校验规则，当前form校验规则，通过简单的配置字段的校验规则名称来进行规则查找
· 支持本地form数据缓存
· 自动处理表单提交按钮的提交中，是否可提交状态

### 设计思路

ic-form 主要分为以下几个模块：

1. Form 用来管理表单数据，本地缓存，处理提交逻辑，和表单当前的校验状态。

2. field 封装了字段的校验逻辑，和Form同步数据。field是一个高阶组件，它接收一个输入组件，返回一个具有字段校验功能的组件。

3. submit 用来触发表单提交的按钮的高阶抽象。它管理了当前表单的提交状态和是否校验通过状态。

4. fieldDecorator 字段外观装饰器，用来封装字段UI，将错误提示以某种状态提示用户，控制组件在不同校验状态的UI表现。通常根据UI自行实现。
@eui/ic-field-decorator 实现了eui规范的decorator，可以直接使用

### 如何使用

更多使用示例，请参考@eui/ic-field-decorator 的 [example](https://zhipenglin.github.io/eui-example/#/components/@eui/ic-field-decorator)

### Form 参数描述

| 参数名 | 类型 | 是否必须 | 说明 | 默认值 |
| --- | --- | ---- | --- | --- |
|   onSubmit  |  function(data)   |  是   |  当表单提交且每个字段都校验通过时调用该方法，接收一个data参数，为表单当前的数据 |  -   |
| onPrevSubmit | function(isPass,validateInfo,data)|否| 当表单提交时调用该方法，不管校验是否通过都会调用，并且先于onSubmit调用，接受三个参数,isPass 当前表单校验是否通过 validateInfo 当前表单的各个字段的校验结果 data 当前表单的数据| - |
| onError | function(validateInfo,data) |否| 当表单提交且校验不通过时调用该方法，后于onPrevSubmit调用 接受两个参数,validateInfo 当前表单的各个字段的校验结果 data 当前表单的数据 |-|
| cache | string | 否 |  用来标示表单数据缓存到本地localstorage的key值，如果传入值，则标示缓存开启，注意 cache值相同的表单，数据会相互覆盖 | - |
| data | object | 否 | 表单的初始值，可以通过该参数给表单内的各个字段填写组件赋值| - |
| rules | object | 否 | 可以定义规则，供当前表单内的各个Field的rule识别 | - |

### Form API描述

| 名称  | 参数列表 | 返回值 | 功能说明 |
| --- | ---- | --- | ---- |
|  set data   |   data   |  this   |   一个setter ，可以从Form实例 form.data={name:'xxx'} 给表单赋值，改变表单内对应字段的值 |
| get data | - | data | 一个getter，可以从Form实例通过 const data=form.data 获取当前表单的值 |
| submit | - | Promise | 可以从Form实例调用该方法提交表单 |
| setError | name,errInfo| Promise | 调用该方法给name字段设置一条错误信息 |

### Field 参数描述 （指被field修饰后返回的组件，新加的参数）

| 参数名 | 类型 | 是否必须 | 说明 | 默认值 |
| --- | --- | ---- | --- | --- |
| name | string | 是 | 字段名称，会作为表单的data里的key值，同一表单不能重复 | - |
| label | string | 否 | 字段的别名，一般为中文名，会拼接到errMsg里面作为错误说明，有的Decorator会将其显示给用户，作为该字段的说明| '' |
| errMsg| string | 否 | 指定当前字段的错误信息，不管该字段是哪条规则导致校验不通过，都显示该提示 | '' |
| rule | string/function/RegExp | 否 | 定义表单校验规则 | - |

### Decorator 参数描述 （指被fieldDecorator修饰后返回的组件，新加的参数）

| 参数名 | 类型 | 是否必须 | 说明 | 默认值 |
| --- | --- | ---- | --- | --- |
| value | any | 是 | 当前字段的值，由field自动传入 | - |
| triggerValidate | function | 是 | 触发当前字段的校验 | - |
| addEventListener | function(type,callback) | 是 | 添加表单内部事件监听 ,接受两个参数 type为要监听的事件的名称(submit,prevSubmit,error,validate,dataChange) callback为事件触发时回调函数| - |
| removeEventListener | function(type) | 是 | 移除表单内部事件监听，接受一个参数 type为要监听的事件的名称(submit,prevSubmit,error,validate,dataChange)| - |
| errorState | number | 是 | 当前字段校验状态 0 未校验 1 校验通过 2 校验不通过 3 正在执行远程校验，校验结果尚未返回 | - |
| errorMsg | string  | 是 | 当前字段的错误信息 | - |
| onChange | function(event,value) | 是 | 当前字段输入发生变化时触发，接受两个参数 event 事件对象 value 当前字段的值 | - |

### Submit 参数描述 （指被submit修饰后返回的组件，新加的参数）

| 参数名 | 类型 | 是否必须 | 说明 | 默认值 |
| --- | --- | ---- | --- | --- |
| data | object | 是 | 当前表单的值 | {} |
| isLoading | boolean | 是 | 当前表单是否在提交过程中 | false |
| isPass | boolean | 是 | 当前表单是否已经全部校验通过 | false |

-----

### Blog:

- 2018年06月21日 11:12：**admin** 创建组件
