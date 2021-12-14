export type PaperSize = 'small' | 'default' | 'large';

export type PaperType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export type PaperFlexPlacement = 'spaces' | 'edges' | 'right' | 'center' | 'left';

export type PaperAlign = 'left' | 'center' | 'right';

export type Attributes = Record<string, string|boolean>;

export type PositionY = 'top' | 'bottom';
export type PositionX = 'left' | 'right';
export type Position = PositionX | PositionY;
