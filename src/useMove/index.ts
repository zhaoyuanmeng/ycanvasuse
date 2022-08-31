// 引入包 自己手动引入的 
// TODO:后期借助node自动从npm导入包 然后注入到dist文件里，方便cdn那种的使用
// import { Arc, CanvasEngine, Rect,EventName } from "../../base/index.mjs";
import { Arc, CanvasEngine, Rect,EventName } from "ycanvas";
// 在包的基础上扩展

import type {CanvasEngineProps} from '../types/useMove'
// 导出包

// 这个没有封装，思路是从base上继承然后添加新方法，最后组合成一个功能
// 优化点：传参，能否公用engine
export function useMove(option:CanvasEngineProps) {
  // 利用闭包的思路写
  let isDrag:boolean = false;
  // 可以再这里面先生成一个canvas
  const engine2 = new CanvasEngine({
    w: "200",
    h: "200",
    canvasTarget: option.canvasTarget,
  });
  const rect1 = new Rect({
    x: 0,
    y: 100,
    w: 100,
    h: 100,
    zIndex: 0,
  });
  engine2.render(rect1, {
    color: "red",
  });
  engine2.addEventListener(rect1, EventName.mousedown, (e) => {
    isDrag = true
    console.log('rect1 mousedown', isDrag);
  })
  engine2.addEventListener(rect1, EventName.mouseup, (e) => {
    isDrag = false
    console.log('rect1 mouseup', isDrag);
  })
  engine2.addEventListener(rect1, EventName.mousemove, (e) => {
    if (isDrag) {
      // 这里面调用更新的逻辑
      let option = {
        x: 30,
        y: 40,
        w: 100,
        h: 100,
        zIndex: 0,
      }
      rect1.setOption(engine2, option)
    }
  })

 // 返回值可以是一个清除移动的函数
}
