import raf from 'raf'

export default class Dragger {
    constructor(ref) {
        this.ref = ref
        this.isDragging = false
    }

    update(monitor) {
        const isDragging = monitor.isDragging()
        if (this.isDragging === isDragging) { return }
        this.isDragging = isDragging
        this.monitor = monitor

        if (isDragging) {
            this.start()
        } else {
            this.stop()
        }
    }

    start() {
        const { current } = this.ref
        if (!current) { return }
        if (this.started) { return }
        // save initial scroll offset
        this.initialScroll = {
            x: current.parentElement.scrollLeft,
            y: current.parentElement.scrollTop,
        }
        this.started = true
        this.step()
    }

    stop() {
        const { current } = this.ref
        current.style.transform = ''
        this.started = false
    }

    /**
     * Update position diff in RAF loop
     */

    step = () => {
        if (!this.started || !this.monitor.isDragging()) { return }
        const { current } = this.ref
        const diff = this.monitor.getDifferenceFromInitialOffset()
        if (!diff || !current) { return }
        const { scrollLeft, scrollTop } = current.parentElement
        const scrollOffset = {
            x: scrollLeft - this.initialScroll.x,
            y: scrollTop - this.initialScroll.y,
        }

        this.diff = {
            x: diff.x + scrollOffset.x,
            y: diff.y + scrollOffset.y,
        }

        current.style.transform = `translate3d(${this.diff.x}px, ${this.diff.y}px, 0)`

        raf(this.step) // loop
    }
}