import { Storage } from '@ionic/storage';
import { Verif } from './Verif';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
    users = [];
    constructor(private verif: Verif)
    {
    }
   
    canActivate()
    {
        if (this.verif.verifUser())
        {
            return true;
        }
        return false;
    }


}
