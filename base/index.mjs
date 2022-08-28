var EventName = /* @__PURE__ */ ((EventName2) => {
  EventName2["click"] = "click";
  EventName2["dblclick"] = "dblclick";
  EventName2["mousedown"] = "mousedown";
  EventName2["mouseup"] = "mouseup";
  EventName2["mousemove"] = "mousemove";
  return EventName2;
})(EventName || {});

var ShapeType = /* @__PURE__ */ ((ShapeType2) => {
  ShapeType2[ShapeType2["Rect"] = 0] = "Rect";
  ShapeType2[ShapeType2["Arc"] = 1] = "Arc";
  ShapeType2[ShapeType2["Line"] = 2] = "Line";
  return ShapeType2;
})(ShapeType || {});

function warn(message) {
  console.warn(`[CanvasEngine warn] ${message}`);
}

class BaseEventHandler {
  constructor(engine) {
    this.events = [];
    this.engine = engine;
  }
  initDomEventListener() {
    const dom = this.engine.getCanvasDom();
    this.domEventListener = (e) => {
      const shouldTriggerEvents = [];
      this.events.forEach((i) => {
        const res = i.handler(e);
        if (res)
          shouldTriggerEvents.push(res);
      });
      shouldTriggerEvents.sort((a, b) => b.shape.innerZIndex - a.shape.innerZIndex);
      if (shouldTriggerEvents.length) {
        const { handler } = shouldTriggerEvents[0];
        handler(e);
      }
    };
    dom.addEventListener(this.eventName, this.domEventListener);
  }
  removeListener(fn) {
    const index = this.events.findIndex((evt) => evt.handler === fn);
    if (index === -1)
      return warn(`${this.eventName} \u4E8B\u4EF6\u76D1\u542C\u51FD\u6570\u4E0D\u5B58\u5728`);
    this.events.splice(index, 1);
  }
  checkEmpty() {
    if (!this.events.length) {
      const dom = this.engine.getCanvasDom();
      dom.removeEventListener(this.eventName, this.domEventListener);
      this.domEventListener = null;
    }
  }
}

function getCanvasCheckApi(ctx, renderMode = "fill") {
  const mapping = {
    fill: ctx.isPointInPath,
    stroke: ctx.isPointInStroke
  };
  return mapping[renderMode].bind(ctx);
}

class ClickEventHandler extends BaseEventHandler {
  constructor(engine) {
    super(engine);
    this.eventName = EventName.click;
  }
  track(shape, cbFn) {
    if (!this.events.length)
      this.initDomEventListener();
    const fn = this.trigger(shape, cbFn);
    this.events.push({
      shape,
      handler: fn
    });
  }
  trigger(shape, cbFn) {
    return (e) => {
      this.engine.updateCanvasOffset();
      const { clientX, clientY } = e;
      const { leftOffset, topOffset } = this.engine.canvasDomInfo;
      const { renderMode = "fill" } = shape.shapeInfo;
      const api = getCanvasCheckApi(this.engine.ctx);
      let isIn = false;
      const params = {
        x: clientX - leftOffset,
        y: clientY - topOffset
      };
      if (renderMode === "fill")
        isIn = api(shape.path2D, params.x, params.y);
      else if (renderMode === "stroke")
        isIn = api(params.x, params.y);
      if (isIn) {
        return {
          shape,
          handler: cbFn.bind(cbFn, e)
        };
      } else {
        return false;
      }
    };
  }
}

class DblClickEventHandler extends BaseEventHandler {
  constructor(engine) {
    super(engine);
    this.eventName = EventName.dblclick;
  }
  track(shape, cbFn) {
    if (!this.events.length)
      this.initDomEventListener();
    const fn = this.trigger(shape, cbFn);
    this.events.push({
      shape,
      handler: fn
    });
  }
  trigger(shape, cbFn) {
    return (e) => {
      this.engine.updateCanvasOffset();
      const { clientX, clientY } = e;
      const { leftOffset, topOffset } = this.engine.canvasDomInfo;
      const { renderMode = "fill" } = shape.shapeInfo;
      const api = getCanvasCheckApi(this.engine.ctx);
      let isIn = false;
      const params = {
        x: clientX - leftOffset,
        y: clientY - topOffset
      };
      if (renderMode === "fill")
        isIn = api(shape.path2D, params.x, params.y);
      else if (renderMode === "stroke")
        isIn = api(params.x, params.y);
      if (isIn) {
        return {
          shape,
          handler: cbFn.bind(cbFn, e)
        };
      } else {
        return false;
      }
    };
  }
}

