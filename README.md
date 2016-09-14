# babel-preset-apentle
Babel presets for apentle applications

## Install

```bash
npm install --save babel-preset-apentle
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["apentle"]
}
```

### Via CLI

```bash
babel file.js --presets apentle
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["apentle"]
});
```
