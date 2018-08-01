import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { CHARACTERS } from './mock-data';


@Injectable()
export class DebuggerService {
constructor() { }

getCharacters(): any{
  return CHARACTERS ;
}

getObjectCharacters(): any{
  return Object.keys(CHARACTERS) ;
}

getColumns(): string[]{
  return ["CustomerName", "age", "species", "occupation"]};
}

@Injectable()
export class WindowRef {
    constructor() {}

    getNativeWindow() {
        return window;
    }
}