class MouseDownEventHandler extends BaseEventHandler {
  constructor(engine) {
    super(engine);
    this.eventName = EventName.mousedown;
  }
  track(shape, cbFn) {
    if (!this.events.length)
      this.initDomEventListener();
    const fn = this.trigger(shape, cbFn);
    this.events.push({
      shape,
      handler: fn
    });
  }
  trigger(shape, cbFn) {
    return (e) => {
      this.engine.updateCanvasOffset();
      const { clientX, clientY } = e;
      const { leftOffset, topOffset } = this.engine.canvasDomInfo;
      const { renderMode = "fill" } = shape.shapeInfo;
      const api = getCanvasCheckApi(this.engine.ctx);
      let isIn = false;
      const params = {
        x: clientX - leftOffset,
        y: clientY - topOffset
      };
      if (renderMode === "fill")
        isIn = api(shape.path2D, params.x, params.y);
      else if (renderMode === "stroke")
        isIn = api(params.x, params.y);
      if (isIn) {
        return {
          shape,
          handler: cbFn.bind(cbFn, e)
        };
      } else {
        return false;
      }
    };
  }
}

class MouseMoveEventHandler extends BaseEventHandler {
  constructor(engine) {
    super(engine);
    this.eventName = EventName.mousemove;
  }
  track(shape, cbFn) {
    if (!this.events.length)
      this.initDomEventListener();
    const fn = this.trigger(shape, cbFn);
    this.events.push({
      shape,
      handler: fn
    });
  }
  trigger(shape, cbFn) {
    return (e) => {
      this.engine.updateCanvasOffset();
      const { clientX, clientY } = e;
      const { leftOffset, topOffset } = this.engine.canvasDomInfo;
      const { renderMode = "fill" } = shape.shapeInfo;
      const api = getCanvasCheckApi(this.engine.ctx);
      let isIn = false;
      const params = {
        x: clientX - leftOffset,
        y: clientY - topOffset
      };
      if (renderMode === "fill")
        isIn = api(shape.path2D, params.x, params.y);
      else if (renderMode === "stroke")
        isIn = api(params.x, params.y);
      if (isIn) {
        return {
          shape,
          handler: cbFn.bind(cbFn, e)
        };
      } else {
        return false;
      }
    };
  }
}

class MouseUpEventHandler extends BaseEventHandler {
  constructor(engine) {
    super(engine);
    this.eventName = EventName.mouseup;
  }
  track(shape, cbFn) {
    if (!this.events.length)
      this.initDomEventListener();
    const fn = this.trigger(shape, cbFn);
    this.events.push({
      shape,
      handler: fn
    });
  }
  trigger(shape, cbFn) {
    return (e) => {
      this.engine.updateCanvasOffset();
      const { clientX, clientY } = e;
      const { leftOffset, topOffset } = this.engine.canvasDomInfo;
      const { renderMode = "fill" } = shape.shapeInfo;
      const api = getCanvasCheckApi(this.engine.ctx);
      let isIn = false;
      const params = {
        x: clientX - leftOffset,
        y: clientY - topOffset
      };
      if (renderMode === "fill")
        isIn = api(shape.path2D, params.x, params.y);
      else if (renderMode === "stroke")
        isIn = api(params.x, params.y);
      if (isIn) {
        return {
          shape,
          handler: cbFn.bind(cbFn, e)
        };
      } else {
        return false;
      }
    };
  }
}

