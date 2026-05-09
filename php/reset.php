<?php
include("../db/db_connect.php");
$token = $_GET['token'] ?? '';

// On vérifie si le token est bon
$query = $conn->prepare("SELECT mail FROM familles WHERE token = ? AND token_expiration > NOW()");
$query->execute([$token]);
$user = $query->fetch();

if (!$user) {
    die("Le lien est invalide ou a expiré.");
}
?>

<form action="save_new_password.php" method="POST">
    <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">
    
    <label>Nouveau mot de passe :</label>
    <input type="password" name="new_password" required>
    
    <label>Confirmez le mot de passe :</label>
    <input type="password" name="confirm_password" required>
    
    <button type="submit">Modifier mon mot de passe</button>
</form>