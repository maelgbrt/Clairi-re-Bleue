<?php
include("../db/db_connect.php");

$token = $_POST['token'] ?? '';
$new_password = $_POST['new_password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

// 1. Petite vérification de sécurité
if ($new_password !== $confirm_password) {
    die("Les mots de passe ne correspondent pas.");
}

// 2. On hashe le mot de passe (super important pour le jury !)
$hashed_mdp = password_hash($new_password, PASSWORD_DEFAULT);

// 3. On met à jour la base et on vide le token
$query = $conn->prepare("UPDATE familles SET password = ?, token = NULL, token_expiration = NULL WHERE token = ?");
$success = $query->execute([$hashed_mdp, $token]);

if ($success && $query->rowCount() > 0) {
    echo "Votre mot de passe a été mis à jour avec succès ! <a href='../login.html'>Se connecter</a>";
} else {
    echo "Une erreur est survenue ou le lien n'est plus valide.";
}
?>