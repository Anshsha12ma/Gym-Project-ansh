<?php
$username = $POST['username'];
$passward = $POST['passward'];

//database connection 
$conn = new mysqli('localhost','','test','root');
if($conn->connect_error){
    die('connection failed'. $conn->connect_error);

}
$stmt = $conn->prepare("insert into login(username, passward)value (?,?)");
$stmt->bind_param("si", $username, $passward);
$stmt->execute();
echo"login successfully";
$stmt->close();
$conn->close();

?>