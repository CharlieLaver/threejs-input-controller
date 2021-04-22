import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Inject, Input, NgZone, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, } from '@angular/core';
import Swiper from 'swiper/core';
import { of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges, coerceBooleanProperty, } from './utils/utils';
import { isPlatformBrowser } from '@angular/common';
export class SwiperComponent {
    constructor(_ngZone, elementRef, _changeDetectorRef, _platformId) {
        this._ngZone = _ngZone;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._platformId = _platformId;
        this.slideClass = 'swiper-slide';
        this.wrapperClass = 'swiper-wrapper';
        this.showNavigation = true;
        this.showPagination = true;
        this.showScrollbar = true;
        // prettier-ignore
        this.s__beforeBreakpoint = new EventEmitter();
        // prettier-ignore
        this.s__containerClasses = new EventEmitter();
        // prettier-ignore
        this.s__slideClass = new EventEmitter();
        // prettier-ignore
        this.s__swiper = new EventEmitter();
        // prettier-ignore
        this.s_activeIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_afterInit = new EventEmitter();
        // prettier-ignore
        this.s_autoplay = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStart = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStop = new EventEmitter();
        // prettier-ignore
        this.s_beforeDestroy = new EventEmitter();
        // prettier-ignore
        this.s_beforeInit = new EventEmitter();
        // prettier-ignore
        this.s_beforeLoopFix = new EventEmitter();
        // prettier-ignore
        this.s_beforeResize = new EventEmitter();
        // prettier-ignore
        this.s_beforeSlideChangeStart = new EventEmitter();
        // prettier-ignore
        this.s_beforeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_breakpoint = new EventEmitter();
        // prettier-ignore
        this.s_changeDirection = new EventEmitter();
        // prettier-ignore
        this.s_click = new EventEmitter();
        // prettier-ignore
        this.s_doubleTap = new EventEmitter();
        // prettier-ignore
        this.s_doubleClick = new EventEmitter();
        // prettier-ignore
        this.s_destroy = new EventEmitter();
        // prettier-ignore
        this.s_fromEdge = new EventEmitter();
        // prettier-ignore
        this.s_hashChange = new EventEmitter();
        // prettier-ignore
        this.s_hashSet = new EventEmitter();
        // prettier-ignore
        this.s_imagesReady = new EventEmitter();
        // prettier-ignore
        this.s_init = new EventEmitter();
        // prettier-ignore
        this.s_keyPress = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageLoad = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageReady = new EventEmitter();
        // prettier-ignore
        this.s_loopFix = new EventEmitter();
        // prettier-ignore
        this.s_momentumBounce = new EventEmitter();
        // prettier-ignore
        this.s_navigationHide = new EventEmitter();
        // prettier-ignore
        this.s_navigationShow = new EventEmitter();
        // prettier-ignore
        this.s_observerUpdate = new EventEmitter();
        // prettier-ignore
        this.s_orientationchange = new EventEmitter();
        // prettier-ignore
        this.s_paginationHide = new EventEmitter();
        // prettier-ignore
        this.s_paginationRender = new EventEmitter();
        // prettier-ignore
        this.s_paginationShow = new EventEmitter();
        // prettier-ignore
        this.s_paginationUpdate = new EventEmitter();
        // prettier-ignore
        this.s_progress = new EventEmitter();
        // prettier-ignore
        this.s_reachBeginning = new EventEmitter();
        // prettier-ignore
        this.s_reachEnd = new EventEmitter();
        // prettier-ignore
        this.s_realIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_resize = new EventEmitter();
        // prettier-ignore
        this.s_scroll = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragEnd = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragMove = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragStart = new EventEmitter();
        // prettier-ignore
        this.s_setTransition = new EventEmitter();
        // prettier-ignore
        this.s_setTranslate = new EventEmitter();
        // prettier-ignore
        this.s_slideChange = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_sliderMove = new EventEmitter();
        // prettier-ignore
        this.s_sliderFirstMove = new EventEmitter();
        // prettier-ignore
        this.s_slidesLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_slidesGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_tap = new EventEmitter();
        // prettier-ignore
        this.s_toEdge = new EventEmitter();
        // prettier-ignore
        this.s_touchEnd = new EventEmitter();
        // prettier-ignore
        this.s_touchMove = new EventEmitter();
        // prettier-ignore
        this.s_touchMoveOpposite = new EventEmitter();
        // prettier-ignore
        this.s_touchStart = new EventEmitter();
        // prettier-ignore
        this.s_transitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_transitionStart = new EventEmitter();
        // prettier-ignore
        this.s_update = new EventEmitter();
        // prettier-ignore
        this.s_zoomChange = new EventEmitter();
        // prettier-ignore
        this.s_swiper = new EventEmitter();
        this.indexChange = new EventEmitter();
        this._activeSlides = new Subject();
        this.containerClasses = 'swiper-container';
        this.slidesChanges = (val) => {
            this.slides = val.map((slide, index) => {
                slide.slideIndex = index;
                slide.classNames = this.slideClass;
                return slide;
            });
            if (this.loop && !this.loopedSlides) {
                this.calcLoopedSlides();
            }
            if (!this.virtual) {
                this.prependSlides = of(this.slides.slice(this.slides.length - this.loopedSlides));
                this.appendSlides = of(this.slides.slice(0, this.loopedSlides));
            }
            else if (this.swiperRef && this.swiperRef.virtual) {
                this._ngZone.runOutsideAngular(() => {
                    this.swiperRef.virtual.slides = this.slides;
                    this.swiperRef.virtual.update(true);
                });
            }
            this._changeDetectorRef.detectChanges();
        };
        this.style = null;
        this.updateVirtualSlides = (virtualData) => {
            // TODO: type virtualData
            if (!this.swiperRef ||
                (this.currentVirtualData &&
                    this.currentVirtualData.from === virtualData.from &&
                    this.currentVirtualData.to === virtualData.to &&
                    this.currentVirtualData.offset === virtualData.offset)) {
                return;
            }
            this.style = this.swiperRef.isHorizontal()
                ? {
                    [this.swiperRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
                }
                : {
                    top: `${virtualData.offset}px`,
                };
            this.currentVirtualData = virtualData;
            this._activeSlides.next(virtualData.slides);
            this._changeDetectorRef.detectChanges();
            this._ngZone.runOutsideAngular(() => {
                this.swiperRef.updateSlides();
                this.swiperRef.updateProgress();
                this.swiperRef.updateSlidesClasses();
                if (this.swiperRef.lazy && this.swiperRef.params.lazy['enabled']) {
                    this.swiperRef.lazy.load();
                }
                this.swiperRef.virtual.update(true);
            });
            return;
        };
    }
    set navigation(val) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const currentNext = typeof this._navigation !== 'boolean' ? (_a = this._navigation) === null || _a === void 0 ? void 0 : _a.nextEl : null;
        const currentPrev = typeof this._navigation !== 'boolean' ? (_b = this._navigation) === null || _b === void 0 ? void 0 : _b.prevEl : null;
        this._navigation = setProperty(val, {
            nextEl: currentNext || null,
            prevEl: currentPrev || null,
        });
        if (coerceBooleanProperty(val) !== true &&
            typeof this._navigation !== 'boolean' &&
            ((_c = this._navigation) === null || _c === void 0 ? void 0 : _c.prevEl) !== ((_d = this._prevElRef) === null || _d === void 0 ? void 0 : _d.nativeElement) &&
            (typeof ((_e = this._navigation) === null || _e === void 0 ? void 0 : _e.nextEl) === 'string' ||
                typeof ((_f = this._navigation) === null || _f === void 0 ? void 0 : _f.prevEl) === 'string' ||
                typeof ((_g = this._navigation) === null || _g === void 0 ? void 0 : _g.nextEl) === 'object' ||
                typeof ((_h = this._navigation) === null || _h === void 0 ? void 0 : _h.prevEl) === 'object')) {
            this.showNavigation = false;
        }
    }
    get navigation() {
        return this._navigation;
    }
    set pagination(val) {
        var _a, _b, _c, _d, _e;
        const current = typeof this._pagination !== 'boolean' ? (_a = this._pagination) === null || _a === void 0 ? void 0 : _a.el : null;
        this._pagination = setProperty(val, {
            el: current || null,
        });
        if (coerceBooleanProperty(val) !== true &&
            typeof this._pagination !== 'boolean' &&
            ((_b = this._pagination) === null || _b === void 0 ? void 0 : _b.el) !== ((_c = this._paginationElRef) === null || _c === void 0 ? void 0 : _c.nativeElement) &&
            (typeof ((_d = this._pagination) === null || _d === void 0 ? void 0 : _d.el) === 'string' || typeof ((_e = this._pagination) === null || _e === void 0 ? void 0 : _e.el) === 'object')) {
            this.showPagination = false;
        }
    }
    get pagination() {
        return this._pagination;
    }
    set scrollbar(val) {
        var _a, _b, _c, _d, _e;
        const current = typeof this._scrollbar !== 'boolean' ? (_a = this._scrollbar) === null || _a === void 0 ? void 0 : _a.el : null;
        this._scrollbar = setProperty(val, {
            el: current || null,
        });
        if (coerceBooleanProperty(val) !== true &&
            typeof this._scrollbar !== 'boolean' &&
            ((_b = this._scrollbar) === null || _b === void 0 ? void 0 : _b.el) !== ((_c = this._scrollbarElRef) === null || _c === void 0 ? void 0 : _c.nativeElement) &&
            (typeof ((_d = this._scrollbar) === null || _d === void 0 ? void 0 : _d.el) === 'string' || typeof ((_e = this._scrollbar) === null || _e === void 0 ? void 0 : _e.el) === 'object')) {
            this.showScrollbar = false;
        }
    }
    get scrollbar() {
        return this._scrollbar;
    }
    set virtual(val) {
        this._virtual = setProperty(val);
    }
    get virtual() {
        return this._virtual;
    }
    set index(index) {
        this.setIndex(index);
    }
    set config(val) {
        this.updateSwiper(val);
        const { params } = getParams(val);
        Object.assign(this, params);
    }
    set prevElRef(el) {
        this._prevElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'prevEl');
    }
    set nextElRef(el) {
        this._nextElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'nextEl');
    }
    set scrollbarElRef(el) {
        this._scrollbarElRef = el;
        this._setElement(el, this.scrollbar, 'scrollbar');
    }
    set paginationElRef(el) {
        this._paginationElRef = el;
        this._setElement(el, this.pagination, 'pagination');
    }
    get activeSlides() {
        if (this.virtual) {
            return this._activeSlides;
        }
        return of(this.slides);
    }
    get zoomContainerClass() {
        return typeof this.zoom !== 'boolean' ? this.zoom.containerClass : 'swiper-zoom-container';
    }
    _setElement(el, ref, update, key = 'el') {
        if (!el || !ref) {
            return;
        }
        if (ref && el.nativeElement) {
            if (ref[key] === el.nativeElement) {
                return;
            }
            ref[key] = el.nativeElement;
        }
        const updateObj = {};
        updateObj[update] = true;
        this.updateInitSwiper(updateObj);
    }
    ngOnInit() {
        const { params } = getParams(this);
        Object.assign(this, params);
    }
    ngAfterViewInit() {
        this.childrenSlidesInit();
        this.initSwiper();
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.s_swiper.emit(this.swiperRef);
        });
    }
    childrenSlidesInit() {
        this.slidesChanges(this.slidesEl);
        this.slidesEl.changes.subscribe(this.slidesChanges);
    }
    get isSwiperActive() {
        return this.swiperRef && !this.swiperRef.destroyed;
    }
    initSwiper() {
        const { params: swiperParams, passedParams } = getParams(this);
        Object.assign(this, swiperParams);
        this._ngZone.runOutsideAngular(() => {
            swiperParams.init = false;
            if (!swiperParams.virtual) {
                swiperParams.observer = true;
            }
            swiperParams.onAny = (event, ...args) => {
                const emitter = this[`s_${event}`];
                if (emitter) {
                    emitter.emit(...args);
                }
            };
            Object.assign(swiperParams.on, {
                _containerClasses(swiper, classes) {
                    this.containerClasses = classes;
                },
                _slideClasses: (_, updated) => {
                    updated.forEach(({ slideEl, classNames }, index) => {
                        const slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index')) || index;
                        if (this.virtual) {
                            const virtualSlide = this.slides.find((item) => {
                                return item.virtualIndex && item.virtualIndex === slideIndex;
                            });
                            if (virtualSlide) {
                                virtualSlide.classNames = classNames;
                                return;
                            }
                        }
                        if (this.slides[slideIndex]) {
                            this.slides[slideIndex].classNames = classNames;
                        }
                    });
                    this._changeDetectorRef.detectChanges();
                },
            });
            const swiperRef = new Swiper(swiperParams);
            swiperRef.loopCreate = () => { };
            swiperRef.loopDestroy = () => { };
            if (swiperParams.loop) {
                swiperRef.loopedSlides = this.loopedSlides;
            }
            if (swiperRef.virtual && swiperRef.params.virtual.enabled) {
                swiperRef.virtual.slides = this.slides;
                const extendWith = {
                    cache: false,
                    renderExternal: this.updateVirtualSlides,
                    renderExternalUpdate: false,
                };
                extend(swiperRef.params.virtual, extendWith);
                extend(swiperRef.originalParams.virtual, extendWith);
            }
            if (isPlatformBrowser(this._platformId)) {
                this.swiperRef = swiperRef.init(this.elementRef.nativeElement);
                if (this.swiperRef.virtual && this.swiperRef.params.virtual.enabled) {
                    this.swiperRef.virtual.update(true);
                }
                this._changeDetectorRef.detectChanges();
                swiperRef.on('slideChange', () => {
                    this.indexChange.emit(this.swiperRef.realIndex);
                });
            }
        });
    }
    ngOnChanges(changedParams) {
        this.updateSwiper(changedParams);
        this._changeDetectorRef.detectChanges();
    }
    updateInitSwiper(changedParams) {
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs, } = this.swiperRef;
            if (changedParams.pagination) {
                if (this.pagination &&
                    typeof this.pagination !== 'boolean' &&
                    this.pagination.el &&
                    pagination &&
                    !pagination.el) {
                    this.updateParameter('pagination', this.pagination);
                    pagination.init();
                    pagination.render();
                    pagination.update();
                }
                else {
                    pagination.destroy();
                    pagination.el = null;
                }
            }
            if (changedParams.scrollbar) {
                if (this.scrollbar &&
                    typeof this.scrollbar !== 'boolean' &&
                    this.scrollbar.el &&
                    scrollbar &&
                    !scrollbar.el) {
                    this.updateParameter('scrollbar', this.scrollbar);
                    scrollbar.init();
                    scrollbar.updateSize();
                    scrollbar.setTranslate();
                }
                else {
                    scrollbar.destroy();
                    scrollbar.el = null;
                }
            }
            if (changedParams.navigation) {
                if (this.navigation &&
                    typeof this.navigation !== 'boolean' &&
                    this.navigation.prevEl &&
                    this.navigation.nextEl &&
                    navigation &&
                    !navigation.prevEl &&
                    !navigation.nextEl) {
                    this.updateParameter('navigation', this.navigation);
                    navigation.init();
                    navigation.update();
                }
                else if (navigation.prevEl && navigation.nextEl) {
                    navigation.destroy();
                    navigation.nextEl = null;
                    navigation.prevEl = null;
                }
            }
            if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
                this.updateParameter('thumbs', this.thumbs);
                const initialized = thumbs.init();
                if (initialized)
                    thumbs.update(true);
            }
            if (changedParams.controller && this.controller && this.controller.control) {
                this.swiperRef.controller.control = this.controller.control;
            }
            this.swiperRef.update();
        });
    }
    updateSwiper(changedParams) {
        this._ngZone.runOutsideAngular(() => {
            var _a, _b;
            if (changedParams.config) {
                return;
            }
            if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            for (const key in changedParams) {
                if (ignoreNgOnChanges.indexOf(key) >= 0) {
                    continue;
                }
                const newValue = (_b = (_a = changedParams[key]) === null || _a === void 0 ? void 0 : _a.currentValue) !== null && _b !== void 0 ? _b : changedParams[key];
                this.updateParameter(key, newValue);
            }
            if (changedParams.allowSlideNext) {
                this.swiperRef.allowSlideNext = this.allowSlideNext;
            }
            if (changedParams.allowSlidePrev) {
                this.swiperRef.allowSlidePrev = this.allowSlidePrev;
            }
            if (changedParams.direction) {
                this.swiperRef.changeDirection(this.direction, false);
            }
            if (changedParams.breakpoints) {
                if (this.loop && !this.loopedSlides) {
                    this.calcLoopedSlides();
                }
                this.swiperRef.currentBreakpoint = null;
                this.swiperRef.setBreakpoint();
            }
            if (changedParams.thumbs || changedParams.controller) {
                this.updateInitSwiper(changedParams);
            }
            this.swiperRef.update();
        });
    }
    calcLoopedSlides() {
        if (!this.loop) {
            return;
        }
        let slidesPerViewParams = this.slidesPerView;
        if (this.breakpoints) {
            const breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
            const breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
            if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
                slidesPerViewParams = breakpointOnlyParams.slidesPerView;
            }
        }
        if (slidesPerViewParams === 'auto') {
            this.loopedSlides = this.slides.length;
            return this.slides.length;
        }
        let loopedSlides = this.loopedSlides || slidesPerViewParams;
        loopedSlides += this.loopAdditionalSlides;
        if (loopedSlides > this.slides.length) {
            loopedSlides = this.slides.length;
        }
        this.loopedSlides = loopedSlides;
        return loopedSlides;
    }
    updateParameter(key, value) {
        if (!(this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        const _key = key.replace(/^_/, '');
        if (Object.keys(this.swiperRef.modules).indexOf(_key) >= 0) {
            extend(value, this.swiperRef.modules[_key].params[_key]);
        }
        if (isObject(this.swiperRef.params[_key]) && isObject(value)) {
            extend(this.swiperRef.params[_key], value);
        }
        else {
            this.swiperRef.params[_key] = value;
        }
    }
    setIndex(index, speed, silent) {
        if (!this.isSwiperActive) {
            this.initialSlide = index;
            return;
        }
        if (index === this.swiperRef.activeIndex) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            if (this.loop) {
                this.swiperRef.slideToLoop(index, speed, !silent);
            }
            else {
                this.swiperRef.slideTo(index, speed, !silent);
            }
        });
    }
    ngOnDestroy() {
        this._ngZone.runOutsideAngular(() => {
            var _a;
            (_a = this.swiperRef) === null || _a === void 0 ? void 0 : _a.destroy();
        });
    }
}
SwiperComponent.decorators = [
    { type: Component, args: [{
                selector: 'swiper, [swiper]',
                template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"\n      (slide.class ? slide.class + ' ' : '') +\n      slideClass +\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\n    \"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      swiper {
        display: block;
      }
    `]
            },] }
];
SwiperComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
SwiperComponent.propDecorators = {
    direction: [{ type: Input }],
    touchEventsTarget: [{ type: Input }],
    initialSlide: [{ type: Input }],
    speed: [{ type: Input }],
    cssMode: [{ type: Input }],
    updateOnWindowResize: [{ type: Input }],
    resizeObserver: [{ type: Input }],
    nested: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    preventInteractionOnTransition: [{ type: Input }],
    userAgent: [{ type: Input }],
    url: [{ type: Input }],
    edgeSwipeDetection: [{ type: Input }],
    edgeSwipeThreshold: [{ type: Input }],
    freeMode: [{ type: Input }],
    freeModeMomentum: [{ type: Input }],
    freeModeMomentumRatio: [{ type: Input }],
    freeModeMomentumBounce: [{ type: Input }],
    freeModeMomentumBounceRatio: [{ type: Input }],
    freeModeMomentumVelocityRatio: [{ type: Input }],
    freeModeSticky: [{ type: Input }],
    freeModeMinimumVelocity: [{ type: Input }],
    autoHeight: [{ type: Input }],
    setWrapperSize: [{ type: Input }],
    virtualTranslate: [{ type: Input }],
    effect: [{ type: Input }],
    breakpoints: [{ type: Input }],
    spaceBetween: [{ type: Input }],
    slidesPerView: [{ type: Input }],
    slidesPerColumn: [{ type: Input }],
    slidesPerColumnFill: [{ type: Input }],
    slidesPerGroup: [{ type: Input }],
    slidesPerGroupSkip: [{ type: Input }],
    centeredSlides: [{ type: Input }],
    centeredSlidesBounds: [{ type: Input }],
    slidesOffsetBefore: [{ type: Input }],
    slidesOffsetAfter: [{ type: Input }],
    normalizeSlideIndex: [{ type: Input }],
    centerInsufficientSlides: [{ type: Input }],
    watchOverflow: [{ type: Input }],
    roundLengths: [{ type: Input }],
    touchRatio: [{ type: Input }],
    touchAngle: [{ type: Input }],
    simulateTouch: [{ type: Input }],
    shortSwipes: [{ type: Input }],
    longSwipes: [{ type: Input }],
    longSwipesRatio: [{ type: Input }],
    longSwipesMs: [{ type: Input }],
    followFinger: [{ type: Input }],
    allowTouchMove: [{ type: Input }],
    threshold: [{ type: Input }],
    touchMoveStopPropagation: [{ type: Input }],
    touchStartPreventDefault: [{ type: Input }],
    touchStartForcePreventDefault: [{ type: Input }],
    touchReleaseOnEdges: [{ type: Input }],
    uniqueNavElements: [{ type: Input }],
    resistance: [{ type: Input }],
    resistanceRatio: [{ type: Input }],
    watchSlidesProgress: [{ type: Input }],
    watchSlidesVisibility: [{ type: Input }],
    grabCursor: [{ type: Input }],
    preventClicks: [{ type: Input }],
    preventClicksPropagation: [{ type: Input }],
    slideToClickedSlide: [{ type: Input }],
    preloadImages: [{ type: Input }],
    updateOnImagesReady: [{ type: Input }],
    loop: [{ type: Input }],
    loopAdditionalSlides: [{ type: Input }],
    loopedSlides: [{ type: Input }],
    loopFillGroupWithBlank: [{ type: Input }],
    loopPreventsSlide: [{ type: Input }],
    allowSlidePrev: [{ type: Input }],
    allowSlideNext: [{ type: Input }],
    swipeHandler: [{ type: Input }],
    noSwiping: [{ type: Input }],
    noSwipingClass: [{ type: Input }],
    noSwipingSelector: [{ type: Input }],
    passiveListeners: [{ type: Input }],
    containerModifierClass: [{ type: Input }],
    slideClass: [{ type: Input }],
    slideBlankClass: [{ type: Input }],
    slideActiveClass: [{ type: Input }],
    slideDuplicateActiveClass: [{ type: Input }],
    slideVisibleClass: [{ type: Input }],
    slideDuplicateClass: [{ type: Input }],
    slideNextClass: [{ type: Input }],
    slideDuplicateNextClass: [{ type: Input }],
    slidePrevClass: [{ type: Input }],
    slideDuplicatePrevClass: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    runCallbacksOnInit: [{ type: Input }],
    observeParents: [{ type: Input }],
    observeSlideChildren: [{ type: Input }],
    a11y: [{ type: Input }],
    autoplay: [{ type: Input }],
    controller: [{ type: Input }],
    coverflowEffect: [{ type: Input }],
    cubeEffect: [{ type: Input }],
    fadeEffect: [{ type: Input }],
    flipEffect: [{ type: Input }],
    hashNavigation: [{ type: Input }],
    history: [{ type: Input }],
    keyboard: [{ type: Input }],
    lazy: [{ type: Input }],
    mousewheel: [{ type: Input }],
    parallax: [{ type: Input }],
    thumbs: [{ type: Input }],
    zoom: [{ type: Input }],
    navigation: [{ type: Input }],
    pagination: [{ type: Input }],
    scrollbar: [{ type: Input }],
    virtual: [{ type: Input }],
    index: [{ type: Input }],
    config: [{ type: Input }],
    s__beforeBreakpoint: [{ type: Output, args: ['_beforeBreakpoint',] }],
    s__containerClasses: [{ type: Output, args: ['_containerClasses',] }],
    s__slideClass: [{ type: Output, args: ['_slideClass',] }],
    s__swiper: [{ type: Output, args: ['_swiper',] }],
    s_activeIndexChange: [{ type: Output, args: ['activeIndexChange',] }],
    s_afterInit: [{ type: Output, args: ['afterInit',] }],
    s_autoplay: [{ type: Output, args: ['autoplay',] }],
    s_autoplayStart: [{ type: Output, args: ['autoplayStart',] }],
    s_autoplayStop: [{ type: Output, args: ['autoplayStop',] }],
    s_beforeDestroy: [{ type: Output, args: ['beforeDestroy',] }],
    s_beforeInit: [{ type: Output, args: ['beforeInit',] }],
    s_beforeLoopFix: [{ type: Output, args: ['beforeLoopFix',] }],
    s_beforeResize: [{ type: Output, args: ['beforeResize',] }],
    s_beforeSlideChangeStart: [{ type: Output, args: ['beforeSlideChangeStart',] }],
    s_beforeTransitionStart: [{ type: Output, args: ['beforeTransitionStart',] }],
    s_breakpoint: [{ type: Output, args: ['breakpoint',] }],
    s_changeDirection: [{ type: Output, args: ['changeDirection',] }],
    s_click: [{ type: Output, args: ['click',] }],
    s_doubleTap: [{ type: Output, args: ['doubleTap',] }],
    s_doubleClick: [{ type: Output, args: ['doubleClick',] }],
    s_destroy: [{ type: Output, args: ['destroy',] }],
    s_fromEdge: [{ type: Output, args: ['fromEdge',] }],
    s_hashChange: [{ type: Output, args: ['hashChange',] }],
    s_hashSet: [{ type: Output, args: ['hashSet',] }],
    s_imagesReady: [{ type: Output, args: ['imagesReady',] }],
    s_init: [{ type: Output, args: ['init',] }],
    s_keyPress: [{ type: Output, args: ['keyPress',] }],
    s_lazyImageLoad: [{ type: Output, args: ['lazyImageLoad',] }],
    s_lazyImageReady: [{ type: Output, args: ['lazyImageReady',] }],
    s_loopFix: [{ type: Output, args: ['loopFix',] }],
    s_momentumBounce: [{ type: Output, args: ['momentumBounce',] }],
    s_navigationHide: [{ type: Output, args: ['navigationHide',] }],
    s_navigationShow: [{ type: Output, args: ['navigationShow',] }],
    s_observerUpdate: [{ type: Output, args: ['observerUpdate',] }],
    s_orientationchange: [{ type: Output, args: ['orientationchange',] }],
    s_paginationHide: [{ type: Output, args: ['paginationHide',] }],
    s_paginationRender: [{ type: Output, args: ['paginationRender',] }],
    s_paginationShow: [{ type: Output, args: ['paginationShow',] }],
    s_paginationUpdate: [{ type: Output, args: ['paginationUpdate',] }],
    s_progress: [{ type: Output, args: ['progress',] }],
    s_reachBeginning: [{ type: Output, args: ['reachBeginning',] }],
    s_reachEnd: [{ type: Output, args: ['reachEnd',] }],
    s_realIndexChange: [{ type: Output, args: ['realIndexChange',] }],
    s_resize: [{ type: Output, args: ['resize',] }],
    s_scroll: [{ type: Output, args: ['scroll',] }],
    s_scrollbarDragEnd: [{ type: Output, args: ['scrollbarDragEnd',] }],
    s_scrollbarDragMove: [{ type: Output, args: ['scrollbarDragMove',] }],
    s_scrollbarDragStart: [{ type: Output, args: ['scrollbarDragStart',] }],
    s_setTransition: [{ type: Output, args: ['setTransition',] }],
    s_setTranslate: [{ type: Output, args: ['setTranslate',] }],
    s_slideChange: [{ type: Output, args: ['slideChange',] }],
    s_slideChangeTransitionEnd: [{ type: Output, args: ['slideChangeTransitionEnd',] }],
    s_slideChangeTransitionStart: [{ type: Output, args: ['slideChangeTransitionStart',] }],
    s_slideNextTransitionEnd: [{ type: Output, args: ['slideNextTransitionEnd',] }],
    s_slideNextTransitionStart: [{ type: Output, args: ['slideNextTransitionStart',] }],
    s_slidePrevTransitionEnd: [{ type: Output, args: ['slidePrevTransitionEnd',] }],
    s_slidePrevTransitionStart: [{ type: Output, args: ['slidePrevTransitionStart',] }],
    s_slideResetTransitionStart: [{ type: Output, args: ['slideResetTransitionStart',] }],
    s_slideResetTransitionEnd: [{ type: Output, args: ['slideResetTransitionEnd',] }],
    s_sliderMove: [{ type: Output, args: ['sliderMove',] }],
    s_sliderFirstMove: [{ type: Output, args: ['sliderFirstMove',] }],
    s_slidesLengthChange: [{ type: Output, args: ['slidesLengthChange',] }],
    s_slidesGridLengthChange: [{ type: Output, args: ['slidesGridLengthChange',] }],
    s_snapGridLengthChange: [{ type: Output, args: ['snapGridLengthChange',] }],
    s_snapIndexChange: [{ type: Output, args: ['snapIndexChange',] }],
    s_tap: [{ type: Output, args: ['tap',] }],
    s_toEdge: [{ type: Output, args: ['toEdge',] }],
    s_touchEnd: [{ type: Output, args: ['touchEnd',] }],
    s_touchMove: [{ type: Output, args: ['touchMove',] }],
    s_touchMoveOpposite: [{ type: Output, args: ['touchMoveOpposite',] }],
    s_touchStart: [{ type: Output, args: ['touchStart',] }],
    s_transitionEnd: [{ type: Output, args: ['transitionEnd',] }],
    s_transitionStart: [{ type: Output, args: ['transitionStart',] }],
    s_update: [{ type: Output, args: ['update',] }],
    s_zoomChange: [{ type: Output, args: ['zoomChange',] }],
    s_swiper: [{ type: Output, args: ['swiper',] }],
    indexChange: [{ type: Output }],
    prevElRef: [{ type: ViewChild, args: ['prevElRef', { static: false },] }],
    nextElRef: [{ type: ViewChild, args: ['nextElRef', { static: false },] }],
    scrollbarElRef: [{ type: ViewChild, args: ['scrollbarElRef', { static: false },] }],
    paginationElRef: [{ type: ViewChild, args: ['paginationElRef', { static: false },] }],
    slidesEl: [{ type: ContentChildren, args: [SwiperSlideDirective, { descendants: true, emitDistinctChangesOnly: true },] }],
    containerClasses: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFdBQVcsRUFHWCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixxQkFBcUIsR0FDdEIsTUFBTSxlQUFlLENBQUM7QUFTdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFjcEQsTUFBTSxPQUFPLGVBQWU7SUE4WTFCLFlBQ1UsT0FBZSxFQUNmLFVBQXNCLEVBQ3RCLGtCQUFxQyxFQUNoQixXQUFXO1FBSGhDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQUE7UUFqVWpDLGVBQVUsR0FBZ0MsY0FBYyxDQUFDO1FBVXpELGlCQUFZLEdBQWtDLGdCQUFnQixDQUFDO1FBMkN4RSxtQkFBYyxHQUFZLElBQUksQ0FBQztRQXFC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QyxZQUFZO3VCQUVuQixNQUFNLFNBQUMsUUFBUTswQkFFZixNQUFNO3dCQUVOLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3dCQU14QyxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs2QkFNeEMsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs4QkFNN0MsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt1QkFNOUMsZUFBZSxTQUFDLG9CQUFvQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUU7K0JBcUIxRixXQUFXLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFN3aXBlciBmcm9tICdzd2lwZXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0UGFyYW1zIH0gZnJvbSAnLi91dGlscy9nZXQtcGFyYW1zJztcbmltcG9ydCB7IFN3aXBlclNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi9zd2lwZXItc2xpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7XG4gIGV4dGVuZCxcbiAgaXNPYmplY3QsXG4gIHNldFByb3BlcnR5LFxuICBpZ25vcmVOZ09uQ2hhbmdlcyxcbiAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxufSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7XG4gIFN3aXBlck9wdGlvbnMsXG4gIFN3aXBlckV2ZW50cyxcbiAgTmF2aWdhdGlvbk9wdGlvbnMsXG4gIFBhZ2luYXRpb25PcHRpb25zLFxuICBTY3JvbGxiYXJPcHRpb25zLFxuICBWaXJ0dWFsT3B0aW9ucyxcbn0gZnJvbSAnc3dpcGVyL3R5cGVzJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N3aXBlciwgW3N3aXBlcl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vc3dpcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIHN3aXBlciB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFN3aXBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogU3dpcGVyT3B0aW9uc1snZGlyZWN0aW9uJ107XG4gIEBJbnB1dCgpIHRvdWNoRXZlbnRzVGFyZ2V0OiBTd2lwZXJPcHRpb25zWyd0b3VjaEV2ZW50c1RhcmdldCddO1xuICBASW5wdXQoKSBpbml0aWFsU2xpZGU6IFN3aXBlck9wdGlvbnNbJ2luaXRpYWxTbGlkZSddO1xuICBASW5wdXQoKSBzcGVlZDogU3dpcGVyT3B0aW9uc1snc3BlZWQnXTtcbiAgQElucHV0KCkgY3NzTW9kZTogU3dpcGVyT3B0aW9uc1snY3NzTW9kZSddO1xuICBASW5wdXQoKSB1cGRhdGVPbldpbmRvd1Jlc2l6ZTogU3dpcGVyT3B0aW9uc1sndXBkYXRlT25XaW5kb3dSZXNpemUnXTtcbiAgQElucHV0KCkgcmVzaXplT2JzZXJ2ZXI6IFN3aXBlck9wdGlvbnNbJ3Jlc2l6ZU9ic2VydmVyJ107XG4gIEBJbnB1dCgpIG5lc3RlZDogU3dpcGVyT3B0aW9uc1snbmVzdGVkJ107XG4gIEBJbnB1dCgpIHdpZHRoOiBTd2lwZXJPcHRpb25zWyd3aWR0aCddO1xuICBASW5wdXQoKSBoZWlnaHQ6IFN3aXBlck9wdGlvbnNbJ2hlaWdodCddO1xuICBASW5wdXQoKSBwcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb246IFN3aXBlck9wdGlvbnNbJ3ByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbiddO1xuICBASW5wdXQoKSB1c2VyQWdlbnQ6IFN3aXBlck9wdGlvbnNbJ3VzZXJBZ2VudCddO1xuICBASW5wdXQoKSB1cmw6IFN3aXBlck9wdGlvbnNbJ3VybCddO1xuICBASW5wdXQoKSBlZGdlU3dpcGVEZXRlY3Rpb246IGJvb2xlYW4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGVkZ2VTd2lwZVRocmVzaG9sZDogbnVtYmVyO1xuICBASW5wdXQoKSBmcmVlTW9kZTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGUnXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNb21lbnR1bSddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtUmF0aW86IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTW9tZW50dW1SYXRpbyddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtQm91bmNlOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtQm91bmNlJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbzogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbyddO1xuICBASW5wdXQoKSBmcmVlTW9kZVN0aWNreTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVTdGlja3knXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHk6IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTWluaW11bVZlbG9jaXR5J107XG4gIEBJbnB1dCgpIGF1dG9IZWlnaHQ6IFN3aXBlck9wdGlvbnNbJ2F1dG9IZWlnaHQnXTtcbiAgQElucHV0KCkgc2V0V3JhcHBlclNpemU6IFN3aXBlck9wdGlvbnNbJ3NldFdyYXBwZXJTaXplJ107XG4gIEBJbnB1dCgpIHZpcnR1YWxUcmFuc2xhdGU6IFN3aXBlck9wdGlvbnNbJ3ZpcnR1YWxUcmFuc2xhdGUnXTtcbiAgQElucHV0KCkgZWZmZWN0OiBTd2lwZXJPcHRpb25zWydlZmZlY3QnXTtcbiAgQElucHV0KCkgYnJlYWtwb2ludHM6IFN3aXBlck9wdGlvbnNbJ2JyZWFrcG9pbnRzJ107XG4gIEBJbnB1dCgpIHNwYWNlQmV0d2VlbjogU3dpcGVyT3B0aW9uc1snc3BhY2VCZXR3ZWVuJ107XG4gIEBJbnB1dCgpIHNsaWRlc1BlclZpZXc6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1BlclZpZXcnXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyQ29sdW1uOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJDb2x1bW4nXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyQ29sdW1uRmlsbDogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyQ29sdW1uRmlsbCddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJHcm91cDogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyR3JvdXAnXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyR3JvdXBTa2lwOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJHcm91cFNraXAnXTtcbiAgQElucHV0KCkgY2VudGVyZWRTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlcmVkU2xpZGVzJ107XG4gIEBJbnB1dCgpIGNlbnRlcmVkU2xpZGVzQm91bmRzOiBTd2lwZXJPcHRpb25zWydjZW50ZXJlZFNsaWRlc0JvdW5kcyddO1xuICBASW5wdXQoKSBzbGlkZXNPZmZzZXRCZWZvcmU6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc09mZnNldEJlZm9yZSddO1xuICBASW5wdXQoKSBzbGlkZXNPZmZzZXRBZnRlcjogU3dpcGVyT3B0aW9uc1snc2xpZGVzT2Zmc2V0QWZ0ZXInXTtcbiAgQElucHV0KCkgbm9ybWFsaXplU2xpZGVJbmRleDogU3dpcGVyT3B0aW9uc1snbm9ybWFsaXplU2xpZGVJbmRleCddO1xuICBASW5wdXQoKSBjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlckluc3VmZmljaWVudFNsaWRlcyddO1xuICBASW5wdXQoKSB3YXRjaE92ZXJmbG93OiBTd2lwZXJPcHRpb25zWyd3YXRjaE92ZXJmbG93J107XG4gIEBJbnB1dCgpIHJvdW5kTGVuZ3RoczogU3dpcGVyT3B0aW9uc1sncm91bmRMZW5ndGhzJ107XG4gIEBJbnB1dCgpIHRvdWNoUmF0aW86IFN3aXBlck9wdGlvbnNbJ3RvdWNoUmF0aW8nXTtcbiAgQElucHV0KCkgdG91Y2hBbmdsZTogU3dpcGVyT3B0aW9uc1sndG91Y2hBbmdsZSddO1xuICBASW5wdXQoKSBzaW11bGF0ZVRvdWNoOiBTd2lwZXJPcHRpb25zWydzaW11bGF0ZVRvdWNoJ107XG4gIEBJbnB1dCgpIHNob3J0U3dpcGVzOiBTd2lwZXJPcHRpb25zWydzaG9ydFN3aXBlcyddO1xuICBASW5wdXQoKSBsb25nU3dpcGVzOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzJ107XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXNSYXRpbzogU3dpcGVyT3B0aW9uc1snbG9uZ1N3aXBlc1JhdGlvJ107XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXNNczogU3dpcGVyT3B0aW9uc1snbG9uZ1N3aXBlc01zJ107XG4gIEBJbnB1dCgpIGZvbGxvd0ZpbmdlcjogU3dpcGVyT3B0aW9uc1snZm9sbG93RmluZ2VyJ107XG4gIEBJbnB1dCgpIGFsbG93VG91Y2hNb3ZlOiBTd2lwZXJPcHRpb25zWydhbGxvd1RvdWNoTW92ZSddO1xuICBASW5wdXQoKSB0aHJlc2hvbGQ6IFN3aXBlck9wdGlvbnNbJ3RocmVzaG9sZCddO1xuICBASW5wdXQoKSB0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246IFN3aXBlck9wdGlvbnNbJ3RvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbiddO1xuICBASW5wdXQoKSB0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ6IFN3aXBlck9wdGlvbnNbJ3RvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdCddO1xuICBASW5wdXQoKSB0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdDogU3dpcGVyT3B0aW9uc1sndG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQnXTtcbiAgQElucHV0KCkgdG91Y2hSZWxlYXNlT25FZGdlczogU3dpcGVyT3B0aW9uc1sndG91Y2hSZWxlYXNlT25FZGdlcyddO1xuICBASW5wdXQoKSB1bmlxdWVOYXZFbGVtZW50czogU3dpcGVyT3B0aW9uc1sndW5pcXVlTmF2RWxlbWVudHMnXTtcbiAgQElucHV0KCkgcmVzaXN0YW5jZTogU3dpcGVyT3B0aW9uc1sncmVzaXN0YW5jZSddO1xuICBASW5wdXQoKSByZXNpc3RhbmNlUmF0aW86IFN3aXBlck9wdGlvbnNbJ3Jlc2lzdGFuY2VSYXRpbyddO1xuICBASW5wdXQoKSB3YXRjaFNsaWRlc1Byb2dyZXNzOiBTd2lwZXJPcHRpb25zWyd3YXRjaFNsaWRlc1Byb2dyZXNzJ107XG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogU3dpcGVyT3B0aW9uc1snd2F0Y2hTbGlkZXNWaXNpYmlsaXR5J107XG4gIEBJbnB1dCgpIGdyYWJDdXJzb3I6IFN3aXBlck9wdGlvbnNbJ2dyYWJDdXJzb3InXTtcbiAgQElucHV0KCkgcHJldmVudENsaWNrczogU3dpcGVyT3B0aW9uc1sncHJldmVudENsaWNrcyddO1xuICBASW5wdXQoKSBwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb246IFN3aXBlck9wdGlvbnNbJ3ByZXZlbnRDbGlja3NQcm9wYWdhdGlvbiddO1xuICBASW5wdXQoKSBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBTd2lwZXJPcHRpb25zWydzbGlkZVRvQ2xpY2tlZFNsaWRlJ107XG4gIEBJbnB1dCgpIHByZWxvYWRJbWFnZXM6IFN3aXBlck9wdGlvbnNbJ3ByZWxvYWRJbWFnZXMnXTtcbiAgQElucHV0KCkgdXBkYXRlT25JbWFnZXNSZWFkeTogU3dpcGVyT3B0aW9uc1sndXBkYXRlT25JbWFnZXNSZWFkeSddO1xuICBASW5wdXQoKSBsb29wOiBTd2lwZXJPcHRpb25zWydsb29wJ107XG4gIEBJbnB1dCgpIGxvb3BBZGRpdGlvbmFsU2xpZGVzOiBTd2lwZXJPcHRpb25zWydsb29wQWRkaXRpb25hbFNsaWRlcyddO1xuICBASW5wdXQoKSBsb29wZWRTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2xvb3BlZFNsaWRlcyddO1xuICBASW5wdXQoKSBsb29wRmlsbEdyb3VwV2l0aEJsYW5rOiBTd2lwZXJPcHRpb25zWydsb29wRmlsbEdyb3VwV2l0aEJsYW5rJ107XG4gIEBJbnB1dCgpIGxvb3BQcmV2ZW50c1NsaWRlOiBTd2lwZXJPcHRpb25zWydsb29wUHJldmVudHNTbGlkZSddO1xuICBASW5wdXQoKSBhbGxvd1NsaWRlUHJldjogU3dpcGVyT3B0aW9uc1snYWxsb3dTbGlkZVByZXYnXTtcbiAgQElucHV0KCkgYWxsb3dTbGlkZU5leHQ6IFN3aXBlck9wdGlvbnNbJ2FsbG93U2xpZGVOZXh0J107XG4gIEBJbnB1dCgpIHN3aXBlSGFuZGxlcjogU3dpcGVyT3B0aW9uc1snc3dpcGVIYW5kbGVyJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZzogU3dpcGVyT3B0aW9uc1snbm9Td2lwaW5nJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZ0NsYXNzOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmdDbGFzcyddO1xuICBASW5wdXQoKSBub1N3aXBpbmdTZWxlY3RvcjogU3dpcGVyT3B0aW9uc1snbm9Td2lwaW5nU2VsZWN0b3InXTtcbiAgQElucHV0KCkgcGFzc2l2ZUxpc3RlbmVyczogU3dpcGVyT3B0aW9uc1sncGFzc2l2ZUxpc3RlbmVycyddO1xuICBASW5wdXQoKSBjb250YWluZXJNb2RpZmllckNsYXNzOiBTd2lwZXJPcHRpb25zWydjb250YWluZXJNb2RpZmllckNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQ2xhc3MnXSA9ICdzd2lwZXItc2xpZGUnO1xuICBASW5wdXQoKSBzbGlkZUJsYW5rQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQmxhbmtDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUFjdGl2ZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUFjdGl2ZUNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVWaXNpYmxlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVmlzaWJsZUNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVOZXh0Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlTmV4dENsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlTmV4dENsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZVByZXZDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVQcmV2Q2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlUHJldkNsYXNzJ107XG4gIEBJbnB1dCgpIHdyYXBwZXJDbGFzczogU3dpcGVyT3B0aW9uc1snd3JhcHBlckNsYXNzJ10gPSAnc3dpcGVyLXdyYXBwZXInO1xuICBASW5wdXQoKSBydW5DYWxsYmFja3NPbkluaXQ6IFN3aXBlck9wdGlvbnNbJ3J1bkNhbGxiYWNrc09uSW5pdCddO1xuICBASW5wdXQoKSBvYnNlcnZlUGFyZW50czogU3dpcGVyT3B0aW9uc1snb2JzZXJ2ZVBhcmVudHMnXTtcbiAgQElucHV0KCkgb2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IFN3aXBlck9wdGlvbnNbJ29ic2VydmVTbGlkZUNoaWxkcmVuJ107XG4gIEBJbnB1dCgpIGExMXk6IFN3aXBlck9wdGlvbnNbJ2ExMXknXTtcbiAgQElucHV0KCkgYXV0b3BsYXk6IFN3aXBlck9wdGlvbnNbJ2F1dG9wbGF5J107XG4gIEBJbnB1dCgpIGNvbnRyb2xsZXI6IFN3aXBlck9wdGlvbnNbJ2NvbnRyb2xsZXInXTtcbiAgQElucHV0KCkgY292ZXJmbG93RWZmZWN0OiBTd2lwZXJPcHRpb25zWydjb3ZlcmZsb3dFZmZlY3QnXTtcbiAgQElucHV0KCkgY3ViZUVmZmVjdDogU3dpcGVyT3B0aW9uc1snY3ViZUVmZmVjdCddO1xuICBASW5wdXQoKSBmYWRlRWZmZWN0OiBTd2lwZXJPcHRpb25zWydmYWRlRWZmZWN0J107XG4gIEBJbnB1dCgpIGZsaXBFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2ZsaXBFZmZlY3QnXTtcbiAgQElucHV0KCkgaGFzaE5hdmlnYXRpb246IFN3aXBlck9wdGlvbnNbJ2hhc2hOYXZpZ2F0aW9uJ107XG4gIEBJbnB1dCgpIGhpc3Rvcnk6IFN3aXBlck9wdGlvbnNbJ2hpc3RvcnknXTtcbiAgQElucHV0KCkga2V5Ym9hcmQ6IFN3aXBlck9wdGlvbnNbJ2tleWJvYXJkJ107XG4gIEBJbnB1dCgpIGxhenk6IFN3aXBlck9wdGlvbnNbJ2xhenknXTtcbiAgQElucHV0KCkgbW91c2V3aGVlbDogU3dpcGVyT3B0aW9uc1snbW91c2V3aGVlbCddO1xuICBASW5wdXQoKSBwYXJhbGxheDogU3dpcGVyT3B0aW9uc1sncGFyYWxsYXgnXTtcbiAgQElucHV0KCkgdGh1bWJzOiBTd2lwZXJPcHRpb25zWyd0aHVtYnMnXTtcbiAgQElucHV0KCkgem9vbTogU3dpcGVyT3B0aW9uc1snem9vbSddO1xuICBASW5wdXQoKVxuICBzZXQgbmF2aWdhdGlvbih2YWwpIHtcbiAgICBjb25zdCBjdXJyZW50TmV4dCA9IHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgPyB0aGlzLl9uYXZpZ2F0aW9uPy5uZXh0RWwgOiBudWxsO1xuICAgIGNvbnN0IGN1cnJlbnRQcmV2ID0gdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyA/IHRoaXMuX25hdmlnYXRpb24/LnByZXZFbCA6IG51bGw7XG4gICAgdGhpcy5fbmF2aWdhdGlvbiA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgbmV4dEVsOiBjdXJyZW50TmV4dCB8fCBudWxsLFxuICAgICAgcHJldkVsOiBjdXJyZW50UHJldiB8fCBudWxsLFxuICAgIH0pO1xuICAgIGlmIChcbiAgICAgIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpICE9PSB0cnVlICYmXG4gICAgICB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbiAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICB0aGlzLl9uYXZpZ2F0aW9uPy5wcmV2RWwgIT09IHRoaXMuX3ByZXZFbFJlZj8ubmF0aXZlRWxlbWVudCAmJlxuICAgICAgKHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uPy5uZXh0RWwgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uPy5wcmV2RWwgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uPy5uZXh0RWwgPT09ICdvYmplY3QnIHx8XG4gICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uPy5wcmV2RWwgPT09ICdvYmplY3QnKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93TmF2aWdhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBnZXQgbmF2aWdhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2aWdhdGlvbjtcbiAgfVxuICBwcml2YXRlIF9uYXZpZ2F0aW9uOiBOYXZpZ2F0aW9uT3B0aW9ucyB8IGJvb2xlYW47XG4gIHNob3dOYXZpZ2F0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgcGFnaW5hdGlvbih2YWwpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdHlwZW9mIHRoaXMuX3BhZ2luYXRpb24gIT09ICdib29sZWFuJyA/IHRoaXMuX3BhZ2luYXRpb24/LmVsIDogbnVsbDtcbiAgICB0aGlzLl9wYWdpbmF0aW9uID0gc2V0UHJvcGVydHkodmFsLCB7XG4gICAgICBlbDogY3VycmVudCB8fCBudWxsLFxuICAgIH0pO1xuICAgIGlmIChcbiAgICAgIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpICE9PSB0cnVlICYmXG4gICAgICB0eXBlb2YgdGhpcy5fcGFnaW5hdGlvbiAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICB0aGlzLl9wYWdpbmF0aW9uPy5lbCAhPT0gdGhpcy5fcGFnaW5hdGlvbkVsUmVmPy5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAodHlwZW9mIHRoaXMuX3BhZ2luYXRpb24/LmVsID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGhpcy5fcGFnaW5hdGlvbj8uZWwgPT09ICdvYmplY3QnKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93UGFnaW5hdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBnZXQgcGFnaW5hdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjtcbiAgfVxuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYWdpbmF0aW9uT3B0aW9ucyB8IGJvb2xlYW47XG4gIHNob3dQYWdpbmF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgc2Nyb2xsYmFyKHZhbCkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0eXBlb2YgdGhpcy5fc2Nyb2xsYmFyICE9PSAnYm9vbGVhbicgPyB0aGlzLl9zY3JvbGxiYXI/LmVsIDogbnVsbDtcbiAgICB0aGlzLl9zY3JvbGxiYXIgPSBzZXRQcm9wZXJ0eSh2YWwsIHtcbiAgICAgIGVsOiBjdXJyZW50IHx8IG51bGwsXG4gICAgfSk7XG4gICAgaWYgKFxuICAgICAgY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCkgIT09IHRydWUgJiZcbiAgICAgIHR5cGVvZiB0aGlzLl9zY3JvbGxiYXIgIT09ICdib29sZWFuJyAmJlxuICAgICAgdGhpcy5fc2Nyb2xsYmFyPy5lbCAhPT0gdGhpcy5fc2Nyb2xsYmFyRWxSZWY/Lm5hdGl2ZUVsZW1lbnQgJiZcbiAgICAgICh0eXBlb2YgdGhpcy5fc2Nyb2xsYmFyPy5lbCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRoaXMuX3Njcm9sbGJhcj8uZWwgPT09ICdvYmplY3QnKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93U2Nyb2xsYmFyID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdldCBzY3JvbGxiYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGJhcjtcbiAgfVxuICBwcml2YXRlIF9zY3JvbGxiYXI6IFNjcm9sbGJhck9wdGlvbnMgfCBib29sZWFuO1xuICBzaG93U2Nyb2xsYmFyOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgdmlydHVhbCh2YWwpIHtcbiAgICB0aGlzLl92aXJ0dWFsID0gc2V0UHJvcGVydHkodmFsKTtcbiAgfVxuICBnZXQgdmlydHVhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlydHVhbDtcbiAgfVxuICBwcml2YXRlIF92aXJ0dWFsOiBWaXJ0dWFsT3B0aW9ucyB8IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNldEluZGV4KGluZGV4KTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY29uZmlnKHZhbDogU3dpcGVyT3B0aW9ucykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKHZhbCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh2YWwpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX2JlZm9yZUJyZWFrcG9pbnQnKSBzX19iZWZvcmVCcmVha3BvaW50OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfYmVmb3JlQnJlYWtwb2ludCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX2NvbnRhaW5lckNsYXNzZXMnKSBzX19jb250YWluZXJDbGFzc2VzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfY29udGFpbmVyQ2xhc3NlcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX3NsaWRlQ2xhc3MnKSBzX19zbGlkZUNsYXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfc2xpZGVDbGFzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX3N3aXBlcicpIHNfX3N3aXBlcjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snX3N3aXBlciddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYWN0aXZlSW5kZXhDaGFuZ2UnKSBzX2FjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhY3RpdmVJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYWZ0ZXJJbml0Jykgc19hZnRlckluaXQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2FmdGVySW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXknKSBzX2F1dG9wbGF5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhdXRvcGxheSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXlTdGFydCcpIHNfYXV0b3BsYXlTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYXV0b3BsYXlTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXlTdG9wJykgc19hdXRvcGxheVN0b3A6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2F1dG9wbGF5U3RvcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlRGVzdHJveScpIHNfYmVmb3JlRGVzdHJveTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlRGVzdHJveSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlSW5pdCcpIHNfYmVmb3JlSW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlSW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlTG9vcEZpeCcpIHNfYmVmb3JlTG9vcEZpeDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlTG9vcEZpeCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlUmVzaXplJykgc19iZWZvcmVSZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZVJlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCcpIHNfYmVmb3JlU2xpZGVDaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jykgc19iZWZvcmVUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYnJlYWtwb2ludCcpIHNfYnJlYWtwb2ludDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYnJlYWtwb2ludCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnY2hhbmdlRGlyZWN0aW9uJykgc19jaGFuZ2VEaXJlY3Rpb246IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2NoYW5nZURpcmVjdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnY2xpY2snKSBzX2NsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydjbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZG91YmxlVGFwJykgc19kb3VibGVUYXA6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2RvdWJsZVRhcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZG91YmxlQ2xpY2snKSBzX2RvdWJsZUNsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydkb3VibGVDbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZGVzdHJveScpIHNfZGVzdHJveTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snZGVzdHJveSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZnJvbUVkZ2UnKSBzX2Zyb21FZGdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydmcm9tRWRnZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaGFzaENoYW5nZScpIHNfaGFzaENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaGFzaFNldCcpIHNfaGFzaFNldDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaFNldCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaW1hZ2VzUmVhZHknKSBzX2ltYWdlc1JlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydpbWFnZXNSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaW5pdCcpIHNfaW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgna2V5UHJlc3MnKSBzX2tleVByZXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydrZXlQcmVzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbGF6eUltYWdlTG9hZCcpIHNfbGF6eUltYWdlTG9hZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbGF6eUltYWdlTG9hZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbGF6eUltYWdlUmVhZHknKSBzX2xhenlJbWFnZVJlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsYXp5SW1hZ2VSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbG9vcEZpeCcpIHNfbG9vcEZpeDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbG9vcEZpeCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbW9tZW50dW1Cb3VuY2UnKSBzX21vbWVudHVtQm91bmNlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydtb21lbnR1bUJvdW5jZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbmF2aWdhdGlvbkhpZGUnKSBzX25hdmlnYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbmF2aWdhdGlvblNob3cnKSBzX25hdmlnYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnb2JzZXJ2ZXJVcGRhdGUnKSBzX29ic2VydmVyVXBkYXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvYnNlcnZlclVwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnb3JpZW50YXRpb25jaGFuZ2UnKSBzX29yaWVudGF0aW9uY2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvcmllbnRhdGlvbmNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvbkhpZGUnKSBzX3BhZ2luYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblJlbmRlcicpIHNfcGFnaW5hdGlvblJlbmRlcjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvblJlbmRlciddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblNob3cnKSBzX3BhZ2luYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblVwZGF0ZScpIHNfcGFnaW5hdGlvblVwZGF0ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvblVwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncHJvZ3Jlc3MnKSBzX3Byb2dyZXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwcm9ncmVzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhY2hCZWdpbm5pbmcnKSBzX3JlYWNoQmVnaW5uaW5nOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEJlZ2lubmluZyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhY2hFbmQnKSBzX3JlYWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhbEluZGV4Q2hhbmdlJykgc19yZWFsSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3JlYWxJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVzaXplJykgc19yZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Jlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsJykgc19zY3JvbGw6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ0VuZCcpIHNfc2Nyb2xsYmFyRHJhZ0VuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2Nyb2xsYmFyRHJhZ0VuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ01vdmUnKSBzX3Njcm9sbGJhckRyYWdNb3ZlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ1N0YXJ0Jykgc19zY3JvbGxiYXJEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbGJhckRyYWdTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2V0VHJhbnNpdGlvbicpIHNfc2V0VHJhbnNpdGlvbjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2V0VHJhbnNpdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2V0VHJhbnNsYXRlJykgc19zZXRUcmFuc2xhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NldFRyYW5zbGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2UnKSBzX3NsaWRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJykgc19zbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVOZXh0VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVQcmV2VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKSBzX3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVyTW92ZScpIHNfc2xpZGVyTW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVyTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVyRmlyc3RNb3ZlJykgc19zbGlkZXJGaXJzdE1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlckZpcnN0TW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJykgc19zbGlkZXNMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlc0xlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVzR3JpZExlbmd0aENoYW5nZScpIHNfc2xpZGVzR3JpZExlbmd0aENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVzR3JpZExlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc25hcEdyaWRMZW5ndGhDaGFuZ2UnKSBzX3NuYXBHcmlkTGVuZ3RoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbmFwR3JpZExlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc25hcEluZGV4Q2hhbmdlJykgc19zbmFwSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NuYXBJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndGFwJykgc190YXA6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RhcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG9FZGdlJykgc190b0VkZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvRWRnZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hFbmQnKSBzX3RvdWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hNb3ZlJykgc190b3VjaE1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hNb3ZlT3Bwb3NpdGUnKSBzX3RvdWNoTW92ZU9wcG9zaXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaE1vdmVPcHBvc2l0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hTdGFydCcpIHNfdG91Y2hTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG91Y2hTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndHJhbnNpdGlvbkVuZCcpIHNfdHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndHJhbnNpdGlvblN0YXJ0Jykgc190cmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndXBkYXRlJykgc191cGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3VwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnem9vbUNoYW5nZScpIHNfem9vbUNoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snem9vbUNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc3dpcGVyJykgc19zd2lwZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgQFZpZXdDaGlsZCgncHJldkVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBwcmV2RWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9wcmV2RWxSZWYgPSBlbDtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLm5hdmlnYXRpb24sICduYXZpZ2F0aW9uJywgJ3ByZXZFbCcpO1xuICB9XG4gIF9wcmV2RWxSZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ25leHRFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgbmV4dEVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fbmV4dEVsUmVmID0gZWw7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5uYXZpZ2F0aW9uLCAnbmF2aWdhdGlvbicsICduZXh0RWwnKTtcbiAgfVxuICBfbmV4dEVsUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzY3JvbGxiYXJFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgc2Nyb2xsYmFyRWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zY3JvbGxiYXJFbFJlZiA9IGVsO1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMuc2Nyb2xsYmFyLCAnc2Nyb2xsYmFyJyk7XG4gIH1cbiAgX3Njcm9sbGJhckVsUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdwYWdpbmF0aW9uRWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc2V0IHBhZ2luYXRpb25FbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3BhZ2luYXRpb25FbFJlZiA9IGVsO1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMucGFnaW5hdGlvbiwgJ3BhZ2luYXRpb24nKTtcbiAgfVxuICBfcGFnaW5hdGlvbkVsUmVmOiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkcmVuKFN3aXBlclNsaWRlRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlLCBlbWl0RGlzdGluY3RDaGFuZ2VzT25seTogdHJ1ZSB9KVxuICBzbGlkZXNFbDogUXVlcnlMaXN0PFN3aXBlclNsaWRlRGlyZWN0aXZlPjtcbiAgcHJpdmF0ZSBzbGlkZXM6IFN3aXBlclNsaWRlRGlyZWN0aXZlW107XG5cbiAgcHJlcGVuZFNsaWRlczogT2JzZXJ2YWJsZTxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPjtcbiAgYXBwZW5kU2xpZGVzOiBPYnNlcnZhYmxlPFN3aXBlclNsaWRlRGlyZWN0aXZlW10+O1xuXG4gIHN3aXBlclJlZjogU3dpcGVyO1xuICByZWFkb25seSBfYWN0aXZlU2xpZGVzID0gbmV3IFN1YmplY3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT4oKTtcblxuICBnZXQgYWN0aXZlU2xpZGVzKCkge1xuICAgIGlmICh0aGlzLnZpcnR1YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZXM7XG4gICAgfVxuICAgIHJldHVybiBvZih0aGlzLnNsaWRlcyk7XG4gIH1cblxuICBnZXQgem9vbUNvbnRhaW5lckNsYXNzKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy56b29tICE9PSAnYm9vbGVhbicgPyB0aGlzLnpvb20uY29udGFpbmVyQ2xhc3MgOiAnc3dpcGVyLXpvb20tY29udGFpbmVyJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjb250YWluZXJDbGFzc2VzID0gJ3N3aXBlci1jb250YWluZXInO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQsXG4gICkge31cblxuICBwcml2YXRlIF9zZXRFbGVtZW50KGVsOiBFbGVtZW50UmVmLCByZWY6IGFueSwgdXBkYXRlOiBzdHJpbmcsIGtleSA9ICdlbCcpIHtcbiAgICBpZiAoIWVsIHx8ICFyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlZiAmJiBlbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBpZiAocmVmW2tleV0gPT09IGVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVmW2tleV0gPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBjb25zdCB1cGRhdGVPYmogPSB7fTtcbiAgICB1cGRhdGVPYmpbdXBkYXRlXSA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVJbml0U3dpcGVyKHVwZGF0ZU9iaik7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh0aGlzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhcmFtcyk7XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuY2hpbGRyZW5TbGlkZXNJbml0KCk7XG4gICAgdGhpcy5pbml0U3dpcGVyKCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zX3N3aXBlci5lbWl0KHRoaXMuc3dpcGVyUmVmKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hpbGRyZW5TbGlkZXNJbml0KCkge1xuICAgIHRoaXMuc2xpZGVzQ2hhbmdlcyh0aGlzLnNsaWRlc0VsKTtcbiAgICB0aGlzLnNsaWRlc0VsLmNoYW5nZXMuc3Vic2NyaWJlKHRoaXMuc2xpZGVzQ2hhbmdlcyk7XG4gIH1cblxuICBwcml2YXRlIHNsaWRlc0NoYW5nZXMgPSAodmFsOiBRdWVyeUxpc3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmU+KSA9PiB7XG4gICAgdGhpcy5zbGlkZXMgPSB2YWwubWFwKChzbGlkZTogU3dpcGVyU2xpZGVEaXJlY3RpdmUsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHNsaWRlLnNsaWRlSW5kZXggPSBpbmRleDtcbiAgICAgIHNsaWRlLmNsYXNzTmFtZXMgPSB0aGlzLnNsaWRlQ2xhc3M7XG4gICAgICByZXR1cm4gc2xpZGU7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgIHRoaXMuY2FsY0xvb3BlZFNsaWRlcygpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudmlydHVhbCkge1xuICAgICAgdGhpcy5wcmVwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UodGhpcy5zbGlkZXMubGVuZ3RoIC0gdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICAgIHRoaXMuYXBwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UoMCwgdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3dpcGVyUmVmICYmIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwpIHtcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwuc2xpZGVzID0gdGhpcy5zbGlkZXM7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwudXBkYXRlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfTtcblxuICBnZXQgaXNTd2lwZXJBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQ7XG4gIH1cblxuICBpbml0U3dpcGVyKCkge1xuICAgIGNvbnN0IHsgcGFyYW1zOiBzd2lwZXJQYXJhbXMsIHBhc3NlZFBhcmFtcyB9ID0gZ2V0UGFyYW1zKHRoaXMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgc3dpcGVyUGFyYW1zKTtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3dpcGVyUGFyYW1zLmluaXQgPSBmYWxzZTtcbiAgICAgIGlmICghc3dpcGVyUGFyYW1zLnZpcnR1YWwpIHtcbiAgICAgICAgc3dpcGVyUGFyYW1zLm9ic2VydmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHN3aXBlclBhcmFtcy5vbkFueSA9IChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBlbWl0dGVyID0gdGhpc1tgc18ke2V2ZW50fWBdIGFzIEV2ZW50RW1pdHRlcjxhbnk+O1xuICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdCguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyUGFyYW1zLm9uLCB7XG4gICAgICAgIF9jb250YWluZXJDbGFzc2VzKHN3aXBlciwgY2xhc3Nlcykge1xuICAgICAgICAgIHRoaXMuY29udGFpbmVyQ2xhc3NlcyA9IGNsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIF9zbGlkZUNsYXNzZXM6IChfLCB1cGRhdGVkKSA9PiB7XG4gICAgICAgICAgdXBkYXRlZC5mb3JFYWNoKCh7IHNsaWRlRWwsIGNsYXNzTmFtZXMgfSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBwYXJzZUludChzbGlkZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgfHwgaW5kZXg7XG4gICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZpcnR1YWxTbGlkZSA9IHRoaXMuc2xpZGVzLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52aXJ0dWFsSW5kZXggJiYgaXRlbS52aXJ0dWFsSW5kZXggPT09IHNsaWRlSW5kZXg7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAodmlydHVhbFNsaWRlKSB7XG4gICAgICAgICAgICAgICAgdmlydHVhbFNsaWRlLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zbGlkZXNbc2xpZGVJbmRleF0pIHtcbiAgICAgICAgICAgICAgdGhpcy5zbGlkZXNbc2xpZGVJbmRleF0uY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBjb25zdCBzd2lwZXJSZWYgPSBuZXcgU3dpcGVyKHN3aXBlclBhcmFtcyk7XG4gICAgICBzd2lwZXJSZWYubG9vcENyZWF0ZSA9ICgpID0+IHt9O1xuICAgICAgc3dpcGVyUmVmLmxvb3BEZXN0cm95ID0gKCkgPT4ge307XG4gICAgICBpZiAoc3dpcGVyUGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc3dpcGVyUmVmLmxvb3BlZFNsaWRlcyA9IHRoaXMubG9vcGVkU2xpZGVzO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlclJlZi52aXJ0dWFsICYmIHN3aXBlclJlZi5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICAgIHN3aXBlclJlZi52aXJ0dWFsLnNsaWRlcyA9IHRoaXMuc2xpZGVzO1xuICAgICAgICBjb25zdCBleHRlbmRXaXRoID0ge1xuICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICByZW5kZXJFeHRlcm5hbDogdGhpcy51cGRhdGVWaXJ0dWFsU2xpZGVzLFxuICAgICAgICAgIHJlbmRlckV4dGVybmFsVXBkYXRlOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgZXh0ZW5kKHN3aXBlclJlZi5wYXJhbXMudmlydHVhbCwgZXh0ZW5kV2l0aCk7XG4gICAgICAgIGV4dGVuZChzd2lwZXJSZWYub3JpZ2luYWxQYXJhbXMudmlydHVhbCwgZXh0ZW5kV2l0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZiA9IHN3aXBlclJlZi5pbml0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwgJiYgdGhpcy5zd2lwZXJSZWYucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgICAgIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwudXBkYXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgc3dpcGVyUmVmLm9uKCdzbGlkZUNoYW5nZScsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmluZGV4Q2hhbmdlLmVtaXQodGhpcy5zd2lwZXJSZWYucmVhbEluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdHlsZTogYW55ID0gbnVsbDtcbiAgY3VycmVudFZpcnR1YWxEYXRhOiBhbnk7IC8vIFRPRE86IHR5cGUgdmlydHVhbERhdGE7XG4gIHByaXZhdGUgdXBkYXRlVmlydHVhbFNsaWRlcyA9ICh2aXJ0dWFsRGF0YTogYW55KSA9PiB7XG4gICAgLy8gVE9ETzogdHlwZSB2aXJ0dWFsRGF0YVxuICAgIGlmIChcbiAgICAgICF0aGlzLnN3aXBlclJlZiB8fFxuICAgICAgKHRoaXMuY3VycmVudFZpcnR1YWxEYXRhICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLmZyb20gPT09IHZpcnR1YWxEYXRhLmZyb20gJiZcbiAgICAgICAgdGhpcy5jdXJyZW50VmlydHVhbERhdGEudG8gPT09IHZpcnR1YWxEYXRhLnRvICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLm9mZnNldCA9PT0gdmlydHVhbERhdGEub2Zmc2V0KVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnN0eWxlID0gdGhpcy5zd2lwZXJSZWYuaXNIb3Jpem9udGFsKClcbiAgICAgID8ge1xuICAgICAgICAgIFt0aGlzLnN3aXBlclJlZi5ydGxUcmFuc2xhdGUgPyAncmlnaHQnIDogJ2xlZnQnXTogYCR7dmlydHVhbERhdGEub2Zmc2V0fXB4YCxcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgdG9wOiBgJHt2aXJ0dWFsRGF0YS5vZmZzZXR9cHhgLFxuICAgICAgICB9O1xuICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhID0gdmlydHVhbERhdGE7XG4gICAgdGhpcy5fYWN0aXZlU2xpZGVzLm5leHQodmlydHVhbERhdGEuc2xpZGVzKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIGlmICh0aGlzLnN3aXBlclJlZi5sYXp5ICYmIHRoaXMuc3dpcGVyUmVmLnBhcmFtcy5sYXp5WydlbmFibGVkJ10pIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKGNoYW5nZWRQYXJhbXMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZUluaXRTd2lwZXIoY2hhbmdlZFBhcmFtcykge1xuICAgIGlmICghKGNoYW5nZWRQYXJhbXMgJiYgdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXM6IGN1cnJlbnRQYXJhbXMsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIG5hdmlnYXRpb24sXG4gICAgICAgIHNjcm9sbGJhcixcbiAgICAgICAgdmlydHVhbCxcbiAgICAgICAgdGh1bWJzLFxuICAgICAgfSA9IHRoaXMuc3dpcGVyUmVmO1xuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5wYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnBhZ2luYXRpb24gJiZcbiAgICAgICAgICB0eXBlb2YgdGhpcy5wYWdpbmF0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLnBhZ2luYXRpb24uZWwgJiZcbiAgICAgICAgICBwYWdpbmF0aW9uICYmXG4gICAgICAgICAgIXBhZ2luYXRpb24uZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3BhZ2luYXRpb24nLCB0aGlzLnBhZ2luYXRpb24pO1xuICAgICAgICAgIHBhZ2luYXRpb24uaW5pdCgpO1xuICAgICAgICAgIHBhZ2luYXRpb24ucmVuZGVyKCk7XG4gICAgICAgICAgcGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYWdpbmF0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICBwYWdpbmF0aW9uLmVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5zY3JvbGxiYXIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyICYmXG4gICAgICAgICAgdHlwZW9mIHRoaXMuc2Nyb2xsYmFyICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLnNjcm9sbGJhci5lbCAmJlxuICAgICAgICAgIHNjcm9sbGJhciAmJlxuICAgICAgICAgICFzY3JvbGxiYXIuZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3Njcm9sbGJhcicsIHRoaXMuc2Nyb2xsYmFyKTtcbiAgICAgICAgICBzY3JvbGxiYXIuaW5pdCgpO1xuICAgICAgICAgIHNjcm9sbGJhci51cGRhdGVTaXplKCk7XG4gICAgICAgICAgc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjcm9sbGJhci5kZXN0cm95KCk7XG4gICAgICAgICAgc2Nyb2xsYmFyLmVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5uYXZpZ2F0aW9uKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0eXBlb2YgdGhpcy5uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb24ucHJldkVsICYmXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLm5leHRFbCAmJlxuICAgICAgICAgIG5hdmlnYXRpb24gJiZcbiAgICAgICAgICAhbmF2aWdhdGlvbi5wcmV2RWwgJiZcbiAgICAgICAgICAhbmF2aWdhdGlvbi5uZXh0RWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ25hdmlnYXRpb24nLCB0aGlzLm5hdmlnYXRpb24pO1xuICAgICAgICAgIG5hdmlnYXRpb24uaW5pdCgpO1xuICAgICAgICAgIG5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobmF2aWdhdGlvbi5wcmV2RWwgJiYgbmF2aWdhdGlvbi5uZXh0RWwpIHtcbiAgICAgICAgICBuYXZpZ2F0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICBuYXZpZ2F0aW9uLm5leHRFbCA9IG51bGw7XG4gICAgICAgICAgbmF2aWdhdGlvbi5wcmV2RWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy50aHVtYnMgJiYgdGhpcy50aHVtYnMgJiYgdGhpcy50aHVtYnMuc3dpcGVyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCd0aHVtYnMnLCB0aGlzLnRodW1icyk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVkID0gdGh1bWJzLmluaXQoKTtcbiAgICAgICAgaWYgKGluaXRpYWxpemVkKSB0aHVtYnMudXBkYXRlKHRydWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb250cm9sbGVyICYmIHRoaXMuY29udHJvbGxlciAmJiB0aGlzLmNvbnRyb2xsZXIuY29udHJvbCkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5jb250cm9sbGVyLmNvbnRyb2wgPSB0aGlzLmNvbnRyb2xsZXIuY29udHJvbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTd2lwZXIoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcyB8IGFueSkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb25maWcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCEoY2hhbmdlZFBhcmFtcyAmJiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGFuZ2VkUGFyYW1zKSB7XG4gICAgICAgIGlmIChpZ25vcmVOZ09uQ2hhbmdlcy5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY2hhbmdlZFBhcmFtc1trZXldPy5jdXJyZW50VmFsdWUgPz8gY2hhbmdlZFBhcmFtc1trZXldO1xuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcihrZXksIG5ld1ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYWxsb3dTbGlkZU5leHQpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZU5leHQgPSB0aGlzLmFsbG93U2xpZGVOZXh0O1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYWxsb3dTbGlkZVByZXYpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZVByZXYgPSB0aGlzLmFsbG93U2xpZGVQcmV2O1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuZGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcmVjdGlvbiwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgICAgICB0aGlzLmNhbGNMb29wZWRTbGlkZXMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN3aXBlclJlZi5jdXJyZW50QnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMudGh1bWJzIHx8IGNoYW5nZWRQYXJhbXMuY29udHJvbGxlcikge1xuICAgICAgICB0aGlzLnVwZGF0ZUluaXRTd2lwZXIoY2hhbmdlZFBhcmFtcyk7XG4gICAgICB9XG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNMb29wZWRTbGlkZXMoKSB7XG4gICAgaWYgKCF0aGlzLmxvb3ApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNsaWRlc1BlclZpZXdQYXJhbXMgPSB0aGlzLnNsaWRlc1BlclZpZXc7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBTd2lwZXIucHJvdG90eXBlLmdldEJyZWFrcG9pbnQodGhpcy5icmVha3BvaW50cyk7XG4gICAgICBjb25zdCBicmVha3BvaW50T25seVBhcmFtcyA9XG4gICAgICAgIGJyZWFrcG9pbnQgaW4gdGhpcy5icmVha3BvaW50cyA/IHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoYnJlYWtwb2ludE9ubHlQYXJhbXMgJiYgYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldykge1xuICAgICAgICBzbGlkZXNQZXJWaWV3UGFyYW1zID0gYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNsaWRlc1BlclZpZXdQYXJhbXMgPT09ICdhdXRvJykge1xuICAgICAgdGhpcy5sb29wZWRTbGlkZXMgPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgICByZXR1cm4gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICBsZXQgbG9vcGVkU2xpZGVzID0gdGhpcy5sb29wZWRTbGlkZXMgfHwgc2xpZGVzUGVyVmlld1BhcmFtcztcblxuICAgIGxvb3BlZFNsaWRlcyArPSB0aGlzLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuXG4gICAgaWYgKGxvb3BlZFNsaWRlcyA+IHRoaXMuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgbG9vcGVkU2xpZGVzID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmxvb3BlZFNsaWRlcyA9IGxvb3BlZFNsaWRlcztcbiAgICByZXR1cm4gbG9vcGVkU2xpZGVzO1xuICB9XG5cbiAgdXBkYXRlUGFyYW1ldGVyKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoISh0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBfa2V5ID0ga2V5LnJlcGxhY2UoL15fLywgJycpO1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnN3aXBlclJlZi5tb2R1bGVzKS5pbmRleE9mKF9rZXkpID49IDApIHtcbiAgICAgIGV4dGVuZCh2YWx1ZSwgdGhpcy5zd2lwZXJSZWYubW9kdWxlc1tfa2V5XS5wYXJhbXNbX2tleV0pO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QodGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldKSAmJiBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0sIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0SW5kZXgoaW5kZXg6IG51bWJlciwgc3BlZWQ/OiBudW1iZXIsIHNpbGVudD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNTd2lwZXJBY3RpdmUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbFNsaWRlID0gaW5kZXg7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zd2lwZXJSZWYuYWN0aXZlSW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuc2xpZGVUb0xvb3AoaW5kZXgsIHNwZWVkLCAhc2lsZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCAhc2lsZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnN3aXBlclJlZj8uZGVzdHJveSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=