class EventHandler {
  constructor(engine) {
    this.engine = engine;
    this.initHandlerInstance(this.engine);
  }
  initHandlerInstance(engine) {
    this.handlerInstances = {
      click: new ClickEventHandler(engine),
      dblclick: new DblClickEventHandler(engine),
      mousedown: new MouseDownEventHandler(engine),
      mouseup: new MouseUpEventHandler(engine),
      mousemove: new MouseMoveEventHandler(engine)
    };
  }
  pushEvent(shape, eventName, cbFn) {
    const handlerInstance = this.handlerInstances[eventName];
    handlerInstance.track(shape, cbFn);
    let shapeEvents = shape.events[eventName];
    if (!shapeEvents)
      shapeEvents = shape.events[eventName] = /* @__PURE__ */ new Set();
    shapeEvents.add(cbFn);
    return () => {
      handlerInstance.removeListener(cbFn);
    };
  }
  removeListener(shape, evtName) {
    const eventSet = shape.events[evtName];
    if (!eventSet)
      return;
    const handlerInstance = this.handlerInstances[evtName];
    handlerInstance.events = handlerInstance.events.filter((e) => e.shape.id !== shape.id);
    eventSet.clear();
    handlerInstance.checkEmpty();
  }
}

class CanvasEngine {
  constructor(options) {
    this.options = options;
    this.maxZIndex = -1;
    this.canvasDomInfo = {
      canvasHeight: 0,
      canvasWidth: 0,
      leftOffset: 0,
      topOffset: 0
    };
    this.drawDependencyGraphsMap = /* @__PURE__ */ new Map();
    this.eventsMap = /* @__PURE__ */ new Map();
    this.renderQueue = [];
    this.isRender = false;
    this.initCanvasSize(options);
    this.initCtx();
    this.eventHandler = new EventHandler(this);
  }
  initCanvasSize(options) {
    const { w, h, canvasTarget } = options;
    const canvasDom = typeof canvasTarget === "string" ? document.querySelector(canvasTarget || "#canvas") : canvasTarget;
    if (canvasDom) {
      canvasDom.setAttribute("width", w || "500");
      canvasDom.setAttribute("height", h || "500");
    } else {
      throw new Error("\u8BF7\u9009\u62E9\u6B63\u786E\u7684 canvas id \u83B7\u53D6dom\u5143\u7D20");
    }
    this.rawCanvasDom = canvasDom;
    this.initCanvasDomInfo(options, canvasDom);
  }
  initCanvasDomInfo(options, _) {
    const { w, h } = options;
    this.canvasDomInfo.canvasWidth = Number(w || "500");
    this.canvasDomInfo.canvasHeight = Number(h || "500");
    this.updateCanvasOffset();
  }
  updateCanvasOffset() {
    const { left, top } = this.rawCanvasDom.getClientRects()[0];
    this.canvasDomInfo.leftOffset = left;
    this.canvasDomInfo.topOffset = top;
  }
  sortRenderQueue() {
    this.renderQueue.sort((a, b) => {
      return a.graphical.zIndex - b.graphical.zIndex;
    });
  }
  initCtx() {
    this.ctx = this.rawCanvasDom.getContext("2d");
  }
  renderingQueue() {
    this.sortRenderQueue();
    this.renderQueue.forEach((render) => {
      render.graphical.innerZIndex = ++this.maxZIndex;
      render.graphical.beforeRender(this, render.options);
      render.graphical.render(this, render.options);
    });
  }
  getCanvasDom() {
    return this.rawCanvasDom;
  }
  render(graphical, options, cb = () => {
  }) {
    this.drawDependencyGraphsMap.set(graphical.id, graphical);
    this.renderQueue.push({
      graphical,
      options: {
        options,
        cb
      }
    });
    this.runRenderTask();
  }
  addEventListener(graphical, eventType, fn) {
    return this.eventHandler.pushEvent(graphical, eventType, fn);
  }
  clear(graphical) {
    const index = this.renderQueue.findIndex((it) => it.graphical.id === graphical.id);
    if (index === -1)
      return;
    this.renderQueue.splice(index, 1);
    this.emptyEvents(graphical);
    this.runRenderTask();
  }
  emptyEvents(graphical) {
    const { events } = graphical;
    Object.keys(events).forEach((eventName) => {
      this.clearEvents(graphical, eventName);
    });
  }
  clearEvents(graphical, eventType) {
    this.eventHandler.removeListener(graphical, eventType);
  }
  reload() {
    this.clearView();
    this.renderingQueue();
  }
  clearView() {
    const { canvasWidth, canvasHeight } = this.canvasDomInfo;
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }
  modifyShapeLayer(graphical, zIndex) {
    graphical.zIndex = zIndex;
    this.runRenderTask();
  }
  runRenderTask() {
    if (!this.isRender) {
      this.isRender = true;
      Promise.resolve().then(() => {
        this.reload();
        this.isRender = false;
      });
    }
  }
  getCtx() {
    return this.ctx;
  }
}

