# theme
This folder houses custom pages for the system, which can be modified to represent a brand or additional functionality.

## How To
1. Pages are written in vue, which can access application data in a simple way, through props.
2. They are registered in `index.js`

```javascript
export const routes = [
  {
    // Route
    path: '/catalog',
    // Component to render
    component: () => import('./catalog.vue'),
  }
]
```
