export class RaumModel{
  raumname:string;
  wochentag:string[] = [];
  uhrzeit:string[] = [];
  veranstaltung:string[] = [];

  constructor (raumname:string){
    this.raumname = raumname;
  }
}
