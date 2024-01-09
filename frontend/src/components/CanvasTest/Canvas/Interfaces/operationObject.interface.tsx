export interface OperationObjectInterface {
    x: number;
    y: number;
    width: number;
    height: number;
    borderColor: string;
    isMouseOver: boolean;
    isOverLeftSide: boolean;
    isOverRightSide: boolean;
    isDragged: boolean;
    showConnectState: boolean
    isConnecting: boolean;
    //clicked: (x:number, y:number) => void;
    render: (context: CanvasRenderingContext2D) => void;
    keyState: Keys;
  }

  export interface Keys {
    Control: boolean;
    Alt: boolean;
  }