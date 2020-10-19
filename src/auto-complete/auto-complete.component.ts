import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AutoCompleteConfig } from './auto-complete-config';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  @Input() config: AutoCompleteConfig;
  @Input() items = [];

  @ViewChild('dropdown') dropdown;
  @ViewChild('input') input;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onUnselect: EventEmitter<any> = new EventEmitter();
  @Output() onInputChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  showDropdown = false;
  selectedItem = {};
  selectedItems = [];
  timeout;
  highlightItemIndex = -1;
  scrollHeight: number = 0;

  defaultConfigs = {
    type: 'text',
    scrollHeight: 200,
    noResultFound: 'No result found!',
    delay: 300,
    placeholder: ''
  };

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.closeDropdownOnOutsideClick();
    this.config = { ...this.defaultConfigs, ...this.config };
  }

  /**
   * Handle the input change event
   * @param value 
   */
  onInputChange(value: string) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => this.search(value), this.config.delay);

    this.onInputChanged.emit(value);

    if (value.length === 0 || this.items.length === 0) {
      this.onSelect.emit(null);
    }
  }

  /**
   * Close dropdown on input click
   */
  onInputClick() {
    this.openDropdown();
  }

  /**
   * Set selected item
   * Emit onSelect event
   * 
   * @param item 
   * @param index 
   */
  setSelectedItem(item, index?: number) {
    if (!this.config.multiple) {
      this.selectedItem = item;
    }

    this.onSelect.emit(item);
    this.closeDropdown();

    if (index || index === 0) {
      this.highlightItemIndex = index;
    }

    if (this.config.multiple) {
      this.selectedItems.push(item);
      this.input.nativeElement.value = "";
    }
  }

  unselectItem(index: number) {
    this.onUnselect.emit(this.selectedItems[index]);
    this.selectedItems.splice(index, 1);
  }

  /**
   * Close the result dropdown
   */
  closeDropdown() {
    this.showDropdown = false;
  }

  /**
   * Open the result dropdown
   */
  openDropdown() {
    this.showDropdown = true;
  }

  /**
   * Emit the onSearch event
   * @param value 
   */
  search(value: string) {
    this.onSearch.emit(value);
  }

  /**
   * Handle the keydown event on input
   * @param event 
   */
  onKeydown(event) {
    if (!this.showDropdown) return;

    switch (event.which) {
      case KEY.ARROW_DOWN:
        if (this.highlightItemIndex < this.items.length - 1) {
          this.highlightItemIndex++;

          let dropdownItem = document.getElementById('dropdown-item-' + this.highlightItemIndex);
          let noOfItemsInDropdown = this.config.scrollHeight / +dropdownItem.getBoundingClientRect().height;

          if (this.highlightItemIndex >= noOfItemsInDropdown - 1) {
            this.scrollHeight += +dropdownItem.getBoundingClientRect().height;
            this.dropdown.nativeElement.scroll({ top: this.scrollHeight })
          }
        }

        break;

      case KEY.ARROW_UP:
        if (this.highlightItemIndex <= 0) return;

        this.highlightItemIndex--;

        let dropdownItem = document.getElementById('dropdown-item-' + this.highlightItemIndex);
        let noOfItemsInDropdown = this.config.scrollHeight / +dropdownItem.getBoundingClientRect().height;

        if (this.scrollHeight >= +dropdownItem.getBoundingClientRect().height &&
            this.items.length - this.highlightItemIndex >= noOfItemsInDropdown) {
          this.scrollHeight -= +dropdownItem.getBoundingClientRect().height;
          this.dropdown.nativeElement.scroll({ top: this.scrollHeight });
        }

        break;

      case KEY.ENTER:
        if (this.highlightItemIndex > -1) {
          this.setSelectedItem(this.items[this.highlightItemIndex]);
          this.closeDropdown();
        }

        break;

      case KEY.ESCAPE:
        this.closeDropdown();
        break;

      case KEY.TAB:
        if (this.highlightItemIndex > -1) {
          this.setSelectedItem(this.items[this.highlightItemIndex]);
          this.closeDropdown();
        }

        break;
    }

    if (this.config.multiple) {
      switch (event.which) {
        case KEY.BACKSPACE:

          break;
      }
    }
  }

  /**
   * Listen for the click event on the window
   * If click was outside the dropdown or input close the dropdown
   */
  closeDropdownOnOutsideClick() {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.input || !this.dropdown) return;

      if (e.target !== this.dropdown.nativeElement && e.target !== this.input.nativeElement) {
        this.showDropdown = false;
      }
    });
  }
}

enum KEY { ARROW_DOWN = 40, ARROW_UP = 38, ENTER = 13, TAB = 9, ESCAPE = 27, BACKSPACE = 8 };
