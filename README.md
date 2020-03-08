### demo


##### one - few
```
db.person.findOne()
{
  name: '...',
  addresses : [
     { street: '...', city: '...', cc: '...' },
     { street: '...', city: '...', cc: '...' }
  ]
}
```

##### one - many
```
db.products.findOne()
{
    name : '...',
    ...
    parts : [
        ObjectID('...'),
        ObjectID('...'),
        ObjectID('...'),
        ...
    ]
}
```

##### one - Squillions
```
db.logmsg.findOne()
{
    time : ...,
    message : '...',
    host: ObjectID('...')
}
```

`window.navigator.standalone`


```
<div class="card">
    <div class="card-content">
        <div class="card-body">
            
        </div>
    </div>
</div>
```