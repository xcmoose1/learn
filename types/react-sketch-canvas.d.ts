declare module 'react-sketch-canvas' {
  export interface CanvasPath {
    paths: any[];
  }

  export interface ReactSketchCanvasProps {
    width?: string;
    height?: string;
    className?: string;
    strokeWidth?: number;
    strokeColor?: string;
    canvasColor?: string;
    style?: React.CSSProperties;
    eraserWidth?: number;
    backgroundImage?: string;
    exportWithBackgroundImage?: boolean;
    preserveBackgroundImageAspectRatio?: string;
    allowOnlyPointerType?: string;
    withTimestamp?: boolean;
    withViewBox?: boolean;
  }

  export interface ReactSketchCanvasRef {
    eraseMode: (enabled: boolean) => void;
    clearCanvas: () => void;
    undo: () => void;
    redo: () => void;
    exportImage: (imageType: string) => Promise<string>;
    exportSvg: () => Promise<string>;
    resetCanvas: () => void;
    exportPaths: () => Promise<CanvasPath[]>;
    loadPaths: (paths: CanvasPath[]) => void;
    getSketchingTime: () => Promise<number>;
  }

  const ReactSketchCanvas: React.ForwardRefExoticComponent<
    ReactSketchCanvasProps & React.RefAttributes<ReactSketchCanvasRef>
  >;

  export default ReactSketchCanvas;
}
