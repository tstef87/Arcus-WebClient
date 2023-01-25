<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Final Output</title>
    <meta name="description" content="Bootstrap.">
    <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <link rel="stylesheet" href="http://cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css"></style>
    <script type="text/javascript" src="http://cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

    <style>
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
        }

        .topnav {
            overflow: hidden;
            background-color: #333;
        }

        .topnav a {
            float: left;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: 17px;
        }

        .topnav a:hover {
            background-color: #ddd;
            color: black;
        }

        .topnav a.active {
            background-color: #04AA6D;
            color: white;
        }
    </style>
</head>
<body style="margin:20px auto">

<div class="topnav">
    <a class="active" href="#home">Home</a>
    <a href="#news">News</a>
    <a href="#contact">Contact</a>
    <a href="#about">About</a>
</div>


<div class="container">
    <div class="row header" style="text-align:center;color:green">
        <h3>Bootstrap</h3>
    </div>
    <table id="myTable" class="table table-striped" >

        <thead>
        <tr>
            <th>location</th>
            <th>name</th>

        </tr>
        </thead>
        <tbody>

        <?php
        require 'connect.php';
        $numReg = $redis->get('Troy-Stefano:cbp:numOfReg');
        for($i = 1; $i <= $numReg; $i++){
            ?>
            <tr>
                <?php

                echo "<td>$location</td>";
                $temp = $redis->get("$me:$location:$i");
                echo "<td>$temp</td>";

                ?>

            </tr>
        <?php

        }

        ?>

        </tbody>
    </table>
</div>

<form>
    <input type="submit">
</form>
</body>
<script>
    $(document).ready(function(){
        $('#myTable').dataTable();
    });
</script>
</html>
