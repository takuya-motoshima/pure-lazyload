import './styles/lazyload.css';

export default class {

  /**
   * Monitor if the target element is in the visible area.
   */
  private static observer: IntersectionObserver|undefined = undefined;

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
  public static load(imgs: HTMLImageElement[], options?: {
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
    if (!window.IntersectionObserver) console.warn('This browser does not support lazy load');

    // Set debug mode.
    this.debugging = options.debugging as boolean;

    // Monitor if the image is in the visible area.
    this.observer = new IntersectionObserver(entries => {
      for (let entry of entries) {

        // Do nothing if the target element is not in the visible area.
        if (!entry.isIntersecting) return;

        // Target element in the visible area.
        const img = entry.target as HTMLImageElement;

        // Stop monitoring.
        this.observer!.unobserve(img);

        // Load the image.
        let src = img.getAttribute('data-src');
        if (!src) return;
        img.setAttribute('src', src);

        // Remove the wrap element when you have finished loading the image
        ((img) => {
          img.addEventListener('load', () => {
            this.debug(`Loaded image ${img.getAttribute('src')}`);
            const wrap: HTMLElement = img.parentNode as HTMLElement;
            const parent: HTMLElement = wrap.parentNode as HTMLElement;
            parent.insertBefore(img, wrap);
            parent.removeChild(wrap);

            // Restore image style.
            const styles = JSON.parse(img.dataset.styles as string);
            for (let [ style, value] of Object.entries(styles))
              // @ts-ignore
              img.style[style] = value;
          }, false);
        })(img);
      }
    }, {
      root: options.root,
      // rootMargin: '-50% 0px -50% 0px',
      rootMargin: options.rootMargin,
      threshold: 0
    });

    // Wrap the image in a wrap element. The wrap element is used to display the loading icon and background while loading the image.
    for (let img of imgs) {
      // Create a wrap element. Copy the style of the image into the wrap element.
      const wrap = document.createElement('div');
      wrap.classList.add('lz-wrap');
      wrap.style.backgroundColor = options.background === 'random'
        ? `#${Math.floor(Math.random()*16777215).toString(16)}`
        : options.background as string;
      const {
        display,
        margin,
        width,
        height,
        position,
        top,
        right,
        bottom,
        left,
        zIndex } = getComputedStyle(img);
      if (display === 'inline') wrap.style.display = 'inline-block';
      else wrap.style.display = display;
      wrap.style.width = width;
      wrap.style.height = height;
      if (margin) {
        wrap.style.margin = margin;
        img.style.margin = '0px';
      }
      if (position !== 'static') {
        wrap.style.position = position;
        wrap.style.zIndex = zIndex;
        wrap.style.top = top;
        wrap.style.right = right;
        wrap.style.bottom = bottom;
        wrap.style.left = left;
        img.style.position = 'static';
        img.style.zIndex = '1';
      } else wrap.style.position = 'relative';

      // Make a loading icon..
      const spinner = document.createElement('div');
      spinner.classList.add('lz-spinner');
      spinner.style.zIndex = '2';

      // Back up the original style of the image. Restore the style after loading the image.
      img.dataset.styles = JSON.stringify({ margin });

      // Wrap the image in a wrap element.
      img.before(wrap);
      wrap.append(img, spinner);
      this.observer.observe(img);
    }

    // // Stop monitoring when you have finished monitoring the image.
    // this.destroy();
  }

  /**
   * Remove target element monitoring for lazy loading.
   * 
   * @return {void}
   */
  public static destroy(): void {
    if (!this.observer) return;
    this.observer.disconnect();
    this.observer = undefined;
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