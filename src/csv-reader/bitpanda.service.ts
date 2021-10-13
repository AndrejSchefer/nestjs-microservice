import { Injectable } from "@nestjs/common";
const csv = require('csv-parser')
const fs = require('fs')

@Injectable()
export class BitpandaService {
  private results = []
  constructor() {
  }

  async readCSV() {
    return new Promise((res, rej) => {
      fs.createReadStream('bitpanda.csv')
        .pipe(csv())
        .on('data', (data) => this.results.push(data))
        .on('end', () => {
          console.log(this.results.length);
          res(this.results)
        });
    })
  }


}
