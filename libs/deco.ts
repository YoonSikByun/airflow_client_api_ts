// Decorator function 
function use_psql(target, name, descriptor) {
  var fn = descriptor.value;
  // Checks if "descriptor.value"
  // is a function or not
  if (typeof fn == 'function') {
      descriptor.value = function(...args) {
        try {
          var result = fn.apply(this, args);
          console.log(result);
          return result;
        } catch(err) {

        } finally {
          console.log(`------ [finally] ${name} ------`);
        }
      }
  }
  return descriptor;
}
export class ExampleClass {
  @use_psql
  testf() {
      console.log('enter function..........');
      return 'return value';
  }

  // @first()
  method() {
      console.log('ExampleClass...');
  }
}