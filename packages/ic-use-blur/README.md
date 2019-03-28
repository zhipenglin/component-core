## ic-use-blur

描述：在复合表单组件中控制blur事件的触发，
在ic-form中field大多是通过失去焦点触发验证的，
在由多个表单控件组成的复合表单控件，
使用它合成的blur事件触发可以减少用户未完成输入操作前的无效校验

创建人：admin

创建时间：2019年03月21日 19:24

仓库地址: git@gitlab.zhinanzhen.wiki:frontend/component-core.git

[gitlab](http://gitlab.zhinanzhen.wiki/frontend/component-core)

-----------

### 参数描述

| 参数名 | 类型 | 是否必须 | 说明 | 默认值 |
| --- | --- | ---- | --- | --- |
|  arg[0] onBlur   |   function  |   yes   |   blur响应事件  |     |
|  arg[1] $el   |   dom  |   no   |   监听范围  |  document.body   |

### 返回值

ReactRef

-----------

### 示例

```
import React from 'react'
import useBlur from '@core/ic-use-blur'
const CustomComponent=({onBlur})=>{
    const outerRef=useBlur(onBlur);
    return <div ref={outerRef}><input/><input/></div>
};
```

### Blog:

- 2019年03月21日 19:24：**admin** 创建组件
