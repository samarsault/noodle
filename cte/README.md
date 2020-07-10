# theme
This folder houses custom pages for the system, which can be modified to represent a brand or additional functionality.

## How To
1. Pages are written in vue, which can access application data in a simple way, through props.
2. They are registered in `index.js`
3. Specify any special data access required

```javascript
export const routes = [
  {
    // Route
    path: '/catalog',
    // Component to render
    page: () => import('./catalog.vue'),
    // Populates 'courses' prop in the catalog.vue
    access: ['courses']
  }
]
```

User access is passed to every page by default.
