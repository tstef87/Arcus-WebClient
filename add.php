<!DOCTYPE html>
<html>
<head>
    <h1>Add New</h1>
    <title>Add New</title>
</head>

<body>

<h3>Demographics</h3>

<?php
require 'connect.php';

if(!empty($_GET['addnew'])){
    $type = $_GET["type"];
    $item = $_GET["item"];
    $price = $_GET["price"];

    $menuItem = array(
            'type' => $type,
        'item' => $item,
        'price' => $price
    );

    $key = "$me:ITEM:$registerID";

    try {
        $redis -> hMSet($key, $menuItem);
    }catch (RedisException $e){
        echo $e;
    }
}else{

    ?>
<form method="get" action="add.php">
    <labe for="type">Type</labe>
    <select id="type" name="type" required>
        <option value="" hidden selected disabled>Select Type</option>
        <option value="Non Alcoholic Beverage">Non Alcoholic Beverage</option>
        <option value="Alcoholic Beverage">Alcoholic Beverage</option>
        <option value="Food">Food</option>
    </select><br/><br/>

    <label for="item">Item</label>
    <input type="text" id="item" name="item"><br><br>

    <label for="price">Price</label>
    <input type="number" id="price" name="price" min="0.00" max="10000.00" step="0.01" />


    <input type="hidden" name="addnew" value="1"><br/>
    <input type="submit" value="Add"/>
    <?php

    }
    ?>
</form>

</body>
</html>
