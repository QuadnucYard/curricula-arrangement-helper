export {}; // this file needs to be a module

(function () {
  if (!String.prototype.isNullOrEmpty) {
    String.prototype.isNullOrEmpty = function (this: string): boolean {
      return !this;
    };
  }

  if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function (predicate: (item: any) => boolean) {
      for (var i = 0; i < (<Array<any>>this).length; i++) {
        let item = (<Array<any>>this)[i];
        if (predicate(item)) {
          return item;
        }
      }
      return null;
    };
  }

  if (!Array.prototype.removeAt) {
    Array.prototype.removeAt = function (index: number): any {
      let item = this[index];
      (<Array<any>>this).splice(index, 1);
      return item;
    };
  }

  if (!Array.prototype.removeOne) {
    Array.prototype.removeOne = function (item: any | null): boolean {
      let index = (<Array<any>>this).indexOf(item);
      if (index >= 0) {
        (<Array<any>>this).splice(index, 1);
        return true;
      }
      return false;
    };
  }

  if (!Array.prototype.removeRange) {
    Array.prototype.removeRange = function (items: any[]): void {
      for (var i = 0; i < items.length; i++) {
        (<Array<any>>this).removeOne(items[i]);
      }
    };
  }

  if (!Array.prototype.addRange) {
    Array.prototype.addRange = function (items: any[]): void {
      for (var i = 0; i < items.length; i++) {
        (<Array<any>>this).push(items[i]);
      }
    };
  }

  if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function (propertyExpression: (item: any) => any) {
      let result = <any>[];
      var compareFunction = (item1: any, item2: any): number => {
        if (propertyExpression(item1) > propertyExpression(item2)) return 1;
        if (propertyExpression(item2) > propertyExpression(item1)) return -1;
        return 0;
      };
      for (var i = 0; i < (<Array<any>>this).length; i++) {
        return (<Array<any>>this).sort(compareFunction);
      }
      return result;
    };
  }

  if (!Array.prototype.orderByDescending) {
    Array.prototype.orderByDescending = function (propertyExpression: (item: any) => any) {
      let result = <any>[];
      var compareFunction = (item1: any, item2: any): number => {
        if (propertyExpression(item1) > propertyExpression(item2)) return -1;
        if (propertyExpression(item2) > propertyExpression(item1)) return 1;
        return 0;
      };
      for (var i = 0; i < (<Array<any>>this).length; i++) {
        return (<Array<any>>this).sort(compareFunction);
      }
      return result;
    };
  }

  if (!Array.prototype.orderByMany) {
    Array.prototype.orderByMany = function (propertyExpressions: [(item: any) => any]) {
      let result = <any>[];
      var compareFunction = (item1: any, item2: any): number => {
        for (var i = 0; i < propertyExpressions.length; i++) {
          let propertyExpression = propertyExpressions[i];
          if (propertyExpression(item1) > propertyExpression(item2)) return 1;
          if (propertyExpression(item2) > propertyExpression(item1)) return -1;
        }
        return 0;
      };
      for (var i = 0; i < (<Array<any>>this).length; i++) {
        return (<Array<any>>this).sort(compareFunction);
      }
      return result;
    };
  }

  if (!Array.prototype.orderByManyDescending) {
    Array.prototype.orderByManyDescending = function (propertyExpressions: [(item: any) => any]) {
      let result = <any>[];
      var compareFunction = (item1: any, item2: any): number => {
        for (var i = 0; i < propertyExpressions.length; i++) {
          let propertyExpression = propertyExpressions[i];
          if (propertyExpression(item1) > propertyExpression(item2)) return -1;
          if (propertyExpression(item2) > propertyExpression(item1)) return 1;
        }
        return 0;
      };
      for (var i = 0; i < (<Array<any>>this).length; i++) {
        return (<Array<any>>this).sort(compareFunction);
      }
      return result;
    };
  }
})();
