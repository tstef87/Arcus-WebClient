<?php
//file: connect.php
error_reporting( E_ALL );

// https://phpredis.github.io/phpredis/Redis.html
$me = 'Troy-Stefano';			// <-- change to your username
$location = 'cbp';

//connect to redis server on localhost
$redis = new Redis();
try {
    $redis->connect('localhost');
} catch (RedisException $e) {
}
echo "<!-- connected. --> \n";

try {
    $redis->auth("Troy654321!");
} catch (RedisException $e) {
}
echo "<!-- logged in -->\n";


//check whether server is running or not
echo "<!-- server is running: " . $redis->ping() . ". --> \n";

?>