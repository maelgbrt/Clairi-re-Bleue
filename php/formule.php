<?php
function getFormules($conn){
    $stmt = $conn->prepare("SELECT * FROM formules");
    $stmt->execute();
    $res = $stmt->get_result();
    return $res->fetch_all(MYSQLI_ASSOC) ?: [];
}

?>