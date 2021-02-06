# pure-lazyload

This is an image lazy loading library with a loading icon.  

![title.png](https://raw.githubusercontent.com/takuya-motoshima/pure-lazyload/master/screencap/title.png)

This library works with the following browsers that support Intersection Observer.  

![intersection-observer-support-browser.png](https://raw.githubusercontent.com/takuya-motoshima/pure-lazyload/master/screencap/intersection-observer-support-browser.png)

## API
See [API.md](./API.md) for API reference.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## Examples

There are some examples in "./examples" in this package.

## Usage

### Basic.

![basic.png](https://raw.githubusercontent.com/takuya-motoshima/pure-lazyload/master/screencap/basic.png)

HTML:  

```html
<style>
  html, body {
    height: 100%;
  }

  body {
    padding: 0;
    background: #000;
  }

    img {
      display: block;
      margin: 30px auto;
      width: 470px;
      height: 354px;
      object-fit: cover;
    }
    
    h2 {
      text-align: center;
    }
</style>

<img data-src="images/1.jpg"><h2>EXAMPLE 1</h2>
<img data-src="images/2.jpg"><h2>EXAMPLE 2</h2>
<img data-src="images/3.jpg"><h2>EXAMPLE 3</h2>
<img data-src="images/4.jpg"><h2>EXAMPLE 4</h2>
<img data-src="images/5.jpg"><h2>EXAMPLE 5</h2>
```

JS:  

```js
import Lazyload from 'pure-lazyload';

// Lazy loading.
Lazyload.observe(document.querySelectorAll('img'));
```

### Gallery.

![gallery.png](https://raw.githubusercontent.com/takuya-motoshima/pure-lazyload/master/screencap/gallery.png)

HTML:  

```html
<style>
  html, body {
    height: 100%;
  }

  body {
    padding: 0;
    background: #000;
    color: #fff;
  }
</style>

<div class="lz-gallery">
  <figure class="lz-gallery-item"><img data-src="images/1.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/2.jpg"></figure>
  <figure class="lz-gallery-item lz-gallery-item-big"><img data-src="images/3.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/4.jpg"></figure>
  <figure class="lz-gallery-item lz-gallery-item-big"><img data-src="images/5.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/6.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/7.jpg"></figure>
  <figure class="lz-gallery-item lz-gallery-item-horizontal"><img data-src="images/8.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/9.jpg"></figure>
  <figure class="lz-gallery-item lz-gallery-item-horizontal"><img data-src="images/10.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/11.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/12.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/13.jpg"></figure>
  <figure class="lz-gallery-item lz-gallery-item-horizontal"><img data-src="images/14.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/15.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/16.jpg"></figure>
  <figure class="lz-gallery-item lz-gallery-item-big"><img data-src="images/17.jpg"></figure>
  <figure class="lz-gallery-item lz-gallery-item-vertical"><img data-src="images/18.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/19.jpg"></figure>
  <figure class="lz-gallery-item"><img data-src="images/20.jpg"></figure>
</div>
```

JS:  

```js
import Lazyload from 'pure-lazyload';

// Lazy loading.
Lazyload.observe(document.querySelectorAll('img'));
```

## License

[MIT licensed](./LICENSE.txt)