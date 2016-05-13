/*
 * Vendor specified properties list
 */

var V = {};

var L = require('./lightvendor');

V.attrs = {
    "align-content": [
        "-webkit-align-content"
    ],
    "align-items": [
        "-webkit-align-items"
    ],
    "align-self": [
        "-webkit-align-self"
    ],
    "animation": [
        "-webkit-animation",
        "-ms-animation"
    ],
    "animation-delay": [
        "-webkit-animation-delay",
        "-ms-animation-delay"
    ],
    "animation-direction": [
        "-webkit-animation-direction",
        "-ms-animation-direction"
    ],
    "animation-duration": [
        "-webkit-animation-duration",
        "-ms-animation-duration"
    ],
    "animation-fill-mode": [
        "-webkit-animation-fill-mode",
        "-ms-animation-fill-mode"
    ],
    "animation-iteration-count": [
        "-webkit-animation-iteration-count",
        "-ms-animation-iteration-count"
    ],
    "animation-name": [
        "-webkit-animation-name",
        "-ms-animation-name"
    ],
    "animation-play-state": [
        "-webkit-animation-play-state",
        "-ms-animation-play-state"
    ],
    "animation-timing-function": [
        "-webkit-animation-timing-function",
        "-ms-animation-timing-function"
    ],
    "app-region": [
        "-webkit-app-region"
    ],
    "appearance": [
        "-webkit-appearance",
        "-moz-appearance"
    ],
    "aspect-ratio": [
        "-webkit-aspect-ratio"
    ],
    "backface-visibility": [
        "-webkit-backface-visibility",
        "-ms-backface-visibility"
    ],
    "background-clip": [
        "-webkit-background-clip"
    ],
    "background-composite": [
        "-webkit-background-composite"
    ],
    "background-origin": [
        "-webkit-background-origin"
    ],
    "background-size": [
        "-webkit-background-size"
    ],
    "border-after": [
        "-webkit-border-after"
    ],
    "border-after-color": [
        "-webkit-border-after-color"
    ],
    "border-after-style": [
        "-webkit-border-after-style"
    ],
    "border-after-width": [
        "-webkit-border-after-width"
    ],
    "border-before": [
        "-webkit-border-before"
    ],
    "border-before-color": [
        "-webkit-border-before-color"
    ],
    "border-before-style": [
        "-webkit-border-before-style"
    ],
    "border-before-width": [
        "-webkit-border-before-width"
    ],
    "border-bottom-left-radius": [
        "-webkit-border-bottom-left-radius"
    ],
    "border-bottom-right-radius": [
        "-webkit-border-bottom-right-radius"
    ],
    "border-end": [
        "-webkit-border-end",
        "-moz-border-end"
    ],
    "border-end-color": [
        "-webkit-border-end-color",
        "-moz-border-end-color"
    ],
    "border-end-style": [
        "-webkit-border-end-style",
        "-moz-border-end-style"
    ],
    "border-end-width": [
        "-webkit-border-end-width",
        "-moz-border-end-width"
    ],
    "border-fit": [
        "-webkit-border-fit"
    ],
    "border-horizontal-spacing": [
        "-webkit-border-horizontal-spacing"
    ],
    "border-image": [
        "-webkit-border-image"
    ],
    "border-radius": [
        "-webkit-border-radius"
    ],
    "border-start": [
        "-webkit-border-start",
        "-moz-border-start"
    ],
    "border-start-color": [
        "-webkit-border-start-color",
        "-moz-border-start-color"
    ],
    "border-start-style": [
        "-webkit-border-start-style",
        "-moz-border-start-style"
    ],
    "border-start-width": [
        "-webkit-border-start-width",
        "-moz-border-start-width"
    ],
    "border-top-left-radius": [
        "-webkit-border-top-left-radius"
    ],
    "border-top-right-radius": [
        "-webkit-border-top-right-radius"
    ],
    "border-vertical-spacing": [
        "-webkit-border-vertical-spacing"
    ],
    "box-align": [
        "-webkit-box-align",
        "-moz-box-align"
    ],
    "box-decoration-break": [
        "-webkit-box-decoration-break"
    ],
    "box-direction": [
        "-webkit-box-direction",
        "-moz-box-direction"
    ],
    "box-flex": [
        "-webkit-box-flex",
        "-moz-box-flex"
    ],
    "box-flex-group": [
        "-webkit-box-flex-group"
    ],
    "box-lines": [
        "-webkit-box-lines"
    ],
    "box-ordinal-group": [
        "-webkit-box-ordinal-group",
        "-moz-box-ordinal-group"
    ],
    "box-orient": [
        "-webkit-box-orient",
        "-moz-box-orient"
    ],
    "box-pack": [
        "-webkit-box-pack",
        "-moz-box-pack"
    ],
    "box-reflect": [
        "-webkit-box-reflect"
    ],
    "box-shadow": [
        "-webkit-box-shadow"
    ],
    "box-sizing": [
        "-webkit-box-sizing"
    ],
    "clip-path": [
        "-webkit-clip-path"
    ],
    "column-break-after": [
        "-webkit-column-break-after"
    ],
    "column-break-before": [
        "-webkit-column-break-before"
    ],
    "column-break-inside": [
        "-webkit-column-break-inside"
    ],
    "column-count": [
        "-webkit-column-count",
        "-moz-column-count"
    ],
    "column-gap": [
        "-webkit-column-gap",
        "-moz-column-gap"
    ],
    "column-rule": [
        "-webkit-column-rule",
        "-moz-column-rule"
    ],
    "column-rule-color": [
        "-webkit-column-rule-color",
        "-moz-column-rule-color"
    ],
    "column-rule-style": [
        "-webkit-column-rule-style",
        "-moz-column-rule-style"
    ],
    "column-rule-width": [
        "-webkit-column-rule-width",
        "-moz-column-rule-width"
    ],
    "column-span": [
        "-webkit-column-span"
    ],
    "column-width": [
        "-webkit-column-width",
        "-moz-column-width"
    ],
    "columns": [
        "-webkit-columns",
        "-moz-columns"
    ],
    "filter": [
        "-webkit-filter",
        "-ms-filter"
    ],
    "flex": [
        "-webkit-flex",
        "-ms-flex"
    ],
    "flex-basis": [
        "-webkit-flex-basis"
    ],
    "flex-direction": [
        "-webkit-flex-direction",
        "-ms-flex-direction"
    ],
    "flex-flow": [
        "-webkit-flex-flow",
        "-ms-flex-flow"
    ],
    "flex-grow": [
        "-webkit-flex-grow"
    ],
    "flex-shrink": [
        "-webkit-flex-shrink"
    ],
    "flex-wrap": [
        "-webkit-flex-wrap",
        "-ms-flex-wrap"
    ],
    "font-feature-settings": [
        "-webkit-font-feature-settings",
        "-ms-font-feature-settings"
    ],
    "font-size-delta": [
        "-webkit-font-size-delta"
    ],
    "font-smoothing": [
        "-webkit-font-smoothing"
    ],
    "highlight": [
        "-webkit-highlight"
    ],
    "hyphenate-character": [
        "-webkit-hyphenate-character"
    ],
    "justify-content": [
        "-webkit-justify-content"
    ],
    "line-box-contain": [
        "-webkit-line-box-contain"
    ],
    "line-break": [
        "-webkit-line-break",
        "-ms-line-break"
    ],
    "line-clamp": [
        "-webkit-line-clamp"
    ],
    "locale": [
        "-webkit-locale"
    ],
    "logical-height": [
        "-webkit-logical-height"
    ],
    "logical-width": [
        "-webkit-logical-width"
    ],
    "margin-after": [
        "-webkit-margin-after"
    ],
    "margin-after-collapse": [
        "-webkit-margin-after-collapse"
    ],
    "margin-before": [
        "-webkit-margin-before"
    ],
    "margin-before-collapse": [
        "-webkit-margin-before-collapse"
    ],
    "margin-bottom-collapse": [
        "-webkit-margin-bottom-collapse"
    ],
    "margin-collapse": [
        "-webkit-margin-collapse"
    ],
    "margin-end": [
        "-webkit-margin-end",
        "-moz-margin-end"
    ],
    "margin-start": [
        "-webkit-margin-start",
        "-moz-margin-start"
    ],
    "margin-top-collapse": [
        "-webkit-margin-top-collapse"
    ],
    "mask": [
        "-webkit-mask"
    ],
    "mask-box-image": [
        "-webkit-mask-box-image"
    ],
    "mask-box-image-outset": [
        "-webkit-mask-box-image-outset"
    ],
    "mask-box-image-repeat": [
        "-webkit-mask-box-image-repeat"
    ],
    "mask-box-image-slice": [
        "-webkit-mask-box-image-slice"
    ],
    "mask-box-image-source": [
        "-webkit-mask-box-image-source"
    ],
    "mask-box-image-width": [
        "-webkit-mask-box-image-width"
    ],
    "mask-clip": [
        "-webkit-mask-clip"
    ],
    "mask-composite": [
        "-webkit-mask-composite"
    ],
    "mask-image": [
        "-webkit-mask-image"
    ],
    "mask-origin": [
        "-webkit-mask-origin"
    ],
    "mask-position": [
        "-webkit-mask-position"
    ],
    "mask-position-x": [
        "-webkit-mask-position-x"
    ],
    "mask-position-y": [
        "-webkit-mask-position-y"
    ],
    "mask-repeat": [
        "-webkit-mask-repeat"
    ],
    "mask-repeat-x": [
        "-webkit-mask-repeat-x"
    ],
    "mask-repeat-y": [
        "-webkit-mask-repeat-y"
    ],
    "mask-size": [
        "-webkit-mask-size"
    ],
    "max-logical-height": [
        "-webkit-max-logical-height"
    ],
    "max-logical-width": [
        "-webkit-max-logical-width"
    ],
    "min-logical-height": [
        "-webkit-min-logical-height"
    ],
    "min-logical-width": [
        "-webkit-min-logical-width"
    ],
    "opacity": [
        "-webkit-opacity"
    ],
    "order": [
        "-webkit-order"
    ],
    "padding-after": [
        "-webkit-padding-after"
    ],
    "padding-before": [
        "-webkit-padding-before"
    ],
    "padding-end": [
        "-webkit-padding-end",
        "-moz-padding-end"
    ],
    "padding-start": [
        "-webkit-padding-start",
        "-moz-padding-start"
    ],
    "perspective": [
        "-webkit-perspective",
        "-ms-perspective"
    ],
    "perspective-origin": [
        "-webkit-perspective-origin",
        "-ms-perspective-origin"
    ],
    "perspective-origin-x": [
        "-webkit-perspective-origin-x",
        "-ms-perspective-origin-x"
    ],
    "perspective-origin-y": [
        "-webkit-perspective-origin-y",
        "-ms-perspective-origin-y"
    ],
    "print-color-adjust": [
        "-webkit-print-color-adjust"
    ],
    "rtl-ordering": [
        "-webkit-rtl-ordering"
    ],
    "ruby-position": [
        "-webkit-ruby-position"
    ],
    "shape-image-threshold": [
        "-webkit-shape-image-threshold"
    ],
    "shape-margin": [
        "-webkit-shape-margin"
    ],
    "shape-outside": [
        "-webkit-shape-outside"
    ],
    "tap-highlight-color": [
        "-webkit-tap-highlight-color"
    ],
    "text-combine": [
        "-webkit-text-combine"
    ],
    "text-decorations-in-effect": [
        "-webkit-text-decorations-in-effect"
    ],
    "text-emphasis": [
        "-webkit-text-emphasis"
    ],
    "text-emphasis-color": [
        "-webkit-text-emphasis-color"
    ],
    "text-emphasis-position": [
        "-webkit-text-emphasis-position"
    ],
    "text-emphasis-style": [
        "-webkit-text-emphasis-style"
    ],
    "text-fill-color": [
        "-webkit-text-fill-color"
    ],
    "text-orientation": [
        "-webkit-text-orientation"
    ],
    "text-security": [
        "-webkit-text-security"
    ],
    "text-stroke": [
        "-webkit-text-stroke"
    ],
    "text-stroke-color": [
        "-webkit-text-stroke-color"
    ],
    "text-stroke-width": [
        "-webkit-text-stroke-width"
    ],
    "transform": [
        "-webkit-transform",
        "-moz-transform",
        "-ms-transform"
    ],
    "transform-origin": [
        "-webkit-transform-origin",
        "-ms-transform-origin"
    ],
    "transform-origin-x": [
        "-webkit-transform-origin-x",
        "-ms-transform-origin-x"
    ],
    "transform-origin-y": [
        "-webkit-transform-origin-y",
        "-ms-transform-origin-y"
    ],
    "transform-origin-z": [
        "-webkit-transform-origin-z",
        "-ms-transform-origin-z"
    ],
    "transform-style": [
        "-webkit-transform-style",
        "-ms-transform-style"
    ],
    "transition": [
        "-webkit-transition",
        "-ms-transition"
    ],
    "transition-delay": [
        "-webkit-transition-delay",
        "-ms-transition-delay"
    ],
    "transition-duration": [
        "-webkit-transition-duration",
        "-ms-transition-duration"
    ],
    "transition-property": [
        "-webkit-transition-property",
        "-ms-transition-property"
    ],
    "transition-timing-function": [
        "-webkit-transition-timing-function",
        "-ms-transition-timing-function"
    ],
    "user-drag": [
        "-webkit-user-drag"
    ],
    "user-modify": [
        "-webkit-user-modify",
        "-moz-user-modify"
    ],
    "user-select": [
        "-webkit-user-select",
        "-moz-user-select",
        "-ms-user-select"
    ],
    "writing-mode": [
        "-webkit-writing-mode",
        "-ms-writing-mode"
    ],
    "alt": [
        "-webkit-alt"
    ],
    "animation-trigger": [
        "-webkit-animation-trigger"
    ],
    "backdrop-filter": [
        "-webkit-backdrop-filter"
    ],
    "color-correction": [
        "-webkit-color-correction"
    ],
    "column-axis": [
        "-webkit-column-axis"
    ],
    "column-fill": [
        "-webkit-column-fill",
        "-moz-column-fill"
    ],
    "column-progression": [
        "-webkit-column-progression"
    ],
    "cursor-visibility": [
        "-webkit-cursor-visibility"
    ],
    "dashboard-region": [
        "-webkit-dashboard-region"
    ],
    "flow-from": [
        "-webkit-flow-from",
        "-ms-flow-from"
    ],
    "flow-into": [
        "-webkit-flow-into",
        "-ms-flow-into"
    ],
    "font-kerning": [
        "-webkit-font-kerning"
    ],
    "font-variant-ligatures": [
        "-webkit-font-variant-ligatures"
    ],
    "grid": [
        "-webkit-grid"
    ],
    "grid-area": [
        "-webkit-grid-area"
    ],
    "grid-auto-columns": [
        "-webkit-grid-auto-columns"
    ],
    "grid-auto-flow": [
        "-webkit-grid-auto-flow"
    ],
    "grid-auto-rows": [
        "-webkit-grid-auto-rows"
    ],
    "grid-column": [
        "-webkit-grid-column",
        "-ms-grid-column"
    ],
    "grid-column-end": [
        "-webkit-grid-column-end"
    ],
    "grid-column-gap": [
        "-webkit-grid-column-gap"
    ],
    "grid-column-start": [
        "-webkit-grid-column-start"
    ],
    "grid-gap": [
        "-webkit-grid-gap"
    ],
    "grid-row": [
        "-webkit-grid-row",
        "-ms-grid-row"
    ],
    "grid-row-end": [
        "-webkit-grid-row-end"
    ],
    "grid-row-gap": [
        "-webkit-grid-row-gap"
    ],
    "grid-row-start": [
        "-webkit-grid-row-start"
    ],
    "grid-template": [
        "-webkit-grid-template"
    ],
    "grid-template-areas": [
        "-webkit-grid-template-areas"
    ],
    "grid-template-columns": [
        "-webkit-grid-template-columns"
    ],
    "grid-template-rows": [
        "-webkit-grid-template-rows"
    ],
    "hyphenate-limit-after": [
        "-webkit-hyphenate-limit-after"
    ],
    "hyphenate-limit-before": [
        "-webkit-hyphenate-limit-before"
    ],
    "hyphenate-limit-lines": [
        "-webkit-hyphenate-limit-lines",
        "-ms-hyphenate-limit-lines"
    ],
    "hyphens": [
        "-webkit-hyphens",
        "-moz-hyphens",
        "-ms-hyphens"
    ],
    "initial-letter": [
        "-webkit-initial-letter"
    ],
    "justify-items": [
        "-webkit-justify-items"
    ],
    "justify-self": [
        "-webkit-justify-self"
    ],
    "line-align": [
        "-webkit-line-align"
    ],
    "line-grid": [
        "-webkit-line-grid"
    ],
    "line-snap": [
        "-webkit-line-snap"
    ],
    "marquee": [
        "-webkit-marquee"
    ],
    "marquee-direction": [
        "-webkit-marquee-direction"
    ],
    "marquee-increment": [
        "-webkit-marquee-increment"
    ],
    "marquee-repetition": [
        "-webkit-marquee-repetition"
    ],
    "marquee-speed": [
        "-webkit-marquee-speed"
    ],
    "marquee-style": [
        "-webkit-marquee-style"
    ],
    "mask-source-type": [
        "-webkit-mask-source-type"
    ],
    "nbsp-mode": [
        "-webkit-nbsp-mode"
    ],
    "overflow-scrolling": [
        "-webkit-overflow-scrolling"
    ],
    "region-break-after": [
        "-webkit-region-break-after"
    ],
    "region-break-before": [
        "-webkit-region-break-before"
    ],
    "region-break-inside": [
        "-webkit-region-break-inside"
    ],
    "region-fragment": [
        "-webkit-region-fragment"
    ],
    "scroll-snap-coordinate": [
        "-webkit-scroll-snap-coordinate"
    ],
    "scroll-snap-destination": [
        "-webkit-scroll-snap-destination"
    ],
    "scroll-snap-points-x": [
        "-webkit-scroll-snap-points-x",
        "-ms-scroll-snap-points-x"
    ],
    "scroll-snap-points-y": [
        "-webkit-scroll-snap-points-y",
        "-ms-scroll-snap-points-y"
    ],
    "scroll-snap-type": [
        "-webkit-scroll-snap-type",
        "-ms-scroll-snap-type"
    ],
    "svg-shadow": [
        "-webkit-svg-shadow"
    ],
    "text-align-last": [
        "-webkit-text-align-last",
        "-moz-text-align-last",
        "-ms-text-align-last"
    ],
    "text-decoration": [
        "-webkit-text-decoration"
    ],
    "text-decoration-color": [
        "-webkit-text-decoration-color",
        "-moz-text-decoration-color"
    ],
    "text-decoration-line": [
        "-webkit-text-decoration-line",
        "-moz-text-decoration-line"
    ],
    "text-decoration-skip": [
        "-webkit-text-decoration-skip"
    ],
    "text-decoration-style": [
        "-webkit-text-decoration-style",
        "-moz-text-decoration-style"
    ],
    "text-justify": [
        "-webkit-text-justify",
        "-ms-text-justify"
    ],
    "text-size-adjust": [
        "-webkit-text-size-adjust",
        "-moz-text-size-adjust",
        "-ms-text-size-adjust"
    ],
    "text-underline-position": [
        "-webkit-text-underline-position",
        "-ms-text-underline-position"
    ],
    "text-zoom": [
        "-webkit-text-zoom"
    ],
    "touch-callout": [
        "-webkit-touch-callout"
    ],
    "binding": [
        "-moz-binding"
    ],
    "border-bottom-colors": [
        "-moz-border-bottom-colors"
    ],
    "border-left-colors": [
        "-moz-border-left-colors"
    ],
    "border-right-colors": [
        "-moz-border-right-colors"
    ],
    "border-top-colors": [
        "-moz-border-top-colors"
    ],
    "control-character-visibility": [
        "-moz-control-character-visibility"
    ],
    "float-edge": [
        "-moz-float-edge"
    ],
    "force-broken-image-icon": [
        "-moz-force-broken-image-icon"
    ],
    "image-region": [
        "-moz-image-region"
    ],
    "math-display": [
        "-moz-math-display"
    ],
    "math-variant": [
        "-moz-math-variant"
    ],
    "min-font-size-ratio": [
        "-moz-min-font-size-ratio"
    ],
    "orient": [
        "-moz-orient"
    ],
    "osx-font-smoothing": [
        "-moz-osx-font-smoothing"
    ],
    "outline-radius": [
        "-moz-outline-radius"
    ],
    "outline-radius-bottomleft": [
        "-moz-outline-radius-bottomleft"
    ],
    "outline-radius-bottomright": [
        "-moz-outline-radius-bottomright"
    ],
    "outline-radius-topleft": [
        "-moz-outline-radius-topleft"
    ],
    "outline-radius-topright": [
        "-moz-outline-radius-topright"
    ],
    "script-level": [
        "-moz-script-level"
    ],
    "script-min-size": [
        "-moz-script-min-size"
    ],
    "script-size-multiplier": [
        "-moz-script-size-multiplier"
    ],
    "stack-sizing": [
        "-moz-stack-sizing"
    ],
    "tab-size": [
        "-moz-tab-size"
    ],
    "top-layer": [
        "-moz-top-layer"
    ],
    "user-focus": [
        "-moz-user-focus"
    ],
    "user-input": [
        "-moz-user-input"
    ],
    "window-dragging": [
        "-moz-window-dragging"
    ],
    "window-shadow": [
        "-moz-window-shadow"
    ],
    "accelerator": [
        "-ms-accelerator"
    ],
    "background-position-x": [
        "-ms-background-position-x"
    ],
    "background-position-y": [
        "-ms-background-position-y"
    ],
    "behavior": [
        "-ms-behavior"
    ],
    "block-progression": [
        "-ms-block-progression"
    ],
    "content-zoom-chaining": [
        "-ms-content-zoom-chaining"
    ],
    "content-zoom-limit": [
        "-ms-content-zoom-limit"
    ],
    "content-zoom-limit-max": [
        "-ms-content-zoom-limit-max"
    ],
    "content-zoom-limit-min": [
        "-ms-content-zoom-limit-min"
    ],
    "content-zoom-snap": [
        "-ms-content-zoom-snap"
    ],
    "content-zoom-snap-points": [
        "-ms-content-zoom-snap-points"
    ],
    "content-zoom-snap-type": [
        "-ms-content-zoom-snap-type"
    ],
    "content-zooming": [
        "-ms-content-zooming"
    ],
    "flex-align": [
        "-ms-flex-align"
    ],
    "flex-item-align": [
        "-ms-flex-item-align"
    ],
    "flex-line-pack": [
        "-ms-flex-line-pack"
    ],
    "flex-negative": [
        "-ms-flex-negative"
    ],
    "flex-order": [
        "-ms-flex-order"
    ],
    "flex-pack": [
        "-ms-flex-pack"
    ],
    "flex-positive": [
        "-ms-flex-positive"
    ],
    "flex-preferred-size": [
        "-ms-flex-preferred-size"
    ],
    "grid-column-align": [
        "-ms-grid-column-align"
    ],
    "grid-column-span": [
        "-ms-grid-column-span"
    ],
    "grid-columns": [
        "-ms-grid-columns"
    ],
    "grid-row-align": [
        "-ms-grid-row-align"
    ],
    "grid-row-span": [
        "-ms-grid-row-span"
    ],
    "grid-rows": [
        "-ms-grid-rows"
    ],
    "high-contrast-adjust": [
        "-ms-high-contrast-adjust"
    ],
    "hyphenate-limit-chars": [
        "-ms-hyphenate-limit-chars"
    ],
    "hyphenate-limit-zone": [
        "-ms-hyphenate-limit-zone"
    ],
    "ime-align": [
        "-ms-ime-align"
    ],
    "ime-mode": [
        "-ms-ime-mode"
    ],
    "interpolation-mode": [
        "-ms-interpolation-mode"
    ],
    "layout-flow": [
        "-ms-layout-flow"
    ],
    "layout-grid": [
        "-ms-layout-grid"
    ],
    "layout-grid-char": [
        "-ms-layout-grid-char"
    ],
    "layout-grid-line": [
        "-ms-layout-grid-line"
    ],
    "layout-grid-mode": [
        "-ms-layout-grid-mode"
    ],
    "layout-grid-type": [
        "-ms-layout-grid-type"
    ],
    "overflow-style": [
        "-ms-overflow-style"
    ],
    "overflow-x": [
        "-ms-overflow-x"
    ],
    "overflow-y": [
        "-ms-overflow-y"
    ],
    "scroll-chaining": [
        "-ms-scroll-chaining"
    ],
    "scroll-limit": [
        "-ms-scroll-limit"
    ],
    "scroll-limit-x-max": [
        "-ms-scroll-limit-x-max"
    ],
    "scroll-limit-x-min": [
        "-ms-scroll-limit-x-min"
    ],
    "scroll-limit-y-max": [
        "-ms-scroll-limit-y-max"
    ],
    "scroll-limit-y-min": [
        "-ms-scroll-limit-y-min"
    ],
    "scroll-rails": [
        "-ms-scroll-rails"
    ],
    "scroll-snap-x": [
        "-ms-scroll-snap-x"
    ],
    "scroll-snap-y": [
        "-ms-scroll-snap-y"
    ],
    "scroll-translation": [
        "-ms-scroll-translation"
    ],
    "scrollbar-3dlight-color": [
        "-ms-scrollbar-3dlight-color"
    ],
    "scrollbar-arrow-color": [
        "-ms-scrollbar-arrow-color"
    ],
    "scrollbar-base-color": [
        "-ms-scrollbar-base-color"
    ],
    "scrollbar-darkshadow-color": [
        "-ms-scrollbar-darkshadow-color"
    ],
    "scrollbar-face-color": [
        "-ms-scrollbar-face-color"
    ],
    "scrollbar-highlight-color": [
        "-ms-scrollbar-highlight-color"
    ],
    "scrollbar-shadow-color": [
        "-ms-scrollbar-shadow-color"
    ],
    "scrollbar-track-color": [
        "-ms-scrollbar-track-color"
    ],
    "text-autospace": [
        "-ms-text-autospace"
    ],
    "text-combine-horizontal": [
        "-ms-text-combine-horizontal"
    ],
    "text-kashida-space": [
        "-ms-text-kashida-space"
    ],
    "text-overflow": [
        "-ms-text-overflow"
    ],
    "touch-action": [
        "-ms-touch-action"
    ],
    "touch-select": [
        "-ms-touch-select"
    ],
    "word-break": [
        "-ms-word-break"
    ],
    "word-wrap": [
        "-ms-word-wrap"
    ],
    "wrap-flow": [
        "-ms-wrap-flow"
    ],
    "wrap-margin": [
        "-ms-wrap-margin"
    ],
    "wrap-through": [
        "-ms-wrap-through"
    ],
    "zoom": [
        "-ms-zoom"
    ]
};

V.toCamel = L.toCamel;

V.fromCamel = L.fromCamel;

V.query = function(attr) {
    var a = V.fromCamel(attr);
    var list;
    if (a != attr) {
        list = V.attrs[a] || [];
    } else {
        list = V.attrs[attr] || [];
    }
    return list;
};

V.compose = function(attr) {
    var c = V.toCamel(attr);
    var f = V.fromCamel(attr);
    var c_alias = V.attrs[c] || [];
    var f_alias = V.attrs[f] || [];
    return c_alias.concat(f_alias).concat([attr]);
};

module.exports = V;