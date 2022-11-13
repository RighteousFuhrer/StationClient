export interface ISettings {
  offices: [[number, number]];
  spots: [[number, number]];
  procTime: number;
  isRandomSpawnTime: boolean;
}


export interface IGetSettings {
  offices: [[number, number]];
  spots: [[number, number]];
  chels: [[number, number]];
}

export type ISetiingsProps = {
  countCashRegister: number;
  countExits: number;
  serviseTime: number;
  stategy: string;
};