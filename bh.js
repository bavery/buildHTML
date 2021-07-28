function HTMLStructure(structure, top){
    this.top = top || document.body;
    if(structure) this.addElement(structure);
}

HTMLStructure.prototype.createElement = function(args){
    var args = args || {},
        ele = document.createElement(args.tag || "div");

    for(var prop in args){
        switch(prop){
            case "tag": case "textBefore": case "textAfter": break; case "label": break;
            case "attributes":
                for(var i in args.attributes) ele.setAttribute(i,args.attributes[i]);
                break;
            case "children":
                for(var i in args.children) this.addElement(args.children[i],ele);
                break;
            case "listeners":
                for(var i in args.listeners) ele.addEventListener(i, args.listeners[i]);
                break;
            case "classes":
                var clss = typeof args.classes === "string" ? args.classes.split(",") : args.classes.filter(Boolean);
                for(var i in clss) ele.classList.add(clss[i].trim());
                break;
            case "items": 
                if(args.tag == "ul" || args.tag == "ol"){
                    for(var i in args.items) this.addElement(typeof args.items[i] == "string" ? {tag:"li", textAfter: args.items[i]} : {tag:"li", children: [args.items[i]]}, ele);
                    break;
                }
            default:
                if(args[prop].constructor === Object){
                    Object.keys(args[prop]).forEach(function(k){ ele[prop][k] = args[prop][k]; });
                    continue;
                }
                ele[prop] = args[prop];
        }
    }

    if(args.hasOwnProperty("textBefore")) ele.insertAdjacentText("afterbegin", args.textBefore);
    if(args.hasOwnProperty("textAfter")) ele.insertAdjacentText("beforeend", args.textAfter);
    return ele;
}

HTMLStructure.prototype.buildHTML =  HTMLStructure.prototype.addElement = function(ele, ctx){
    var child = ele instanceof Element ? ele : this.createElement(ele),
        parent = ctx || this.top;

    if(ele.hasOwnProperty("localVarName")) parent[ele.localVarName] = child;
    if(ele.hasOwnProperty("varName")) this[ele.varName] = child;

    if(ele.hasOwnProperty("label")){
        let label = this.createElement({tag:"label", textBefore:ele.label, children:[child]});
        child = label;
    }

    parent.insertAdjacentElement(ele.hasOwnProperty("prepend") && ele.prepend ? "afterbegin" : "beforeend",child);
}

HTMLElement.prototype.buildHTML = function(structure){
    return new HTMLStructure(structure,this);
}