import './styles/lazyload.css';

export default class {

  /**
   * Monitor if the target element is in the visible area.
   */
  private static io: IntersectionObserver|undefined = undefined;

  /**
   * Debug mode.
   */
  private static debugging: boolean = false;

  /**
   * Start lazy loading.
   * 
   * @param {HTMLImageElement[]} imgs
   * @param {{ root?: null|HTMLElement, rootMargin?: string, background?: string }} options
   * @return {void}
   */
  public static observe(imgs: HTMLImageElement[], options?: {
    root?: null|HTMLElement,
    rootMargin?: string,
    background?: string,
    debugging?: boolean
  }): void {
    // Initialize options
    options = Object.assign({
      root: null,
      rootMargin: '0px',
      background: 'random',
      debugging: false
    }, options||{});

    // Returns a warning if IntersectionObserver is not supported.
    if (!window.IntersectionObserver)
      return void console.warn('This browser does not support lazy load');

    // Set debug mode.
    this.debugging = options.debugging as boolean;

    // Monitor if the image is in the visible area.
    this.io = new IntersectionObserver(entries => {
      for (let entry of entries) {
        // Do nothing if the target element is not in the visible area.
        if (entry.intersectionRatio > 0 || entry.isIntersecting) {
          // Target element in the visible area.
          const img = entry.target as HTMLImageElement;

          // Stop monitoring.
          this.io!.unobserve(img);

          // Load the image.
          let src = img.getAttribute('data-src');
          if (!src) return;
          img.setAttribute('src', src);
          img.removeAttribute('data-src');

          // Remove the wrap element when you have finished loading the image
          ((img) => {
            img.addEventListener('load', () => {
              this.debug(`Loaded image ${img.getAttribute('src')}`);
              const wrap: HTMLElement = img.parentNode as HTMLElement;
              const parent: HTMLElement = wrap.parentNode as HTMLElement;
              parent.insertBefore(img, wrap);
              parent.removeChild(wrap);

              // Restore image style.
              img.style.visibility = img.dataset.originalVisibility as string;
              img.removeAttribute('data-original-visibility');
              // img.style.position = img.dataset.originalPosition as string;
              // img.style.top = img.dataset.originalTop as string;
              // img.style.left = img.dataset.originalLeft as string;
              // img.style.zIndex = img.dataset.originalZIndex as string;
              // img.removeAttribute('data-original-position');
              // img.removeAttribute('data-original-top');
              // img.removeAttribute('data-original-left');
              // img.removeAttribute('data-original-z-index');
            }, false);
          })(img);
        }
      }
    }, {
      root: options.root,
      // rootMargin: '-50% 0px -50% 0px',
      rootMargin: options.rootMargin,
      threshold: 0
    });

    // Wrap the image in a wrap element.
    // The wrap element is used to display the loading icon and background while loading the image.
    for (let img of imgs) {
      // Create a wrap element. Copy the style of the image into the wrap element.
      const wrap = document.createElement('div');
      wrap.classList.add('lz-wrap');
      wrap.style.backgroundColor = options.background === 'random' ? `#${Math.floor(Math.random()*16777215).toString(16)}` : options.background as string;
      const styles = Object.assign({}, getComputedStyle(img));

      // Copy to the element that wraps the style of the image.
      wrap.style.position = styles.position !== 'static' ? styles.position : 'relative';
      wrap.style.display = styles.display === 'inline' ? 'inline-block' : styles.display;
      wrap.style.width = styles.width;
      wrap.style.height = styles.height;
      wrap.style.margin = styles.margin;
      wrap.style.zIndex = styles.zIndex;
      wrap.style.top = styles.top;
      wrap.style.right = styles.right;
      wrap.style.bottom = styles.bottom;
      wrap.style.left = styles.left;

      // Back up the original style of the image. Restore the style after loading the image.
      img.dataset.originalVisibility = styles.visibility;
      img.style.visibility = 'hidden';
      // img.dataset.originalPosition = styles.position;
      // img.dataset.originalTop = styles.top;
      // img.dataset.originalLeft = styles.left;
      // img.dataset.originalZIndex = styles.zIndex;

      // // Make the position look the same as before wrapping the image in elements.
      // img.style.position = 'absolute';
      // img.style.zIndex = '1';
      // const top = (parseInt(styles.top, 10) || 0) - (parseInt(styles.marginTop, 10) || 0);
      // const left = (parseInt(styles.left, 10) || 0) - (parseInt(styles.marginLeft, 10) || 0);
      // img.style.top = `${top}px`;
      // img.style.left = `${left}px`;

      // Make a loading icon.
      const spinner = document.createElement('div');
      spinner.classList.add('lz-spinner');
      spinner.style.zIndex = '2';

      // Wrap the image in a wrap element.
      img.before(wrap);
      wrap.append(img, spinner);
    }

    // Monitor if the image is in the visible area.
    for (let img of imgs) this.io.observe(img);
  }

  /**
   * Remove target element monitoring for lazy loading.
   * 
   * @return {void}
   */
  public static destroy(): void {
    if (!this.io) return;
    this.io.disconnect();
    this.io = undefined;
  }

  /**
   * Output debug log.
   * 
   * @param {any[]} .params
   */
  private static debug(...params: any[]) {
    if (!this.debugging) return;
    console.log.apply(console, params as [any?, ...any[]]);
  }
}