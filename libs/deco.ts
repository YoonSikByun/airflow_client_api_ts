// Decorator function 
function use_psql(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  var fn = descriptor.value;
  if (typeof fn == 'function') {
      descriptor.value = function(...args : any[]) {
        try {
          console.log('inner begin decorator ----------------');
          console.log(args)
          args.push('ccccc')
          var result = fn.apply(this, args);
          console.log(result);
          console.log('inner decorator ----------------');
          return result;
        } catch(err) {

        } finally {
          console.log(`[finally] function : ${propertyKey} ------`);
        }
      }
  }
  return descriptor;
}

export class ExampleClass {
  @use_psql
  static testf(a : number, b : number, c? : any) {
      console.log('enter function..........');
      console.log(`c : ${c}`);
      this.test2('wr902q3urq23ur',);
      return a + b;
  }

  // @first()
  static method() {
      console.log('ExampleClass...');
  }

  static test2(a : string) {
    console.log(a);
  }
}