# Node short link with express

start on localhost:8000

Project saves your link to the database and, using md5 hash, finds it

##example

```link
https://github.com/ - https://<your-url>/008ec4453ff31513f43893cba7aa31c8
```

##npm commnad

```npm
	server_start     -  npm run pm2 start server.js
    server_list      -  npm run pm2 list
    server_monit     -  npm run pm2 monit
    server_show      -  npm run pm2 show
    server_stop      -  npm run pm2 stop
    server_restart   -  npm run pm2 restart
    server_delete    -  npm run pm2 delete
```

##mysql

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