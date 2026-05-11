<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require '../vendor/autoload.php'; 
use PHPMailer\PHPMailer\PHPMailer;

 $mail = new PHPMailer(true);

    // --- 1. CONFIGURATION (À faire une seule fois) ---
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'maelgaborit1407@gmail.com';
    $mail->Password   = 'qsbl zxav sqdq plog'; // Indispensable !
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;


function mail_reinitiaisation ($Adress,$lien) {
    global $mail;
    try {
        $mail->setFrom('maelgaborit1407@gmail.com', 'Clairière Bleue');
        $mail->addAddress($Adress);
        $mail->isHTML(true);
        $mail->Subject = "Reinitialiser Mot de Passe";
        $mail->Body = "
<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;'>
    <h2 style='color: #2563eb; text-align: center;'>Réinitialisation de votre mot de passe</h2>
    
    <p>Bonjour,</p>
    
    <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte <strong>Clairière Bleue</strong>.</p>
    
    <div style='text-align: center; margin: 30px 0;'>
        <a href='$lien' 
           style='background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;'>
           Réinitialiser mon mot de passe
        </a>
    </div>
    
    <p style='font-size: 0.9em; color: #666;'>
        Ce lien est valable pendant 30 minutes. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail en toute sécurité. Votre mot de passe restera inchangé.
    </p>
    
    <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
    
    <p style='font-size: 0.8em; color: #999; text-align: center;'>
        &copy; 2026 Clairière Bleue - Service Clientèle
    </p>
</div>
";
        $mail->send();
        return true; 

    } catch (Exception $e) {
        return false; 
    }
}
function reinitialisation_token($conn, $data){
    $Adress = $data["Adress"];
    $res = verif_mail($conn, $Adress);

    if(!$res){
        $token = update_token($conn, $Adress);
        
        if($token){
            $lien = "http://localhost:8085/php/reset.php?token=" . $token;
            
            $envoiMail = mail_reinitiaisation($Adress, $lien);
            
            if($envoiMail){
                return true;
            }
        }
    }
    
    return false;
}


function update_token($conn,$Adress){
    $token = bin2hex(random_bytes(32));
    $expiration = date('Y-m-d H:i:s', strtotime('+30 minutes'));
    $query = $conn->prepare("UPDATE familles SET token = ?, token_expiration = ? WHERE mail = ?");
    $query->execute([$token, $expiration, $Adress]);
    return $token;
}
?>