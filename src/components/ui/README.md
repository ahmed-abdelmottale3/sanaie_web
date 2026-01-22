# Custom Scrollbar Styles

This project includes custom scrollbar styles that match the site's red and gray color scheme.

## Available Classes

### Global Scrollbar (Applied automatically)
- Applied to all elements by default
- Red gradient scrollbar with gray track
- Smooth animations on hover

### Custom Classes

#### `.custom-scrollbar`
```tsx
<div className="custom-scrollbar max-h-96 overflow-y-auto">
  {/* Content */}
</div>
```

#### `.modal-scrollbar`
For modals and dropdowns:
```tsx
<div className="modal-scrollbar max-h-64 overflow-y-auto">
  {/* Modal content */}
</div>
```

#### `.thin-scrollbar`
For smaller containers:
```tsx
<div className="thin-scrollbar max-h-32 overflow-y-auto">
  {/* Content */}
</div>
```

#### `.horizontal-scrollbar`
For horizontal scrolling:
```tsx
<div className="horizontal-scrollbar max-w-full overflow-x-auto">
  {/* Horizontal content */}
</div>
```

#### `.auto-hide-scrollbar`
Scrollbar that becomes more transparent:
```tsx
<div className="auto-hide-scrollbar overflow-y-auto">
  {/* Content */}
</div>
```

## Component Usage

```tsx
import CustomScrollbar from '../components/ui/CustomScrollbar';

<CustomScrollbar maxHeight="400px" className="additional-classes">
  {/* Content */}
</CustomScrollbar>
```

## CSS Customization

The scrollbar styles are defined in `src/app/globals.css` and can be customized by modifying the CSS variables:

- `--scrollbar-thumb`: Main scrollbar color
- `--scrollbar-track`: Background track color
- `--scrollbar-width`: Scrollbar width
- `--scrollbar-border-radius`: Border radius

## Browser Support

- **Webkit browsers** (Chrome, Safari, Edge): Full support with custom styling
- **Firefox**: Basic support with `scrollbar-width` and `scrollbar-color`
- **Mobile devices**: Optimized thinner scrollbars for touch interfaces