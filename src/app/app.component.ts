import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-input-mask';

  text: string;

    results: string[];

    search(event) {
        console.log(event)
    }

    handleDropdown(event) {
        //event.query = current value in input field
    }
}
