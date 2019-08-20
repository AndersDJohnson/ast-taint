

Given:

```js

const doReq = () => {
  fetch('https://example.com') // whatever target
    .then(data => {
      const myTransformedData = myTransform(data)
      dispatch(createMyAction(data))
    })
}
```

We should be able to define `data` with fixture (and stub any other variables).

We target a specific value in the data response, e.g., `data.whatever`.

We can then trace how this `data.whatever` becomes part of the action payload:

```
createMyAction(data)
```
=>
```js
{
  type: 'FOO',
  data: { whatever: 1 } 
}
```

Then we should be able to resolve the reducer and see which fields
`whatever` ends up influencing in a predictive state shape.

We can then find components that bind via `react-redux` to this data (via `connect` or `useSelector`),
and we can start to show which components are tainted by given data.

We'll have to "taint" certain AST nodes and walk through AST flow to track the effects.
