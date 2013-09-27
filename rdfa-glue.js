// rdfa-glue.js - use the GreenTurtle RDFa parser with rdflib.js

// Copyright 2013 Commons Machinery http://commonsmachinery.se/
//
// Authors: Peter Liljenberg <peter@commonsmachinery.se>
//
// Distributed under an MIT license, please see LICENSE in the top dir.

FormulaRDFaProcessor.prototype = new RDFaProcessor();
FormulaRDFaProcessor.prototype.constructor = RDFaProcessor;

function FormulaRDFaProcessor(kb) {
    this.formulaKB = kb;
    this.formulaSymbols = {};
    RDFaProcessor.call(this);
}

FormulaRDFaProcessor.prototype.addTriple = function(origin, subject, predicate, object) {
    // Turn triple into formula objects and add the statement
    var s = this.formulaGetSymbol(subject);
    var p = this.formulaKB.sym(predicate);
    var o = this.formulaGetObject(object);

    this.formulaKB.add(s, p, o);
};

FormulaRDFaProcessor.prototype.formulaGetSymbol = function(uri) {
    // We must ensure that blank node objects map 1-1 since
    // rdflib.js generates new IDs for each bnode object, so keep
    // a cache of the objects.  While at it, we might as well
    // cache the symbols (resources).

    if (uri in this.formulaSymbols)
	return this.formulaSymbols[uri];

    var s = null;
    if (uri.substring(0, 2) == "_:") {
	s = this.formulaKB.bnode();
    }
    else {
	s = this.formulaKB.sym(uri);
    }

    this.formulaSymbols[uri] = s;
    return s
};

FormulaRDFaProcessor.prototype.formulaGetObject = function(object) {
    if (object.type == "http://www.w3.org/1999/02/22-rdf-syntax-ns#object") {
	return this.formulaGetSymbol(object.value);
    }
    else {
	var type = null;
	if (object.type != "http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral")
	    type = object.type;
	
	return this.formulaKB.literal(object.value, object.language, type);
    }
};
