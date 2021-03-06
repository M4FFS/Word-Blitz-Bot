import fs from 'fs';

class Dictionary {
  constructor(fileName) {
    this.trieRoot = new TrieNode(false);
    fs.readFileSync(fileName, 'utf8')
      .split(/\s+/)
      .forEach((word) => this.insert(word.toLowerCase()));
  }

  insert(word) {
    // Do not insert word if it is too long or short
    if (word.length < 2 || word.length > 16) return;

    let curr = this.trieRoot;
    for (const char of word) {
      // Create node if it doesn't exist
      if (!curr.children[this._ord(char)])
        curr.children[this._ord(char)] = new TrieNode(false);

      curr = curr.children[this._ord(char)];
    }
    curr.valid = true;
  }

  contains(word) {
    let curr = this.trieRoot;
    for (const char of word) {
      if (!curr.children[this._ord(char)]) return false;
      curr = curr.children[this._ord(char)];
    }
    return curr.valid;
  }

  getRoot() {
    return this.trieRoot;
  }

  getChild(node, char) {
    return node?.children[this._ord(char)];
  }

  _ord(char) {
    return char.charCodeAt(0) - 97;
  }
}

class TrieNode {
  constructor(valid) {
    this.valid = valid;
    this.children = new Array(26);
  }
}

export default Dictionary;
