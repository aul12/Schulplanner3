<?php
if(file_exists('test.xml'))
    $root = simplexml_load_file('test.xml');
else
    $root = simplexml_load_string('<Homeworks></Homeworks>');


//Write new Data
if(isset($_POST["subject"]) && isset($_POST["date"]) && isset($_POST["task"])){
    $test = $root->addChild("homework");
    $test->addChild("Subject", $_POST["subject"]);
    $test->addChild("Date", $_POST["date"]);
    $test->addChild("Task", $_POST["task"]);

    $length = $root->attributes() or 0;
    $length += 1;
    $root['length'] = $length;

    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $dom->loadXML($root->asXML());

    $dom->save('test.xml');
}
//Read Data
echo $root->asXML();


