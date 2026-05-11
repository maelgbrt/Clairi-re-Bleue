<?php
include("../db/db_connect.php");

$token = $_POST['token'] ?? '';
$new_password = $_POST['new_password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

if ($new_password !== $confirm_password) {
    header("Location: reset.php?token=$token&status=error&msg=Les mots de passe ne correspondent pas");
    exit();
}

$hashed_mdp = password_hash($new_password, PASSWORD_DEFAULT);
$query = $conn->prepare("UPDATE familles SET password = ?, token = NULL, token_expiration = NULL WHERE token = ?");
$query->bind_param("ss", $hashed_mdp, $token); 
$success = $query->execute();

if ($success && $query->affected_rows > 0) {
    // Succès : on redirige sans le token (puisqu'il est supprimé en DB)
    header("Location: reset.php?status=success");
} else {
    header("Location: reset.php?token=$token&status=error&msg=Lien invalide ou expiré");
}
exit();
?>