rdfa-glue.js
============

The RDFa parser in rdflib.js has a large warning that it is untested
code, it is not included in the default build, and does break on some
RDFa.  Meanwhile the GreenTurtle library has a well-functioning RDFa
parser.  This glue code allows the GreenTurtle parser to populate an
rdflib.js Formula.

Usage
-----

* GreenTurtle: http://code.google.com/p/green-turtle/ (just RDFaProcessor.js)
* rdflib.js: https://github.com/linkeddata/rdflib.js

```html
<script src="rdflib.js" type="text/javascript"></script>
<script src="RDFaProcessor.min.X.Y.Z.js" type="text/javascript"></script>
<script src="rdfa-glue.js" type="text/javascript"></script>
```

```javascript
var kb = new $rdf.IndexedFormula();
var processor = new FormulaRDFaProcessor(kb);
processor.process(document);

var foo = kb.any(kb.sym(''), undefined, undefined);
```


License
-------

Copyright 2013 Commons Machinery http://commonsmachinery.se/

Distributed under an MIT license, please see LICENSE in the top dir.

Contact: Peter Liljenberg <peter@commonsmachinery.se>


**We're happy to let either GreenTurtle or rdflib.js take over this code!**
