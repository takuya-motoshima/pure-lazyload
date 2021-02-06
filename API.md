# Lazyload class.

Image lazy load class.

## Methods

### observe()

Monitor if the image is in the visible area, display the loading icon when it enters the visible area, and start loading.

###### Syntax
```js
Lazyload.observe(
    imgs: HTMLImageElement[],
    options?: {
        root?: null|HTMLElement,
        rootMargin?: string,
        background?: string,
        debugging?: boolean,
        spinnerSize?: 'default'|'lg'|'2x'
    }
): void
```

###### Parameters
- __imgs__: HTMLImageElement[]  
    Image element to lazy load.

- __options__: { root?: null|HTMLElement, rootMargin?: string, background?: string, debugging?: boolean }  
    Lazy load option. The following values can be set.  
    <table>
        <tr>
            <td>root</td>
            <td>The element that is used as the viewport for checking visibility of the target.<br>Must be the ancestor of the target.<br>Defaults to the browser viewport if not specified or if null.</td>
        </tr>
        <tr>
            <td>rootMargin</td>
            <td>Margin around the root.<br>Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).<br>The values can be percentages.<br>This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections.<br>Defaults to all zeros.</td>
        </tr>
        <tr>
            <td>background</td>
            <td>The background color during loading.<br>If "random" is set, the background color will be random.<br>The default is "random".</td>
        </tr>
        <tr>
            <td>debugging</td>
            <td>Debug mode.<br>If true, library debug messages will be displayed on the console.<br>The default is fale (off).</td>
        </tr>
        <tr>
            <td>spinnerSize</td>
            <td>The size of the loading icon.<br>default is 16px, lg is 24px, and 2x is 32px.<br>The default is 16px.</td>
        </tr>
    </table>

## Example

HTML:  

```html
<img data-src="images/1.jpg">
<img data-src="images/2.jpg">
<img data-src="images/3.jpg">
<img data-src="images/4.jpg">
<img data-src="images/5.jpg">
<img data-src="images/6.jpg">
<img data-src="images/7.jpg">
<img data-src="images/8.jpg">
<img data-src="images/9.jpg">
<img data-src="images/10.jpg">
<img data-src="images/11.jpg">
<img data-src="images/12.jpg">
<img data-src="images/13.jpg">
<img data-src="images/14.jpg">
<img data-src="images/15.jpg">
<img data-src="images/16.jpg">
<img data-src="images/17.jpg">
<img data-src="images/18.jpg">
<img data-src="images/19.jpg">
<img data-src="images/20.jpg">
<img data-src="images/21.jpg">
<img data-src="images/22.jpg">
<img data-src="images/23.jpg">
```

JS:  
```js
import Lazyload from 'pure-lazyload';

// Lazy loading.
Lazyload.observe(document.querySelectorAll('img'));
````

# Gallery-style CSS class

This package contains a CSS class that displays images in the gallery.  
By using this CSS class, you can easily use the gallery image.  

## CSS class

<table>
    <thead>
        <tr>
            <th>CSS class name.</th>
            <th>Description.</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>lz-gallery</td>
            <td>The container class for the gallery.</td>
        </tr>
        <tr>
            <td>lz-gallery-item</td>
            <td>A gallery item with a width of 200px to 1fr and a height of 200px.</td>
        </tr>
        <tr>
            <td>lz-gallery-item-horizontal</td>
            <td>A gallery item with a width of 400px to 2fr and a height of 200px.</td>
        </tr>
        <tr>
            <td>lz-gallery-item-big</td>
            <td>A gallery item with a width and height of 400px to 2fr.</td>
        </tr>
        <tr>
            <td>lz-gallery-item-vertical</td>
            <td>A gallery item with a width of 200px and a height of 400px to 2fr.</td>
        </tr>
    </tbody>
</table>

## Example

![gallery-css-example.png](https://raw.githubusercontent.com/takuya-motoshima/pure-lazyload/master/screencap/gallery-css-example.png)

```html
<div class="lz-gallery">
    <figure class="lz-gallery-item">
        <img src="images/2.jpg">
    </figure>
    <figure class="lz-gallery-item lz-gallery-item-big">
        <img src="images/3.jpg">
    </figure>
    <figure class="lz-gallery-item">
        <img src="images/4.jpg">
    </figure>
    <figure class="lz-gallery-item">
        <img src="images/7.jpg">
    </figure>
    <figure class="lz-gallery-item lz-gallery-item-horizontal">
        <img src="images/8.jpg">
    </figure>
    <figure class="lz-gallery-item lz-gallery-item-vertical">
        <img src="images/18.jpg">
    </figure>
    <figure class="lz-gallery-item">
        <img src="images/20.jpg">
    </figure>
</div>
```
