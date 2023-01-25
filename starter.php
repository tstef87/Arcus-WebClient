<?php
require 'connect.php';

//adding new item to the menu

$regNumber = $redis->incr("$me:$location:numOfReg");
$key = "$me:$location:$regNumber";
$rn = 201;
$redis->set($key, $rn);




$menuitem = array(
    'type' => 'food',
    'name' => 'Test Penny',
    'price' => '0.01',
);
$toppings = array('a','b','c');
$regNum = $rn;

$itemNum = $redis->incr("$me:$location:$regNum:item_number");
echo "inserting new Register Number = $regNum <br/> \n";


$key = "$me:menu:$location:$regNum:$itemNum";
$redis->hMSet($key, $menuitem);


//adding cashier
// todo

//adding super user
// todo

?>