class BaseShape {
  constructor() {
    this.path2D = new Path2D();
    this.zIndex = -1;
    this.events = {};
    this.innerZIndex = -1;
  }
  beforeRender(_, __) {
  }
}

class Arc extends BaseShape {
  constructor(options, y, radius, zIndex) {
    super();
    this.id = Symbol("Arc");
    this.shapeInfo = {};
    const op = this.generateConfiguration(options, y, radius, zIndex);
    this.injectShapeInfo(op);
    this.machiningGraphics(op);
    this.zIndex = op.zIndex || -1;
  }
  generateConfiguration(options, y, radius, zIndex) {
    let op;
    if (typeof options === "object") {
      op = options;
    } else if (typeof options === "number") {
      op = {
        x: options,
        y,
        radius,
        zIndex
      };
    }
    return op;
  }
  machiningGraphics(options) {
    const { x, y, radius } = options;
    this.path2D.arc(x, y, radius, 0, Math.PI * 2);
  }
  render(canvasEngine, opt) {
    const {
      options: { color },
      cb
    } = opt;
    canvasEngine.ctx.fillStyle = color || "";
    canvasEngine.ctx.fill(this.path2D);
    cb();
  }
  injectShapeInfo(options) {
    const { radius, x, y } = options;
    const top = {
      x,
      y: y - radius
    };
    const left = {
      x: x - radius,
      y
    };
    const right = {
      x: x + radius,
      y
    };
    const bottom = {
      x,
      y: y + radius
    };
    this.shapeInfo = {
      ...options,
      shape: ShapeType.Arc,
      top,
      left,
      right,
      bottom
    };
  }
}

class Line extends BaseShape {
  constructor(options, y, thickness, lineWidth, zIndex) {
    super();
    this.id = Symbol("Line");
    this.shapeInfo = {};
    const op = this.generateConfiguration(options, y, thickness, lineWidth, zIndex);
    this.injectShapeInfo(op);
  }
  generateConfiguration(options, y, thickness, lineWidth, zIndex) {
    let op;
    if (typeof options === "number") {
      op = {
        x: options,
        y,
        thickness,
        lineWidth,
        zIndex
      };
    } else {
      op = options;
    }
    return op;
  }
  machiningGraphics(_) {
  }
  injectShapeInfo(options) {
    const { x, y, zIndex = -1, lineWidth } = options;
    this.shapeInfo = {
      x,
      y,
      end: { x, y },
      zIndex,
      shape: ShapeType.Line,
      track: [],
      lineWidth,
      renderMode: "fill"
    };
  }
  move(toX, toY) {
    const { x: nowX, y: nowY } = this.shapeInfo.end;
    const track = { x: nowX + toX, y: nowY + toY };
    this.shapeInfo.end = track;
    this.shapeInfo.track.push(track);
    return this;
  }
  render(engine, { options: { color = "", mode = "fill" }, cb }) {
    engine.ctx.beginPath();
    const len = this.shapeInfo.track.length;
    for (let i = 0; i < len; i++) {
      const { x, y } = this.shapeInfo.track[i];
      this.path2D.lineTo(x, y);
    }
    engine.ctx.lineWidth = this.shapeInfo.lineWidth || 1;
    if (mode === "fill") {
      engine.ctx.fillStyle = color;
      engine.ctx.fill(this.path2D);
    } else if (mode === "stroke") {
      engine.ctx.strokeStyle = color;
      engine.ctx.stroke(this.path2D);
    }
    this.shapeInfo.renderMode = mode;
    engine.ctx.closePath();
    cb();
  }
}

