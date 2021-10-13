import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitpanda',
  templateUrl: './bitpanda.component.html',
  styleUrls: ['./bitpanda.component.css']
})
export class BitpandaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');

    this.http.get('http://localhost:3000/bitpanda', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).subscribe(data => {
      console.log(data);

    })
  }

}
