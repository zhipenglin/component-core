## ic-use-click-outside

描述：响应点击空白事件

创建人：admin

创建时间：2019年03月21日 19:59

仓库地址: git@gitlab.zhinanzhen.wiki:frontend/component-core.git

[gitlab](http://gitlab.zhinanzhen.wiki/frontend/component-core)

-----------

### 参数描述

| 参数名 | 类型 | 是否必须 | 说明 | 默认值 |
| --- | --- | ---- | --- | --- |
|  arg[0] onClickOutside   |   function  |   yes   |   clickOutside响应事件  |     |
|  arg[1] $el   |   dom  |   no   |   监听范围  |  document.body   |

### 返回值

ReactRef

-----------

### 示例

```
import React from 'react'
import useClickOutside from '@core/ic-use-click-outside'
const CustomComponent=({onClickOutside})=>{
    const outerRef=useClickOutside(onClickOutside);
    return <div ref={outerRef}>XXXXXX</div>
};
```

### Blog:

- 2019年03月21日 19:59：**admin** 创建组件
