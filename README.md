# buildHTML
Javascript Library that allows quick, readable, easy way of creating HTML Structure


# HTMLStructure
Constructor class to establish the HTML structure.

```javascript
var html = new HTMLStructure();
```

The first argument is the JSON template to build the HTML.  The second is the HTML element set as the context to build the HTML.  If no second argument is passed, it will default to the document body.

```javascript
var ctx = document.getElementById("container"),
    json = { tag: "div", id: "some-id" };

var html = new HTMLStructure(json, ctx)
//Creates <div id="some-id"></div> and appends it to <div id="container"></div>
```

## HTMLStructure.prototype.createElement
Function that creates and defines the properties of the element.  Takes one argument, which is the JSON template.

```javascript
var html = new HTMLStructure(),
    json = { tag: "div", id: "some-id" };

html.createElement(json);
//Creates <div id="some-id"></div>
```

## HTMLStructure.prototype.addElement (buildHTML)
Function that adds an element to its context.  Takes two arguments: the element and the context.  The element can either be an HTML Element, or (preferably) the JSON template.  The context is where to append/prepend the element to.  If no context is provided, the element will be added to the top context of the HTMLStructure.

```javascript
var ctx = document.getElementById("container"),
    html = new HTMLStructure(),
    json = { tag: "div", id: "some-id" };

html.addElement(json);
//Creates <div id="some-id"></div> and appends it to <div id="container"></div>
```

## HTMLElement.prototype.buildHTML
Builds an HTMLStructure and attaches it to an HTML Element
```javascript
var ctx = document.getElementById("container"),
json = { tag: "div", id: "some-id" };

ctx.bulidHTML(json);
//Creates <div id="some-id"></div> and appends it to <div id="container"></div>
//returns the HTMLStructure object with the <div id="container"></div> as the top context
```


# JSON Template Syntax
The JSON Template is what defines the elements being created.  The only required property is "tag", which defines the type of element being created.

```javascript
{
    tag: "div"
}
//Creates <div></div>
```
HTML [element properties](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) can be added at the top level of the JSON template.
```javascript
{
    tag: "div",
    id: "some-div-id",
    textContent: "this is text"
}
//Creates <div id="some-div-id">this is text</div>
```

Special properties can be added to the JSON template:

## children
Array of JSON template objects to create a nested structure
```javascript
{
    tag: "div"
    children: [{
        tag: "span",
        textContent: "child 1"
    },{
        tag: "span",
        textContent: "child2"
    }]
}
//Creates <div><span>child 1</span><span>child 2</span></div>
```

## classes
Either an array of class names, or an string of comma separated items
```javascript
{
    tag: "div",
    classes: ["class1","class2","class3"]
}
//Creates <div class="class1 class2 class3"></div>
```
or
```javascript
{
    tag: "div",
    classes: "class1, class2, class3"
}
//Creates <div class="class1 class2 class3"></div>
```

## attributes
Object of attributes, created by key->value
```javascript
{
    tag: "div",
    attributes: {
        attr1: "value1",
        attr2: "value2"
    }
}
//Creates <div attr1="value1" attr2="value2"></div>
```

## listeners
Object of [event listeners](https://developer.mozilla.org/en-US/docs/Web/Events), created by key->function
```javascript
{
    tag: "div",
    listeners: {
        click: function(e){
            console.log("Clicked div");
        },
        mouseover: function(e){
            console.log("Moused over div");
        }
    }
}

```
## items
Array of items for ordered and unordered lists.  Items can be strings, JSON template elements, or HTMLElements
```javascript
{
    tag: "ul",
    items: ["one","two","three"]
}
//Creates <ul><li>one</li><li>two</li><li>three</li></ul>
```
or
```javascript
{
    tag: "ol",
    items: ["one","two","three"]
}
//Creates <ol><li>one</li><li>two</li><li>three</li></ol>
```
## label
Wraps the element in a label element, where the value is the text content
```javascript
{
    tag: "input",
    label: "Form Input"
}
//Creates <label>Form Input<input /></label>
```
## prepend
Boolean. Sets the element to be prepended to its parent
```javascript
{
    tag: "div",
    children:[{
        name: "span"
        id: "child1"
    },{
        name: "span"
        id: "child2"
    },{
        name: "span"
        id: "child3",
        prepend: true
    }]
}
//Creates <div><span id="child3"></span><span id="child1"></span><span id="child2"></span></div>
```

## textBefore/textAfter
Prepends or appends text to the element
```javascript
    {
        tag: "div",
        children:[{tag: "span", textContent: "child node"}],
        textContent: "The is textContent.",
        textAfter: "This is textAfter.",
        textBefore: "This is textBefore."
    }
//Creates <div>This is textBefore.This is textContent.<span>child node</span>This is textAfter."</div>
```

## varName and localVarName
To make the elements contextually accessible to later code, we can add references to these elements as variables.

**varName** adds a reference for the created element to the HTMLStructure object

**localVarName** adds a reference to for the created element to its parent element

```javascript
var json = {
    tag: "div",
    varName: "divTest",
    children: [{
        tag: "span",
        textContent: "This is the span element",
        varName: "spanTest"
    },{
        tag: "p",
        textContent: "this is the paragraph element",
        varName: "pTest"
    }]
}

var html = new HTMLStructure(json);

console.log(html.spanTest.textContent); //This is the span element

console.log(html.divTest.pTest.textContent); //This is the paragraph element

```