window.dom = {
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      if (node.innerText) {
        node.innerText = string;
      } else {
        node.contentText = string;
      }
    } else if (arguments === 1) {
      return node.innerText || node.contentText;
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "object") {
        for (let attr in name) {
          node.style[name] = name[attr];
        }
      } else if (typeof name === "string") {
        return node.style[name];
      }
    }
  },
  class: {
    add(node, string) {
      node.classList.add(string);
    },
    remove(node, string) {
      node.classList.remove(string);
    },
    has(node, string) {
      return node.classList.contains(string);
    },
  },
  on(node, event, fn) {
    node.addEventListener(event, fn);
  },
  off(node, event, fn) {
    node.removeEventListener(event, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parent.children).filter((n) => n !== node);
  },
  next(node) {
    return node.nextElementSibling;
  },
  previous(node) {
    return node.previousElementSibling;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
dom.create = function (string) {
  let div = document.createElement("div");
  div.innerHTML = string.trim();
  return div.children[0];
};
dom.after = function (node, node2) {
  node.after(node2);
};
dom.before = function (node, node2) {
  node.before(node2);
};
dom.append = function (parent, child) {
  parent.append(child);
};
dom.wrap = function (child, parent) {
  child.before(parent);
  parent.append(child);
};
dom.remove = function (node) {
  return node.remove();
};
dom.empty = function (parent) {
  let parent1 = parent.cloneNode(true);
  parent.innerHTML = "";
  return parent1.childNodes;
};
