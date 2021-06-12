import { AnnotationFactory } from 'annotpdf';
const fs = require('fs');

console.log('started');

function start() {
  fs.readFile(__dirname+'/../../src/wa.pdf', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    // AnnotationFactory
    const factory = new AnnotationFactory(new Uint8Array(data));
    // AnnotationFactory.loadFile(file).then((factory) => {
    // factory.createTextAnnotation({
    //   page: 0,
    //   rect: [50, 50, 80, 80],
    //   contents: "Pop up note",
    //   author: "Max"
    //   // ...
    // })

    factory.getAnnotations().then((res) => {
      console.log('factory annotations', res);
      const an1 = res[0].find((r) => r.id === '01F76F5Q9ET44TQGBF85MTA6HE');
      if (an1) {
        an1.contents = '1';
      }
      const an = res[0].find((r) => r.id === '01F791J899TSSPWSJGEYA93ER3');
      if (an) {
        an.contents = '2';
        factory.createFreeTextAnnotation(0, [100, 100, 300, 300], '3', 'vlad', {
          r: 250,
          g: 0,
          b: 0,
        });
        factory.save('overwrite.pdf');
      }
    });
  });
  // })
}

start();
