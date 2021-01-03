class TableView {
  constructor(table) {
    this.table = table;

    this._isEdited = false;
    this._initLocalListeners();
  }

  _initLocalListeners() {
    this.table.addEventListener('input', event => {
      if (event.target.classList.contains('editable')) {
        this._isEdited = true;
      }
    });

    this.table.addEventListener('input', event => {
      if (event.target.nodeName === 'SELECT') {
        const tdParent = event.target.parentElement;
        tdParent.dataset.id = event.target.value;

        if (tdParent.classList.contains('editable')) {
          this._isEdited = true;
        }
      }
    });
  }

  bindInsert(handler) {
    this.table.addEventListener('click', event => {
      if (event.target.dataset.type === 'insert') {
        const row = event.target.closest('tr');
        const params = this._getParamsFromRow(row);

        handler(params);
      }
    });
  }

  bindUpdate(handler) {
    this.table.addEventListener('focusout', event => {
      if (this._isEdited) {
        const row = event.target.closest('tr');
        const params = this._getParamsFromRow(row);

        handler(params);
        this._isEdited = false;
      }
    });
  }

  bindDelete(handler) {
    this.table.addEventListener('click', event => {
      if (event.target.dataset.type === 'delete') {
        const row = event.target.closest('tr');
        const params = this._getParamsFromRow(row);

        handler(params);
      }
    });
  }

  _getParamsFromRow(row) {
    return Array.from(row.childNodes).reduce(
      (params, field) => ({
        ...params,
        [field.dataset.name]:
          field.firstChild.nodeName != 'SELECT' ? field.textContent : field.dataset.id,
      }),
      {id: row.dataset.id, class: this.table.dataset.class},
    );
  }
}
