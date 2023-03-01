import { Component } from '@angular/core';
import { ViaCepService } from '../../services/via-cep.service';
import { Cep } from '../../model/cep';

@Component({
  selector: 'app-get-cep',
  templateUrl: './get-cep.component.html',
  styleUrls: ['./get-cep.component.scss']
})
export class GetCepComponent {

  cepObj: Cep = {};

  constructor(private cepService: ViaCepService) {}

  async getCep(cep: string) {
    await this.cepService.getCep(cep).toPromise().then(data => {
      this.cepObj.cep = data.cep;
      this.cepObj.logradouro = data.logradouro;
      this.cepObj.complemento = data.complemento;
      this.cepObj.bairro = data.bairro;
      this.cepObj.localidade = data.localidade;
      this.cepObj.uf = data.uf;
    });
  }
}
