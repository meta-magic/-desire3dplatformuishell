export class ChartLegend {
  position: string;
  maxLines: number;
  fontSize: number;
  fontName: string;
  color: string;
  bold: boolean;
  alignment: string;
  constructor() {
    this.position = '';
    this.maxLines = 2;
    this.fontSize = 18;
    this.fontName = 'Times-Roman';
    this.color = '';
    this.bold = false;
    this.alignment = '';
  }
}
