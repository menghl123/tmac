import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input()
  pager: any;
  @Input()
  showPagination: any;
  @Input()
  columns: string[];
  @Input()
  fields: string[];
  selectAll: boolean;
  selectIds = [];
  singleSelect: boolean;
  multiSelect: boolean;
  idField: string;
  @Output()
  onPageChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.selectAll = false;
    this.idField = 'id';
    this.pager = {};
    this.showPagination = true;
  }

  ngOnInit() {
  }

  isChecked(id: string) {
    return this.selectIds.indexOf(id) !== -1;
  }

  clickCheckboxItem(id: string) {
    const index = this.selectIds.indexOf(id);
    if (index === -1) {
      this.selectIds.push(id);
    } else {
      this.selectIds.splice(index, 1);
    }
    this.controlIsChecked();
    this.selectStatusListener();
  }

  clickCheckboxControl() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectIds = this.pager.content.map(items => items[this.idField]);
    } else {
      this.selectIds = [];
    }
    this.selectStatusListener();
  }

  private selectStatusListener() {
    this.singleSelect = !!(this.selectIds && this.selectIds.length === 1);
    this.multiSelect = !!(this.selectIds && this.selectIds.length > 1);
  }

  controlIsChecked() {
    if (this.pager.content) {
      this.selectAll = this.selectIds.length === this.pager.content.length;
    }
  }

  getSelectRows() {
    if (this.selectIds && this.selectIds.length > 0) {
      return this.pager.content.filter(menu => this.selectIds.indexOf(menu[this.idField]) !== -1);
    }
  }

  getSelectRow() {
    const rows = this.getSelectRows();
    if (rows && rows.length > 0) {
      return rows[0];
    }
  }

  initSelectStatus() {
    this.selectIds = [];
    this.selectAll = false;
    this.singleSelect = false;
    this.multiSelect = false;
  }

  pageChange(index) {
    this.onPageChange.emit(index);
  }

  changeSelectIds(ids: any[]) {
    this.selectIds = ids;
    this.controlIsChecked();
  }
}
