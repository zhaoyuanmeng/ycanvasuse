declare enum ShapeType {
    Rect = 0,
    Arc = 1,
    Line = 2
}
interface Size {
    w: number;
    h: number;
}
interface baseShape {
    shape: ShapeType;
    x: number;
    y: number;
    renderMode?: 'fill' | 'stroke';
}
declare type ShapeClassType = BaseShape<baseShape, {}>;
interface Position {
    x: number;
    y: number;
}
interface RectShape extends baseShape, Size {
    leftCenter: Position;
    rightCenter: Position;
    bottomCenter: Position;
    topCenter: Position;
}
/**
 * @param {number} x, y 圆心
 * @param {number} radius 半径
 */
interface ArcShape extends baseShape {
    radius: number;
    top: Position;
    left: Position;
    right: Position;
    bottom: Position;
}
interface LineShape extends baseShape {
    end: {
        x: number;
        y: number;
    };
    zIndex: number;
    track: {
        x: number;
        y: number;
    }[];
    lineWidth?: number;
}

declare enum EventName {
    click = "click",
    dblclick = "dblclick",
    mousedown = "mousedown",
    mouseup = "mouseup",
    mousemove = "mousemove"
}
declare type ValidEventType = MouseEvent;
declare type EventFn = (event: ValidEventType) => unknown;
declare type Noop = () => {};
declare type EventHandlerFn = (e: ValidEventType, shape: ShapeClassType) => void;
declare type NormalEventHandlerFn = (ev: MouseEvent) => any;

declare abstract class BaseShape<S, T> {
    path2D: Path2D;
    abstract id: symbol;
    abstract shapeInfo: S;
    zIndex: number;
    events: Record<EventName, Set<EventHandlerFn>>;
    innerZIndex: number;
    constructor();
    protected abstract injectShapeInfo(info: T): void;
    protected abstract machiningGraphics(info: T): void;
    abstract render(canvasEngine: CanvasEngine, options: RenderOptions): void;
    beforeRender(_: CanvasEngine, __: RenderOptions): void;
}

interface RectOptions {
    x: number;
    y: number;
    w: number;
    h: number;
    zIndex: number;
}
declare class Rect extends BaseShape<RectShape, RectOptions> {
    shapeInfo: RectShape;
    id: symbol;
    constructor(x: number, y: number, w: number, h: number, zIndex: number);
    constructor(options: RectOptions);
    generateConfiguration(options: RectOptions | number, y?: number, w?: number, h?: number, zIndex?: number): RectOptions;
    protected machiningGraphics(options: RectOptions): void;
    newFun(options: RectOptions): void;
    protected injectShapeInfo(info: RectOptions): void;
    render(canvasEngine: CanvasEngine, options: RenderOptions): void;
    setOption(canvasEngine: CanvasEngine, options: RectOptions): void;
}

