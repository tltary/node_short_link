# Node short link with express

start on localhost:8000

Project saves your link to the database and, using md5 hash, finds it

### example

```link
https://github.com/ - https://<your-url>/008ec4453ff31513f43893cba7aa31c8
```

### npm commnad

```npm
start server     -  npm run pm2 start server.js
list server      -  npm run pm2 list
monit server     -  npm run pm2 monit
show server      -  npm run pm2 show
stop server      -  npm run pm2 stop
restart server   -  npm run pm2 restart
delete server    -  npm run pm2 delete
```

### mysql

```sql
CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `link` text NOT NULL,
  `hash` text NOT NULL,
  `is_block` int(11) NOT NULL,
  `time_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;
```

### database connect

create db.js in config/\
see example in config/db.example.js

### todo 

1. Add mvc pattern
2. Add admin/user page/controller/model
3. Think over architecture mvc app for future projects
