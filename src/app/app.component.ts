import { Component } from '@angular/core';
import { AutoCompleteConfig } from 'src/auto-complete/auto-complete-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-input-mask';
  data = [
    { id: 1, name: 'Afghanistan' },
    { id: 1, name: "Albania" },
    { id: 1, name: "Algeria" },
    { id: 1, name: "Andorra" },{ id: 1, name: 'Afghanistan' },
    { id: 1, name: "Albania" },
    { id: 1, name: "Algeria" },
    { id: 1, name: "Andorra" },{ id: 1, name: 'Afghanistan' },
    { id: 1, name: "Albania" },
    { id: 1, name: "Algeria" },
    { id: 1, name: "Andorra" },];
  countries = [];
  countries1 = ["Angola", "Anguilla", "Antigua &amp; Barbuda"];
  config: AutoCompleteConfig = {key: 'name', name: 'countries', placeholder: 'Please type something', multiple: true};
  constructor() {
    // this.countries = [...this.data];
  }

  text: string;

  results: string[];

  onSearch(event) {
    setTimeout(() => {
      this.countries = this.data.filter(c => c.name.toLowerCase().includes(event.toLowerCase()));
    }, 400);
  }

  onInputChange(event) {
    // this.countries = this.data.filter(c => c.name.toLowerCase().includes(event.toLowerCase()));
  }

  onCountrySelect(event) {
    
  }
}
