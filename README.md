# Node short link with express and swig

start on localhost:8000

The project saves a short link that is collected using sha256 hash from which the interval is taken according to the formula from random_number to (random_number + 4) + random number in the interval from 0 to 999

### example

```link
https://github.com/ = https://<your-url>/g/09a8195
```

### npm command

```npm
npm run server_start     - pm2 start server.js
npm run server_list      - pm2 list
npm run server_monit     - pm2 monit
npm run server_show      - pm2 show
npm run server_stop      - pm2 stop
npm run server_restart   - pm2 restart
npm run server_delete    - pm2 delete
```

### mysql

```sql
CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `cookie` text NOT NULL,
  `link` text NOT NULL,
  `link_block` text NOT NULL,
  `hash` text NOT NULL,
  `count` int(11) NOT NULL,
  `is_block` int(11) NOT NULL,
  `time_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `time_register` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

```

### database connect

create db.js in config/\
see example in config/db.example.js

### todo 

1.  ̶A̶d̶d̶ ̶m̶v̶c̶ ̶p̶a̶t̶t̶e̶r̶n̶
2.  ̶A̶d̶d̶ ̶m̶a̶i̶n̶ ̶p̶a̶g̶e̶
3.  ̶A̶d̶d̶ ̶v̶i̶e̶w̶ ̶c̶r̶e̶a̶t̶e̶ ̶l̶i̶n̶k̶
4.  ̶T̶h̶i̶n̶k̶ ̶o̶v̶e̶r̶ ̶a̶r̶c̶h̶i̶t̶e̶c̶t̶u̶r̶e̶ ̶m̶v̶c̶ ̶a̶p̶p̶ ̶f̶o̶r̶ ̶f̶u̶t̶u̶r̶e̶ ̶p̶r̶o̶j̶e̶c̶t̶s̶
