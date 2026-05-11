<?php
include("../db/db_connect.php");
$token = $_GET['token'] ?? '';

// On vérifie si le token est bon
$query = $conn->prepare("SELECT mail FROM familles WHERE token = ? AND token_expiration > NOW()");
$query->execute([$token]);
$user = $query->fetch();

   
    
?>






<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reinitialiser votre mot de passe</title>
        <script src="https://cdn.tailwindcss.com"></script>

</head>
<body class="h-screen w-sreen  grid grid-cols-[1fr_2fr]">
    
<div class="bg-[url(../images/volatile.jpg)] h-screen bg-center bg-cover"></div>
<div class="p-8 backdrop-blur-lg flex justify-center items-center">

<?php
 if (!$user) {
        die("<div class='bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded mb-4'>Le lien est invalide ou a expiré.</div>");
    }

?>

    <form class="p-8 backdrop-blur-lg flex flex-col gap-8" action="save_new_password.php" method="POST">
        <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">
        <h1 class="text-4xl mb-8">Reinitialiser votre mot de Passe</h1>
    <div class="flex gap-3 items-center">
        <label>Nouveau mot de passe :</label>
        <input class="p-1 border-b-2 outline-none border-red-500" type="password" name="new_password" required>
    </div>
    
    <div class="flex gap-3 items-center">
        <label>Confirmez le mot de passe :</label>
        <input class="p-1 border-b-2 outline-none border-red-500" type="password" name="confirm_password" required>
    </div>
    
    <button class="bg-red-500 p-4 rounded-xl text-white" type="submit">Modifier mon mot de passe</button>
    <div class="p-8 backdrop-blur-lg flex justify-center items-center flex-col">

    <!-- BLOC NOTIFICATION -->
    <?php if (isset($_GET['status'])): ?>
        <?php if ($_GET['status'] === 'success'): ?>
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Mot de passe mis à jour ! <a href="../html/login.html" class="font-bold underline">Se connecter</a>
            </div>
        <?php elseif ($_GET['status'] === 'error'): ?>
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <?php echo htmlspecialchars($_GET['msg']); ?>
            </div>
        <?php endif; ?>
    <?php endif; ?>
</div>
</form> 

</div>
</body>