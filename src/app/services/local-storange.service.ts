import { Injectable } from '@angular/core';
import { Data } from '../interfaces/authService.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorangeService {

  private _tokenSesionName    : string = '$stk$';
  private _userSesionName     : string = '$u$';
  private _idUserSesionName   : string = '$i$';
  private _emailSesionName    : string = '$e$';

  constructor() { }

  // guardar datos de sesion
  public saveSesionData(data:Data):void{
    this.clear();
    localStorage.setItem(this._tokenSesionName, data.utk);
    localStorage.setItem(this._userSesionName, data.userName);
    localStorage.setItem(this._idUserSesionName, data.uid);
    localStorage.setItem(this._emailSesionName, ('correo'+data.email+'Lstorg@gamil.com'));//corregir
  }

  // obtener datos de sesion
  private _getSesionData():Data{
    return {
      utk      : localStorage.getItem(this._tokenSesionName)!,
      userName : localStorage.getItem(this._userSesionName)!,
      uid      : localStorage.getItem(this._idUserSesionName)!,
      email    : localStorage.getItem(this._emailSesionName)!,
    }
  }

  // eliminar datos de sesion
  public clear():void{
    localStorage.clear();
  }

  // obtener datos de sesion validos
  public getSesionData():Data | null {
    console.log('Valid seseion data');
    

    // obteniendo la informacion de la seccion
    const Data : Data = {...this._getSesionData()};

    // verificando cada elemento del objeto, si hay alguno faltante salimos
    for (const value of Object.values(Data)) {
      if(value === null ||value === 'null' ||value === undefined ||value === 'undefined')return null;
    }
    
    
    // si todo está bien se regresa el objeto
    return Data;
  }
}
