class VNode {
  constructor(tag, children, text) {
    this.tag = tag;
    this.childen = children;
    this.text = text;
  }

  render() {
    if (this.tag === "#text") {
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag);
    this.childen.forEach(vChild => {
      el.appendChild(vChild.render())
    });
    return el
  }
}

let v = (tag, children, text) => {
  if (typeof children === "string") {
    text = children;
    children = []
  }
  return new VNode(tag, children, text)
};

let text = new VNode('#text', [], "hello");
let div = new VNode('div', [text]);
console.log(text);
console.log(div);
let hello = div.render();
console.log(hello);
document.body.appendChild(hello);