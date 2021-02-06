import './styles/lazyload.css';
export default class {
    /**
     * Monitor if the target element is in the visible area.
     */
    private static io;
    /**
     * Debug mode.
     */
    private static debugging;
    /**
     * Start lazy loading.
     *
     * @param {HTMLImageElement[]} imgs
     * @param {{ root?: null|HTMLElement, rootMargin?: string, background?: string }} options
     * @return {void}
     */
    static observe(imgs: HTMLImageElement[], options?: {
        root?: null | HTMLElement;
        rootMargin?: string;
        background?: string;
        debugging?: boolean;
        spinnerSize?: 'default' | 'lg' | '2x';
    }): void;
    /**
     * Remove target element monitoring for lazy loading.
     *
     * @return {void}
     */
    static destroy(): void;
    /**
     * Output debug log.
     *
     * @param {any[]} .params
     */
    private static debug;
}
