# stencil-inline-file

A Stenciljs plugin to insert inline files in base64 into components on build time.

## Installation

```bash
npm install -D @d0whc3r/stencil-inline-file
```

## Usage

First of all, you need to declare the global extension module on your TypeScript project, if you haven't done that yet so it will be possible to directly import fonts files `import FontWoff from './my-font.woff'`.

```javascript
// src/typings.d.ts (example name)
declare module '*.woff' {
  const woffContent: string;

  export default woffContent;
}
```

> Instead of *.woff you need to create as many as need

Import the plugin on your `stencil.config.ts` file and add the `inlineFile` function to your plugins list.

```javascript
import { Config } from '@stencil/core';
import { inlineFile } from '@d0whc3r/stencil-inline-file';

export const config: Config = {
  namespace: 'mycomponent',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [inlineFile(/\.(woff|woff2|eot|png)$)/i],
};
```

Now, just import your file and set it where you need

```javascript
import { Component } from '@stencil/core';
import woffFont from '../../assets/fonts/myfont.woff';
import woff2Font from '../../assets/fonts/myfont.woff2';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  componentWillLoad() {
    this.renderIconsHead();
  }
  renderIconsHead() {
    const styleId = 'awesome-icons';
    const head = document.head || document.getElementsByTagName('head')[0];
    if (!head.querySelector(`style[s-id=${styleId}]`)) {
      const style = document.createElement('style');
      style.setAttribute('s-id', styleId);
      style.setAttribute('type', 'text/css');
      const css = `@charset "UTF-8";
@font-face {
  font-family: "awesome-icons";
  src: url(${woffFont}) format('woff'),
       url(${woff2Font}) format('woff2');
  font-weight: normal;
}`;
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }
  }

  render() {
    return <div>....</div>;
  }
}
```

## Links

Stenciljs - https://stenciljs.com/
