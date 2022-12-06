class TreeStore {
  constructor(items) {
    this.items = items;
  }

  getAll() {
    return JSON.stringify(items);
  }

  getItem(id) {
    return JSON.stringify(this.items.find((item) => item.id === id));
  }

  getChildren(id) {
    return JSON.stringify(
      this.items.reduce((acc, item) => {
        if (item.parent === id) acc.push(item);
        return acc;
      }, [])
    );
  }

  getAllChildren(id) {
    const result = [];
    const items = this.items;

    (function callback(id) {
      items.forEach((item) => {
        if (item.parent === id) {
          result.push(item);
          callback(item.id);
        }
      });
    })(id);

    return JSON.stringify(result);
  }

  getAllParents(id) {
    const result = [];
    const items = this.items;

    (function callback(id) {
      items.forEach((item) => {
        if (item.id === id) {
          const parent_find = items.find((item_b) => item_b.id === item.parent);
          if (parent_find) {
            result.push(parent_find);
            callback(parent_find.id);
          }
        }
      });
    })(id);

    return JSON.stringify(result);
  }
}

const items = [
  { id: 1, parent: "root" },
  { id: 2, parent: 1, type: "test" },
  { id: 3, parent: 1, type: "test" },

  { id: 4, parent: 2, type: "test" },
  { id: 5, parent: 2, type: "test" },
  { id: 6, parent: 2, type: "test" },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log("getAll() // ", ts.getAll());
console.log("getItem(7) // ", ts.getItem(7));
console.log("getChildren(4) // ", ts.getChildren(4));
console.log("getChildren(5) // ", ts.getChildren(5));
console.log("getChildren(2) // ", ts.getChildren(2));
console.log("getAllChildren(2) // ", ts.getAllChildren(2));
console.log("getAllParents(7) // ", ts.getAllParents(7));
