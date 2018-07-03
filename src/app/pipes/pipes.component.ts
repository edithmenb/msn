import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {
  timestamp = Date.now();
  price = 1234.5678909876567890;
  user = {
    name: 'Edith',
    ager: 23,
    status: 'online',
    friend: true
  }

  constructor() { 
    //convirtiendo arreglo a observable
    const source = from([ 1, 2, 3, 4, 5 ]);
    //agregando 10 a cada valor
    const example = source.pipe(map(val => val + 10));
    //output: 11, 12, 13, 14, 15
    example.subscribe( val => console.log(val));
  }

  ngOnInit() {
  }

}