interface CanvasEngineProps {
    w?: string;
    h?: string;
    canvasTarget?: string | HTMLCanvasElement;
}
interface DrawDependencyGraphMap {
    id: symbol;
    path2D: Path2D;
    shapeInfo: BaseShape<unknown, unknown>;
}
interface RenderOptions {
    options: {
        color?: string;
        mode?: 'fill' | 'stroke';
    };
    cb: (...args: any[]) => unknown;
}
interface CanvasDomInfo {
    canvasHeight: number;
    canvasWidth: number;
    leftOffset: number;
    topOffset: number;
}
declare class CanvasEngine {
    options: CanvasEngineProps;
    private maxZIndex;
    canvasDomInfo: CanvasDomInfo;
    private drawDependencyGraphsMap;
    private rawCanvasDom;
    ctx: CanvasRenderingContext2D;
    eventsMap: Map<string, Set<EventFn>>;
    private renderQueue;
    isRender: boolean;
    private eventHandler;
    constructor(options: CanvasEngineProps);
    private initCanvasSize;
    private initCanvasDomInfo;
    updateCanvasOffset(): void;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //排序一下渲染队列 根据zIndex属性
     * @date 2022-08-07 10:55
     */
    private sortRenderQueue;
    private initCtx;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //TODO
     * @date 2022-08-07 11:20
     */
    private renderingQueue;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //TODO
     * @date 2022-08-07 11:21
     */
    getCanvasDom(): HTMLCanvasElement;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //渲染模块入口函数
     * @date 2022-08-07 11:18
     */
    render(graphical: ShapeClassType, options: RenderOptions['options'], cb?: RenderOptions['cb']): void;
    /**
     * @author Zhao YuanDa
     * @parms: 事件的作用目标图形 事件名 事件处理函数
     * @description: //TODO
     * @date 2022-08-07 10:59
     */
    addEventListener(graphical: ShapeClassType, eventType: EventName, fn: EventFn): () => void;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //TODO
     * @date 2022-08-07 11:21
     */
    clear(graphical: ShapeClassType): void;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //TODO
     * @date 2022-08-07 11:21
     */
    emptyEvents(graphical: ShapeClassType): void;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //TODO
     * @date 2022-08-07 11:21
     */
    clearEvents(graphical: ShapeClassType, eventType: EventName): void;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //加载函数（包括重新加载）
     * @date 2022-08-07 11:21
     */
    reload(): void;
    clearView(): void;
    modifyShapeLayer(graphical: Rect, zIndex: number): void;
    /**
     * @author Zhao YuanDa
     * @parms:
     * @description: //异步渲染 跟vue3 里面nextTick类似
     * @date 2022-08-07 10:57
     */
    runRenderTask(): void;
    getCtx(): CanvasRenderingContext2D;
}

interface ArcOptions {
    x: number;
    y: number;
    radius: number;
    zIndex: number;
}
declare class Arc extends BaseShape<ArcShape, ArcOptions> {
    id: symbol;
    shapeInfo: ArcShape;
    constructor(x: number, y: number, radius: number, zIndex: number);
    constructor(options: ArcOptions);
    generateConfiguration(options: ArcOptions | number, y?: number, radius?: number, zIndex?: number): ArcOptions;
    machiningGraphics(options: ArcOptions): void;
    render(canvasEngine: CanvasEngine, opt: RenderOptions): void;
    injectShapeInfo(options: ArcOptions): void;
}

interface LineOptions {
    x: number;
    y: number;
    thickness?: number;
    zIndex?: number;
    lineWidth?: number;
}
declare class Line extends BaseShape<LineShape, LineOptions> {
    id: symbol;
    shapeInfo: LineShape;
    constructor(x: number, y: number, thickness?: number, lineWidth?: number, zIndex?: number);
    constructor(options: LineOptions);
    generateConfiguration(options: LineOptions | number, y?: number, thickness?: number, lineWidth?: number, zIndex?: number): LineOptions;
    machiningGraphics(_: LineOptions): void;
    injectShapeInfo(options: LineOptions): void;
    move(toX: number, toY: number): this;
    render(engine: CanvasEngine, { options: { color, mode }, cb }: RenderOptions): void;
}

interface ImageCanvas {
    x: number;
    y: number;
    w: number;
    h: number;
    src: string;
    zIndex: number;
}
declare class Img extends BaseShape<RectShape, ImageCanvas> {
    shapeInfo: RectShape & ImageCanvas;
    id: symbol;
    constructor(x: number, y: number, w: number, h: number, src: string, zIndex: number);
    constructor(options: ImageCanvas);
    generateConfiguration(options: ImageCanvas | number, y?: number, w?: number, h?: number, src?: string, zIndex?: number): ImageCanvas;
    protected machiningGraphics(options: ImageCanvas): void;
    protected injectShapeInfo(info: ImageCanvas): void;
    render(canvasEngine: CanvasEngine, _: RenderOptions): void;
}

export { Arc, ArcOptions, ArcShape, CanvasDomInfo, CanvasEngine, CanvasEngineProps, DrawDependencyGraphMap, EventFn, EventHandlerFn, EventName, ImageCanvas, Img, Line, LineOptions, LineShape, Noop, NormalEventHandlerFn, Position, Rect, RectOptions, RectShape, RenderOptions, ShapeClassType, ShapeType, Size, ValidEventType, baseShape };
