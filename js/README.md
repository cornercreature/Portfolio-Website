# JavaScript Module Structure

This directory contains the refactored JavaScript code for the portfolio website, organized into modular ES6 modules for better maintainability and code organization.

## Directory Structure

```
js/
├── main.js                          # Application entry point
├── components/                      # UI component modules
│   ├── gallery.js                  # Gallery/thumbnail rendering
│   └── detail-view.js              # Detail view rendering
├── config/                          # Configuration modules
│   └── constants.js                # Application constants
├── data/                            # Data modules
│   └── portfolio-data.js           # Portfolio work items data
├── interactions/                    # User interaction modules
│   ├── swipe-gestures.js           # Touch/trackpad swipe handling
│   └── synchronized-scroll.js      # Column scroll synchronization
├── state/                           # State management modules
│   └── app-state.js                # Application state
└── views/                           # View transition modules
    └── transitions.js              # Expand/collapse transitions
```

## Module Descriptions

### `main.js`
- **Purpose**: Application entry point
- **Responsibilities**: Initializes all modules when DOM is ready
- **Dependencies**: All other modules

### `components/gallery.js`
- **Purpose**: Gallery rendering and thumbnail creation
- **Exports**: `createWorkThumbnail()`, `populateGallery()`
- **Dependencies**: constants, portfolio-data, transitions

### `components/detail-view.js`
- **Purpose**: Detail view rendering
- **Exports**: `createDetailImage()`, `populateDetailView()`
- **Dependencies**: constants

### `config/constants.js`
- **Purpose**: Application-wide constants
- **Exports**: `PLACEHOLDER_COLORS`, `ASPECT_RATIO_HEIGHTS`, `SWIPE_CONFIG`
- **Dependencies**: None

### `data/portfolio-data.js`
- **Purpose**: Portfolio work items data
- **Exports**: `portfolioWorks`
- **Dependencies**: None

### `interactions/swipe-gestures.js`
- **Purpose**: Touch and trackpad swipe gesture handling
- **Exports**: `setupSwipeGestures()`
- **Dependencies**: constants, transitions

### `interactions/synchronized-scroll.js`
- **Purpose**: Synchronized scrolling between columns
- **Exports**: `setupSynchronizedScrolling()`
- **Dependencies**: None

### `state/app-state.js`
- **Purpose**: Application state management
- **Exports**: `currentlyOpenWorkId`, `setCurrentlyOpenWorkId()`, `getCurrentlyOpenWorkId()`
- **Dependencies**: None

### `views/transitions.js`
- **Purpose**: View transition logic (expand/collapse)
- **Exports**: `expandWork()`, `collapseWork()`
- **Dependencies**: portfolio-data, constants, app-state, detail-view

## Benefits of This Structure

1. **Modularity**: Each file has a single, well-defined responsibility
2. **Reusability**: Functions can be easily imported where needed
3. **Maintainability**: Easy to locate and modify specific functionality
4. **Testability**: Individual modules can be tested in isolation
5. **Scalability**: New features can be added without cluttering existing files
6. **Clear Dependencies**: Import statements make dependencies explicit

## Usage

The HTML file loads the main entry point as an ES6 module:

```html
<script type="module" src="js/main.js"></script>
```

All other modules are automatically loaded via ES6 import statements.