class Rect extends BaseShape {
  constructor(options, y, w, h, zIndex) {
    super();
    this.shapeInfo = {};
    this.id = Symbol("Rect");
    const completeConfiguration = this.generateConfiguration(options, y, w, h, zIndex);
    this.injectShapeInfo(completeConfiguration);
    this.machiningGraphics(completeConfiguration);
  }
  generateConfiguration(options, y, w, h, zIndex) {
    let completeConfiguration;
    if (typeof options === "object") {
      completeConfiguration = options;
    } else {
      completeConfiguration = {
        x: options,
        y,
        w,
        h,
        zIndex
      };
    }
    return completeConfiguration;
  }
  machiningGraphics(options) {
    const { x, y, w, h } = options;
    this.path2D.rect(x, y, w, h);
  }
  newFun(options) {
    const path2D = new Path2D();
    const { x, y, w, h } = options;
    path2D.rect(x, y, w, h);
    this.path2D = path2D;
  }
  injectShapeInfo(info) {
    const { x, y, w, h, zIndex } = info;
    const topCenter = { x: (x + w) / 2, y };
    const bottomCenter = { x: (x + w) / 2, y: y + h };
    const leftCenter = { x, y: (y + h) / 2 };
    const rightCenter = { x: x + w, y: (y + h) / 2 };
    this.shapeInfo = {
      ...info,
      shape: ShapeType.Rect,
      topCenter,
      bottomCenter,
      leftCenter,
      rightCenter
    };
    this.zIndex = zIndex;
  }
  render(canvasEngine, options) {
    const {
      options: { color },
      cb
    } = options;
    canvasEngine.ctx.fillStyle = color || "";
    canvasEngine.ctx.fill(this.path2D);
    cb();
  }
  setOption(canvasEngine, options) {
    const completeConfiguration = this.generateConfiguration(options);
    this.injectShapeInfo(completeConfiguration);
    this.newFun(completeConfiguration);
    canvasEngine.reload();
  }
}

class Img extends BaseShape {
  constructor(options, y, w, h, src, zIndex) {
    super();
    this.shapeInfo = {};
    this.id = Symbol("ImageCanvas");
    const completeConfiguration = this.generateConfiguration(options, y, w, h, src, zIndex);
    this.injectShapeInfo(completeConfiguration);
    this.machiningGraphics(completeConfiguration);
  }
  generateConfiguration(options, y, w, h, src, zIndex) {
    let completeConfiguration;
    if (typeof options === "object") {
      completeConfiguration = options;
    } else {
      completeConfiguration = {
        x: options,
        y,
        w,
        h,
        src,
        zIndex
      };
    }
    return completeConfiguration;
  }
  machiningGraphics(options) {
    const { x, y, w, h } = options;
    this.path2D.rect(x, y, w, h);
  }
  injectShapeInfo(info) {
    const { x, y, w, h, src, zIndex } = info;
    const topCenter = { x: (x + w) / 2, y };
    const bottomCenter = { x: (x + w) / 2, y: y + h };
    const leftCenter = { x, y: (y + h) / 2 };
    const rightCenter = { x: x + w, y: (y + h) / 2 };
    this.shapeInfo = {
      ...info,
      shape: ShapeType.Rect,
      topCenter,
      bottomCenter,
      leftCenter,
      rightCenter,
      src
    };
    this.zIndex = zIndex;
  }
  render(canvasEngine, _) {
    const image = new Image(this.shapeInfo.w, this.shapeInfo.h);
    image.src = this.shapeInfo.src;
    image.onload = () => {
      canvasEngine.ctx.fillStyle = "rgba(0,0,0,0)";
      canvasEngine.ctx.fill(this.path2D);
      canvasEngine.ctx.drawImage(image, this.shapeInfo.x, this.shapeInfo.y, this.shapeInfo.w, this.shapeInfo.h);
    };
  }
}

export { Arc, CanvasEngine, EventName, Img, Line, Rect, ShapeType };
