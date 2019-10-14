### Create new (empty) migration
```
ts-node ./node_modules/.bin/typeorm migration:create -n Users
```

### Generate new migration
```
ts-node ./node_modules/.bin/typeorm migration:generate -n Users
```

### Run migrations
```
ts-node ./node_modules/.bin/typeorm migration:run
```

### Revert last migration
```
ts-node ./node_modules/.bin/typeorm migration:revert
```